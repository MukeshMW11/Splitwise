import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { debtStatus, getDebts } from '@/lib/handlers/debtHandler';

export const useDebts = (expenseId: string | undefined) => {
  const queryClient = useQueryClient();
  const [settlingDebtId, setSettlingDebtId] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['debts', expenseId],
    queryFn: () => getDebts(expenseId),
    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: debtStatus,
    onMutate: async ({ debtId }) => {
      setSettlingDebtId(debtId);
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['debts', expenseId] });
        setSettlingDebtId(null);
      }, 2000);
    },
    onError: (error) => {
      console.error('Error settling debt:', error);
      setSettlingDebtId(null);
    }
  });

  const settleDebt = (debtId: string) => {
    if (!debtId || debtId === 'undefined' || debtId === 'null') {
      console.error('Invalid debt ID provided:', debtId);
      return;
    }
    
    mutation.mutate({ debtId });
  };

  return {
    data,
    isLoading,
    isError,
    error,
    settlingDebtId,
    settleDebt,
    isSettling: mutation.isPending
  };
};