import { categoryType } from '@/types/category.type';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

type CategoryCardProps = {
  category: categoryType;
};

export default function CategoryCard({category}:CategoryCardProps) {
  return (
    <Link href={`/categoryDetails/${category._id}`} className='group flex flex-col items-center justify-center gap-4'>
      {/* Circular Image Container */}
      <div className='relative w-24 h-24 rounded-full overflow-hidden shadow-lg'>
        <div className='absolute inset-0  from-blue-100 to-purple-100' />
        <Image 
          width={128} 
          height={128} 
          alt={category.name}
          className='w-full h-full object-cover'
          src={category.image}
        />
      </div>

      {/* Category Name */}
      <h3 className='text-center text-sm font-semibold text-gray-800 max-w-32 line-clamp-2 transition-colors duration-300 group-hover:text-indigo-600'>
        {category.name}
      </h3>
    </Link>
  )
}
