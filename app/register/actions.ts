"use server";
import { formSchema, FormSchema } from "./schemas";

export const registerUser = async ({
  email,
  password,
  passwordConfirm,
}: FormSchema) => {
  const newUserValidation = formSchema.safeParse({
    email,
    password,
    passwordConfirm,
  });

  if (!newUserValidation.success) {
    return {
      error: true,
      message: newUserValidation.error.issues?.[0]?.message || "Invalid data",
    };
  }

  console.log(newUserValidation);
};
