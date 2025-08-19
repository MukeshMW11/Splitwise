import { createGroupSchema } from "@/schema/groupSchema";
import GroupFormSkeleton from "../dashboard/GroupFromSkeleton";
import { createGroupConfig } from "@/config/group.config";
import { createGroup, editGroup, getGroupById } from "@/lib/handlers/groupHanlders";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "@/lib/handlers/userHandler";
import { toast } from "sonner";

const GroupForm = ({ groupId }: { groupId?: string }) => {
  const queryClient = useQueryClient();

  const { data: users, isError: userError, isLoading: userLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });

  const {
    data: groupData,
    isLoading: groupLoading,
    isError: groupError,
  } = useQuery({
    queryKey: ["group", groupId],
    queryFn: () => getGroupById(groupId!),
    enabled: !!groupId,
  });

  const mutation = useMutation({
    mutationFn: (formData: any) =>
      groupId ? editGroup(groupId, formData) : createGroup(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      toast.success(groupId ? "Group updated successfully." : "Group created successfully.");
    },
    onError: () => {
      toast.error(groupId ? "There was an error updating the group." : "There was an error creating the group.");
    },
  });

  if (userLoading || (groupId && groupLoading)) {
    return <p className="text-sm text-gray-500">Loading members...</p>;
  }

  if (userError) {
    return <p className="text-sm text-red-500">Failed to load members.</p>;
  }
  if (groupError) {
    return <p className="text-sm text-red-500">Failed to load group data.</p>;
  }

  const membersList =
    users?.map((user: any) => ({
      id: String(user.id),
      name: user.name,
    })) ?? [];

  const initialMemberIds = groupData?.membership
    ? groupData.membership.map((m: any) => String(m.user.id))
    : [];

  const handleSubmit = (formData: any) => {
    if (!groupData) {
      mutation.mutate(formData);
    } else {
      const newMembers = formData.members.filter(
        (id: string) => !initialMemberIds.includes(id)
      );
      mutation.mutate({ ...formData, members: newMembers });
    }
  };

  return (
    <GroupFormSkeleton
      formSchema={createGroupSchema}
      configFields={createGroupConfig}
      onSubmit={handleSubmit}
      members={membersList}
      defaultValues={{
        name: groupData?.name || "",
        description: groupData?.description || "",
        members: initialMemberIds,
      }}
    />
  );
};

export default GroupForm;
