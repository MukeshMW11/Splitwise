import * as z from 'zod'


export const signupFormSchema = z.object({

    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email" }).min(1, { message: "Email is required" }),
    password: z.string().min(8, { message: "Password must be atleast of 8 characters" }).optional(),
    confirmPassword: z.string().min(8, { message: "Password must be at least of 8 characters" }).optional(),
    phone: z.string().optional(),
    image: z.instanceof(File, { message: "Image must be a file" }).refine((file) => file == null || ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type), {
        message: "Image must be a jpeg or png"
    }).refine((file) => file == null || file.size <= 2 * 1024 * 1024, {
        message: "File size should be less than 2MB"
    }).optional().nullable()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
})

export const editProfileSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }).min(1, { message: "Email is required" }),
  password: z
    .union([
      z.string().min(8, { message: "Password must be at least 8 characters" }),
      z.literal("") 
    ])
    .optional(),
  confirmPassword: z
    .union([
      z.string().min(8, { message: "Password must be at least 8 characters" }),
      z.literal("")
    ])
    .optional(),
  phone: z.string().optional(),
  image: z.any().optional().nullable(), 
}).refine(
  (data) => {
    if (!data.password && !data.confirmPassword) return true; 
    return data.password === data.confirmPassword;
  },
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
);



export const loginFormSchema = z.object({


    email: z.email({ message: "Invalid Email" }).min(1, { message: "Email is required" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),

})



export type loginFormType = z.infer<typeof loginFormSchema>
export type editProfileType = z.infer<typeof editProfileSchema>
export type signupFormType = z.infer<typeof signupFormSchema>