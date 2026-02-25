import React from "react";

import { product } from "@/types/product.type";
import { getProducts } from "@/api/products.api";
import ProductCard from "../productCard/ProductCard";

export default async function ProductsSection() {
  const products:product[] = await getProducts();
  console.log(products);

  return (
    <>

        <section className='w-full py-10 bg-linear-to-b from-white via-blue-50/30 to-white'>
              <div className='container lg:px-12'>
                {/* Header Section */}
                <div className='mb-2'>
                  <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                    Featured Products
                  </h1>
                  <div className='h-1 w-16 bg-linear-to-r from-blue-500 to-purple-500 rounded-full' />
                  
                </div>
        
                {/* Categories Grid */}
                <div className="container py-12  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 ">
        
        {products.map((product: product) => 
          <ProductCard key={product.id} product={product}/>
        )}
      </div>
              </div>
            </section>
    </>
  );
}
