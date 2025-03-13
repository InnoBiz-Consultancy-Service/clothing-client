"use client";
import React, { useState } from 'react';
import ProductImage from './ProductImage';
import toast, { Toaster } from 'react-hot-toast';

const Page = () => {
  const product = {
    id: '1',
    name: 'Fabrilife Mens Premium Designer Edition T Shirt - Nostalgia',
    price: {
      original: 900,
      discounted: 690,
    },
    sizes: ['M', 'XL'],
    quantity: 7,
    description:
      "Fabrilife Men's Premium Quality t-shirt offers a much smoother, silky feel and more structured, mid-weight fit than regular t-shirts. The t-shirts are made with the finest quality Combed Compact Cotton, which features astonishing ~175 GSM on just 26's cotton, giving a smooth and compact construction. The compact finish guarantees that the t-shirt length and width will not change over wash or months of usage.",
    specifications: {
      material: 'Organic Ringspun Combed Compact Cotton',
      composition: '100% Cotton',
      fit: 'Regular fit, Crew Neck Mid-weight, 5.16 oz/yd2 (~175GSM)',
      features: [
        'Reactive Dye',
        'Enzyme and silicon washed',
        'Preshrunk to minimize shrinkage',
        'Design panels all are fabric; cut and sew',
        'Typography & artworks are normal/ high density screenprint',
      ],
    },
    // size_chart: [
    //   {
    //     size: 'M',
    //     chest_round: 39,
    //     length: 27.5,
    //     sleeve: 8.5,
    //   },
    //   {
    //     size: 'L',
    //     chest_round: 40.5,
    //     length: 28,
    //     sleeve: 8.75,
    //   },
    //   {
    //     size: 'XL',
    //     chest_round: 43,
    //     length: 29,
    //     sleeve: 9,
    //   },
    //   {
    //     size: '2XL',
    //     chest_round: 45,
    //     length: 30,
    //     sleeve: 9.25,
    //   },
    // ],
    category: 'T-Shirt',
    brand: 'Fabrilife',
    images: [
      'https://i.ibb.co/C3wyFz1m/9704568.jpg',
      'https://i.ibb.co/99StvG4m/7b194e97-ec5d-4e1c-b171-ba87bee42723.jpg',
      'https://i.ibb.co/99StvG4m/7b194e97-ec5d-4e1c-b171-ba87bee42723.jpg',
      'https://i.ibb.co/C3wyFz1m/9704568.jpg',
    ],
  };
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (type: string) => {
    setQuantity((prevQuantity) =>
      type === 'increase' ? prevQuantity + 1 : prevQuantity > 1 ? prevQuantity - 1 : 1
    );
  };

  const handleAddToCart = () => {
    toast.success('Product added successfully');
  };

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-8">
      {/* Product Images */}
      <div className="w-1/2">
        <ProductImage product={product} />
      </div>

      {/* Product Details */}
      <div className="w-1/2">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-600 line-through">৳ {product.price.original}</p>
        <p className="text-xl font-semibold text-red-600">৳ {product.price.discounted}</p>

        <h3 className="mt-4 font-semibold">Select Size:</h3>
        <div className="flex gap-2 mt-2">
          {product.sizes.map((size) => (
            <button
              className={`border px-4 py-2 rounded ${selectedSize === size ? "bg-gray-800 text-white" : ""}`}
              key={size}
              onClick={() => handleSizeSelect(size)}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="mt-4 flex items-center border gap-4">
            <button onClick={() => handleQuantityChange('decrease')} className="px-4 py-1">-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange('increase')} className="px-4 py-1">+</button>
          </div>

          <div>
            <button onClick={handleAddToCart} className="mt-4 bg-black text-white px-6 py-3 font-bold">+ Add To Cart</button>
          </div>
        </div>

        <div className="border border-b-black w-full my-4"></div>

        {/* Product Description */}
        <div>
          <p className="text-gray-700">{product.description}</p>
        </div>

        {/* Detail Specification */}
        <div className="mt-6">
          <h3 className="font-bold text-lg text-gray-800 mb-3">Detail Specification:</h3>
          <ul className="list-disc list-inside text-gray-700 text-sm">
            <li>
              <strong>Material:</strong> {product.specifications.material}
            </li>
            <li>
              <strong>Composition:</strong> {product.specifications.composition}
            </li>
            <li>
              <strong>Fit:</strong> {product.specifications.fit}
            </li>
            <li>
              <strong>Features:</strong>
              <ul className="list-disc list-inside ml-5 text-gray-600">
                {product.specifications.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </li>
          </ul>
        </div>

        {/* Size Chart Table */}
        {/* <div className="mt-6">
          <h4 className="font-bold text-lg text-gray-800 my-3">Size Chart - In Inches</h4>
          <table className="w-full border-collapse border border-gray-400 text-gray-700 text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">Size</th>
                <th className="border border-gray-400 px-4 py-2">Chest Round (in)</th>
                <th className="border border-gray-400 px-4 py-2">Length (in)</th>
                <th className="border border-gray-400 px-4 py-2">Sleeve (in)</th>
              </tr>
            </thead>
            <tbody>
              {product.size_chart.map((size) => (
                <tr key={size.size} className="text-center">
                  <td className="border border-gray-400 px-4 py-2">{size.size}</td>
                  <td className="border border-gray-400 px-4 py-2">{size.chest_round}</td>
                  <td className="border border-gray-400 px-4 py-2">{size.length}</td>
                  <td className="border border-gray-400 px-4 py-2">{size.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
        <div><Toaster /></div>
      </div>
    </div>
  );
};

export default Page;