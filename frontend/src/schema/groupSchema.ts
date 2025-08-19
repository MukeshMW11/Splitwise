import z from "zod";

export const createGroupSchema = z.object({
name:z.string().min(1,{ message: "Name is required" }),
description:z.string().min(1,{message:"Description is requried"}),
members:z.array(z.string()).min(1,{message:"Add at least one member"})
})




export type createGroupType = z.infer<typeof createGroupSchema>