'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { Order } from '@/types/order.type';

export default function OrderCard({orderInfo}:{orderInfo:Order}) {

  const [isOpen, setIsOpen] = useState(false)

  function getStatus(){
    if(orderInfo.isDelivered){
      return{
        label: 'Deliverd',
        icon: 'fa-check',
        background: 'bg-primary-100',
        text: 'text-primary-700'
      }
    }
    if(orderInfo.isPaid){
      return{
        label: 'Paid',
        icon: 'fa-truck',
        background: 'bg-blue-100',
        text: 'text-blue-700'
      }
    }
    else{
      return{
        label: 'Processing',
        icon: 'fa-spinner',
        background: 'bg-orange-100',
        text: 'text-orange-700'
      }
    }
  }

  const status = getStatus()

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-5">
      
      {/* Header Section */}
      <div className="bg-linear-to-r from-slate-50 to-slate-100 border-b border-slate-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 bg-indigo-100 flex items-center justify-center shrink-0">
              <Image 
                src={orderInfo.cartItems[0].product.imageCover} 
                width={150} 
                height={150} 
                alt='' 
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Order #{orderInfo.id}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Order placed on {new Date(orderInfo.createdAt).toLocaleDateString('en-US',{
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>

          <span className={`self-start sm:self-auto inline-block ${status.background} ${status.text} text-xs font-semibold px-3 py-1 rounded-full`}>
            <i className={`fa-solid ${status.icon} mr-1`}></i>
            {status.label}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <i className="fa-solid fa-calendar-days text-indigo-600"></i>
            <span>{new Date(orderInfo.createdAt).toLocaleDateString('en-US',{
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <i className="fa-solid fa-box text-indigo-600"></i>
            <span>
              {orderInfo.cartItems.length} {orderInfo.cartItems.length>1?'items':'item'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <i className="fa-solid fa-location-dot text-indigo-600"></i>
            <span>{orderInfo.shippingAddress.city}</span>
          </div>
        </div>
      </div>

      {/* Order Total */}
      <div className="px-4 sm:px-6 py-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div className="text-2xl sm:text-3xl font-bold text-slate-900">
          {orderInfo.totalOrderPrice} <span className="text-base sm:text-lg text-slate-500">EGP</span>
        </div>

        {isOpen?
          <div onClick={()=>setIsOpen(false)}>
            <i className='fa-solid fa-angle-down cursor-pointer'></i>
          </div>
          :
          <div onClick={()=>setIsOpen(true)}>
            <i className='fa-solid fa-angle-up cursor-pointer'></i>
          </div>
        }
      </div>

      {isOpen&&<>
      {/* Order Items Section */}
      <div className="p-4 sm:p-6 border-b border-slate-200">
        <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Order Items
        </h4>

        <div className="space-y-4">
         {orderInfo.cartItems.map((item)=>(
          <div key={item._id} className="flex flex-col sm:flex-row gap-4 pb-4 border-b border-slate-100">
            
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
              <Image
                src={item.product.imageCover}
                alt={item.product.title}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h5 className="text-sm font-semibold text-slate-900">
                {item.product.title}
              </h5>
              <p className="text-xs text-slate-500 mt-1">
                {item.count} × {item.price} EGP
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-sm font-semibold text-slate-900">
                {item.count * item.price} EGP
              </p>
            </div>

          </div>
         ))}
        </div>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-6 bg-slate-50">
        
        <div>
          <h5 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <i className="fa-solid fa-location-dot text-indigo-600"></i>
            Delivery Address
          </h5>
          <div className="text-sm text-slate-600 space-y-1">
            <p>{orderInfo.shippingAddress.city}</p>
            <p>{orderInfo.shippingAddress.details}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <h5 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <i className="fa-solid fa-receipt text-blue-600"></i>
            Order Summary
          </h5>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-semibold text-slate-900">
                {orderInfo.totalOrderPrice} EGP
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Shipping</span>
              <span className="font-semibold text-green-600">
                {orderInfo.shippingPrice > 0 ? orderInfo.shippingPrice + 'EGP' :'Free'}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Total</span>
              <span className="font-semibold text-slate-900">
                {orderInfo.shippingPrice + orderInfo.totalOrderPrice}
              </span>
            </div>
          </div>
        </div>

      </div>
      </>}
    </div>
  );
}