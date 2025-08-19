"sue client";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { axiosInstance } from "@/lib/axios/axios.utils";
import { toast } from "sonner";
import { Button } from "../ui/button";

export const DeleteGroupButton = ({ groupId }: { groupId: string }) => {
  const handelDelete = async () => {
    try {
      const res = await axiosInstance.delete(`/group/${groupId}`);
      toast.success("Group Successfully Deleted");
      console.log(res);
    } catch (err) {
      toast.error("There was an error deleting the group.");
      console.log(err);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button>
            <Plus />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Group</DialogTitle>
            <DialogDescription>
              Fill in the details to create the group.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={handelDelete}>Confirm</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
