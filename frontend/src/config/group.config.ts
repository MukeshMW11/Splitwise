import { CreateGroupType } from "@/types/group.types";


export const  createGroupConfig:CreateGroupType[] =[
{name:"name", type:"text",label:"Name",placeholder:'Enter the group name'},
{name:"description", type:"text",label:"Description",placeholder:'Enter the group deswcription'},
{name:"members",type:"multiselect",label:"Members",placeholder:"Add members"}

]




