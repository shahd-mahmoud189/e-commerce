'use client'
import { addToCart, getCartItems } from "@/api/getCartItems";
import { addToWhishlist, getWhishlistItems } from "@/api/getWhishlist";
import { Button } from "@/components/ui/button";
import { setCartItems } from "@/store/slices/cart.slice";
import { setWishlistItems } from "@/store/slices/whishlist.slice";
import { useAppDispatch } from "@/store/store";
import { product } from "@/types/product.type";
import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import { toast } from "react-toastify";

export default function ProductDetailsCard({ product }: { product: product }) {

  const dispatch = useAppDispatch()
  
    const addItemToCart = async ()=>{
      try {
        const response = await addToCart({productId:product.id})
        console.log(response);      
        if(response.status === 'success'){
          toast.success(response.message)
          const cartInfo = await getCartItems()
          dispatch(setCartItems(cartInfo))
        }
        else{
          toast.error(response.message)
        }
      } catch (error: any) {
        console.log(error.response);
        console.log(product.id);
      }
    } 

    const addItemToWhishlist = async ()=>{
    try {
      const response = await addToWhishlist({productId:product.id})
      console.log(response);
      if(response.status === 'success'){
        toast.success(response.message)
        const whishlistInfo = await getWhishlistItems()
        dispatch(setWishlistItems(whishlistInfo))
      }
      return true
      
    } catch (error: any) {
      console.log(error.response);
    }
  }

  const lowStock = product.quantity > 0 && product.quantity < 10;
  
  
  return (
    <div className="container py-14">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 items-start">
        {/* Image Section */}
        <div className="flex flex-col gap-4 md:col-span-2">
          <div className="relative  rounded-2xl   shadow">
            <ImageGallery
              items={product.images.map((image) => {
                return {
                  original: image,
                  thumbnail: image
                };
              })}
              showPlayButton={false}
              showNav={false}
              showFullscreenButton={false}
            />
            {/* Wishlist Button */}
            {/* <button onClick={addItemToWhishlist} className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white shadow-lg hover:bg-indigo-600 hover:text-white transition-all duration-200 flex items-center justify-center hover:scale-110">
              <i className="fa-solid fa-heart text-slate-400 hover:text-white"></i>
            </button> */}
          </div>

          {/* Stock Status (if needed) */}
          {product.quantity ? (
            <>
              {lowStock ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <i className="fa-solid fa-circle-exclamation text-yellow-600"></i>
                    <span className="text-sm font-semibold text-yellow-700">
                      Only {product.quantity} left - Order soon!
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
                    <i className="fa-solid fa-check-circle text-green-600"></i>
                    <span className="text-sm font-semibold text-green-700">
                      In Stock
                    </span>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
                <i className="fa-solid fa-circle-xmark text-red-600"></i>
                <span className="text-sm font-semibold text-red-700">
                  Out of Stock
                </span>
              </div>
            </>
          )}
        </div>

        {/* Details Section */}
        <div className="flex flex-col gap-6 md:col-span-3 bg-gray-100/30 shadow  p-5 rounded-2xl">
          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 w-fit">
            <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
            <span className="text-sm font-bold uppercase tracking-wide text-indigo-600">
              {product.category.name}
            </span>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-2xl  font-bold text-slate-900 leading-tight mb-3">
              {product.title}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4">
            
            <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full border border-amber-200">
              <i className="fa-solid fa-star text-amber-400"></i>
              <span className="text-lg font-bold text-slate-900">
                {product.ratingsAverage}
              </span>
              <span className="text-sm text-slate-600">/ 5</span>
            </div>
            <span className="text-sm text-slate-500">Customer Reviews</span>
            
          </div>

          {/* Description */}
          <p className="text-slate-600 text-base leading-relaxed">
            {product.description}
          </p>

          {/* Price Section */}
          <div className="border-t border-b border-slate-200 py-6 flex justify-between">
            <div className="flex  gap-4">
              <span className="text-4xl font-bold text-slate-900">
                {product.price}
                <span className="text-xl">EGP</span>
              </span>
            </div>
            <button
                onClick={addItemToWhishlist}
                className="text-red-400 hover:text-red-500  transition-colors duration-200"
              >
                <i className="fa-solid fa-heart text-lg"></i>
              </button>
          </div>

          {/* Product Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
              <i className="fa-solid fa-truck text-indigo-600 text-lg"></i>
              <div>
                <p className="text-xs text-slate-500">Free Shipping</p>
                <p className="text-sm font-semibold text-slate-900">
                  On orders over 500
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
              <i className="fa-solid fa-shield-halved text-indigo-600 text-lg"></i>
              <div>
                <p className="text-xs text-slate-500">Secure Payment</p>
                <p className="text-sm font-semibold text-slate-900">
                  100% Protected
                </p>
              </div>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex gap-4 items-center justify-center">
            
            <Button onClick={addItemToCart} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2">
              <i className="fa-solid fa-shopping-bag"></i>
              Add to Cart
            </Button>
          </div>

         
          {/* Payment Options */}
          <div className="pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500 mb-3 font-semibold">
              PAYMENT OPTIONS
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-6 rounded bg-slate-100 flex items-center justify-center border border-slate-200">
                <i className="fa-brands fa-cc-visa text-slate-600 text-xs"></i>
              </div>
              <div className="w-10 h-6 rounded bg-slate-100 flex items-center justify-center border border-slate-200">
                <i className="fa-brands fa-cc-mastercard text-slate-600 text-xs"></i>
              </div>
              <div className="w-10 h-6 rounded bg-slate-100 flex items-center justify-center border border-slate-200">
                <i className="fa-brands fa-cc-paypal text-slate-600 text-xs"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
