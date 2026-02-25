"use client";
import { Button } from "@/components/ui/button";
import useLogout from "@/hooks/useLogout";
import { AppState, useAppSelector } from "@/store/store";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthinticated } = useSelector(
    (appState: AppState) => appState.auth,
  );
  const { logout } = useLogout();
  const { numberOfCartItems } = useAppSelector((state) => state.cart);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo Section */}
        <Link href={"/"} className="flex items-center gap-2 group">
          <i className="fa-solid fa-shopping-cart text-indigo-600 text-2xl"></i>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
            FreshCart
          </h2>
        </Link>

        {/* Navigation Links - Desktop */}
        <div className="hidden xl:block">
          <ul className="flex items-center gap-8 text-sm font-medium text-slate-600">
            <li className="hover:text-indigo-600 transition-colors duration-200">
              <Link href={"/"} className="flex items-center gap-2">
                <i className="fa-solid fa-home text-sm"></i>
                Home
              </Link>
            </li>
            <li className="hover:text-indigo-600 transition-colors duration-200">
              <Link href={"/products"} className="flex items-center gap-2">
                <i className="fa-solid fa-boxes-stacked text-sm"></i>
                Products
              </Link>
            </li>
            <li className="hover:text-indigo-600 transition-colors duration-200">
              <Link href={"/categories"} className="flex items-center gap-2">
                <i className="fa-solid fa-layer-group text-sm"></i>
                Categories
              </Link>
            </li>
            <li className="hover:text-indigo-600 transition-colors duration-200">
              <Link href={"/brands"} className="flex items-center gap-2">
                <i className="fa-solid fa-table-cells-large text-sm"></i>
                Brands
              </Link>
            </li>
            <li className="hover:text-indigo-600 transition-colors duration-200">
              <Link href={"/cart"} className="flex items-center gap-2 relative">
                <div className="relative">
                  <i className="fa-solid fa-cart-shopping text-sm"></i>
                  <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 bg-indigo-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {numberOfCartItems}
                  </span>
                </div>
                Cart
              </Link>
            </li>
            <li className="hover:text-indigo-600 transition-colors duration-200">
              <Link
                href={"/allorders"}
                className="flex items-center gap-2 relative"
              >
                <div className="relative">
                  <i className="fa-solid fa-list text-sm"></i>
                </div>
                My Orders
              </Link>
            </li>
            <li className="hover:text-indigo-600 transition-colors duration-200">
              <Link href={"/whishlist"} className="flex items-center gap-2">
                <i className="fa-solid fa-heart text-sm"></i>
                Whishlist
              </Link>
            </li>
          </ul>
        </div>

        {/* Auth Buttons - Desktop */}
        <div className="hidden xl:flex items-center gap-4">
          {isAuthinticated ? (
            <Button
              onClick={logout}
              className="rounded-lg bg-indigo-600 hover:bg-indigo-700 px-6 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              LogOut
            </Button>
          ) : (
            <>
              <Link
                href={"/login"}
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors duration-200"
              >
                <i className="fa-solid fa-arrow-right-to-bracket mr-2"></i>
                Log in
              </Link>
              <Link
                href={"/register"}
                className="rounded-lg bg-indigo-600 hover:bg-indigo-700 px-6 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
              >
                <i className="fa-regular fa-user"></i> Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="xl:hidden flex flex-col gap-1.5 p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <span
            className={`h-0.5 w-6 bg-slate-900 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-slate-900 transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-slate-900 transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <ul className="flex flex-col gap-3">
              <li>
                <Link href={"/"} className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200" onClick={() => setIsOpen(false)}>
                  <i className="fa-solid fa-home text-sm"></i>
                  Home
                </Link>
              </li>
              <li>
                <Link href={"/products"} className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200" onClick={() => setIsOpen(false)}>
                  <i className="fa-solid fa-boxes-stacked text-sm"></i>
                  Products
                </Link>
              </li>
              <li>
                <Link href={"/categories"} className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200" onClick={() => setIsOpen(false)}>
                  <i className="fa-solid fa-layer-group text-sm"></i>
                  Categories
                </Link>
              </li>
              <li>
                <Link href={"/brands"} className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200" onClick={() => setIsOpen(false)}>
                  <i className="fa-solid fa-table-cells-large text-sm"></i>
                  Brands
                </Link>
              </li>
              <li>
                <Link href={"/cart"} className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200" onClick={() => setIsOpen(false)}>
                  <i className="fa-solid fa-cart-shopping text-sm"></i>
                  Cart
                </Link>
              </li>
              <li>
                <Link href={"/allorders"} className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200" onClick={() => setIsOpen(false)}>
                  <i className="fa-solid fa-list text-sm"></i>
                  My Orders
                </Link>
              </li>
              <li>
                <Link href={"/whishlist"} className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200" onClick={() => setIsOpen(false)}>
                  <i className="fa-solid fa-heart text-sm"></i>
                  Whishlist
                </Link>
              </li>
            </ul>

            <div className="h-px bg-slate-200"></div>

            <div className="flex flex-col gap-3">
              {isAuthinticated ? (
                <Button
                  className="px-4 py-2 text-center text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition-all duration-200 active:scale-95"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  LogOut
                </Button>
              ) : (
                <>
                  <Link href={"/login"} className="px-4 py-2 text-center text-sm font-semibold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200" onClick={() => setIsOpen(false)}>
                    Log in
                  </Link>
                  <Link href={"/register"} className="px-4 py-2 text-center text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition-all duration-200 active:scale-95" onClick={() => setIsOpen(false)}>
                    <i className="fa-regular fa-user mr-1"></i>
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}