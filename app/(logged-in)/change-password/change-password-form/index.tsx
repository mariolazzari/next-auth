"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { changePassword } from "./actions";
import { changePasswordFormSchema, ChangePasswordFormType } from "./schemas";
import { toast } from "sonner";

function ChangePasswordForm() {
  const form = useForm({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (data: ChangePasswordFormType) => {
    const res = await changePassword(data);
    if (res?.error) {
      form.setError("root", { message: res.message });
      return;
    }

    toast.success(res.message);
    form.reset();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset
          disabled={form.formState.isSubmitting}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Current Password"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="New Password"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Confirm</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Password Confirm"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!!form.formState.errors.root && (
            <FormMessage>{form.formState.errors.root?.message}</FormMessage>
          )}
          <Button type="submit">Change Password</Button>
        </fieldset>
      </form>
    </Form>
  );
}

export default ChangePasswordForm;
