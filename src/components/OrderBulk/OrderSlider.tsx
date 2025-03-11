"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const images = [
  "https://fabrilife.com/img/corporate/7.jpg",
  "https://fabrilife.com/img/corporate/8.jpg",
  "https://fabrilife.com/img/corporate/9.jpg",
  "https://fabrilife.com/img/corporate/10.jpg",
  "https://fabrilife.com/img/corporate/11.jpg",
  "https://fabrilife.com/img/corporate/2.jpg",
  "https://fabrilife.com/img/corporate/1.jpg",
  "https://fabrilife.com/img/corporate/13.jpg",
  "https://fabrilife.com/img/corporate/12.jpg",
  "https://fabrilife.com/img/corporate/5.jpg",
  "https://fabrilife.com/img/corporate/6.jpg",
];

const OrderSlider = () => {
  return (
    <div className="container mx-auto my-16">
      <div className="my-6 p-6">
        <h1 className="flex text-gray-800 justify-center items-center font-bold text-3xl">Sustainable Custom Merchandise & Corporate Gift Solutions.</h1>
        <p className="text-center my-3 text-gray-600 ">
          We specialize in providing sustainable, budget-friendly, and top-tier custom merchandise and
          corporate gift solutions catering to a diverse clientele, spanning from dynamic startups to esteemed multinational corporations.
          Backed by a comprehensive in-house production facility, we guarantee a seamless production process and uphold unwavering standards of quality.
        </p>
      </div>
      <div>
        <div className="w-full   mx-auto">
          <Swiper
            modules={[Navigation,]}
            slidesPerView={6}
            spaceBetween={30}
            navigation

            className="w-full"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index} className="w-auto">
                <Image
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-60 h-60 object-cover "
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default OrderSlider;
