"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [navbar, setNavbar] = useState<{ _id: string; title: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>("MENS"); 
  interface Product {
    _id: string;
    name: string;
    category: string;
    subCategory: string;
    price: number;
    description?: string;
  }
  
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/navbar`)
      .then((res) => {
        if (res.data) {
          setNavbar(res.data);
        }
      })
      .catch((err) => console.error("Error fetching navbar data:", err));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
  
      const queryCategory =
        selectedCategory === "KIDS (GIRLS)" || selectedCategory === "KIDS (BOYS)"
          ? "Kids"
          : selectedCategory;

      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/products?category=${encodeURIComponent(
            queryCategory
          )}`
        )
        .then((res) => {
          if (res.data?.products) {
            setProducts(res.data.products);
          }
        })
        .catch((err) => console.error("Error fetching products:", err));
    }
  }, [selectedCategory]);

  const processedNavItems: { _id: string; title: string }[] = [];
  const addedTabs = new Set();

  navbar.forEach((item) => {
    let tabTitle = item.title;
    if (tabTitle === "KIDS (GIRLS)" || tabTitle === "KIDS (BOYS)") {
      tabTitle = "KIDS";
    }
    if (!addedTabs.has(tabTitle)) {
      processedNavItems.push({ _id: tabTitle.toLowerCase(), title: tabTitle });
      addedTabs.add(tabTitle);
    }
  });

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="p-6">
      <div className="flex gap-4 border-b-2 pb-2">
        {processedNavItems.map((nav) => (
          <button
            key={nav._id}
            onClick={() => setSelectedCategory(nav.title)}
            className={`px-4 py-2 hover:cursor-pointer  rounded-md ${
              selectedCategory === nav.title ? "bg-gray-900 text-white" : "bg-gradient-to-r from-[#5652ca] to-[#73145b] hover:from-[#73145b] hover:to-[#5652ca] text-white"
            }`}
          >
            {nav.title}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {selectedCategory ? (
          products.length > 0 ? (
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gradient-to-r from-gray-800 to-purple-700 text-white">
                <tr>
                  <th className="py-2 px-4 text-start border-b">Name</th>
                  <th className="py-2 px-4 text-start border-b">Subcategory</th>
                  <th className="py-2 px-4 text-start border-b">Price</th>
                  <th className="py-2 px-4 text-start border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{product.name}</td>
                    <td className="py-2 px-4 border-b">{product.subCategory}</td>
                    <td className="py-2 px-4 border-b">${product.price}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => openModal(product)}
                        className="px-4 hover:cursor-pointer  py-2 bg-gradient-to-r from-[#5652ca] to-[#73145b] hover:from-[#73145b] hover:to-[#5652ca] text-white rounded-lg"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No products found for {selectedCategory}.</p>
          )
        ) : (
          <p>Select a category to see the content.</p>
        )}
      </div>

      {/* Modal for Product Details */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-base-100 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">{selectedProduct.name}</h2>
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>Subcategory:</strong> {selectedProduct.subCategory}</p>
            <p><strong>Price:</strong> ${selectedProduct.price}</p>
            <p><strong>Description:</strong> {selectedProduct.description || "No description available."}</p>
            <button
              onClick={closeModal}
              className="mt-4 hover:cursor-pointer px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;