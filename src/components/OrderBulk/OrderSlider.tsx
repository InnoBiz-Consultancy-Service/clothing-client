"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const images = [
  "https://i.ibb.co/kY5pw2s/OQRSGD0.jpg",
  "https://i.ibb.co/MkmsVBYg/10266141.jpg",
  "https://i.ibb.co/F4sNdSwD/9657270.jpg",
  "https://i.ibb.co/XrWLnCvW/9704568.jpg",
  "https://i.ibb.co/kY5pw2s/OQRSGD0.jpg",
  "https://i.ibb.co/kY5pw2s/OQRSGD0.jpg",
  "https://i.ibb.co/F4sNdSwD/9657270.jpg",
  "https://i.ibb.co/MkmsVBYg/10266141.jpg",
  "https://i.ibb.co/kY5pw2s/OQRSGD0.jpg",
  "https://i.ibb.co/MkmsVBYg/10266141.jpg",
  "https://i.ibb.co/F4sNdSwD/9657270.jpg",
];

const OrderSlider = () => {
  return (
    <div className="container mx-auto my-16">
      <div className="my-6 p-6">
        <h1 className="flex text-gray-800 justify-center items-center font-bold text-3xl">
          Sustainable Custom Merchandise & Corporate Gift Solutions.
        </h1>
        <p className="text-center my-3 text-gray-600">
          We specialize in providing sustainable, budget-friendly, and top-tier custom merchandise and
          corporate gift solutions catering to a diverse clientele, spanning from dynamic startups to esteemed multinational corporations.
          Backed by a comprehensive in-house production facility, we guarantee a seamless production process and uphold unwavering standards of quality.
        </p>
      </div>
      <div className="w-full mx-auto">
        <Swiper
          modules={[Navigation]}
          slidesPerView={6}
          spaceBetween={30}
          navigation
          className="w-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} className="w-auto">
              <div className="w-60 h-60 relative">
                <Image
                  src={img}
                  alt={`Slide ${index + 1}`}
                  width={240} 
                  height={240} 
                  className="object-cover rounded-md"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OrderSlider;
