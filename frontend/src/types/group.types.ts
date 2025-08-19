import { createGroupSchema, createGroupType } from "@/schema/groupSchema";

export interface GroupType {
  id: string;
  name: string;
  description?: string;
  img?: string;
}

export interface GroupCardProps {
  group: GroupType;
  index: number;
  onGroupClick: (groupId: string) => void;
  id:string
}

export interface CreateGroupType {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
}





export interface GroupSkeletonFormType{
  formSchema:typeof createGroupSchema,
  configFields:CreateGroupType[],
  onSubmit:(data:createGroupType)=>void
}