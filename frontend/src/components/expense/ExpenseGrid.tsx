import ExpenseCard from "./ExpenseCard";

const ExpenseGrid = ({ expenses, groupId }) => (
  <div className="grid gap-6 lg:grid-cols-2">
    {expenses.map((expense, index) => (
      <ExpenseCard 
        key={expense.id} 
        expense={expense} 
        index={index} 
        groupId={groupId}
      />
    ))}
  </div>
);

export default ExpenseGrid;