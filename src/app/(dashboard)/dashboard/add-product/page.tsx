"use client"
import { ProductForm } from "@/components/Dashboard/AddProduct/ProductForm"
import withAdminAuth from "@/components/Secure/WithAdminAuth"

const AddProductPage = () => {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">

      <ProductForm />
    </div>
  )
}
export default withAdminAuth(AddProductPage)