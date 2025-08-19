import { UserMinus, CheckCircle } from "lucide-react";
import DebtItem from "./DebtItem";

interface User {
  id: string;
  name: string;
}

interface Debt {
  id: string;
  user: User;
  owed_to: User;
  debt_amount: string | number;
  status: string;
}

interface OutstandingDebtsProps {
  pendingDebts: Debt[];
  settlingDebtId: string | null;
  onSettle: (debtId: string) => void;
  isPending: boolean;
}

const OutstandingDebts: React.FC<OutstandingDebtsProps> = ({
  pendingDebts,
  settlingDebtId,
  onSettle,
  isPending,
}) => {
  const totalOutstanding = pendingDebts.reduce(
    (sum, debt) => sum + Number(debt.debt_amount),
    0
  );

  const validPendingDebts = pendingDebts.filter(
    (debt) => debt.id && debt.id !== "undefined"
  );

  return (
    <div
      className="bg-white rounded-2xl shadow-xl border border-rose-100/50 p-6 sm:p-8 animate-slideUp"
      style={{ animationDelay: "0.3s" }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center">
          <UserMinus className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Outstanding Debts
          </h2>
          <p className="text-gray-500">Pending settlements</p>
        </div>
      </div>

      <div className="space-y-4">
        {validPendingDebts.length === 0 ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                All Debts Settled!
              </h3>
              <p className="text-gray-600">
                Great! All debts for this expense have been settled.
              </p>
            </div>
          </div>
        ) : (
          validPendingDebts.map((debt, index) => (
            <DebtItem
              key={debt.id}
              id={debt.id}
              user={debt.user}
              owedTo={debt.owed_to}
              debtAmount={debt.debt_amount}
              isSettling={settlingDebtId === debt.id}
              onSettle={onSettle}
              isPending={isPending}
              index={index}
            />
          ))
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-700">
            Total Outstanding
          </span>
          <span className="text-2xl font-bold text-gray-900">
            ${totalOutstanding.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OutstandingDebts;
