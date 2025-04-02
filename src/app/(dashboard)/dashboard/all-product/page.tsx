"use client";

import withAdminAuth from "@/components/Secure/WithAdminAuth";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { CircleX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Page = () => {
  const [navbar, setNavbar] = useState<{ _id: string; title: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>("MENS");
  const [isLoadingNavbar, setIsLoadingNavbar] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);

  interface Product {
    _id: string;
    name: string;
    category: string;
    subCategory: string;
    price: number;
    description?: string;
    images?: { src: string }[];
  }
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchNavbar = async () => {
      setIsLoadingNavbar(true);
      setError(null);
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/navbar`);
        if (res.data) {
          setNavbar(res.data);
        }
      } catch (err) {
        console.error("Error fetching navbar data:", err);
        setError("Failed to load categories");
      } finally {
        setIsLoadingNavbar(false);
      }
    };
    fetchNavbar();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedCategory) return;

      setIsLoadingProducts(true);
      setError(null);
      try {
        const queryCategory =
          selectedCategory === "KIDS (GIRLS)" || selectedCategory === "KIDS (BOYS)"
            ? "KIDS"
            : selectedCategory;

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/products`, {
          params: {
            category: queryCategory,
            page: currentPage,
            limit: itemsPerPage
          }
        }
        );

        // console.log("API Response:", res.data);

        if (res.data) {
          setProducts(res.data.products || []);
          setTotalProducts(res.data.total || 0);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
        setProducts([]);
        setTotalProducts(0);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, currentPage, itemsPerPage]);

  // Process navbar items (combine kids categories)
  const processedNavItems = navbar.reduce<{ _id: string; title: string }[]>((acc, item) => {
    let tabTitle = item.title;
    if (tabTitle === "KIDS (GIRLS)" || tabTitle === "KIDS (BOYS)") {
      tabTitle = "KIDS";
    }
    if (!acc.some(nav => nav.title === tabTitle)) {
      acc.push({ _id: tabTitle.toLowerCase(), title: tabTitle });
    }
    return acc;
  }, []);

  // Modal handlers
  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Pagination calculations
  const totalPages = Math.ceil(totalProducts / itemsPerPage) || 1;

  // Change page with boundary checks
  const paginate = (pageNumber: number) => {
    const newPage = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(newPage);
  };


  // handleRemoveProduct
  const handleRemoveProduct = async (id: string) => {

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will remove the item from your Product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    });

    // If user confirms deletion
    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/products/product-delete/${id}`
        );

        await Swal.fire({
          title: "Removed!",
          text: "The item has been removed from your Product.",
          icon: "success",
        });

        router.push('/all-product')

      } catch (error) {
        // Show error message
        await Swal.fire({
          title: "Error!",
          text: "An error occurred while removing the item.",
          icon: "error",
        });

        console.error("Error removing product:", error);
      }
    }
  };



  return (
    <div className="p-6">
      {/* Category Tabs */}
      {isLoadingNavbar ? (
        <div className="flex gap-4 border-b-2 pb-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="flex gap-4 border-b-2 pb-2">
          {processedNavItems.map((nav) => (
            <Button
              key={nav._id}
              onClick={() => {
                setSelectedCategory(nav.title);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-md ${selectedCategory === nav.title
                ? "bg-gray-900 text-white"
                : "bg-transparent text-black border-2"
                }`}
            >
              {nav.title}
            </Button>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Products Table */}
      <div className="mt-4">
        {isLoadingProducts ? (
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
            {[...Array(Math.min(5, itemsPerPage))].map((_, i) => (
              <div key={i} className="grid grid-cols-4 gap-4">
                <div className="h-12 bg-gray-100 rounded animate-pulse"></div>
                <div className="h-12 bg-gray-100 rounded animate-pulse"></div>
                <div className="h-12 bg-gray-100 rounded animate-pulse"></div>
                <div className="h-12 bg-gray-100 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        ) : selectedCategory ? (
          products.length > 0 ? (
            <>
              <table className="min-w-full border border-gray-300">
                <thead className="bg-[#364153] text-white">
                  <tr>
                    <th className="py-2 px-4 text-start border-b">Image</th>
                    <th className="py-2 px-4 text-start border-b">Name</th>
                    <th className="py-2 px-4 text-start border-b">Subcategory</th>
                    <th className="py-2 px-4 text-start border-b">Price</th>
                    <th className="py-2 px-4 text-start border-b">Actions</th>
                    <th className="py-2 px-4 text-start border-b">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">

                      <td className="p-2 text-center align-middle">
                        <div className="w-16 h-16 flex items-center justify-center mx-auto my-2">
                          {(product.images ?? []).length > 0 ? (
                            <Image
                              src={product.images?.[0]?.src || ""}
                              alt={product.name}
                              width={64}
                              height={64}
                              className="object-cover rounded"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                              <span className="text-xs text-gray-500">No Image</span>
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="py-2 px-4 border-b">
                        <Link
                          className="hover:underline hover:text-blue-600 transition-colors"
                          href={`/product-details/${product._id}`}
                        >
                          {product.name}
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b">{product.subCategory}</td>
                      <td className="py-2 px-4 border-b">{product.price} tk</td>
                      <td className="py-2 px-4 border-b">
                        <Button
                          onClick={() => openModal(product)}
                          variant="outline"
                          className="cursor-pointer"
                        >
                          View Details
                        </Button>
                      </td>

                      <td className="p-2 text-center align-middle">
                        <button
                          onClick={() => handleRemoveProduct(product._id)}
                          className="hover:text-red-500 transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <CircleX className="w-6 h-6" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Enhanced Pagination - Only show if totalPages > 1 */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => paginate(1)}
                      disabled={currentPage === 1}
                      variant="outline"
                    >
                      First
                    </Button>
                    <Button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      variant="outline"
                    >
                      Previous
                    </Button>
                  </div>

                  <span className="text-sm">
                    Page {currentPage} of {totalPages} | Total: {totalProducts} items
                  </span>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      variant="outline"
                    >
                      Next
                    </Button>
                    <Button
                      onClick={() => paginate(totalPages)}
                      disabled={currentPage === totalPages}
                      variant="outline"
                    >
                      Last
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No products found for {selectedCategory}.
            </div>
          )
        ) : (
          <div className="p-4 text-center text-gray-500">
            Select a category to see products
          </div>
        )}
      </div>

      {/* Product Details Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0  flex items-center justify-center p-4 z-50"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(1px)',
            WebkitBackdropFilter: 'blur(1px)'
          }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">{selectedProduct.name}</h2>
            <div className="space-y-2">
              <p><strong>Category:</strong> {selectedProduct.category}</p>
              <p><strong>Subcategory:</strong> {selectedProduct.subCategory}</p>
              <p><strong>Price:</strong> ${selectedProduct.price}</p>
              <p><strong>Description:</strong> {selectedProduct.description || "No description available."}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <Button
                onClick={closeModal}
                variant="destructive"
                className="cursor-pointer"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAdminAuth(Page);