"use server";

import { z } from "zod";

export async function validateContactForm(prevState: unknown, data: FormData) {
  const schema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    message: z.string().min(10).max(500),
  });

  const result = schema.safeParse({
    name: data.get("name"),
    email: data.get("email"),
    message: data.get("message"),
  });

  if (!result.success) {
    return {
      status: 400,
      data: {
        message: "Invalid form data",
        errors: result.error.errors,
      },
    };
  }

  return {
    status: 200,
    data: {
      message: "Message sent!",
    },
  };
}
