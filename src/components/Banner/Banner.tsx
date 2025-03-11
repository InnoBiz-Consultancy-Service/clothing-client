"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {  Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const Banner = () => {
  const backgroundImages = [
    "https://fabrilife.com/image-gallery/663c8117d711e.jpg",
    "https://fabrilife.com/img/corporate/wholesale-cover2.jpg",
  ];

  const tshirtData = [
    {
      img: "https://fabrilife.com/products/64e79c976372a-square.jpg?v=20",
      title: "Premium Cotton T-Shirt",
      description: "Made with 100% soft cotton for ultimate comfort and durability.",
    },
    {
      img: "https://fabrilife.com/products/650182af39a77-square.jpeg",
      title: "Minimalist Design Tee",
      description: "A perfect blend of style and simplicity for everyday wear.",
    },
    {
      img: "https://fabrilife.com/products/66cd75ad24196-square.png",
      title: "Graphic Print T-Shirt",
      description: "Trendy designs with high-quality prints that last long.",
    },
    {
      img: "https://fabrilife.com/products/650182af39a77-square.jpeg",
      title: "Oversized Streetwear Tee",
      description: "A loose fit design, perfect for a casual and relaxed look.",
    },
  ];

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Swiper */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        spaceBetween={0}
        slidesPerView={1}
        className="absolute inset-0 w-full h-full z-0"
      >
        {backgroundImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* T-Shirt Slider with Dynamic Text */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[60%] z-10">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
         
          spaceBetween={20}
          slidesPerView={1}
          className="p-6 bg-white bg-opacity-90 rounded-lg shadow-lg"
        >
          {tshirtData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* T-Shirt Image */}
                <Image
                  src={item.img}
                  alt={item.title}
                 
            width={500}  // Set the width
            height={500} // Set the height
                  className="w-40 md:w-52 lg:w-60 h-auto object-contain"
                />
                {/* Dynamic Text */}
                <div className="text-center  md:text-left">
                  <h1 className="text-2xl md:text-3xl font-bold text-[#6e8d89]">
                    {item.title}
                  </h1>
                  <p className="text-md md:text-lg text-[#6e8d89] mt-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
