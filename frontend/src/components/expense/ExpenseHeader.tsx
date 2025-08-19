"use client";
import { Receipt, DollarSign, Wallet, PiggyBank } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axios/axios.utils";

const ExpenseHeader = ({ groupId, groupName, totalExpenses, totalAmount, currentUserId }) => {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["groupDebt", groupId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/debt/group-debt/${groupId}/`);
      return res.data;
    },
  });

  // Calculate net balance: positive = user is owed money, negative = user owes money
  const netBalance =
    data?.debts?.reduce((sum: number, debt: any) => {
      if (debt.role === "owes") {
        return sum - Number(debt.debt_amount);
      } else if (debt.role === "owed_to") {
        return sum + Number(debt.debt_amount);
      }
      return sum;
    }, 0) || 0;

  const buttonColorClass =
    netBalance >= 0 ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600";

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-white/20 backdrop-blur-sm p-6 sm:p-8 animate-slideUp">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight">
          {groupName} Expenses
        </h1>

        <div className="flex flex-wrap justify-center gap-6 text-sm sm:text-base">
          <div className="flex items-center gap-2 text-gray-600">
            <Receipt className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold">{totalExpenses} Expenses</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="font-semibold">Total: ${totalAmount.toFixed(2)}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Wallet className="w-5 h-5 text-blue-600" />
            <span className="font-semibold">
              Average: $
              {totalExpenses > 0 ? (totalAmount / totalExpenses).toFixed(2) : "0.00"}
            </span>
          </div>

          <button
            onClick={() => router.push(`/debt/${groupId}`)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition text-white ${buttonColorClass}`}
          >
            <PiggyBank className="w-5 h-5" />
            {isLoading ? "Loading..." : `$${Math.abs(netBalance).toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseHeader;
