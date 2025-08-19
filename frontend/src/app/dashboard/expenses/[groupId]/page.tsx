import ExpensesPage from '@/components/expense/Expense'
import { PageProps } from '@/types/expnseType'
import React from 'react'

const page = async ({params}:PageProps) => {
  const {groupId} =await params;
  return (
  <ExpensesPage groupId={groupId}/>
  )
}

export default page
