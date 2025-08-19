"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { axiosInstance } from "@/lib/axios/axios.utils";
import axios from "axios";

interface LeaveGroupButtonProps {
  groupId: string;
  groupName: string;
}

export function LeaveGroupButton({
  groupId,
  groupName,
}: LeaveGroupButtonProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  const handleLeaveGroup = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(`/group/${groupId}/leave/`);

      console.log(`Successfully left group: ${groupId}`, response.data);
      setOpen(false);
    } catch (err: any) {
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (axios.isAxiosError(err)) {
        if (err.response) {
          errorMessage =
            err.response.data?.error ||
            err.response.data?.detail ||
            `Failed to leave group (Status ${err.response.status})`;
        } else if (err.request) {
          errorMessage =
            "No response from server. Please check your connection.";
        } else if (err.message) {
          errorMessage = err.message;
        }
      }

      console.error("Failed to leave group:", errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 flex items-center justify-center rounded-xl hover:bg-red-100 hover:text-red-600 transition-all duration-300"
          type="button"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Leave Group</DialogTitle>
          <DialogDescription>
            Are you sure you want to leave "{groupName}"? You will no longer
            have access to this group's expenses and will need to be re-invited
            to rejoin.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="text-red-600 mb-2 text-sm font-medium">{error}</div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleLeaveGroup}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoading ? "Leaving..." : "Leave Group"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
