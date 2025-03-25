"use client";
import axios from "axios";
import { px } from "framer-motion";
import Image from "next/image.js";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  firstName: string;
  lastName: string;
  companyName?: string;
  address: string;
  state?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  email: string;
  phoneNumber: string;
  differentAddress?: boolean;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Checkout = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cartData, setCartData] = useState<CartItem[]>([]);

  useEffect(() => {
    axios.get("cartData.json").then((res) => setCartData(res.data));
  }, []);

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", { ...data, paymentMethod });

  };

  // Calculate Order Summary
  const subTotal = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subTotal > 500 ? 0 : 20;
  const discount = 20;
  const tax = subTotal * 0.1;
  const total = subTotal + tax + shipping - discount;

  return (
    <div className="max-w-6xl mx-auto p-6  gap-8">
      {/* Billing Form */}
      <div className=" bg-white  p-6 rounded-lg shadow">
    
       <h2 className="text-xl font-bold mb-4">Billing Information</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="gap-4">
       <div className="flex flex-col md:flex-row gap-4">
       <div className=" flex-1 grid grid-cols-2 gap-4">
        <input {...register("firstName", { required: true })} placeholder="First name" className="border p-2 rounded w-full" />
          <input {...register("lastName", { required: true })} placeholder="Last name" className="border p-2 rounded w-full" />
          <input {...register("companyName")} placeholder="Company name (Optional)" className="border p-2 rounded col-span-2" />
          <input {...register("address", { required: true })} placeholder="Address" className="border p-2 rounded col-span-2" />
          <input {...register("email", { required: true })} type="email" placeholder="Email" className="border p-2 rounded col-span-2" />
          <input {...register("phoneNumber", { required: true })} placeholder="Phone number" className="border p-2 rounded col-span-2" />

          <h2 className="text-xl font-bold col-span-2 mt-4">Payment Option</h2>
        <div className="col-span-2 space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="radio"
              id="cash"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
              className="h-5 w-5"
            />
            <label htmlFor="cash" className="flex items-center gap-2 cursor-pointer">
              <span className="text-2xl">💵</span>
              <span className="text-gray-700">Cash on Delivery</span>
            </label>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="radio"
              id="SSL-Commerce"
              name="paymentMethod"
              value="SSL-Commerce"
              checked={paymentMethod === "SSL-Commerce"}
              onChange={() => setPaymentMethod("SSL-Commerce")}
              className="h-5 w-5"
            />
            <label htmlFor="SSL-Commerce" className="flex items-center gap-2 cursor-pointer">
              <span className="text-2xl">💳</span>
              <span className="text-gray-700">SSL-Commerce</span>
            </label>
          </div>
        </div>
        </div>
     

      {/* Order Summary */}
   <div className="border shadow-md rounded-lg p-4">
   <div className=" p-6 rounded-lg ">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {cartData?.map((item) => (
            <div key={item.id} className=" border-b pb-2">
              <div className="flex  items-center gap-4">
                <Image src={item.image} alt={item.name} width={100} height={100} className="w-12 h-12 object-cover rounded" />
                <p>{item.name}</p>
               
              </div>
              <div className="flex items-center gap-4 my-4 mx-2">
                                    <p className="text-sm text-gray-500">{(item.quantity)}X</p>
                                    <p className="text-sm text-[#0FABCA] font-[600]">${item.quantity*item.price}</p>
                                </div>
            
            </div>
          ))}
        </div>
</div>
<div className="mt-4 space-y-2">
          <p className="flex  justify-between"><span>Subtotal:</span> <span>${subTotal.toFixed(2)}</span></p>
          <p className="flex justify-between"><span>Shipping:</span> <span>${shipping.toFixed(2)}</span></p>
          <p className="flex justify-between"><span>Discount:</span> <span>-${discount.toFixed(2)}</span></p>
          <p className="flex justify-between"><span>Tax (10%):</span> <span>${tax.toFixed(2)}</span></p>
          <p className="flex justify-between font-bold text-lg"><span>Total:</span> <span>${total.toFixed(2)}</span></p>
        </div>

        {/* Submit Order Button */}
        <button 
          type="submit" 
          onClick={handleSubmit(onSubmit)}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Submit Order
        </button>
   </div>
       </div>
        </form>
        </div>
      </div>

  );
};

export default Checkout;
