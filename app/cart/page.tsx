'use client'
import CartItem from "../_components/cartItem/CartItem";
import CartSummary from "../_components/cartSummary/CartSummary";
import { useAppSelector } from "@/store/store";

export default function page() {

  const {cartId, numberOfCartItems, products, totalPrice} = useAppSelector((state)=>state.cart)

  return (
    <>
      <div className="container grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 py-6 md:py-12 px-4">
        <div className="md:col-span-3 p-4 md:p-8">
          <div className="mb-6 md:mb-8">
            <h3 className="text-2xl font-bold">Cart Items</h3>
            <p className="text-base md:text-lg text-slate-600 mt-2">
              You have <span className="text-indigo-500">{numberOfCartItems} {numberOfCartItems > 1? 'items': 'item'}</span> in your
              cart
            </p>
            <div className="h-1 w-16 bg-linear-to-r from-blue-500 to-purple-500 rounded-full mt-2 md:mt-1" />
          </div>
          <div className="bg-[#FBFBFC] rounded-2xl shadow">
            {products.map((product)=><CartItem key={product._id} product={product}/>)}
          </div>
        </div>
        <div className="md:col-span-2 p-4 md:p-8">
          <CartSummary totalPrice={totalPrice} numberOfCartItems={numberOfCartItems}/>
        </div>
      </div>
    </>
  );
}
