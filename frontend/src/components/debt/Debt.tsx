"use client";

import React from "react";
import { useParams } from "next/navigation";
import LoadingState from "./Loading";
import ErrorState from "./Error";
import EmptyState from "./Empty";
import { calculateDebtStats } from "./DebtCalculation";
import ExpenseHeader from "./ExpenseHeader";
import ParticipantsList from "./ParticipantList";
import PayersList from "./PlayersList";
import OutstandingDebts from "./OutstandingDebts";
import AnimationStyles from "./Animations";
import { useDebts } from "@/lib/hooks/useDebts";
import SettledDebts from "./SettledDebt";

const DebtsPage = () => {
  const params = useParams();
  const expenseIdParam = params.expenseId;
  const expenseId = Array.isArray(expenseIdParam)
    ? expenseIdParam[0]
    : expenseIdParam;

  const {
    data,
    isLoading,
    isError,
    error,
    settlingDebtId,
    settleDebt,
    isSettling,
  } = useDebts(expenseId);

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState message={error.message} />;
  if (!data) return <EmptyState />;

  const stats = calculateDebtStats(data);
  if (!stats) return <EmptyState />;

  const {
    expense,
    participants,
    payers,
    totalAmount,
    participantCount,
    amountPerParticipant,
    pendingDebts,
    settledDebts,
    pendingDebtsCount,
    settledDebtsArray,
  } = stats;

  const hasNoPendingDebts = !pendingDebts || pendingDebts.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        <ExpenseHeader
          title={expense.title}
          totalAmount={totalAmount}
          participantCount={participantCount}
          settledCount={settledDebts}
          pendingCount={pendingDebtsCount}
        />

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <ParticipantsList
              participants={participants}
              amountPerParticipant={amountPerParticipant}
            />
            <PayersList payers={payers} />
          </div>

          <div className="space-y-6">
            {hasNoPendingDebts ? (
              <div className="bg-white rounded-2xl shadow-xl border border-green-100/50 p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    All Settled Up!
                  </h3>
                  <p className="text-gray-600 text-sm">
                    There are no outstanding debts for this expense. Everyone is all caught up!
                  </p>
                </div>
              </div>
            ) : (
              <OutstandingDebts
                pendingDebts={pendingDebts}
                settlingDebtId={settlingDebtId}
                onSettle={settleDebt}
                isPending={isSettling}
              />
            )}

            {/* Settled Debts Section */}
            <SettledDebts settledDebts={settledDebtsArray} />
          </div>
        </div>
      </div>

      <AnimationStyles />
    </div>
  );
};

export default DebtsPage;
