import Image from "next/image";
import HomeSlider from "./_components/homeSlider/HomeSlider";
import CategorySection from "./_components/categorySection/CategorySection";
import ProductsSection from "./_components/productsSection/ProductsSection";
import HomeSection from "./_components/homeSection/HomeSection";

export default function Home() {
  return (
    <>
    <HomeSlider/>
    <CategorySection/>
    <ProductsSection/>
    <HomeSection/>
    </>
  );
}
