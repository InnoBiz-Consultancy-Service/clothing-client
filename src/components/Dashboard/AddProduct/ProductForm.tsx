"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Image from "next/image"
import { X, Upload, ImageIcon, Plus } from "lucide-react"
import { toast, Toaster } from "react-hot-toast"
import axios from "axios"

const schema = z.object({
    name: z.string().min(3, "Product name must be at least 3 characters long"),
    price: z.coerce.number().min(1, "Price must be at least 1"),
    // discount: z.coerce.number().min(0, "Discount cannot be negative"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    sizes: z.array(z.string()).min(1, "At least one size must be selected"),
    colors: z.string().min(3, "Color must be at least 3 characters"),
    images: z.array(z.string().url()).min(1, "At least one image is required").max(3, "You can upload up to 3 images"),
    category: z.string().min(1, "Category is required"),
    subCategory: z.string().min(1, "Sub-category is required"),
})

type FormData = z.infer<typeof schema>

interface NavbarItem {
    _id: string
    title: string
    items: { name: string; link: string }[]
}

interface SubCategory {
    name: string
    link: string
}

export function ProductForm() {
    const [imageUrls, setImageUrls] = useState<string[]>([])
    const [navbar, setNavbar] = useState<NavbarItem[]>([])
    const [subCategories, setSubCategories] = useState<SubCategory[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Size selection state
    const [availableSizes, setAvailableSizes] = useState<string[]>(["36 EU", "38 EU", "40 EU", "42 EU", "44 EU", "46 EU"])
    const [selectedSizes, setSelectedSizes] = useState<string[]>([])
    const [newSize, setNewSize] = useState<string>("")

    // Custom category and subcategory state
    const [customCategories, setCustomCategories] = useState<string[]>([])
    const [customSubCategories, setCustomSubCategories] = useState<string[]>([])
    const [newCategory, setNewCategory] = useState<string>("")
    const [newSubCategory, setNewSubCategory] = useState<string>("")
    const [showAddCategory, setShowAddCategory] = useState<boolean>(false)
    const [showAddSubCategory, setShowAddSubCategory] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            price: 0,
            // discount: 0,
            description: "",
            sizes: [],
            colors: "",
            images: [],
            category: "",
            subCategory: "",
        },
    })

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;
    
        if (imageUrls.length + files.length > 3) {
            toast.error("You can only upload up to 3 images");
            return;
        }
    
        const newImageUrls = [...imageUrls];
    
        
    
        const uploadPromises = Array.from(files).map(async (file) => {
            const formData = new FormData();
            formData.append("image", file);
    
            try {
                const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY}`, {
                    method: "POST",
                    body: formData,
                });
    
                const data = await response.json();
                if (data.success) {
                    newImageUrls.push(data.data.url); 
                } else {
                    toast.error("Image upload failed!");
                }
            } catch (error) {
                console.error("Error uploading image:", error);
                toast.error("Something went wrong while uploading!");
            }
        });
    
        await Promise.all(uploadPromises); 
    
        setImageUrls(newImageUrls);
        setValue("images", newImageUrls);
    };
    

    const removeImage = (index: number) => {
        const newImageUrls = [...imageUrls]
        newImageUrls.splice(index, 1)
        setImageUrls(newImageUrls)
        setValue("images", newImageUrls)
    }

    const onSubmit = (data: FormData) => {
        setIsSubmitting(true)
        // Simulate API call
        setTimeout(() => {
            console.log(data)
            toast.success("Product submitted successfully!")
            setIsSubmitting(false)
        }, 1500)
        console.log(data)
        axios.post('http://localhost:8000/api/v1/products/add-product',data)
        .then(res=> console.log(res))
    }

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/navbar`)

            .then((res) => res.json())
            .then((data) => setNavbar(data))
            .catch((err) => {
                console.error("Failed to fetch categories:", err)
                toast.error("Error fetching categories")
            })
    }, [])

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = event.target.value

        if (selectedCategory === "add_new_category") {
            setShowAddCategory(true)
            return
        }

        setValue("category", selectedCategory)

        const selectedCategoryData = navbar.find((item) => item.title === selectedCategory)
        if (selectedCategoryData) {
            setSubCategories(selectedCategoryData.items)
        } else {
            setSubCategories([])
        }
    }

    const handleSubCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSubCategory = event.target.value

        if (selectedSubCategory === "add_new_subcategory") {
            setShowAddSubCategory(true)
            return
        }

        setValue("subCategory", selectedSubCategory)
    }

    // Handle size checkbox change
    const handleSizeChange = (size: string) => {
        const newSelectedSizes = selectedSizes.includes(size)
            ? selectedSizes.filter((s) => s !== size)
            : [...selectedSizes, size]

        setSelectedSizes(newSelectedSizes)
        setValue("sizes", newSelectedSizes)
    }

    // Add custom size
    const addCustomSize = () => {
        if (newSize.trim() && !availableSizes.includes(newSize)) {
            const updatedSizes = [...availableSizes, newSize]
            setAvailableSizes(updatedSizes)
            handleSizeChange(newSize)
            setNewSize("")
        }
    }

    // Add custom category
    const addCustomCategory = () => {
        if (
            newCategory.trim() &&
            !customCategories.includes(newCategory) &&
            !navbar.some((item) => item.title === newCategory)
        ) {
            const updatedCategories = [...customCategories, newCategory]
            setCustomCategories(updatedCategories)
            setValue("category", newCategory)
            setShowAddCategory(false)
            setNewCategory("")
            setSubCategories([])
        }
    }

    // Add custom subcategory
    const addCustomSubCategory = () => {
        if (
            newSubCategory.trim() &&
            !customSubCategories.includes(newSubCategory) &&
            !subCategories.some((item) => item.name === newSubCategory)
        ) {
            const updatedSubCategories = [...customSubCategories, newSubCategory]
            setCustomSubCategories(updatedSubCategories)
            setValue("subCategory", newSubCategory)
            setShowAddSubCategory(false)
            setNewSubCategory("")
        }
    }

    const watchCategory = watch("category")
    const watchPrice = watch("price")
    const watchDiscount = watch("discount")

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-gray-800 to-gray-600 p-6">
                    <h2 className="text-2xl font-bold text-white">Add New Product</h2>
                    <p className="text-indigo-100">Fill in the details to add a new product to your inventory</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Product Name</label>
                                <input
                                    {...register("name")}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    placeholder="Enter product name"
                                    disabled={isSubmitting}
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Price</label>
                                    <input
                                        type="number"
                                        {...register("price")}
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        placeholder="0.00"
                                        disabled={isSubmitting}
                                    />
                                    {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>}
                                </div>
                                {/* <div>
                                    <label className="block text-sm font-medium mb-1">Discount</label>
                                    <input
                                        type="number"
                                        {...register("discount")}
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        placeholder="0"
                                        disabled={isSubmitting}
                                    />
                                    {errors.discount && <p className="mt-1 text-sm text-red-500">{errors.discount.message}</p>}
                                </div> */}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    {...register("description")}
                                    rows={4}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    placeholder="Enter product description"
                                    disabled={isSubmitting}
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Sizes</label>
                                <div className="grid grid-cols-3 gap-2 mb-2">
                                    {availableSizes?.map((size) => (
                                        <label
                                            key={size}
                                            className="flex items-center space-x-2 border p-2 rounded-md cursor-pointer hover:bg-gray-50"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedSizes.includes(size)}
                                                onChange={() => handleSizeChange(size)}
                                                className="rounded text-indigo-600 focus:ring-indigo-500"
                                                disabled={isSubmitting}
                                            />
                                            <span>{size}</span>
                                        </label>
                                    ))}
                                </div>
                                <div className="flex items-center mt-2">
                                    <input
                                        type="text"
                                        value={newSize}
                                        onChange={(e) => setNewSize(e.target.value)}
                                        className="flex-1 p-2 border rounded-l-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        placeholder="Add custom size"
                                        disabled={isSubmitting}
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault()
                                                addCustomSize()
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={addCustomSize}
                                        className="p-2 bg-indigo-500 text-white rounded-r-md hover:bg-indigo-600 transition-colors"
                                        disabled={isSubmitting || !newSize.trim()}
                                    >
                                        <Plus className="h-5 w-5" />
                                    </button>
                                </div>
                                {errors.sizes && <p className="mt-1 text-sm text-red-500">{errors.sizes.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Color</label>
                                <input
                                    type="text"
                                    {...register("colors")}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    placeholder="e.g. Red, Blue, Green"
                                    disabled={isSubmitting}
                                />
                                {errors.colors && <p className="mt-1 text-sm text-red-500">{errors.colors.message}</p>}
                            </div>
                        </div>

                        {/* Categories and Sub categories */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                {!showAddCategory ? (
                                    <select
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        onChange={handleCategoryChange}
                                        value={watchCategory || ""}
                                        disabled={isSubmitting}
                                    >
                                        <option value="">Select Category</option>
                                        {navbar.map((category) => (
                                            <option key={category._id} value={category.title}>
                                                {category.title}
                                            </option>
                                        ))}
                                        {customCategories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                        <option value="add_new_category" className="font-medium text-indigo-600">
                                            + Add New Category
                                        </option>
                                    </select>
                                ) : (
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newCategory}
                                            onChange={(e) => setNewCategory(e.target.value)}
                                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                            placeholder="Enter new category name"
                                            disabled={isSubmitting}
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault()
                                                    addCustomCategory()
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="px-3 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                                            onClick={addCustomCategory}
                                            disabled={isSubmitting || !newCategory.trim()}
                                        >
                                            Add
                                        </button>
                                        <button
                                            type="button"
                                            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                                            onClick={() => {
                                                setShowAddCategory(false)
                                                setNewCategory("")
                                            }}
                                            disabled={isSubmitting}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                                {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Sub-Category</label>
                                {!showAddSubCategory ? (
                                    <select
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        onChange={handleSubCategoryChange}
                                        value={watch("subCategory") || ""}
                                        disabled={isSubmitting || !watchCategory}
                                    >
                                        <option value="">Select Sub-Category</option>
                                        {subCategories.map((subCategory) => (
                                            <option key={subCategory.link} value={subCategory.name}>
                                                {subCategory.name}
                                            </option>
                                        ))}
                                        {customSubCategories.map((subCategory) => (
                                            <option key={subCategory} value={subCategory}>
                                                {subCategory}
                                            </option>
                                        ))}
                                        {watchCategory && (
                                            <option value="add_new_subcategory" className="font-medium text-indigo-600">
                                                + Add New Sub-Category
                                            </option>
                                        )}
                                    </select>
                                ) : (
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newSubCategory}
                                            onChange={(e) => setNewSubCategory(e.target.value)}
                                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                            placeholder="Enter new sub-category name"
                                            disabled={isSubmitting}
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault()
                                                    addCustomSubCategory()
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="px-3 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                                            onClick={addCustomSubCategory}
                                            disabled={isSubmitting || !newSubCategory.trim()}
                                        >
                                            Add
                                        </button>
                                        <button
                                            type="button"
                                            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                                            onClick={() => {
                                                setShowAddSubCategory(false)
                                                setNewSubCategory("")
                                            }}
                                            disabled={isSubmitting}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                                {errors.subCategory && <p className="mt-1 text-sm text-red-500">{errors.subCategory.message}</p>}
                            </div>
                            {/* images */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Upload Images (Max: 3)</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="image-upload"
                                        disabled={isSubmitting || imageUrls.length >= 3}
                                    />
                                    <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                                        <Upload className="h-8 w-8 text-indigo-500 mb-2" />
                                        <p className="text-sm font-medium">Drag & drop or click to upload</p>
                                        <p className="text-xs text-gray-500 mt-1">{`${imageUrls.length}/3 images uploaded`}</p>
                                    </label>
                                </div>
                                {errors.images && <p className="mt-1 text-sm text-red-500">{errors.images.message}</p>}
                            </div>

                            {imageUrls.length > 0 && (
                                <div className="grid grid-cols-3 gap-3 mt-3">
                                    {imageUrls.map((url, index) => (
                                        <div key={index} className="relative group aspect-square rounded-md overflow-hidden border">
                                            <Image
                                                src={url || "/placeholder.svg"}
                                                alt={`Product image ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                            <button
                                                type="button"
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => removeImage(index)}
                                                disabled={isSubmitting}
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}

                                    {Array.from({ length: 3 - imageUrls.length }).map((_, index) => (
                                        <div
                                            key={`empty-${index}`}
                                            className="aspect-square rounded-md border border-dashed border-gray-300 flex items-center justify-center"
                                        >
                                            <ImageIcon className="h-8 w-8 text-gray-300" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Product Preview */}
                            {watchPrice > 0 && (
                                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <h3 className="font-medium mb-2 text-indigo-600 dark:text-indigo-400">Product Preview</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-bold">${(watchPrice - (watchDiscount || 0)).toFixed(2)}</span>
                                        {watchDiscount > 0 && (
                                            <span className="text-sm text-gray-500 line-through">${watchPrice.toFixed(2)}</span>
                                        )}
                                        {watchDiscount > 0 && watchPrice > 0 && (
                                            <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                                                {Math.round((watchDiscount / watchPrice) * 100)}% OFF
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-4 border-t">
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-800 hover:to-purple-700 text-white font-medium rounded-md shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Submitting...
                                </span>
                            ) : (
                                "Submit Product"
                            )}
                        </button>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    )
}

