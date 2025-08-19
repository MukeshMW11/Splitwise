const SummaryCard = ({ totalExpenses, totalAmount, dataLength }) => {
  if (dataLength <= 3) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 animate-slideUp" style={{ animationDelay: `${dataLength * 0.1}s` }}>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Expense Summary</h3>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">{totalExpenses}</div>
            <div className="text-sm text-gray-500">Total Expenses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">${totalAmount.toFixed(2)}</div>
            <div className="text-sm text-gray-500">Total Amount</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">${(totalAmount / totalExpenses).toFixed(2)}</div>
            <div className="text-sm text-gray-500">Average per Expense</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;