import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function CartSummary({totalPrice, numberOfCartItems}:{totalPrice:number, numberOfCartItems:number}) {

  const subTotal = totalPrice;
  const shipping = totalPrice > 500? 0 : 100
  const total = Math.round(subTotal + shipping)

  return (
    <div className="container rounded-2xl shadow-xl py-8">
      <h3 className="text-2xl font-bold pb-3 border-b border-b-slate-200 mb-5">
        Order Summary
      </h3>
      <div className="border-b pb-3 border-b-slate-200 mb-5">
        <div className="flex justify-between items-center">
          <p className="text-slate-500">Subtotal :</p>
          <span className="text-lg font-semibold">{totalPrice} EGP</span>
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
        <Link
        href={'/checkout'}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-credit-card text-sm"></i>
          Proceed To Checkout
        </Link>
        <Link href={'/'}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-shopping-bag text-sm"></i>
          Continue Shopping
        </Link>
      </div>
      <div className="bg-[#FBFBFC] py-3 px-5 border border-slate-200 rounded-xl mb-5">
        <h3 className="font-semibold text-lg mb-2"><i className="fa-solid fa-truck text-indigo-500"></i> Free Delivery</h3>
        <p className="text-slate-500 ">Free shipping for orders more than 500 EGP</p>
      </div>
      <div className="bg-indigo-100 py-3 px-5 border border-indigo-200 rounded-xl">
        <h3 className="font-semibold text-lg mb-2"><i className="fa-solid fa-shield-halved text-indigo-500"></i> Secure Checkout</h3>
        <p className="text-slate-500 ">Your payment information is protected</p>
      </div>
    </div>
  );
}
