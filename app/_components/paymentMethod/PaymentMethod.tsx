"use client";
import React from "react";
import { useForm } from "react-hook-form";

type paymentMethodProps = {
  paymentMethod: "cash" | "card";
  setPaymentMethod: (method: "cash" | "card") => void;
};

export default function PaymentMethod({
  paymentMethod,
  setPaymentMethod,
}: paymentMethodProps) {
  return (
    <section className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">
        Payment Method
      </h2>

      <div className="space-y-4">
        {/* Option: Cash on Delivery */}
        <label
          className={`block border rounded-lg p-4 cursor-pointer hover:shadow-sm transition ${
            paymentMethod === "cash"
              ? "border-indigo-300 bg-indigo-100"
              : "border-slate-300"
          }`}
        >
          <div className="flex items-start gap-4">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
              className="mt-1 accent-indigo-600"
            />

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <i className="fa-solid fa-money-bill text-lg"></i>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      Cash on Delivery
                    </div>
                    <div className="text-xs text-slate-500">
                      Pay when your order arrives
                    </div>
                  </div>
                </div>

                <div className="text-sm font-semibold text-indigo-600 sm:text-right">
                  No extra charges
                </div>
              </div>
            </div>
          </div>
        </label>

        {/* Option: Online Payment */}
        <label
          className={`block border rounded-lg p-4 cursor-pointer hover:shadow-sm transition ${
            paymentMethod === "card"
              ? "border-indigo-300 bg-indigo-100"
              : "border-slate-300"
          }`}
        >
          <div className="flex items-start gap-4">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
              className="mt-1 accent-indigo-600"
            />

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <i className="fa-solid fa-credit-card text-lg"></i>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      Online Payment
                    </div>
                    <div className="text-xs text-slate-500">
                      Pay securely with card or digital wallet
                    </div>
                  </div>
                </div>

                <div className="text-sm font-semibold text-indigo-600 sm:text-right">
                  Recommended
                </div>
              </div>
            </div>
          </div>
        </label>
      </div>
    </section>
  );
}