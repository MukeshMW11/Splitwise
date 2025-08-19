
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ExpenseForm from "./ExpenseForm";

interface ExpenseDialogProps {
  children?: React.ReactNode;
  expenseId?: string | null;
  groupId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ExpenseDialog = ({ 
  children, 
  expenseId = null, 
  groupId, 
  isOpen, 
  onOpenChange 
}: ExpenseDialogProps) => {
  const handleSuccess = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {children && (
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
      )}
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {expenseId ? "Edit Expense" : "Create New Expense"}
          </DialogTitle>
          <DialogDescription>
            {expenseId 
              ? "Update the expense details and split information." 
              : "Add a new expense and specify how it should be split among group members."
            }
          </DialogDescription>
        </DialogHeader>
        <ExpenseForm 
          expenseId={expenseId}
          groupId={groupId}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseDialog;