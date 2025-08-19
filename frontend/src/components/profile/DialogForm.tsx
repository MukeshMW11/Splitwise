'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { DeleteIcon, Edit3 } from "lucide-react";
import AuthForm from "../forms/AuthForm";
import { updateUpFormFields } from "@/config/formDataConfig";
import { onDeleteProfile } from "@/lib/handlers/formHandler";
import { editProfileSchema, editProfileType } from "@/schema/formSchema";
import { axiosInstance } from "@/lib/axios/axios.utils";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
const DialogForm = ({trigger,title,description,profile}) => {
  const router =useRouter()

 const onUpdateProfile = async (data: editProfileType) => {

  try {
    const {id} = profile
    console.log(id)
     const payload = { ...data,
      phone_number:data.phone
      };
    if (!payload.password) delete payload.password;
    if (!payload.confirmPassword) delete payload.confirmPassword;
    const res = await axiosInstance.patch(
      `/user/${id}/`,
      payload
    );
    console.log(res);
    toast.success('Profile Updated successfully.')
    router.push('/dashboard/profile/')
  } catch (err) {
        toast.error('Profile Updated failed.')
    console.error("Server login error:", err);
    if (axios.isAxiosError(err)) {
      toast.error(err.response?.data?.message || "Login failed")
      return {
        success: false,
        error: err.response?.data?.message || "Login failed",
      };
    }
    return { success: false, error: "Unexpected error" };
  }
};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={`${trigger ==='Delete' ? "bg-red-600 hover:bg-red-400":"bg-blue-600 hover:bg-blue-400"}`}>
          <p>{trigger}</p>
          {trigger === 'Delete' ?<DeleteIcon /> :<Edit3/>}
        </Button>
      </DialogTrigger>
      <DialogContent  className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
         <DialogFooter >
          {
            trigger === 'Delete' ?

            <Button type="submit" onClick={()=>profile?.id && onDeleteProfile(profile.id)}>Confirm</Button>
            :
            <AuthForm title="Edit" FormSchema={editProfileSchema} FormFields={updateUpFormFields}    buttonText='Sign Up' onSubmit={onUpdateProfile} profile={profile}/>
          }
    </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;