import { Receipt } from "lucide-react";
import FloatingActionButton from "./FloatingActionButton";

const EmptyState = ({groupId}) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-center h-96">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-md w-full animate-slideUp">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <Receipt className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No Expenses Yet</h3>
            <p className="text-gray-600">Start by adding your first group expense!</p>
          </div>
        </div>
      </div>
      <FloatingActionButton groupId={groupId}/>
    </div>
  </div>
);

export default EmptyState;