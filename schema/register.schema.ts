import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("*name is required")
      .min(2, "name must be at least 2 characters")
      .max(15, "name must be at most 15 characters"),
    email: z
      .string()
      .nonempty("*email is required")
      .pipe(z.email("invalid email address")),
    password: z
      .string()
      .nonempty("*password is required")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        `Password minimum length 8 characters, at least one letter, one number and one special character.`,
      ),
    rePassword: z.string().nonempty("*confirm password is required"),
    phone: z
      .string()
      .nonempty("*phone is required")
      .regex(/^01[0125][0-9]{8}$/, "only egyptian number is allowed"),
    terms: z.boolean().refine((data) => data === true, {
      error: "*you must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "confirm password not matched with password",
    path: ["rePassword"],
  });
