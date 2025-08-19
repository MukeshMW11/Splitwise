"use client";

import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios/axios.utils";
import { toast } from "sonner";
import EmptyState from "./Empty";
import ErrorState from "./Error";
import LoadingState from "./Loading";

const UserDebt = () => {
  const { groupId } = useParams();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userDebts", groupId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/debt/group-debt/${groupId}/`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  const settleDebtMutation = useMutation({
    mutationFn: async (debtId: string) => {
      const res = await axiosInstance.patch(
        `/debt/${debtId}/settle/`,
        {},
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userDebts", groupId] });
      toast.success("Settlement done successfully.");
    },
  });

  if (isLoading) return <LoadingState />;
  if (isError)
    return (
      <ErrorState message={"There was an error loading the debts."} />
    );

  const debts = data?.debts || [];

  if (!debts.length) {
    return <EmptyState />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Debts</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-lg font-semibold text-red-700">
              Total Outstanding: ${Number(data.total_debt).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {debts.map((debt: any) => {
            const isOwes = debt.role === "owes";
            return (
              <div
                key={debt.id}
                className={`bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow ${
                  isOwes ? "border-red-200" : "border-blue-200"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p
                      className={`font-semibold text-lg ${
                        isOwes ? "text-red-600" : "text-blue-600"
                      }`}
                    >
                      {isOwes
                        ? `You owe ${debt.owed_to?.name || "Unknown"}`
                        : `${debt.user?.name || "Someone"} owes you`}
                    </p>
                    <p className="text-gray-600 mt-1">
                      {debt.expense?.title || "Unknown expense"}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div
                        className={`text-2xl font-bold ${
                          isOwes ? "text-red-600" : "text-blue-600"
                        }`}
                      >
                        ${Number(debt.debt_amount).toFixed(2)}
                      </div>
                    </div>
                   
                      <button
                        onClick={() => settleDebtMutation.mutate(debt.id)}
                        disabled={settleDebtMutation.isLoading}
                        className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {settleDebtMutation.isLoading &&
                        settleDebtMutation.variables === debt.id
                          ? "Settling..."
                          : "Settle"}
                      </button>
                   
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserDebt;
