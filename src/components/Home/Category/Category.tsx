"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  featured: boolean;
};

const Category: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("Category.json");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // products by category
  const menProducts = products.filter((product) => product.category === "men");
  const womenProducts = products.filter(
    (product) => product.category === "women"
  );
  const kidsProducts = products.filter(
    (product) => product.category === "kids"
  );

  // featured product for each category
  const featuredMen = menProducts.find((product) => product.featured);
  const featuredWomen = womenProducts.find((product) => product.featured);
  const featuredKids = kidsProducts.find((product) => product.featured);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <header className="mb-6 text-center">
            <h2 className="text-3xl font-semibold tracking-wider text-gray-800 uppercase">
              Mens Collection
            </h2>
            <div className="w-20 h-[2px] bg-gray-400 mx-auto mt-1 mb-2"></div>
          </header>

          {featuredMen && (
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-3">
                  <div className="relative h-64 md:h-[495px] rounded overflow-hidden shadow-md group">
                    <Image
                      src={featuredMen.image}
                      alt={featuredMen.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
                      <h3 className="text-white text-xl font-light tracking-wider uppercase mb-1">
                        Mens
                        <span className="block font-semibold">Collection</span>
                      </h3>
                      <div className="h-px w-12 bg-white mb-3"></div>
                      <button className="bg-white bg-opacity-20 text-white text-xs uppercase tracking-wider py-1 px-3 backdrop-blur-sm border border-white/30 hover:bg-white hover:text-gray-900 transition-all duration-300">
                        Explore
                      </button>
                    </div>
                  </div>
                </div>
                {/* Product Grid */}
                <div className="md:col-span-9">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {menProducts
                      .filter((product) => !product.featured)
                      .slice(0, 7)
                      .map((product) => (
                        <div key={product.id} className="group">
                          <div className="bg-gray-50 rounded overflow-hidden shadow-sm relative h-44 md:h-60">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={200}
                              height={200}
                              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-100 transition-all duration-300 flex items-center justify-center opacity-60 md:opacity-0 group-hover:bg-opacity-10 group-hover:opacity-60">
                              <button>
                                <Link
                                  href={"/Details"}
                                  className="bg-white text-gray-900 py-1 px-3 rounded-sm text-xs font-medium transform transition-all duration-300"
                                >
                                  View
                                </Link>
                              </button>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-2 px-3">
                              <h4 className="text-white text-sm font-medium truncate">
                                {product.name}
                              </h4>
                              <p className="text-white/70 text-xs">
                                ${product.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    {/* View More button */}
                    {menProducts.filter((product) => !product.featured).length >
                      7 && (
                      <div className="group cursor-pointer">
                        <div className="bg-gray-900 rounded overflow-hidden shadow-sm relative h-44 md:h-60">
                          <div className="absolute inset-0 opacity-40">
                            <Image
                              src={menProducts[7]?.image}
                              alt="View more"
                              width={200}
                              height={200}
                              className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110 group-hover:opacity-30"
                            />
                          </div>
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-3 bg-gradient-to-b from-black/40 to-black/70">
                            <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center mb-2">
                              <span className="text-white text-lg">+</span>
                            </div>
                            <h4 className="text-white text-sm font-light tracking-wider text-center uppercase mb-1">
                              View More
                            </h4>
                            <p className="text-white/70 text-xs text-center">
                              Explore all items
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Women's */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <header className="mb-6 text-center">
            <h2 className="text-3xl font-semibold tracking-wider text-gray-800 uppercase">
              Women Collection
            </h2>
            <div className="w-20 h-[2px] bg-gray-400 mx-auto mt-1 mb-2"></div>
          </header>

          {featuredWomen && (
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-3">
                  <div className="relative h-64 md:h-[495px] rounded overflow-hidden shadow-md group">
                    <Image
                      src={featuredWomen.image}
                      alt={featuredWomen.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
                      <h3 className="text-white text-xl font-light tracking-wider uppercase mb-1">
                        Women
                        <span className="block font-semibold">Collection</span>
                      </h3>
                      <div className="h-px w-12 bg-white mb-3"></div>
                      <button className="bg-white bg-opacity-20 text-white text-xs uppercase tracking-wider py-1 px-3 backdrop-blur-sm border border-white/30 hover:bg-white hover:text-gray-900 transition-all duration-300">
                        Explore
                      </button>
                    </div>
                  </div>
                </div>
                {/* Products in Grid */}
                <div className="md:col-span-9">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {womenProducts
                      .filter((product) => !product.featured)
                      .slice(0, 7)
                      .map((product) => (
                        <div key={product.id} className="group">
                          <div className="bg-gray-50 rounded overflow-hidden shadow-sm relative h-44 md:h-60">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={200}
                              height={200}
                              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-100 transition-all duration-300 flex items-center justify-center opacity-60 md:opacity-0 group-hover:bg-opacity-10 group-hover:opacity-60">
                              <button>
                                <Link
                                  href={"/Details"}
                                  className="bg-white text-gray-900 py-1 px-3 rounded-sm text-xs font-medium transform transition-all duration-300"
                                >
                                  View
                                </Link>
                              </button>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-2 px-3">
                              <h4 className="text-white text-sm font-medium truncate">
                                {product.name}
                              </h4>
                              <p className="text-white/70 text-xs">
                                ${product.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    {/* View More button */}
                    {womenProducts.filter((product) => !product.featured)
                      .length > 7 && (
                      <div className="group cursor-pointer">
                        <div className="bg-gray-900 rounded overflow-hidden shadow-sm relative h-44 md:h-60">
                          <div className="absolute inset-0 opacity-40">
                            <Image
                              src={womenProducts[7]?.image}
                              alt="View more"
                              width={200}
                              height={200}
                              className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110 group-hover:opacity-30"
                            />
                          </div>
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-3 bg-gradient-to-b from-black/40 to-black/70">
                            <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center mb-2">
                              <span className="text-white text-lg">+</span>
                            </div>
                            <h4 className="text-white text-sm font-light tracking-wider text-center uppercase mb-1">
                              View More
                            </h4>
                            <p className="text-white/70 text-xs text-center">
                              Explore all items
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Kids Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <header className="mb-6 text-center">
            <h2 className="text-3xl font-semibold tracking-wider text-gray-800 uppercase">
              Kids Collection
            </h2>
            <div className="w-20 h-[2px] bg-gray-400 mx-auto mt-1 mb-2"></div>
          </header>

          {featuredKids && (
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-3">
                  <div className="relative h-64 md:h-[495px] rounded overflow-hidden shadow-md group">
                    <Image
                      src={featuredKids.image}
                      alt={featuredKids.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
                      <h3 className="text-white text-xl font-light tracking-wider uppercase mb-1">
                        Kids
                        <span className="block font-semibold">Collection</span>
                      </h3>
                      <div className="h-px w-12 bg-white mb-3"></div>
                      <button className="bg-white bg-opacity-20 text-white text-xs uppercase tracking-wider py-1 px-3 backdrop-blur-sm border border-white/30 hover:bg-white hover:text-gray-900 transition-all duration-300">
                        Explore
                      </button>
                    </div>
                  </div>
                </div>
                {/* Products in Grid */}
                <div className="md:col-span-9">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {kidsProducts
                      .filter((product) => !product.featured)
                      .slice(0, 7)
                      .map((product) => (
                        <div key={product.id} className="group">
                          <div className="bg-gray-50 rounded overflow-hidden shadow-sm relative h-44 md:h-60">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={200}
                              height={200}
                              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-100 transition-all duration-300 flex items-center justify-center opacity-60 md:opacity-0 group-hover:bg-opacity-10 group-hover:opacity-60">
                              <button>
                                <Link
                                  href={"/Details"}
                                  className="bg-white text-gray-900 py-1 px-3 rounded-sm text-xs font-medium transform transition-all duration-300"
                                >
                                  View
                                </Link>
                              </button>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-2 px-3">
                              <h4 className="text-white text-sm font-medium truncate">
                                {product.name}
                              </h4>
                              <p className="text-white/70 text-xs">
                                ${product.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    {/* View More button */}
                    {kidsProducts.filter((product) => !product.featured)
                      .length > 7 && (
                      <div className="group cursor-pointer">
                        <div className="bg-gray-900 rounded overflow-hidden shadow-sm relative h-44 md:h-60">
                          <div className="absolute inset-0 opacity-40">
                            <Image
                              src={kidsProducts[7]?.image}
                              alt="View more"
                              width={200}
                              height={200}
                              className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110 group-hover:opacity-30"
                            />
                          </div>
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-3 bg-gradient-to-b from-black/40 to-black/70">
                            <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center mb-2">
                              <span className="text-white text-lg">+</span>
                            </div>
                            <h4 className="text-white text-sm font-light tracking-wider text-center uppercase mb-1">
                              View More
                            </h4>
                            <p className="text-white/70 text-xs text-center">
                              Explore all items
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Category;
