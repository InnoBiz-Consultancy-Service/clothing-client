"use client";
import React from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

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
      <div className="my-6">
        <h1 className="flex text-gray-800 justify-center items-center font-bold text-3xl">
          Sustainable Custom Merchandise & Corporate Gift Solutions.
        </h1>
        <p className="text-start my-3 text-gray-600">
          We specialize in providing sustainable, budget-friendly, and top-tier custom merchandise and
          corporate gift solutions catering to a diverse clientele, spanning from dynamic startups to esteemed multinational corporations.
          Backed by a comprehensive in-house production facility, we guarantee a seamless production process and uphold unwavering standards of quality.
        </p>
      </div>
      <div className="w-full mx-auto">
        <Carousel
          className="w-full"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent className="gap-2 md:gap-0"> 
            {images.map((img, index) => (
              <CarouselItem
                key={index}
                className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5" 
              >
                <div className="w-full h-60 relative">
                  <Image
                    src={img}
                    alt={`Slide ${index + 1}`}
                    width={240}
                    height={240}
                    className="object-cover rounded-md w-full h-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 md:left-8" />
          <CarouselNext className="right-4 md:right-8" />
        </Carousel>
      </div>
    </div>
  );
};

export default OrderSlider;