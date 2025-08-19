'use client'
import * as z from 'zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { SkeletonFormSchema } from '@/types/formType'

const FormSkeleton = ({ formSchema, configFields, onSubmit, data }: SkeletonFormSchema) => {
  type formType = z.infer<typeof formSchema>


  const defaultValues = (configFields ?? []).reduce((acc, field) => {
    acc[field.name] = field.type === "file" ? undefined : ""
    return acc
  }, {} as Record<string, any>)

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  useEffect(() => {
    if (data) {
      const filledValues = { ...defaultValues }
      Object.keys(filledValues).forEach((key) => {
        if (data[key] !== undefined) {
          filledValues[key] = data[key]
        }
      })
      form.reset(filledValues) 
    }
  }, [data, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {configFields?.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name as keyof formType}
            render={({ field: rhfField }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-sm font-medium text-gray-700">
                  {field.label}
                </FormLabel>
                <FormControl>
                  {field.type === 'file' ? (
                    <Input
                      type="file"
                      className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => {
                        form.setValue(
                          field.name as keyof formType,
                          e.target.files?.[0]
                        )
                      }}
                    />
                  ) : (
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full rounded-md border border-gray-300 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm"
                      {...rhfField}
                    />
                  )}
                </FormControl>
                <FormMessage className="text-xs text-red-600" />
              </FormItem>
            )}
          />
        ))}

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-all duration-200 shadow-sm"
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default FormSkeleton
