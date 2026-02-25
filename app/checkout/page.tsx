"use client";
import { paymentForm, paymentSchema } from "@/schema/payment.schema";
import BillingAdress from "../_components/billingAdress/BillingAdress";
import PaymentMethod from "../_components/paymentMethod/PaymentMethod";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import cashOrder from "@/api/cashOrder";
import { useAppDispatch, useAppSelector } from "@/store/store";
import onlineOrder from "@/api/onlineOrder";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { clearCart } from "@/store/slices/cart.slice";

export default function page() {
  const { cartId , totalPrice} = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch()

  const subTotal = totalPrice;
  const shipping = totalPrice > 500? 0 : 100
  const total = Math.round(subTotal + shipping)

  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: zodResolver(paymentSchema),
  });

  const onSubmit: SubmitHandler<paymentForm> = async (values) => {
    try {
      if (!cartId) return;
      if (paymentMethod === "cash") {
        const response = await cashOrder({ shippingAddress: values, cartId });
        console.log(response);
        if (response.status === "success") {
          toast.success("Your order placed successfully");
          dispatch(clearCart())
          setTimeout(() => {
            router.push("/allorders");
          }, 2000);

        }
      }
      if (paymentMethod === "card") {
        const response = await onlineOrder({
          shippingAddress: values,
          cartId,
          url: location.origin,
        });
        console.log(response);
        if (response.status === "success") {
          toast.loading("Redirecting you to payment gateway...");
          dispatch(clearCart())
          setTimeout(() => {
            location.href = response.session.url;
          }, 2000);
        }
      }
      reset()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container px-4">
      <div className="p-4 md:p-8">
        <div className="mb-6 md:mb-8">
          <h3 className="text-2xl font-bold">Checkout</h3>
          <div className="h-1 w-16 bg-linear-to-r from-blue-500 to-purple-500 rounded-full mt-2 md:mt-1" />
        </div>
        <div className=" gap-5 flex-col">
          <div className="max-w-6xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm p-6 mb-5">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Billing Address
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <BillingAdress register={register} errors={errors} />
                  <PaymentMethod
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                  />
                </div>
                <div className="lg:col-span-1 p-4 md:p-8">
                  <div className="container rounded-2xl shadow-xl py-8">
                    <h3 className="text-2xl font-bold pb-3 border-b border-b-slate-200 mb-5">
                      Order Summary
                    </h3>
                    <div className="border-b pb-3 border-b-slate-200 mb-5">
                      <div className="flex justify-between items-center">
                        <p className="text-slate-500">Subtotal :</p>
                        <span className="text-lg font-semibold">{subTotal} EGP</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-slate-500">Shipping :</p>
                        <span className="text-lg font-semibold">{shipping === 0?'Free':shipping}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-indigo-500">
                      <p className="text-lg">Total Price :</p>
                      <span className="text-xl font-semibold">{total} EGP</span>
                    </div>
                    <div className="flex flex-col gap-3 my-5">
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2">
                        <i className="fa-solid fa-credit-card text-sm"></i>
                        Proceed to payment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
