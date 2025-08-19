import { CheckCircle, Clock } from "lucide-react";
import { Button } from "../ui/button";

interface User {
  id: string;
  name: string;
}

interface DebtItemProps {
  id: string;
  user: User;
  owedTo: User;
  debtAmount: string | number;
  isSettling: boolean;
  onSettle: (debtId: string) => void;
  isPending: boolean;
  index: number;
}

const DebtItem: React.FC<DebtItemProps> = ({
  id,
  user,
  owedTo,
  debtAmount,
  isSettling,
  onSettle,
  isPending,
  index,
}) => {
  const handleSettle = () => {
    if (!id || id === "undefined" || id === "null") {
      console.error("Invalid debt ID:", id);
      return;
    }
    onSettle(id);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl border-2 transition-all duration-500 ${
        isSettling
          ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 animate-settleSuccess scale-105 shadow-lg"
          : "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 hover:border-amber-300 hover:scale-[1.02] hover:shadow-lg"
      }`}
      style={{ animationDelay: `${0.3 + index * 0.1}s` }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm transition-all duration-500 ${
                  isSettling ? "bg-green-500" : "bg-amber-500"
                }`}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-gray-900 leading-tight">
                  {user.name}
                </p>
                <p className="text-sm text-gray-600">owes {owedTo.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isSettling ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-600 animate-bounce" />
                  <span className="text-sm font-semibold text-green-700 uppercase tracking-wide animate-pulse">
                    Settling...
                  </span>
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-semibold text-amber-700 uppercase tracking-wide">
                    Pending
                  </span>
                </>
              )}
            </div>

            <Button
              variant={isSettling ? "default" : "secondary"}
              onClick={handleSettle}
              disabled={isSettling || isPending || !id || id === "undefined"}
              className={`transition-all duration-500 ${
                isSettling
                  ? "bg-green-600 hover:bg-green-700 text-white shadow-lg"
                  : ""
              }`}
            >
              {isSettling ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 animate-spin" />
                  Settled!
                </div>
              ) : (
                "Settle"
              )}
            </Button>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              ${Number(debtAmount).toFixed(2)}
            </div>
            <div
              className={`text-xs font-medium uppercase tracking-wider transition-all duration-500 ${
                isSettling ? "text-green-600" : "text-amber-600"
              }`}
            >
              {isSettling ? "Paid" : "Due"}
            </div>
          </div>
        </div>
      </div>

      {isSettling && (
        <div className="absolute inset-0 bg-green-400 bg-opacity-20 animate-pulse"></div>
      )}

      <div
        className={`absolute top-0 right-0 w-1 h-full transition-all duration-500 ${
          isSettling
            ? "bg-gradient-to-b from-green-400 to-green-600"
            : "bg-gradient-to-b from-amber-400 to-amber-600"
        }`}
      ></div>
    </div>
  );
};

export default DebtItem;
