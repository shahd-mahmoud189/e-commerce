import { z } from "zod";

export const forgotPasswordSchema = z
  .object({
    email: z
      .string()
      .nonempty("*email is required")
      .pipe(z.email("invalid email address")),
  })

  export type forgotPasswordType = z.infer <typeof forgotPasswordSchema>