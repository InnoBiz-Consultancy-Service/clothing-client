"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

const schema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters long"),
  price: z.coerce.number().min(1, "Price must be at least 1"),
  discount: z.coerce.number().min(0, "Discount cannot be negative"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  sizes: z.string().min(1, "At least one size must be selected"),
  colors: z.string().min(3, "Color must be at least 3 characters"),
  images: z.array(z.string().url()).min(1, "At least one image is required").max(3, "You can upload up to 3 images"),
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().min(1, "Sub-category is required"),
});

type FormData = z.infer<typeof schema>;

interface NavbarItem {
  _id: string;
  title: string;
  items: { name: string; link: string }[];
}

interface SubCategory {
  name: string;
  link: string;
}

export default function ProductForm() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [navbar, setNavbar] = useState<NavbarItem[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      if (imageUrls.length + files.length > 3) {
        toast.error("You can only upload up to 3 images");
        return;
      }
      const newImageUrls = [...imageUrls];
      Array.from(files).forEach((file) => {
        const newImageUrl = URL.createObjectURL(file);
        newImageUrls.push(newImageUrl);
      });

      setImageUrls(newImageUrls);
      setValue("images", newImageUrls);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    toast.success("Product submitted successfully!");
  };

  useEffect(() => {
    fetch('https://clothing-server-hazel.vercel.app/api/v1/navbar')
      .then(res => res.json())
      .then(data => setNavbar(data));
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;

    const selectedCategoryData = navbar.find(item => item.title === selectedCategory);
    if (selectedCategoryData) {
      setSubCategories(selectedCategoryData.items);
    } else {
      setSubCategories([]);
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center lg:w-[1200px] lg:ml-14 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-gradient-to-r from-[#d1d5db] to-[#7eb8d1] rounded-lg p-16 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Product Name</label>
            <input {...register("name")} className="w-full p-2 border rounded" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block mb-1">Price</label>
            <input type="number" {...register("price")} className="w-full p-2 border rounded" />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>
          <div>
            <label className="block mb-1">Discount</label>
            <input type="number" {...register("discount")} className="w-full p-3 border rounded" />
            {errors.discount && <p className="text-red-500 text-sm">{errors.discount.message}</p>}
          </div>
          <div>
            <label className="block mb-1">Description</label>
            <textarea {...register("description")} className="w-full border rounded" />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
          <div>
            <label className="block mb-1">Sizes</label>
            <select {...register("sizes")} className="w-full p-2 border rounded">
              <option value="">Select Size</option>
              {["36 EU", "38 EU", "40 EU", "42 EU"].map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            {errors.sizes && <p className="text-red-500 text-sm">{errors.sizes.message}</p>}
          </div>
          <div>
            <label className="block mb-1">Color</label>
            <input type="text" {...register("colors")} className="w-full p-2 border rounded" />
            {errors.colors && <p className="text-red-500 text-sm">{errors.colors.message}</p>}
          </div>
          <div>
            <label className="block mb-1">Category</label>
            <select {...register("category")} className="w-full p-2 border rounded" onChange={handleCategoryChange}>
              <option value="">Select Category</option>
              {navbar.map((category) => (
                <option key={category._id} value={category.title}>{category.title}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>
          <div>
            <label className="block mb-1">Sub-Category</label>
            <select {...register("subCategory")} className="w-full p-2 border rounded">
              <option value="">Select Sub-Category</option>
              {subCategories.map((subCategory) => (
                <option key={subCategory.link} value={subCategory.name}>{subCategory.name}</option>
              ))}
            </select>
            {errors.subCategory && <p className="text-red-500 text-sm">{errors.subCategory.message}</p>}
          </div>
        </div>

        <div className="mt-4">
          <label className="block mb-1">Upload Images (Max: 3)</label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="w-full p-2 border rounded"
          />
          {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
          <div className="flex gap-2 mt-2">
            {imageUrls.map((url, index) => (
              <Image key={index} src={url} alt="Product" width={80} height={80} className="rounded-md" />
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button type="submit" className="border border-white bg-transparent px-4 py-2 w-full rounded-md">Submit</button>
        </div>
      </form>
      <Toaster />
    </div>
  );
}
