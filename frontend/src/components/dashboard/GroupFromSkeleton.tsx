import { useEffect } from "react";
import Select from "react-select";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { GroupSkeletonFormType } from "@/types/group.types";

const GroupFormSkeleton = ({
  formSchema,
  configFields,
  onSubmit,
  members = [],
  defaultValues = {},
}: GroupSkeletonFormType & {
  members: { id: string; name: string }[];
  defaultValues?: Record<string, any>;
}) => {
  type formType = z.infer<typeof formSchema>;

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

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
                  {field.type === "multiselect" ? (
                    <Select
                      isMulti
                      options={members.map((m) => ({
                        value: m.id,
                        label: m.name,
                      }))}
                      value={members
                        .filter((m) => rhfField.value?.includes(m.id))
                        .map((m) => ({ value: m.id, label: m.name }))}
                      onChange={(selectedOptions) =>
                        rhfField.onChange(
                          selectedOptions?.map((option) => option.value) ?? []
                        )
                      }
                      className="react-select-container"
                      classNamePrefix="react-select"
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
  );
};

export default GroupFormSkeleton;
