import Link from 'next/link'
import React from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto  py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              {/* <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600"> */}
            <i className="fa-solid fa-shopping-cart text-indigo-600 text-2xl"></i>
              {/* </div> */}
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 hover:text-indigo-600 transition-colors">
                FreshCart
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-6 max-w-xs">
              Your trusted destination for quality products and exceptional shopping experience.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a href="#" className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 text-slate-600 hover:bg-indigo-600 hover:text-white transition-all duration-200">
                <i className="fa-brands fa-facebook-f text-sm"></i>
              </a>
              <a href="#" className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 text-slate-600 hover:bg-indigo-600 hover:text-white transition-all duration-200">
                <i className="fa-brands fa-twitter text-sm"></i>
              </a>
              <a href="#" className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 text-slate-600 hover:bg-indigo-600 hover:text-white transition-all duration-200">
                <i className="fa-brands fa-instagram text-sm"></i>
              </a>
              <a href="#" className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 text-slate-600 hover:bg-indigo-600 hover:text-white transition-all duration-200">
                <i className="fa-brands fa-linkedin-in text-sm"></i>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <i className="fa-solid fa-bag-shopping text-indigo-600"></i>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Shop</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="/products" className="hover:text-indigo-600 hover:translate-x-1 transition-all duration-200 inline-block">All Products</Link></li>
              <li><Link href="/new-arrivals" className="hover:text-indigo-600 hover:translate-x-1 transition-all duration-200 inline-block">New Arrivals</Link></li>
              <li><Link href="/featured" className="hover:text-indigo-600 hover:translate-x-1 transition-all duration-200 inline-block">Featured</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <i className="fa-solid fa-headset text-indigo-600"></i>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Support</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="/contact" className="hover:text-indigo-600 hover:translate-x-1 transition-all duration-200 inline-block">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-indigo-600 hover:translate-x-1 transition-all duration-200 inline-block">Shipping Policy</Link></li>
              <li><Link href="/faq" className="hover:text-indigo-600 hover:translate-x-1 transition-all duration-200 inline-block">FAQs</Link></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <i className="fa-solid fa-envelope text-indigo-600"></i>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Newsletter</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">Subscribe to get special offers and updates on new products.</p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              <button className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200 active:scale-95">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-500 font-medium">
            © {currentYear} FreshCart Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-end text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-indigo-600 transition-colors duration-200">Privacy Policy</Link>
            <span className="text-slate-300">•</span>
            <Link href="/terms" className="hover:text-indigo-600 transition-colors duration-200">Terms of Service</Link>
            <span className="text-slate-300">•</span>
            <Link href="/cookies" className="hover:text-indigo-600 transition-colors duration-200">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}