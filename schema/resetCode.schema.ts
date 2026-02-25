import { z } from "zod";

export const resetCodeSchema = z
  .object({
    resetCode: z
      .string()
      .nonempty("*reset code is required")
  })

  export type resetCodeType = z.infer <typeof resetCodeSchema>