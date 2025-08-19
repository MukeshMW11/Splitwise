import { Users } from "lucide-react";

interface User {
  id: string;
  name: string;
}

interface Participant {
  user: User;
}

interface ParticipantsListProps {
  participants: Participant[];
  amountPerParticipant: string;
}

const ParticipantsList: React.FC<ParticipantsListProps> = ({
  participants,
  amountPerParticipant,
}) => (
  <div
    className="bg-white rounded-2xl shadow-xl border border-blue-100/50 p-6 sm:p-8 animate-slideUp"
    style={{ animationDelay: "0.1s" }}
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
        <Users className="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Participants
        </h2>
        <p className="text-gray-500">{participants.length} people involved</p>
      </div>
    </div>
    <div className="space-y-3">
      {participants.map(({ user }, index) => (
        <div
          key={user.id}
          className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
          style={{ animationDelay: `${0.1 + index * 0.05}s` }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="font-semibold text-gray-900">{user.name}</span>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-indigo-600">
              ${amountPerParticipant}
            </span>
            <p className="text-xs text-gray-500">share</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ParticipantsList;
