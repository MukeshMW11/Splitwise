"use client";
import { getGroups } from "@/lib/handlers/groupHanlders";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LoadingState } from "./Loading";
import { ErrorState } from "./Error";
import { EmptyState } from "./Empty";
import { GroupHeader } from "./GroupHeader";
import { GroupCard } from "./GroupCard";
import { GroupStats } from "./GroupStats";
import { AddGroupButton } from "./AddGroupBtn";
import { GroupType } from "@/types/group.types";

const Group = () => {
  const router = useRouter();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
    staleTime: 5 * 1000 * 60,
  });

  const handleGroupClick = (groupId: string) => {
    router.push(`/dashboard/expenses/${groupId}`);
  };

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;
  if (!data || data.length === 0) return <EmptyState />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        <GroupHeader totalGroups={data.length} />

        <div className="grid gap-6 lg:grid-cols-2">
          {data.map((group: GroupType, index: number) => (
            <GroupCard
              key={group.id}
              group={group}
              index={index}
              onGroupClick={handleGroupClick}
              id={group.id}
            />
          ))}
        </div>

        {data.length > 4 && <GroupStats totalGroups={data.length} />}
      </div>

      <AddGroupButton />
    </div>
  );
};

export default Group;
