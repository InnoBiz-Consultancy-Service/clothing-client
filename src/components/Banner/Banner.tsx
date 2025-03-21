"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import banner1 from '../../../public/banner1.png'
import banner2 from '../../../public/banner2.png'
import banner3 from '../../../public/banner3.png'
import { EB_Garamond } from 'next/font/google';
import Link from "next/link"

const ebGaramond = EB_Garamond({
  weight: ['400', '700'],
  subsets: ['latin'],
});
type OfferBanner = {
  id: string
  imageUrl: string
  title: string
  subtitle: string
  ctaText: string
}

const dummyBanners: OfferBanner[] = [
  {
    id: "1",
    imageUrl: banner1.src,
    title: "SUMMER COLLECTION",
    subtitle: "50% OFF ON SELECTED ITEMS",
    ctaText: "SHOP NOW",
  },
  {
    id: "2",
    imageUrl: banner2.src,
    title: "NEW ARRIVALS",
    subtitle: "DISCOVER THE LATEST TRENDS",
    ctaText: "EXPLORE",
  },
  {
    id: "3",
    imageUrl: banner3.src,
    title: "EXCLUSIVE DEALS",
    subtitle: "LIMITED TIME OFFERS",
    ctaText: "GET OFFERS",
  },
]

export default function Banner() {
  const [banners, setBanners] = useState<OfferBanner[]>([])

  // Simulate fetching from database
  useEffect(() => {
    setBanners(dummyBanners)
  }, [])

  if (banners.length === 0) {
    return null
  }

  return (
    <div className="w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className="relative w-full aspect-[21/9] md:aspect-[21/7] overflow-hidden">
                <Image
                  src={banner.imageUrl || "/placeholder.svg"}
                  alt={banner.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={banner.id === "1"}
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
                  <h2 className={`text-2xl md:text-4xl lg:text-6xl font-extrabold tracking-tight text-white mb-2 md:mb-4 ${ebGaramond.className}`}>
                    {banner.title}
                  </h2>
                  <p className={`text-lg md:text-xl lg:text-2xl font-medium text-white/90 mb-4 md:mb-8 max-w-md ${ebGaramond.className}`}>
                    {banner.subtitle}
                  </p>
                  <div>
                    <Link href={'/shop'}>
                      <button className="bg-white cursor-pointer text-black px-6 py-2 md:px-8 md:py-3 font-bold tracking-wide hover:bg-white/90 transition-colors">

                        {banner.ctaText}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 md:left-8" />
        <CarouselNext className="right-4 md:right-8" />
      </Carousel>
    </div>
  )
}

