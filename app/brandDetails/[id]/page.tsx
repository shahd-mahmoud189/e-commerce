import getBrandDetails from "@/api/getBrandDetails";
import getCategoryDetails from "@/api/getCategoryDetails";
import ProductCard from "@/app/_components/productCard/ProductCard";
import { product } from "@/types/product.type";

export default async function page({ params }: any) {
  const { id } = await params;
  console.log(id);

  const { data } = await getBrandDetails(id);
  console.log(data);

  return (
    <div className="container py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data[0]?.brand.name ? data[0]?.brand.name:'No products found in this brand'}
        </h1>
        <div className="h-1 w-16 bg-linear-to-r from-blue-500 to-purple-500 rounded-full" />
        {data[0]?.brand.name ?<p className="text-gray-600 text-sm sm:text-base mt-3">
          Products in this brand
        </p>:''}
      </div>
      <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 ">
        {data.map((product: product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
