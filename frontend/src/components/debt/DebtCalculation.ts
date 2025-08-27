export const calculateDebtStats = (
  data: Array<{ expense: Expense }> & Debt[]
) => {
  if (!data || data.length === 0) return null;

  const expense = data[0].expense;
  const participants = expense.expenseparticipants ?? [];
  const payers = expense.expensepayer ?? [];

  const totalAmount = Number(expense.amount);
  const participantCount = participants.length;
  const amountPerParticipant = participantCount
    ? (totalAmount / participantCount).toFixed(2)
    : "0.00";

  const pendingDebts = data.filter((debt) => debt.status === "pending");
  const settledDebtsArray = data.filter((debt) => debt.status === "settled");

  return {
    expense,
    participants,
    payers,
    totalAmount,
    participantCount,
    amountPerParticipant,
    pendingDebts,
    pendingDebtsCount: pendingDebts.length,
    settledDebts: settledDebtsArray.length, 
    settledDebtsArray, 
};
}