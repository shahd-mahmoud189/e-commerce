import React from "react";

import { product } from "@/types/product.type";
import { getProducts } from "@/api/products.api";
import ProductCard from "../_components/productCard/ProductCard";

export default async function page() {
  const products:product[] = await getProducts();
  console.log(products);

  return (
    <>
    <div className="w-full py-10 bg-linear-to-b from-white via-blue-50/30 to-white">
      <div className="container ">
    <div className="">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Products
          </h1>
          <div className="h-1 w-16 bg-linear-to-r from-blue-500 to-purple-500 rounded-full" />
          <p className="text-gray-600 text-sm sm:text-base mt-3">
            Explore our wide range of products across different categories
          </p>
        </div>
      <div className="container py-12  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 ">
        {products.map((product: product) => 
          <ProductCard key={product.id} product={product}/>
        )}
      </div>
      </div>
      </div>
    </>
  );
}
