"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { forgotPasswordSchema, forgotPasswordType } from "@/schema/forgotPassword.schema";

export default function page() {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const forgotPassword: SubmitHandler<forgotPasswordType> = async (
    values: forgotPasswordType,
  ) => {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      toast.success(data.message);
      setTimeout(() => {
        router.push("/verifyResetCode");
      }, 2000);
      console.log(data);
    } catch (error:any) {
      console.log(error.response);
      toast.error(error.response.data.message) 
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center mb-8 sm:px-6 lg:px-8 pt-6">
      <div className="container mx-auto flex flex-col items-center justify-center gap-8">
        <div className="w-full lg:w-[520px] px-4">
          <div className="bg-white py-12 px-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-indigo-600 mb-2">
                FreshCart
              </h1>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Find Your Account
              </h3>
              <p className="text-slate-500 text-lg">
                Enter your email address.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(forgotPassword)}>
              {/* Email Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-slate-900 font-semibold text-sm"
                >
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="h-12 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all"
                    {...register("email")}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <i className="fa-solid fa-envelope text-sm"></i>
                  </span>
                </div>
                {formState.errors.email && (
                  <p className="text-red-500 text-sm font-medium">
                    {formState.errors.email.message}
                  </p>
                )}
              </div>

             
              {/* Submit Button */}
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-14 rounded-lg font-bold shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] mt-6 text-base">
                {formState.isSubmitting ? (
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                ) : (
                    'Continue'
                )}{" "}
                
              </Button>
            </form>

            
          </div>
        </div>
      </div>
    </div>
  );
}
