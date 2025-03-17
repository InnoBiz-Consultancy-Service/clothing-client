"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

const AllProduct = () => {
  const [navbar, setNavbar] = useState<{ _id: string; title: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [product, setProduct] = useState<{ _id: string; name: string; price: number; description: string; category: string; subCategory?: string; image: { img1: string; img2: string; img3: string } }[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ _id: string; name: string; price: number; description: string; category: string; subCategory?: string; image: { img1: string; img2: string; img3: string } } | null>(null);

  // Fetch navbar data (categories)
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/navbar`)
      .then((res) => {
        setNavbar(res.data);
        if (res.data.length > 0) {
          setSelectedCategory(res.data[0].title);
        }
      })
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  // Fetch products based on selected category
  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/products?category=${selectedCategory}`)
        .then((res) => {
          setProduct(res.data.products);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch products:", err);
          setLoading(false);
        });
    }
  }, [selectedCategory]);

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-6 overflow-x-auto">
        {navbar.map((category) => (
          <button
            key={category._id}
            className={`px-4 py-2 border rounded-lg text-sm font-medium ${selectedCategory === category.title ? " bg-gray-800 text-white" : "bg-gradient-to-r from-[#5652ca] to-[#73145b] text-white"}`}
            onClick={() => setSelectedCategory(category.title)}
          >
            {category.title}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gradient-to-r from-gray-800 to-purple-700 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {product.length > 0 ? (
                product.map((p) => (
                  <tr key={p._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-6">{p.name}</td>
                    <td className="py-3 px-6">${p.price}</td>
                    <td className="py-3 px-6">{p.category}</td>
                    <td className="py-3 px-6">
                      <Button className="bg-gradient-to-r from-[#5652ca] to-[#73145b] hover:from-[#73145b] hover:to-[#5652ca]" onClick={() => setSelectedProduct(p)}>View Details</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    No products found for this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Product Details */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <p><strong>Category:</strong> {selectedProduct?.category}</p>
            <p><strong>SubCategory:</strong> {selectedProduct?.subCategory}</p>
            <p><strong>Price:</strong> ${selectedProduct?.price}</p>
            <p><strong>Description:</strong> {selectedProduct?.description}</p>

            {/* Display product images */}
           </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllProduct;
