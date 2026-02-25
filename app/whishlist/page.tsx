'use client'
import ProductCard from "../_components/productCard/ProductCard";
import { useAppSelector } from "@/store/store";
import { product } from "@/types/product.type";
import WhishlistCard from "../_components/whishlistCard/WhishlistCard";

export default async function page() {

    const {products, numberOfWhishlistItems} = useAppSelector((state)=>state.whishlist)

  return (

    <div className="container py-12">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Whishlist
            </h1>
            <div className="h-1 w-16 bg-linear-to-r from-blue-500 to-purple-500 rounded-full" />
            <p className="text-gray-600 text-sm sm:text-base mt-3">
              You have <span className="text-indigo-500">{numberOfWhishlistItems} {numberOfWhishlistItems > 1? 'items': 'item'}</span> in your
              whishlist
            </p>
          </div>
          <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 ">
            {products.map((product: product) => (
              <WhishlistCard key={product.id} product={product} />
            ))}
          </div>
        </div>
  );
}
