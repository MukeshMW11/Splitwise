'use client'
import AuthForm from '@/components/forms/AuthForm'
import { signUpFormFields } from '@/config/formDataConfig'
import { axiosInstance } from '@/lib/axios/axios.utils';
import { signupFormSchema, signupFormType } from '@/schema/formSchema'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
const Register = () => {
    const router = useRouter();

 const onRegisterSubmit = async (data: signupFormType) => {
      try {
        const res = await axiosInstance.post(`/user/register/`, data);
    toast.success('User Registered successfully.')
router.push('/auth/login/')
      } catch (err) {
        console.error("Server registration error:", err);
        if (axios.isAxiosError(err)) {
    toast.error(err.response?.data?.message || "Registration Failed")

          return {
            success: false,
            error: err.response?.data?.message || "Registration failed",
          };
        }
        return { success: false, error: "Unexpected error" };
      }
    };
  return (
    <div>
       <AuthForm title="Sign Up" FormSchema={signupFormSchema} FormFields={signUpFormFields}    buttonText='Sign Up' onSubmit={onRegisterSubmit}/>
    </div>
  )
}

export default Register
