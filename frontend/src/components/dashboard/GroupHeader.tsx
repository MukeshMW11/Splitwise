import { Users, Calendar } from "lucide-react";

interface GroupHeaderProps {
  totalGroups: number;
}

export const GroupHeader = ({ totalGroups }: GroupHeaderProps) => (
  <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
    <div className="text-center space-y-4">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        My Groups
      </h1>
      <div className="flex flex-wrap justify-center gap-6 text-sm sm:text-base">
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-5 h-5 text-blue-600" />
          <span className="font-semibold">{totalGroups} Groups</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-5 h-5 text-indigo-600" />
          <span className="font-semibold">Active Tracking</span>
        </div>
      </div>
    </div>
  </div>
);
