"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import withAdminAuth from "@/components/Secure/WithAdminAuth";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  sizes: string[];
  colors: string;
  images: { img1: string; img2?: string; img3?: string }[];
  category: string;
  subCategory: string;
}

interface BulkOrder {
  _id: string;
  name: string;
  company: string;
  productType: string;
  quantity: number;
  deliveryDate: string;
}

const Dashboard = () => {
  const [productData, setProductData] = useState<Product[]>([]);
  const [bulkOrder, setBulkOrder] = useState<BulkOrder[]>([]);

  // Fetch product data
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/products`)
      .then((res) => {
        setProductData(res.data.products);
      })
      .catch((err) => console.error("Error fetching product data:", err));
  }, []);

  // Fetch bulk order data
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/bulkOrder`)
      .then((res) => {
        setBulkOrder(res.data);
      })
      .catch((err) => console.error("Error fetching bulk order data:", err));
  }, []);

  // Process data for category-based product count
  const processCategoryProductCountData = () => {
    const categories: Record<string, number> = {};
    productData.forEach((product) => {
      const category = product.category;
      if (categories[category]) {
        categories[category] += 1;
      } else {
        categories[category] = 1;
      }
    });

    // console.log("Category Product Count:", categories);

    return {
      labels: Object.keys(categories),
      datasets: [
        {
          label: "Number of Products by Category",
          data: Object.values(categories),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    };
  };

  // Process data for delivery date-based bar chart
  const processDeliveryDateData = () => {
    const deliveryDates: Record<string, number> = {};
    bulkOrder.forEach((order) => {
      const date = new Date(order.deliveryDate).toLocaleDateString();
      if (deliveryDates[date]) {
        deliveryDates[date] += order.quantity;
      } else {
        deliveryDates[date] = order.quantity;
      }
    });

    return {
      labels: Object.keys(deliveryDates),
      datasets: [
        {
          label: "Quantity by Delivery Date",
          data: Object.values(deliveryDates),
          backgroundColor: "#36A2EB",
          borderColor: "#36A2EB",
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="my-10  min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800"></h1>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
      >
        {/* Total Products Card */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-2xl font-bold text-blue-500">📦</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Total Products</h2>
            <p className="text-3xl font-bold text-blue-500">{productData.length}</p>
          </div>
        </div>

        {/* Total Bulk Orders Card */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-2xl font-bold text-green-500">📊</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Total Bulk Orders</h2>
            <p className="text-3xl font-bold text-green-500">{bulkOrder.length}</p>
          </div>
        </div>
      </motion.div>

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
      >
        {/* Category-Based Pie Chart (Product Count) */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Number of Products by Category</h2>
          <div className="w-full h-64">
            <Pie data={processCategoryProductCountData()} />
          </div>
        </div>

        {/* Delivery Date-Based Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quantity by Delivery Date</h2>
          <div className="w-full h-64">
            <Bar
              data={processDeliveryDateData()}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default withAdminAuth(Dashboard);