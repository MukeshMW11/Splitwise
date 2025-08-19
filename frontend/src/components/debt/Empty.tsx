import { Users } from "lucide-react";

const EmptyState = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-center h-96">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-md w-full animate-slideUp">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No Debts Found</h3>
            <p className="text-gray-600">
              There are no debts recorded for this expense yet.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default EmptyState;
