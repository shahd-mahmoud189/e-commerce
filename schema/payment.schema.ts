import z from "zod";

export const paymentSchema = z.object({
  details: z
    .string()
    .nonempty("*address is required")
    .min(10, "minimum address length is 10 characters")
    .max(100, "maximum address length is 100 characters"),
  phone: z
    .string()
    .nonempty("*phone is required")
    .regex(/^01[0125][0-9]{8}$/, "only egyptian number is allowed"),
  city: z
    .string()
    .nonempty("*city is required")
    .min(2, "minimum city length is 10 characters")
    .max(10, "maximum city length is 100 characters")
});

export type paymentForm = z.infer <typeof paymentSchema>