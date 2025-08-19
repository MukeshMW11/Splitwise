from decimal import Decimal
from collections import defaultdict
from django.db import transaction
from rest_framework.response import Response
from user.models import CustomUser
from group.models import GroupMembership
from expense.models import ExpensesParticipant, ExpensePayer, Expense
from balance.models import Debt


def create_participants(expense, participant_ids, group):
    print(f"=== CREATE PARTICIPANTS DEBUG ===")
    print(f"Participant IDs: {participant_ids}")
    
    for user_id in participant_ids:
        print(f"Processing participant ID: {user_id}")
        
        try:
            user = CustomUser.objects.get(id=user_id)
            print(f"  Found user: {user.id} -> name: {getattr(user, 'name', 'NO NAME ATTR')} -> email: {getattr(user, 'email', 'NO EMAIL ATTR')}")
            
            if not GroupMembership.objects.filter(user=user, group=group).exists():
                print(f"  ERROR: User {user} is not a member of the group.")
                raise ValueError(f"User {user} is not a member of the group.")
                
            participant, created = ExpensesParticipant.objects.get_or_create(expense=expense, user=user)
            print(f"  Participant {'created' if created else 'already exists'}: {participant}")
            
        except CustomUser.DoesNotExist:
            print(f"  ERROR: User with ID {user_id} does not exist!")
            raise
        except Exception as e:
            print(f"  ERROR processing user {user_id}: {e}")
            raise
    
    print(f"=== END CREATE PARTICIPANTS DEBUG ===")


def create_or_update_payers(expense, payers_data, group):
    total_paid = Decimal("0")

    for payer in payers_data:
        user_id = payer["user_id"]
        paid_amount = Decimal(payer["paid_amount"])
        actual_amount = Decimal(payer["actual_amount"])
        total_paid += paid_amount

        user = CustomUser.objects.get(id=user_id)
        if not GroupMembership.objects.filter(user=user, group=group).exists():
            raise ValueError(f"Payer {user.username} is not in the group.")

        ExpensePayer.objects.update_or_create(
            expense=expense,
            user=user,
            defaults={"paid_amount": paid_amount, "actual_amount": actual_amount},
        )

    if total_paid != expense.amount:
        raise ValueError(
            f"Total paid amount ({total_paid}) does not match the expense amount ({expense.amount})."
        )


