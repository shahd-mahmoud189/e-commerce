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
import { loginForm, loginSchema } from "@/schema/login.schema";
import {setToken} from '@/server/auth.actions'
import { setAuthInfo } from "@/store/slices/auth.slice";
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    },
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const createAcc: SubmitHandler<loginForm> = async (
    values: loginForm,
  ) => {
    try {
      const { rememberMe, ...body } = values;
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: body,
      };
      const { data } = await axios.request(options);
      toast.success(data.message =='success'&&'Logged in successfully');
      setTimeout(() => {
        router.push("/");
      }, 2000);
      setToken(data.token,values.rememberMe);
      dispatch(setAuthInfo({isAuthinticated: true, userInfo: data.user}))
      console.log(data);
    } catch (error:any) {
      console.log(error.response.data.message);
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
                Welcome Back!
              </h3>
              <p className="text-slate-500 text-lg">
                Sign in to join our community and start shopping
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(createAcc)}>
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

              {/* Password Fields Row */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label
                    htmlFor="password"
                    className="text-slate-900 font-semibold text-sm"
                  >
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <Link
                    href={"/forgotPassword"}
                    className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors text-sm"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className=" h-12 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all"
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

              {/* Terms & Conditions */}
              <div className="flex items-start justify-start space-x-3 pt-2">
                <input
                  {...register("rememberMe")}
                  type="checkbox"
                  id="terms"
                  className=" accent-indigo-600 size-4"
                />
                <Label
                  htmlFor="terms"
                  className=" text-sm text-slate-600 font-normal leading-tight cursor-pointer"
                >
                  Remember me
                </Label>
              </div>

              {/* Submit Button */}
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-14 rounded-lg font-bold shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] mt-6 text-base">
                {formState.isSubmitting ? (
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                ) : (
                  <i className="fa-solid fa-arrow-right-to-bracket"></i>
                )}{" "}
                Login
              </Button>
            </form>

            {/* Divider */}
            <div className="mt-8 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-slate-500">
                  New to FreshCart?
                </span>
              </div>
            </div>

            {/* Sign In Link */}
            <Link
              href="/register"
              className="w-full block text-center mt-6 py-3 rounded-lg border border-slate-300 hover:bg-slate-50 hover:border-indigo-300 text-slate-900 font-semibold transition-all"
            >
              <i className="fa-solid fa-sign-in-alt mr-2"></i> Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
