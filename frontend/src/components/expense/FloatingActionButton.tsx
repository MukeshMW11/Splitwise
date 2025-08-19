
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import ExpenseDialog from "./ExpenseDialog";

const FloatingActionButton = ({ groupId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClick = () => {
    console.log('FAB clicked, opening dialog...'); // Debug log
    setIsDialogOpen(true);
  };

  return (
    <>
      <button
        type="button"
        aria-label="Add expense"
        onClick={handleClick}
        className="fixed bottom-8 right-8 group/fab w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-2xl hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-all duration-300 transform hover:scale-110 active:scale-95 animate-bounce z-50"
        style={{ animationDelay: '1s', animationDuration: '2s', animationIterationCount: '3' }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <Plus className="w-7 h-7 group-hover/fab:rotate-180 transition-transform duration-300" />
          <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover/fab:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="absolute inset-0 rounded-2xl bg-emerald-400 opacity-0 group-hover/fab:opacity-20 group-hover/fab:scale-150 transition-all duration-300"></div>
      </button>

      <ExpenseDialog
        groupId={groupId}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
};

export default FloatingActionButton;