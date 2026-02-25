"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WishlistItem } from "@/types/whishlist.type";
import Link from "next/link";
import Image from "next/image";
import { product } from "@/types/product.type";
import { addToCart } from "@/api/addToCart";
import { getCartItems } from "@/api/getCartItems";
import { setCartItems } from "@/store/slices/cart.slice";
import { useAppDispatch } from "@/store/store";
import { toast } from "react-toastify";
import { removeFromWhishlist } from "@/api/removeFromWhishlist";
import Swal from "sweetalert2";
import { removeItem } from "@/store/slices/whishlist.slice";

export default function WhishlistCard({ product }: { product: product }) {
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

  const removeItemFromWhishlist = async () =>{
    const result = await Swal.fire({
          title: "Remove Item?",
          text: `Remove ${product.title.slice(0,40)}${product.title.length > 40?'...':''} from your whishlist`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#4F39F6",
          cancelButtonColor: "#E7000B",
          confirmButtonText: "Yes, delete it!",
        })
    
        if(result.isConfirmed){
          try {
          const response = await removeFromWhishlist(product.id);
          console.log(response);
          if (response.status === "success") {
            toast.success(response.message);
            const id = product.id;
            dispatch(removeItem({ id }));
          } else {
            toast.error(response.message);
          }
        } catch (error: any) {
          console.log(error.response);
        }
        }
  }

  return (
    <Card className="overflow-hidden border border-slate-200 hover:border-indigo-300 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
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
          <div className="absolute top-3 left-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
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
            <button className="text-red-500 cursor-default">
              <i className="fa-solid fa-heart text-lg"></i>
            </button>
          </div>
        </div>

        <Button
          className="mb-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
          onClick={addItemToCart}
        >
          <i className="fa-solid fa-shopping-bag text-sm"></i>
          Add to cart
        </Button>
        {/* Remove Button */}
        <Button onClick={removeItemFromWhishlist} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2">
          <i className="fa-solid fa-trash text-sm"></i>
          Remove from Wishlist
        </Button>
      </div>
    </Card>
  );
}
