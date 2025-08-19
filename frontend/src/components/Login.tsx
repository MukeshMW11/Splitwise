
import { loginFormSchema, loginFormType } from "@/schema/formSchema";
import { loginFormFields } from "@/config/formDataConfig";
import { axiosInstance } from "@/lib/axios/axios.utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AuthForm from "./forms/AuthForm";

const Login = () => {
  const router = useRouter();
  const onLoginSubmit = async (data: loginFormType) => {
    try {
      const res = await axiosInstance.post(`/user/login/`, data);
      console.log(res);
      toast.success("Login successfull");
      router.push("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Login failed");
      }
      toast.error("Unexpected error");
    }
  };

  return (
    <div>
      <AuthForm
        title="Log In"
        FormSchema={loginFormSchema}
        FormFields={loginFormFields}
        buttonText="Log In"
        onSubmit={onLoginSubmit}
      />
    </div>
  );
};

export default Login;
