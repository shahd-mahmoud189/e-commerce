import React from 'react'
import BrandCard from '../_components/brandCard/BrandCard'
import getBrands from '@/api/getAllBrands'
import { categoryType } from '@/types/category.type';
import { BrandType } from '@/types/cartItem.type';
import { Brand } from '@/types/brand.type';

export default async function page() {

  const {data} = await getBrands()
  console.log(data);
  

  return (
    <>
      <div className="w-full py-10 bg-linear-to-b from-white via-blue-50/30 to-white">
            <div className="container lg:px-12">
              {/* Header Section */}
              <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Shop by Brand
                </h1>
                <div className="h-1 w-16 bg-linear-to-r from-blue-500 to-purple-500 rounded-full" />
                <p className="text-gray-600 text-sm sm:text-base mt-3">
                  Explore our wide range of products across different categories
                </p>
              </div>
      
              {/* Categories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-1 lg:gap-10">
                {data.map((brand) => (
                  <BrandCard key={brand._id} brand={brand} />
                ))}
                
              </div>
            </div>
          </div>
    </>
  )
}
