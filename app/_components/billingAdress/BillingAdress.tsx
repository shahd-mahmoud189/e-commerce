"use client";
import { paymentForm } from "@/schema/payment.schema";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type billingAddressProps = {
  register: UseFormRegister<paymentForm>;
  errors: FieldErrors<paymentForm>;
};

export default function BillingAdress({
  register,
  errors,
}: billingAddressProps) {
  return (
    <div className="mb-5 space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Address
        </label>
        <input
          {...register("details")}
          type="text"
          placeholder="123 Main St, Building, Apt"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        {errors.details && (
          <p className="text-red-500 text-sm font-medium mt-2">
            {errors.details.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Phone
          </label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="(+20) 10 1234 5678"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm font-medium mt-2">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            City
          </label>
          <input
            {...register("city")}
            type="text"
            placeholder="Cairo"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          {errors.city && (
            <p className="text-red-500 text-sm font-medium mt-2">
              {errors.city.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