@transaction.atomic
@transaction.atomic
def update_debts_for_expense(expense):
    print(f"=== DEBT CALCULATION DEBUG for expense: {expense.title} ===")
    
    participants = ExpensesParticipant.objects.filter(expense=expense).select_related('user')
    payers = ExpensePayer.objects.filter(expense=expense).select_related('user')
    group = expense.group
    total_amount = expense.amount
    split_type = expense.split_type

    print(f"Expense amount: {total_amount}")
    print(f"Split type: {split_type}")
    print(f"Participants count: {participants.count()}")
    print(f"Payers count: {payers.count()}")

    if not participants.exists():
        print("No participants found, returning")
        return

    # Remove existing debts for this expense
    existing_debts = Debt.objects.filter(expense=expense).count()
    Debt.objects.filter(expense=expense).delete()
    print(f"Deleted {existing_debts} existing debts")

    participant_count = participants.count()
    user_map = {p.user.id: p.user for p in participants}
    
    # Debug user loading
    print("=== USER DEBUG ===")
    for p in participants:
        print(f"Participant: {p.user.id} -> {p.user.name if p.user else 'No user!'}")
    
    print(f"User map: {[(str(uid), user.name if user else 'None') for uid, user in user_map.items()]}")

    # Step 1: Calculate share_map
    share_map = {}

    if split_type == "equally":
        share = total_amount / participant_count
        share_map = {user_id: share for user_id in user_map}
        print(f"Equal split - each person owes: {share}")

    elif split_type == "unequally":
        print("Processing unequal split...")
        payer_actual_amounts = {payer.user.id: payer.actual_amount for payer in payers}
        print(f"Payer actual amounts: {payer_actual_amounts}")
        
        for participant in participants:
            user_id = participant.user.id
            username = participant.user.name if participant.user else "Unknown"
            if user_id in payer_actual_amounts:
                share_map[user_id] = payer_actual_amounts[user_id]
                print(f"  {username} owes: {payer_actual_amounts[user_id]}")
            else:
                share_map[user_id] = Decimal("0")
                print(f"  {username} owes: 0 (not in payers)")

    elif split_type == "percentage":
        print("Processing percentage split...")
        for p in participants:
            username = p.user.name if p.user else "Unknown"
            if hasattr(p, "owed_percentage"):
                share_map[p.user.id] = (p.owed_percentage / Decimal("100")) * total_amount
                print(f"  {username} owes: {share_map[p.user.id]} ({p.owed_percentage}%)")
            else:
                print(f"  ERROR: No owed_percentage for {username}")
                raise ValueError(f"Owed percentage missing for participant {username}")
    else:
        raise ValueError("Unsupported split_type")

    print(f"Final share_map: {share_map}")

    # Step 2: Calculate paid_map
    paid_map = defaultdict(Decimal)
    for payer in payers:
        paid_map[payer.user.id] += payer.paid_amount
        username = payer.user.name if payer.user else "Unknown"
        print(f"{username} paid: {payer.paid_amount}")

    print(f"Final paid_map: {dict(paid_map)}")

    # Step 3: Calculate net balance
    balance_map = {}
    print("\n=== NET BALANCES ===")
    for user_id in user_map:
        owed = share_map.get(user_id, Decimal("0"))
        paid = paid_map.get(user_id, Decimal("0"))
        balance_map[user_id] = paid - owed
        user = user_map[user_id]
        username = user.name if user else "Unknown"
        print(f"{username}: paid {paid} - owes {owed} = net {balance_map[user_id]}")

    # Step 4: Separate creditors and debtors
    creditors = []
    debtors = []
    print("\n=== CREDITORS & DEBTORS ===")
    for user_id, net_balance in balance_map.items():
        user = user_map[user_id]
        username = user.name if user else "Unknown"
        if net_balance > 0:
            creditors.append([user, net_balance])
            print(f"CREDITOR: {username} is owed ${net_balance}")
        elif net_balance < 0:
            debtors.append([user, -net_balance])
            print(f"DEBTOR: {username} owes ${-net_balance}")
        else:
            print(f"NEUTRAL: {username} is even")

    print(f"\nTotal creditors: {len(creditors)}")
    print(f"Total debtors: {len(debtors)}")

    # Step 5: Create debts
    debts_created = 0
    print("\n=== CREATING DEBTS ===")
    
    for debtor_user, debt_amount in debtors:
        debtor_name = debtor_user.name if debtor_user else "Unknown"
        print(f"\nProcessing debtor: {debtor_name}, owes: ${debt_amount}")
        i = 0
        
        while debt_amount > 0 and i < len(creditors):
            creditor_user, credit_available = creditors[i]
            creditor_name = creditor_user.name if creditor_user else "Unknown"
            
            print(f"  Trying creditor {i}: {creditor_name}, available: ${credit_available}")
            
            if credit_available <= 0:
                print(f"    Skipping - no credit available")
                i += 1
                continue
                
            if debtor_user == creditor_user:
                print(f"    Skipping - same person")
                i += 1
                continue

            payment = min(debt_amount, credit_available)
            print(f"    Creating debt: {debtor_name} owes {creditor_name} ${payment}")

            try:
                debt_obj, created = Debt.objects.get_or_create(
                    user=debtor_user,
                    owed_to=creditor_user,
                    group=group,
                    expense=expense,
                    defaults={"debt_amount": Decimal("0"), "status": "pending"}
                )

                if not created:
                    print(f"      Found existing debt, resetting...")
                    debt_obj.debt_amount = Decimal("0")
                    debt_obj.status = "pending"

                debt_obj.debt_amount += payment
                debt_obj.save()
                
                print(f"      SUCCESS: Debt created/updated - ID: {debt_obj.id}, Amount: ${debt_obj.debt_amount}")
                debts_created += 1

                debt_amount -= payment
                creditors[i][1] -= payment
                
                print(f"      Remaining debt for {debtor_name}: ${debt_amount}")
                print(f"      Remaining credit for {creditor_name}: ${creditors[i][1]}")

                if creditors[i][1] <= 0:
                    i += 1
                    
            except Exception as e:
                print(f"      ERROR creating debt: {e}")
                import traceback
                traceback.print_exc()

    print(f"\n=== FINAL SUMMARY ===")
    print(f"Debts created/updated: {debts_created}")
    
    # Verify debts in database
    final_debts = Debt.objects.filter(expense=expense).select_related('user', 'owed_to')
    print(f"Total debts in database for this expense: {final_debts.count()}")
    
    for debt in final_debts:
        debtor_name = debt.user.name if debt.user else "Unknown"
        creditor_name = debt.owed_to.name if debt.owed_to else "Unknown"
        print(f"  {debtor_name} owes {creditor_name}: ${debt.debt_amount}")
    
    print("=== END DEBUG ===\n")