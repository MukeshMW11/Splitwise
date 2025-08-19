import { Delete } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { axiosInstance } from "@/lib/axios/axios.utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const DeleteExpenseButton = ({ expenseId, groupId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.delete(`/expense/${expenseId}/`, {
        params: { group_id: groupId },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("The expense was successfully deleted.");
      queryClient.invalidateQueries({ queryKey: ["expense", groupId] });
    },
    onError: () => {
      toast.error(`There was an error deleting the expense`);
    },
  });

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button>
            <Delete className="w-3 h-3" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Expense</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the expense?
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => mutation.mutate()}>Confirm</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteExpenseButton;
