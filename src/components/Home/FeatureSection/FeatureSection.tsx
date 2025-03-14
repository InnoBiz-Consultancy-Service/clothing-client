"use client"

import { Headphones, Package, RefreshCw, Award } from "lucide-react"
import { useState } from "react"

export default function FeatureSection() {
  const features = [
    {
      icon: Package,
      title: "FASTEST SHIPPING COUNTRYWIDE",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: RefreshCw,
      title: "EASY RETURN POLICY",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: Award,
      title: "PREMIUM QUALITY PRODUCT",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: Headphones,
      title: "ONLINE SUPPORT 24/7",
      color: "from-purple-500 to-violet-600",
    },
  ]

  return (
    <div className="w-full py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} Icon={feature.icon} title={feature.title} gradientColor={feature.color} />
          ))}
        </div>
      </div>
    </div>
  )
}

interface FeatureCardProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  gradientColor: string;
}

function FeatureCard({ Icon, title, gradientColor }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative overflow-hidden rounded-xl transition-all duration-300 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
        h-full border border-gray-100 bg-white rounded-xl p-8 
        shadow-lg hover:shadow-xl transition-all duration-300
        flex flex-col items-center text-center
        hover:translate-y-[-5px]
      `}
      >
        <div
          className={`
          mb-6 p-4 rounded-full bg-gradient-to-br ${gradientColor}
          transform transition-transform duration-500
          ${isHovered ? "scale-110" : "scale-100"}
        `}
        >
          <Icon className="h-8 w-8 text-white" strokeWidth={1.5} />
        </div>

        <div className="relative">
          <h3 className="text-sm font-semibold tracking-wider text-gray-700">{title}</h3>
          <div
            className={`
            h-1 w-12 mx-auto mt-4 rounded-full bg-gradient-to-r ${gradientColor}
            transition-all duration-300 ease-out
            ${isHovered ? "w-24" : "w-12"}
          `}
          ></div>
        </div>
      </div>
    </div>
  )
}

