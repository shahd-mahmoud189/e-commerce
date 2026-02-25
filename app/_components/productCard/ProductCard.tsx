"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { product } from "@/types/product.type";
import Link from "next/link";
import Image from "next/image";
import { addToCart } from "@/api/addToCart";
import { toast } from "react-toastify";
import { getCartItems } from "@/api/getCartItems";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setCartItems } from "@/store/slices/cart.slice";
import { addToWhishlist } from "@/api/addToWhishlist";
import { setWishlistItems } from "@/store/slices/whishlist.slice";
import { getWhishlistItems } from "@/api/getWhishlist";
import { useState } from "react";

export default function ProductCard({ product }: { product: product }) {
  const { products, numberOfWhishlistItems } = useAppSelector(
    (state) => state.whishlist,
  );

  const [isInWhishlist, setIsInWhishlist] = useState(false);

  const dispatch = useAppDispatch();

  const addItemToCart = async () => {
    try {
      const response = await addToCart({ productId: product.id });
      console.log(response);
      if (response.status === "success") {
        toast.success(response.message);
        const cartInfo = await getCartItems();
        dispatch(setCartItems(cartInfo));
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      console.log(error.response);
      console.log(product.id);
    }
  };

  const addItemToWhishlist = async () => {
    try {
      const response = await addToWhishlist({ productId: product.id });
      console.log(response);
      if (response.status === "success") {
        toast.success(response.message);
        const whishlistInfo = await getWhishlistItems();
        setIsInWhishlist(true);
        dispatch(setWishlistItems(whishlistInfo));
      }
      return true;
    } catch (error: any) {
      console.log(error.response);
    }
  };

  return (
    <Card
      key={product.id}
      className="overflow-hidden border border-slate-200 hover:border-indigo-300 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image Container */}
      <Link href={`/productDetails/${product.id}`}>
        <div className="relative overflow-hidden bg-slate-100 aspect-square group">
          <Image
            src={product.imageCover}
            alt={product.title}
            width={500}
            height={500}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Category Badge */}
          <div className="absolute top-3 left-3 bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold shadow-md">
            {product.category.name}
          </div>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-5">
        {/* Title */}
        <Link href={`/productDetails/${product.id}`}>
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 hover:text-indigo-600 transition-colors mb-3">
            {product.title}
          </h3>
        </Link>

        {/* Price and Rating Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">
              {product.price} EGP
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
              <i className="fa-solid fa-star text-amber-400 text-sm"></i>
              <span className="text-sm font-semibold text-slate-900">
                {product.ratingsAverage}
              </span>
            </div>
            {isInWhishlist ? (
              <button onClick={addItemToWhishlist} className=" text-red-500  ">
                <i className="fa-solid fa-heart text-lg"></i>
              </button>
            ) : (
              <button
                onClick={addItemToWhishlist}
                className="text-red-400 hover:text-red-500  transition-colors duration-200"
              >
                <i className="fa-solid fa-heart text-lg"></i>
              </button>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
          onClick={addItemToCart}
        >
          <i className="fa-solid fa-shopping-bag text-sm"></i>
          Add to cart
        </Button>
      </div>
    </Card>
  );
}
