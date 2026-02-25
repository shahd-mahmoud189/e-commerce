'use client'
import React, { useEffect, useState } from "react";
import OrderCard from "../_components/orderCart/OrderCard";
import { useAppSelector } from "@/store/store";
import { getOrders } from "@/api/getOrders";
import { Order, OrderResponse } from "@/types/order.type";

export default function page() {
  const { userInfo } = useAppSelector((state) => state.auth);
  const [orders, setOrders] = useState<null|OrderResponse>(null)

  if(!userInfo){
    return
  }

  useEffect(()=>{
    const fetchOrders = async ()=>{
      const response = await getOrders({userId:userInfo.id})
      console.log(response);
      setOrders(response)
    }
    fetchOrders()
  },[])

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="bg-gray-100 p-6 rounded-full mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No orders found
        </h3>
        <p className="text-gray-500 max-w-xs mb-6">
          It looks like you haven&apos;t placed any orders yet. Start exploring our shop!
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container px-4">
      <div className=" p-4 md:p-8">
        <div className="mb-6 md:mb-8">
          <h3 className="text-2xl font-bold">My Orders</h3>
          <div className="h-1 w-16 bg-linear-to-r from-blue-500 to-purple-500 rounded-full mt-2 md:mt-1" />
         
        </div>
        <div className="bg-[#FBFBFC] rounded-2xl shadow py-5">
          {orders.map((order) => (
            <OrderCard orderInfo={order} key={order._id}/>
          ))}
        </div>
      </div>
    </div>
  );
}
