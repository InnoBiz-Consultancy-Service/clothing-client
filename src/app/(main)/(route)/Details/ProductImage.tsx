'use client';
import Image from "next/image";
import React, { useState } from "react";
interface Product {
    images: string[];
}

const ProductImage = ({ product }: { product: Product }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = product?.images || [];

    return (
        <div className="p-4 md:p-8">
            {/* Image Section */}
            <div className="relative">
                <div className="flex">
                    {/* Main Image */}
                    <div className="flex items-center justify-center w-full bg-gray-100 overflow-hidden">
                        <Image
                            height={80}
                            width={80}
                            src={images[currentImageIndex]}
                            alt={`Product view ${currentImageIndex + 1}`}
                            className="object-cover w-full h-[600px] "
                        />
                    </div>
                </div>

                {/* Thumbnail Images */}
                <div className="scrollbar flex justify-center items-center w-full md:w-[87%] gap-2 mt-4 overflow-x-auto">
                    {images.map((img: string, index: number) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`flex-shrink-0 bg-gray-100 w-20 transition-all duration-300 h-20 rounded-md mb-1 overflow-hidden border-2 ${currentImageIndex === index ? "border-[#0FABCA]" : "border-transparent"
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                height={80}
                                width={80}
                                className="object-cover rounded-md w-full h-full"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductImage;
