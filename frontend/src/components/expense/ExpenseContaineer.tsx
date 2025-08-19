const ExpenseContainer = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {children}
    </div>
    <style jsx>{`
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-slideUp {
        animation: slideUp 0.6s ease-out both;
      }
    `}</style>
  </div>
);

export default ExpenseContainer;