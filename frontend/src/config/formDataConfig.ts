import { SignUpConfigType } from "@/types/formType";

export const signUpFormFields:SignUpConfigType[] =[

{name:'name',type:'text',label:'Name',placeholder:'Enter our name'},
{name:'email',type:'email',label:'Email',placeholder:'Enter your email'},
{name:'password',type:'password',label:'Password',placeholder:'Enter you password'},
{name:'confirmPassword',type:'password',label:'Confirm Password',placeholder:'Confirm the password'},
// {name:'phone',type:'tel',label:'Phone',placeholder:'Enter you phone number'},
// {name:'image',type:'file',label:'Image'},

]
export const updateUpFormFields:SignUpConfigType[] =[

{name:'name',type:'text',label:'Name',placeholder:'Enter our name'},
{name:'email',type:'email',label:'Email',placeholder:'Enter your email'},
{name:'password',type:'password',label:'Password',placeholder:'Enter you password'},
{name:'confirmPassword',type:'password',label:'Confirm Password',placeholder:'Confirm the password'},
{name:'phone',type:'tel',label:'Phone',placeholder:'Enter you phone number'},
{name:'image',type:'file',label:'Image'},

]


export const loginFormFields:SignUpConfigType[] =[

{name:'email',type:'email',label:'Email',placeholder:'Enter your email'},
{name:'password',type:'password',label:'Password',placeholder:'Enter you password'},

]


