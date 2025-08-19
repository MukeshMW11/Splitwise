"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, DollarSign, Receipt, Calendar, ArrowRight, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExpenseDialog from "./ExpenseDialog";
import DeleteExpenseButton from "./DeleteExpense";

interface ExpenseCardProps {
  expense: any;
  index: number;
  groupId: string;
}

const ExpenseCard = ({ expense, index, groupId }: ExpenseCardProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditDialogOpen(true);
  };

  return (
    <div className="relative">
      <div
        className="group bg-white rounded-2xl shadow-xl border border-emerald-100/50 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] animate-slideUp min-h-[280px] flex flex-col"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="relative p-6 sm:p-8 flex flex-col justify-between h-full">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Receipt className="w-7 h-7 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-700 truncate">
                {expense.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {expense.description || "No description provided."}
              </p>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 flex items-center justify-center rounded-xl hover:bg-blue-100 hover:text-blue-600 transition-all duration-300"
                onClick={handleEditClick}
                type="button"
              >
                <Edit className="w-4 h-4" />
              </Button>

              <DeleteExpenseButton expenseId={expense.id} grouId={groupId} />

              <Link href={`/dashboard/debt/${expense.id}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 flex items-center justify-center rounded-xl hover:bg-emerald-100 hover:text-emerald-600 transition-all duration-300"
                  type="button"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="mb-4">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2 rounded-xl">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <span className="text-2xl font-bold text-emerald-700">
                ${Number(expense.amount).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="space-y-3 mt-auto">
            {expense.expensepayer?.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-3 h-3 text-blue-600" />
                </div>
                <span className="font-medium">Paid by:</span>
                <div className="flex flex-wrap gap-1">
                  {expense.expensepayer.map((payer: any, payerIndex: number) => (
                    <span
                      key={payerIndex}
                      className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg truncate"
                    >
                      {payer.user.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-500 truncate">
                <Calendar className="w-3 h-3" />
                <span>Group: {expense.group.name}</span>
              </div>
              <div className="text-xs text-emerald-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Details →
              </div>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/0 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div>

      <ExpenseDialog
        expenseId={expense.id}
        groupId={groupId}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </div>
  );
};

export default ExpenseCard;
