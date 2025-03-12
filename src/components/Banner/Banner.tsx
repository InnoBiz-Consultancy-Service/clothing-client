"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const Banner = () => {
  const backgroundImages = [
    "https://i.ibb.co/nM1TWKZ4/vecteezy-paper-art-shopping-online-on-smartphone-and-new-buy-sale-6828785.jpg",
    "https://i.ibb.co/ym72J2Xh/online-shopping-on-website-e-commerce-applications-and-digital-marketing-hand-holding-smartphonwith.jpg",
  ];

  const tshirtData = [
    {
      img: "https://i.ibb.co/MkmsVBYg/10266141.jpg",
      title: "Premium Cotton T-Shirt",
      description: "Made with 100% soft cotton for ultimate comfort and durability.",
    },
    {
      img: "https://i.ibb.co/KzqKX9pW/simple-black-t-shirt-worn-by-man.jpg",
      title: "Minimalist Design Tee",
      description: "A perfect blend of style and simplicity for everyday wear.",
    },
    {
      img: "https://i.ibb.co/C3wyFz1m/9704568.jpg",
      title: "Graphic Print T-Shirt",
      description: "Trendy designs with high-quality prints that last long.",
    },
    {
      img: "https://i.ibb.co/MkmsVBYg/10266141.jpg",
      title: "Oversized Streetwear Tee",
      description: "A loose fit design, perfect for a casual and relaxed look.",
    },
  ];

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] overflow-hidden">
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
              className="w-full h-full bg-no-repeat bg-center bg-[length:100%_100%] sm:bg-contain md:bg-cover"
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

    
      <div className="absolute bottom-10  left-1/2 transform -translate-x-1/2 w-[90%] md:w-[60%] z-10 hidden md:block">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={20}
          slidesPerView={1}
          className="bg-white bg-opacity-90 rounded-lg shadow-lg"
        >
          {tshirtData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col md:flex-row items-center gap-6 p-4">
                {/* T-Shirt Image */}
                <Image
                  src={item.img}
                  alt={item.title}
                  layout="intrinsic"
                  width={250}
                  height={250}
                  className="w-40 md:w-52 lg:w-60 h-auto object-contain"
                />
                {/* Dynamic Text */}
                <div className="text-center md:text-left">
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#6e8d89]">
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
