import { loginFormSchema, loginFormType, signupFormSchema, signupFormType } from "@/schema/formSchema"

export interface AuthProps{
title:string,
FormSchema:typeof  signupFormSchema | typeof loginFormSchema,
FormFields:SignUpConfigType[] ,
buttonText:string,
onSubmit: (data:(loginFormType | signupFormType)) => void,
profile:object


}

export interface RefreshTokenResponse {
  access: string;
}

export interface SignUpConfigType {
    name:string,
    type:string,
    label:string,
    placeholder?:string,

}


export interface SkeletonFormSchema{
    formSchema:typeof signupFormSchema | typeof loginFormSchema,
    configFields:SignUpConfigType[],
    onSubmit:(data:(loginFormType | signupFormType)) => void,
    data?:object
}