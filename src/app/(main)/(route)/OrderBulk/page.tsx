import OrderSlider from "@/components/OrderBulk/OrderSlider";
import ProductLineup from "@/components/OrderBulk/ProductLineup";
import React from "react";

const Page = () => {
  return (
    <div className="container mx-auto p-10">
      {/* Background Image Section */}
      <div
        className="w-full bg-contain bg-no-repeat flex justify-center items-center relative "
        style={{
          backgroundImage:
            "url('https://fabrilife.com/img/corporate/wholesale-cover2.jpg')", height: '300px',
        }}
      >
        {/* Custom Styled Button */}
        <button className="absolute bg-gradient-to-r from-teal-500 to-lime-300 text-white font-semibold py-3 px-6 rounded-md shadow-lg transition duration-300 top-1/2 transform -translate-y-1/2">
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
