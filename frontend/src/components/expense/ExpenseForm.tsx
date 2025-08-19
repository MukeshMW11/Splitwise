"use client";

import { createExpenseSchema } from "@/schema/expenseSchema";
import { createExpense, editExpense, getExpenseById } from "@/lib/handlers/expenseHandler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, getUserByGroupId } from "@/lib/handlers/userHandler";
import { toast } from "sonner";
import ExpenseFormSkeleton from "../ui/ExpenseFromSkeleton";
import { createExpenseConfig } from "@/config/expenseConfig";

const ExpenseForm = ({ expenseId, groupId, onSuccess }) => {
  const queryClient = useQueryClient();

  const { data: users, isError: userError, isLoading: userLoading } = useQuery({
    queryKey: ["users"],
    queryFn:()=> getUserByGroupId(groupId),
  });

  const {
    data: expenseData,
    isLoading: expenseLoading,
    isError: expenseError,
  } = useQuery({
    queryKey: ["expense", expenseId],
    queryFn: () => getExpenseById(expenseId,groupId),
    enabled: !!expenseId,
  });

  const mutation = useMutation({
    mutationFn: (formData) =>
      expenseId ? editExpense(expenseId,groupId, formData) : createExpense(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses", groupId] });
      toast.success(expenseId ? "Expense updated successfully." : "Expense created successfully.");
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Expense mutation error:", error);
      toast.error(expenseId ? "Failed to update expense." : "Failed to create expense.");
    },
  });

  if (userLoading || (expenseId && expenseLoading)) {
    return <p className="text-sm text-gray-500">Loading...</p>;
  }

  if (userError) {
    return <p className="text-sm text-red-500">Failed to load users.</p>;
  }

  if (expenseError) {
    return <p className="text-sm text-red-500">Failed to load expense data.</p>;
  }

  const membersList = users?.map((user) => ({
    id: String(user.id),
    name: user.name,
  })) ?? [];

  // Format existing expense data for editing
  const getDefaultValues = () => {
    if (!expenseData) {
      return {
        title: "",
        description: "",
        amount: "",
        split_type: "equally",
        participants: [],
        payers_data: [],
        group_id: groupId
      };
    }

    const participants = expenseData.expenseparticipants?.map(p => String(p.user.id)) || [];
    const payersData = expenseData.expensepayer?.map(payer => ({
      user_id: String(payer.user.id),
      paid_amount: String(payer.paid_amount),
      actual_amount: String(payer.actual_amount)
    })) || [];

    return {
      title: expenseData.title || "",
      description: expenseData.description || "",
      amount: String(expenseData.amount || ""),
      split_type: expenseData.split_type || "equally",
      participants,
      payers_data: payersData,
      group_id: groupId
    };
  };

  const handleSubmit = (formData) => {
    mutation.mutate(formData);
  };

  return (
    <ExpenseFormSkeleton
      formSchema={createExpenseSchema}
      configFields={createExpenseConfig}
      onSubmit={handleSubmit}
      members={membersList}
      defaultValues={getDefaultValues()}
      isLoading={mutation.isPending}
    />
  );
};

export default ExpenseForm;
