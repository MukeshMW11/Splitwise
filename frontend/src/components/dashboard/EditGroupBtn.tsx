import { Delete, Edit3 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GroupForm from "../forms/GroupForm";
import { Button } from "../ui/button";
import { axiosInstance } from "@/lib/axios/axios.utils";
import { toast } from "sonner";

type EditGroupButtonProps = {
  groupId: string;
  title: string;
};

const EditGroupButton = ({ groupId, title }: EditGroupButtonProps) => {
  const handelDelete = async () => {
    try {
      const res = await axiosInstance.delete(`group/${groupId}/`);
      toast.success("The group was successfully deleted.");
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
            {title === "Edit" ? (
              <Edit3 className="w-2 h-2" />
            ) : (
              <Delete className="w-3 h-3" />
            )}
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {title === "Delete" ? "Delete Group" : "Edit Group"}
            </DialogTitle>
            <DialogDescription>
              {title === "Delete"
                ? "Are you sure you want to delete the group ?"
                : "Fill the details to edit the group"}
            </DialogDescription>
          </DialogHeader>
          {title === "Edit" ? (
            <GroupForm groupId={groupId} />
          ) : (
            <Button onClick={handelDelete}>Confirm</Button>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default EditGroupButton;
