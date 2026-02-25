import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <main className="grid min-h-[75vh] place-items-center bg-white px-6">
      <div className="flex flex-col items-center text-center">

        {/* The Big 404 Hero */}
        <div className="relative mt-4">
          <span className="text-[12rem] font-black leading-none text-slate-100 sm:text-[18rem] select-none">
            404
          </span>
          {/* Subtle overlay text or positioning to keep it artistic */}
          <h1 className="absolute inset-0 flex items-center justify-center  sm:mt-32 mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Page Not Found
          </h1>
        </div>

        {/* Navigation Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-lg hover:bg-indigo-600 transition-all duration-300 active:scale-95"
          >
            Return to Homepage
          </Link>
          
          <Link 
            href="/products" 
            className="px-8 py-4 text-sm font-bold text-slate-900 hover:bg-slate-50 rounded-full transition-colors"
          >
            View Products
          </Link>
        </div>
      </div>
    </main>
  )
}