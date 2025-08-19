import { DollarSign, Users, CheckCircle, Clock } from "lucide-react";

interface ExpenseHeaderProps {
  title: string;
  totalAmount: number;
  participantCount: number;
  settledCount: number;
  pendingCount: number;
}

const ExpenseHeader: React.FC<ExpenseHeaderProps> = ({
  title,
  totalAmount,
  participantCount,
  settledCount,
  pendingCount,
}) => (
  <div className="bg-white rounded-3xl shadow-xl border border-white/20 backdrop-blur-sm p-6 sm:p-8 animate-slideUp">
    <div className="text-center space-y-4">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
        {title}
      </h1>
      <div className="flex flex-wrap justify-center gap-6 text-sm sm:text-base">
        <div className="flex items-center gap-2 text-gray-600">
          <DollarSign className="w-5 h-5 text-green-600" />
          <span className="font-semibold">
            Total: ${totalAmount.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-5 h-5 text-blue-600" />
          <span className="font-semibold">{participantCount} Participants</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span className="font-semibold">{settledCount} Settled</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-5 h-5 text-amber-600" />
          <span className="font-semibold">{pendingCount} Pending</span>
        </div>
      </div>
    </div>
  </div>
);

export default ExpenseHeader;
