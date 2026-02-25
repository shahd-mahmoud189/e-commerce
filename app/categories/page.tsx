import getCategories from "@/api/categories";
import { categoryType } from "@/types/category.type";
import React from "react";
import CategoryCard from "../_components/categoryCard/CategoryCard";

export default async function page() {
  const response = await getCategories();
  console.log(response);
  return (
    <div className="w-full py-10 bg-linear-to-b from-white via-blue-50/30 to-white">
      <div className="container lg:px-12">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Shop by Category
          </h1>
          <div className="h-1 w-16 bg-linear-to-r from-blue-500 to-purple-500 rounded-full" />
          <p className="text-gray-600 text-sm sm:text-base mt-3">
            Explore our wide range of products across different categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-1 lg:gap-10">
          {response.data.map((category: categoryType) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
