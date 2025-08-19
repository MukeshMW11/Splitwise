import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GroupForm from "../forms/GroupForm";
import { createGroupSchema } from "@/schema/groupSchema";
import { createGroupConfig } from "@/config/group.config";

export const AddGroupButton = () => (
  <div className="fixed bottom-6 right-6 z-50">
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="w-14 h-14 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transition-transform duration-200 hover:scale-110"
        >
          <Plus className="w-7 h-7" />
          
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle >
            Create Group
          </DialogTitle>
          <DialogDescription>
            Fill in the details to create the group.
          </DialogDescription>
        </DialogHeader>
<GroupForm formSchema={createGroupSchema}   configFields={createGroupConfig} />

      </DialogContent>
    </Dialog>
  </div>
);
