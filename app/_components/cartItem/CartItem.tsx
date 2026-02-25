"use client";
import Image from "next/image";
import { CartProductType } from "@/types/cartItem.type";
import { removeFromCart } from "@/api/removeFromCart";
import { toast } from "react-toastify";
import { removeProduct, setCartItems } from "@/store/slices/cart.slice";
import { useAppDispatch } from "@/store/store";
import Swal from "sweetalert2";
import { updateCart } from "@/api/updateCart";

export default function CartItem({ product }: { product: CartProductType }) {

  const dispatch = useAppDispatch();

  async function removeItem() {
    const result = await Swal.fire({
      title: "Remove Item?",
      text: `Remove ${product.product.title.slice(0,40)}${product.product.title.length > 40?'...':''} from your cart`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4F39F6",
      cancelButtonColor: "#E7000B",
      confirmButtonText: "Yes, delete it!",
    })

    if(result.isConfirmed){
      try {
        const response = await removeFromCart(product.product._id);
        if (response.status === "success") {
          toast.success(response.message);
          const id = product.product._id;
          dispatch(removeProduct({ id }));
        } else {
          toast.error(response.message);
        }
      } catch (error: any) {
        console.log(error.response);
      }
    }
  }

  async function updateCount(count:number) {
    if(count < 1 )return
    try {
      const response = await updateCart(product.product._id,count);
      if (response.status === "success") {
        dispatch(setCartItems(response));
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      console.log(error.response);
    }
  }

  return (
    <div className="container w-full p-4 mb-4 border-b border-b-slate-200 flex flex-col sm:flex-row justify-between gap-4">

      {/* Left Section */}
      <div className="flex gap-4 items-start w-full">
        <div className="rounded shrink-0">
          <Image
            src={product.product.imageCover}
            alt="image"
            width={150}
            height={150}
            className="w-20 h-20 sm:w-28 sm:h-28 object-cover"
          />
        </div>

        <div className="w-full break-words">
          <h3 className="font-bold text-base sm:text-lg lg:text-xl">
            {product.product.title}
          </h3>

          <p className="text-slate-600 text-sm sm:text-base">
            {product.product.category.name}
          </p>

          <p className="text-indigo-600 text-base sm:text-lg font-bold my-2">
            {product.price} EGP{" "}
            <span className="text-slate-600 text-sm font-light">
              per unit
            </span>
          </p>

          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-400 px-2 py-1 rounded-full text-sm font-medium">
              <i className="fa-solid fa-star"></i>
              <span className="text-black">
                {product.product.ratingsAverage}
              </span>
              <span className="text-sm text-slate-600">/ 5</span>
            </span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">

        <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
          <button
            onClick={()=>updateCount(product.count - 1)}
            disabled={product.count <= 1}
            className="px-3 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <i className="fa-solid fa-minus text-sm"></i>
          </button>

          <span className="w-12 text-center font-semibold text-slate-900">
            {product.count}
          </span>

          <button
            onClick={()=>updateCount(product.count + 1)}
            disabled={product.count === product.product.quantity}
            className="px-3 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <i className="fa-solid fa-plus text-sm"></i>
          </button>
        </div>

        <p className="text-lg sm:text-xl font-bold text-center sm:text-right w-full sm:w-auto">
          {product.count * product.price} EGP
        </p>

        <button
          onClick={removeItem}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>

      </div>
    </div>
  );
}