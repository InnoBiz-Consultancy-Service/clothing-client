import OrderSlider from "@/components/OrderBulk/OrderSlider";
import ProductLineup from "@/components/OrderBulk/ProductLineup";
import React from "react";

const Page = () => {
  return (
    <div className="container mx-auto p-10">
      {/* Background Image Section */}
      <div
        className="w-full bg-contain bg-repeat flex justify-center items-center relative "
        style={{
          backgroundImage:
            "url('https://i.ibb.co/ym72J2Xh/online-shopping-on-website-e-commerce-applications-and-digital-marketing-hand-holding-smartphonwith.jpg')", height: '300px',
        }}
      >
        {/* Custom Styled Button */}
        <button className="absolute hover:cursor-pointer bg-gradient-to-r from-[#6fb3cf] to-[#cb89bb] text-white font-semibold py-3 px-6 rounded-md shadow-lg transition duration-300 top-1/2 transform -translate-y-1/2">
          Order In Bulk
        </button>
      </div>

      {/* Other Components */}
      <OrderSlider />
      <ProductLineup />
    </div>
  );
};

export default Page;
