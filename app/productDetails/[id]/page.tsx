import { getProductDetails } from "@/api/products.api";
import ProductDetailsCard from "@/app/_components/productDetailsCard/ProductDetailsCard";
import { product } from "@/types/product.type";
import React from "react";

export default async function page({ params }: any) {
  const { id } = await params;
  console.log(id);

  const product: product = await getProductDetails(id);
  console.log(product);

  return (
    <>
      <ProductDetailsCard product={product}/>
    </>
  );
}
