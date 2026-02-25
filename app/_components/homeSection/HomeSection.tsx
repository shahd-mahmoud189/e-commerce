import React from 'react'

export default function HomeSection() {
  return (
    <section className="bg-indigo-50 border-t border-slate-100">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">Shop smarter with FreshCart</h2>
          <p className="text-slate-600 mb-6">Enjoy free shipping on orders over $50, easy returns, and 24/7 customer support.</p>

          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow">Shop Now</button>
            <a href="/products" className="text-sm text-indigo-600 hover:underline">Browse all products</a>
          </div>

          <ul className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-slate-700">
            <li className="flex flex-col items-center gap-2">
              <i className="fa-solid fa-truck-fast text-indigo-600 text-xl"></i>
              <span>Free Shipping</span>
            </li>
            <li className="flex flex-col items-center gap-2">
              <i className="fa-solid fa-rotate-left text-indigo-600 text-xl"></i>
              <span>Easy Returns</span>
            </li>
            <li className="flex flex-col items-center gap-2">
              <i className="fa-solid fa-lock text-indigo-600 text-xl"></i>
              <span>Secure Payment</span>
            </li>
            <li className="flex flex-col items-center gap-2">
              <i className="fa-solid fa-headset text-indigo-600 text-xl"></i>
              <span>24/7 Support</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
