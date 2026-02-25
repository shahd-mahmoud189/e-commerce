import React from "react";
import Image from "next/image";
import img from "@/public/home-slider-1.png";
import { BrandType } from "@/types/cartItem.type";
import { Brand } from "@/types/brand.type";
import Link from "next/link";

export default function BrandCard({brand}:any) {
  return (
    <Link href={`/brandDetails/${brand._id}`} className="bg-white dark:bg-slate-900 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group cursor-pointer">
      <div className="relative h-40 bg-linear-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center overflow-hidden">
        <Image
          src={brand.image}
          alt="Brand Logo"
          width={150}
          height={150}
          className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 truncate">
          {brand.name}
        </h3>
      </div>
    </Link>
  );
}
