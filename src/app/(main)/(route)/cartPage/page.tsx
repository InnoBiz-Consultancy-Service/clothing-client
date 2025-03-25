"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const CartPage = () => {
  const [cartData, setCartData] = useState<
    { price: number; quantity: number; image: string; name: string; color: string; size: string }[]
  >([]);

  useEffect(() => {
    axios.get("cartData.json").then((res) => setCartData(res.data));
  }, []);

  const updateQuantity = (index: number, amount: number) => {
    setCartData((prevCart) => {
      const newCart = [...prevCart];
      newCart[index].quantity = Math.max(1, newCart[index].quantity + amount);
      return newCart;
    });
  };

  const totalPrice = cartData.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-3/4 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">
          Cart <span className="text-gray-500">({cartData.length} products)</span>
        </h1>
        <div className="border-b pb-4 mb-4">
          <table className="w-full border-collapse ">
            <thead>
              <tr className="">
                <th className="p-2 ">Image</th>
                <th className="p-2 ">Product</th>
    
                <th className="p-2 ">Quantity</th>
                <th className="p-2 ">Price</th>
              </tr>
            </thead>
            <tbody>
              {cartData.map((item, index) => (
                <tr key={index} className="text-center border">
                  <td className="p-2 flex justify-center items-center ">
                   <div className="border rounded-lg p-2 bg-gray-100"> <Image src={item.image} alt={item.name} width={60} height={60} className="w-16 h-16 object-cover  rounded" /></div>
                  </td>
                  <td className="p-2 ">{item.name}</td>
                  
                  <td className="p-2 flex justify-center items-center gap-2">
                    <button className="px-2 py-1 border text-center rounded-4xl" onClick={() => updateQuantity(index, -1)}>
                      -
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button className="px-2 py-1 border rounded-4xl" onClick={() => updateQuantity(index, 1)}>
                      +
                    </button>
                  </td>
                  <td className="p-2 ">${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 p-4 border rounded-lg">
          <div className="flex justify-between text-lg font-semibold">
            <span>Subtotal:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold mt-2">
            <span>Discount:</span>
            <span>-$0.00</span>
          </div>
          <div className="flex justify-between text-xl font-bold mt-2">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <Link href={"/shipping"} ><button className="w-full mt-4 p-3 bg-black bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-800 hover:to-purple-700 text-white rounded-lg">Continue to checkout</button></Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
