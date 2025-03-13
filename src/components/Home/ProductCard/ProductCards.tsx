import React from "react";
import ProductCard from "./ProductCard";

const clothingData = [
  {
    id: 101,
    title: "Classic Cotton T-Shirt",
    brand: "Urban Wear",
    price: "$19.99",
    imageUrl:
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stock: 50,
    category: "T-Shirts",
  },
  {
    id: 102,
    title: "Designer Graphic Tee",
    brand: "Style Hub",
    price: "$24.99",
    imageUrl:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stock: 25,
    category: "T-Shirts",
  },
  {
    id: 201,
    title: "Casual Polo Shirt",
    brand: "Elite Fashion",
    price: "$29.99",
    imageUrl:
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stock: 40,
    category: "Polo Shirts",
  },
  {
    id: 301,
    title: "Zip-Up Hoodie",
    brand: "Winter Warm",
    price: "$39.99",
    imageUrl:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stock: 20,
    category: "Hoodies",
  },
  {
    id: 401,
    title: "Leather Bomber Jacket",
    brand: "Premium Wear",
    price: "$79.99",
    imageUrl:
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stock: 12,
    category: "Jackets",
  },
  {
    id: 501,
    title: "Denim Jeans",
    brand: "Urban Denim",
    price: "$49.99",
    imageUrl:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stock: 35,
    category: "Bottoms",
  },
  {
    id: 601,
    title: "Slim Fit Chinos",
    brand: "Modern Attire",
    price: "$44.99",
    imageUrl:
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stock: 30,
    category: "Bottoms",
  },
  {
    id: 701,
    title: "Sports Joggers",
    brand: "Active Gear",
    price: "$34.99",
    imageUrl:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stock: 28,
    category: "Athleisure",
  },
  {
    id: 801,
    title: "Woolen Overcoat",
    brand: "Classic Layers",
    price: "$99.99",
    imageUrl:
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stock: 15,
    category: "Coats",
  },
  {
    id: 901,
    title: "Cotton Linen Shorts",
    brand: "Breezy Wear",
    price: "$27.99",
    imageUrl:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stock: 22,
    category: "Shorts",
  },
];

const ProductCards = () => {
  return (
    <main className="bg-gray-100">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-orange-600 bg-orange-100 m-2 p-8 text-center">
          NEW ARRIVAL
        </h1>
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 flex-grow">
            {clothingData.map((item) => (
              <ProductCard item={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductCards;
