import { useQuery } from "@tanstack/react-query";
import { getExpense } from "@/lib/handlers/expenseHandler";

export const useExpenseData = (groupId) => {
  return useQuery({
    queryKey: ["expenses", groupId],
    queryFn: () => getExpense(groupId),
    staleTime: 1000 * 60 * 5,
  });
};
