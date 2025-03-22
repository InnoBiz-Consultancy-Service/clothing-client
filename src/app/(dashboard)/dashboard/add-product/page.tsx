"use client"
import { ProductForm } from "@/components/Dashboard/AddProduct/ProductForm"

export default function AddProductPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Add New Product
      </h1>
      <ProductForm />
    </div>
  )
}

