"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";

import Link from "next/link";

interface ProductProps {
  item: {
    id: number;
    title: string;
    brand: string;
    price: string;
    imageUrl: string;
    stock: number;
    category: string;
  };
}

const ProductCard: React.FC<ProductProps> = ({ item }) => {
  const [hover, setHover] = useState(false);

  return (
    // <Card
    //   className="w-full max-w-sm bg-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden rounded-md border-2 group relative p-0 mt-5"
    //   onMouseEnter={() => setHover(true)}
    //   onMouseLeave={() => setHover(false)}
    // >
    //   <div className="absolute top-3 left-3 bg-white py-3 px-5 rounded-full shadow-sm z-10">
    //     <p className="text-sm font-medium text-gray-800">{item.category}</p>
    //   </div>
    //   <div className="relative w-full h-60 sm:h-64 overflow-hidden">
    //     <Image
    //       src={item.imageUrl}
    //       alt={item.title}
    //       width={400}
    //       height={400}
    //       className={`w-full h-full object-cover transition-all duration-500 ${
    //         hover ? "blur-xs scale-100" : ""
    //       }`}
    //     />
    //     {/* Hover */}
    //     <div
    //       className={`absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-5 text-white transition-all duration-500 ${
    //         hover ? "opacity-100" : "opacity-0"
    //       } ${hover ? "translate-y-0" : "translate-y-10"}`}
    //     >
    //       <h3 className="text-lg font-bold text-white text-center">
    //         {item.title}
    //       </h3>
    //       <p className="text-sm text-white text-center mb-1">
    //         <span className="font-semibold">Brand:</span> {item.brand}
    //       </p>
    //       <p className="text-sm text-white text-center mb-1">
    //         <span className="font-semibold">Price:</span> {item.price}
    //       </p>
    //       <p className="text-sm text-white text-center mb-1">
    //         <span className="font-semibold">Category:</span> {item.category}
    //       </p>
    //       <p className="text-sm text-white text-center mb-4">
    //         <span className="font-semibold">Stock:</span> {item.stock} available
    //       </p>

    //       <Link href={"/Details"} className="bg-gray-200 hover:bg-white text-gray-800 rounded-md py-2 px-6 font-medium transition-colors">
    //         View Details
    //       </Link>
    //     </div>
    //   </div>
    // </Card>
    <Card
    className="w-full max-w-sm bg-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden rounded-md border-2 group relative p-0 mt-5"
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
  >
    <div className="absolute top-3 left-3 bg-gray-300 opacity-70 md:opacity-100 p-1 md:py-3 md:px-5 rounded-full shadow-sm z-10">
      <p className="text-sm font-medium text-gray-800">{item.category}</p>
    </div>
    <div className="relative w-full h-60 sm:h-64 overflow-hidden">
      <Image
        src={item.imageUrl}
        alt={item.title}
        width={400}
        height={400}
        className={`w-full h-full object-cover transition-all duration-500 ${
          hover ? "md:blur-xs md:scale-100" : ""
        }`}
      />
      {/* Product details */}
      <div className=" md:hidden absolute inset-0 bg-black/30 flex flex-col items-center justify-end p-5 text-white">
        <h3 className="text-sm font-bold text-white text-center">
          {item.title}
        </h3>
        <p className="text-sm text-white text-center mb-1">
          <span className="font-semibold">Brand:</span> {item.brand}
        </p>
        <p className="text-sm text-white text-center mb-1">
          <span className="font-semibold">Price:</span> {item.price}
        </p>
        <Link href={"/Details"} className="bg-gray-200 opacity-70 md:opacity-100 hover:bg-white text-gray-800 rounded-md p-1 font-medium transition-colors">
          View Details
        </Link>
      </div>
      
      {/* Hover effect - Only works on md screens and up */}
      <div
        className={`hidden md:flex absolute inset-0 bg-black/30 flex-col items-center justify-center p-5 text-white transition-all duration-500 ${
          hover ? "opacity-100" : "opacity-0"
        } ${hover ? "translate-y-0" : "translate-y-10"}`}
      >
        <h3 className="text-lg font-bold text-white text-center">
          {item.title}
        </h3>
        <p className="text-sm text-white text-center mb-1">
          <span className="font-semibold">Brand:</span> {item.brand}
        </p>
        <p className="text-sm text-white text-center mb-1">
          <span className="font-semibold">Price:</span> {item.price}
        </p>
        <p className="text-sm text-white text-center mb-1">
          <span className="font-semibold">Category:</span> {item.category}
        </p>
        <p className="text-sm text-white text-center mb-4">
          <span className="font-semibold">Stock:</span> {item.stock} available
        </p>
  
        <Link href={"/Details"} className="bg-gray-200 hover:bg-white text-gray-800 rounded-md py-2 px-6 font-medium transition-colors">
          View Details
        </Link>
      </div>
    </div>
  </Card>
  );
};

export default ProductCard;
