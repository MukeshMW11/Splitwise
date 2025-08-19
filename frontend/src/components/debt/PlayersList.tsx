import { DollarSign } from "lucide-react";

interface User {
  id: string;
  name: string;
}

interface Payer {
  user: User;
  paid_amount: string | number;
}

interface PayersListProps {
  payers: Payer[];
}

const PayersList: React.FC<PayersListProps> = ({ payers }) => (
  <div
    className="bg-white rounded-2xl shadow-xl border border-green-100/50 p-6 sm:p-8 animate-slideUp"
    style={{ animationDelay: "0.2s" }}
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
        <DollarSign className="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Payment Details
        </h2>
        <p className="text-gray-500">Who paid the bill</p>
      </div>
    </div>
    <div className="space-y-3">
      {payers.map(({ user, paid_amount }, index) => (
        <div
          key={user.id}
          className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
          style={{ animationDelay: `${0.2 + index * 0.05}s` }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="font-semibold text-gray-900">{user.name}</span>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-green-600">
              ${Number(paid_amount).toFixed(2)}
            </span>
            <p className="text-xs text-gray-500">paid</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PayersList;
