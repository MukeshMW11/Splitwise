'use client'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AuthProps } from "@/types/formType"
import Link from "next/link"
import FormSkeleton from "../ui/FormSkeleton"

const AuthForm = ({title,FormSchema,FormFields,onSubmit,profile}:AuthProps) => {
  return (
    <Card className="mx-auto mt-8 max-w-md rounded-lg shadow-md bg-white">
      <CardHeader className="border-b py-3">
        <CardTitle className="text-xl font-semibold text-center text-gray-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="py-4">
        <FormSkeleton formSchema= {FormSchema} configFields={FormFields} onSubmit={onSubmit} data={profile} />
      </CardContent>
      {title !="Edit" &&

        <CardFooter className="justify-center py-3">
        {title === 'Log In'?
    <p>Not Registered yet ? Click here to<Link href="/auth/register" className="text-green-600" > Register</Link></p>
    
    :        
    <p>Already Registered? Click here to<Link href="/auth/login" className="text-blue-600"> Login</Link></p>

      }
      </CardFooter>
  }
    </Card>
  )
}

export default AuthForm