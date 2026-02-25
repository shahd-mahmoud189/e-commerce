import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    
    email: z
      .string()
      .nonempty("*email is required")
      .pipe(z.email("invalid email address")),
    newPassword: z
      .string()
      .nonempty("*new password is required"),
  })

  export type resetPasswordType = z.infer <typeof resetPasswordSchema>