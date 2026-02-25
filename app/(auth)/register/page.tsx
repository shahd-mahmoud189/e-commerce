"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../../schema/register.schema";
import { registerForm } from "../../../types/registerForm.type";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  async function createAcc (
    values: registerForm,
  )  {
    try {
      const { terms, ...body } = values;
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: body,
      };
      const { data } = await axios.request(options);
      toast.success(data.message === 'success' && 'Account is created successfully');
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      console.log(data);
    } catch (error:any) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message)
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col items-center justify-center gap-8">
        {/* Header */}

        <div className="w-full lg:w-[520px] px-4">
          <div className="bg-white py-12 px-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-center mb-8">
              <div className="text-center mb-4 border-b pb-6 border-slate-200">
                <h1 className="text-4xl font-bold text-indigo-600 mb-2">
                  FreshCart
                </h1>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Welcome!
                </h3>
                <p className="text-slate-500 text-lg">
                  Join our community and start shopping
                </p>
              </div>

              <h2 className="text-[20px] font-bold text-slate-900">
                <i className="mr-2 bg-white text-indigo-600  fa-solid fa-user-plus"></i>
                Create Account
              </h2>
              <p className="text-slate-500 text-sm mt-2">
                Fill in the details below to get started
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(createAcc)}>
              {/* Name Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-slate-900 font-semibold text-sm"
                >
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Shahd Mahmoud"
                  className="h-12 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all"
                  {...register("name")}
                />
                {formState.errors.name && (
                  <p className="text-red-500 text-sm font-medium">
                    {formState.errors.name.message}
                  </p>
                )}
              </div>

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

              {/* Phone Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-slate-900 font-semibold text-sm"
                >
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <i className="fa-solid fa-phone text-sm"></i>
                  </span>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="h-12 pl-11 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all"
                    {...register("phone")}
                  />
                </div>
                {formState.errors.phone && (
                  <p className="text-red-500 text-sm font-medium">
                    {formState.errors.phone.message}
                  </p>
                )}
              </div>

              {/* Password Fields Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-slate-900 font-semibold text-sm"
                  >
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="h-12 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all"
                      {...register("password")}
                    />
                    <i className="fa-solid fa-lock absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer text-sm hover:text-slate-600 transition-colors"></i>
                  </div>
                  {formState.errors.password && (
                    <p className="text-red-500 text-sm font-medium">
                      {formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="repassword"
                    className="text-slate-900 font-semibold text-sm"
                  >
                    Confirm Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="repassword"
                      type="password"
                      placeholder="••••••••"
                      className="h-12 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all"
                      {...register("rePassword")}
                    />
                    <i className="fa-solid fa-lock-open absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer text-sm hover:text-slate-600 transition-colors"></i>
                  </div>
                  {formState.errors.rePassword && (
                    <p className="text-red-500 text-sm font-medium">
                      {formState.errors.rePassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start justify-start md:space-x-3 pt-2">
                <input
                  {...register("terms")}
                  type="checkbox"
                  id="terms"
                  className=" accent-indigo-600 size-4"
                />
                <Label
                  htmlFor="terms"
                  className=" text-sm text-slate-600 font-normal leading-tight cursor-pointer"
                >
                  I agree to the
                  <Link
                    href="#"
                    className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                  >
                    Terms of Service
                  </Link>
                  and
                  <Link
                    href="#"
                    className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              {formState.errors.terms && (
                <p className="text-red-500 text-sm font-medium -mt-2">
                  {formState.errors.terms.message}
                </p>
              )}

              {/* Submit Button */}
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-14 rounded-lg font-bold shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] mt-6 text-base">
                {formState.isSubmitting ? (
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                ) : (
                  <i className="fa-solid fa-user mr-2"></i>
                )}{" "}
                Create My Account
              </Button>
            </form>

            {/* Divider */}
            <div className="mt-8 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-slate-500">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Sign In Link */}
            <Link
              href="/login"
              className="w-full block text-center mt-6 py-3 rounded-lg border border-slate-300 hover:bg-slate-50 hover:border-indigo-300 text-slate-900 font-semibold transition-all"
            >
              <i className="fa-solid fa-sign-in-alt mr-2"></i> Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
