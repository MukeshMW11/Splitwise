import Image from "next/image";
import { Users } from "lucide-react";
import { GroupCardProps } from "@/types/group.types";
import EditGroupButton from "./EditGroupBtn";
import { LeaveGroupButton } from "../expense/LeaveGrouBtn";

export const GroupCard = ({
  group,
  index,
  onGroupClick,
  id,
}: GroupCardProps) => {
  
 

  return (
    <div
      className="group bg-white rounded-2xl shadow-xl border hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => onGroupClick(group.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onGroupClick(group.id);
        }
      }}
      tabIndex={0}
      role="button"
    >
      <div className="relative p-6 sm:p-8">
        {/* Hover highlight strip */}
        <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-blue-400 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>

        <div className="flex items-center gap-4">
          {/* Group image */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all group-hover:scale-110">
              <Image
                src={
                  group.img ||
                  "https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_1280.png"
                }
                alt={`${group.name} logo`}
                className="w-full h-full object-cover"
                width={64}
                height={64}
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors truncate">
              {group.name}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {group.description || "No description available."}
            </p>
          </div>

          {/* Action buttons — hidden until hover */}
          <div
            className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              <EditGroupButton title={"Edit"} groupId={id} />
            </div>

            <div
              className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              <EditGroupButton title={"Delete"} groupId={id} />
            </div>

            <div
              className="px-2 py-2 h-2 w-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <LeaveGroupButton 
                groupId={id}
                groupName={group.name}
                
              />
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Users className="w-3 h-3" />
              <span>Active Group</span>
            </div>
            <div className="text-xs text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              View Expenses →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
