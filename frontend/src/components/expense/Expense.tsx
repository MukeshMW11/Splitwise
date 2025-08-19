"use client";

import { useExpenseData } from "@/lib/query/expense.query";
import { LoadingSpinner } from "./Loading";
import EmptyState from "./Empty";
import ErrorState from "./Error";
import ExpenseContainer from "./ExpenseContaineer";
import ExpenseHeader from "./ExpenseHeader";
import ExpenseGrid from "./ExpenseGrid";
import SummaryCard from "./SummaryCard";
import FloatingActionButton from "./FloatingActionButton";



const ExpensesPage = ({ groupId }:{groupId:string}) => {
  const { isLoading, isError, data } = useExpenseData(groupId);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorState />;
  if (!data || data.length === 0) return <EmptyState  groupId={groupId}/>;

  const totalExpenses = data.length;
  const totalAmount = data.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const groupName = data[0]?.group?.name || 'Unknown Group';

  return (
    <ExpenseContainer>
      <ExpenseHeader 
        groupName={groupName}
        totalExpenses={totalExpenses}
        totalAmount={totalAmount}
        groupId={groupId}
      />
      
      <ExpenseGrid expenses={data} groupId={groupId} />
      
    
      
      <FloatingActionButton groupId={groupId} />
    </ExpenseContainer>
  );
};

export default ExpensesPage;