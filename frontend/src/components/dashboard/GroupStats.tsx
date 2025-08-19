interface GroupStatsProps {
  totalGroups: number;
}

export const GroupStats = ({ totalGroups }: GroupStatsProps) => (
  <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
    <div className="text-center">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Groups Overview
      </h3>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{totalGroups}</div>
          <div className="text-sm text-gray-500">Active Groups</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">100%</div>
          <div className="text-sm text-gray-500">Tracking Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-indigo-600">∞</div>
          <div className="text-sm text-gray-500">Possibilities</div>
        </div>
      </div>
    </div>
  </div>
);
