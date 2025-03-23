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
    description: z.string().min(10, "Description must be at least 10 characters long"),
    sizes: z.array(z.string()).min(1, "At least one size must be selected"),
    colors: z.string().min(3, "Color must be at least 3 characters"),
    images: z.array(z.string()).min(1, "You must upload at least 1 image").max(3, "You can upload a maximum of 3 images"),
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
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [previewUrls, setPreviewUrls] = useState<string[]>([])
    const [navbar, setNavbar] = useState<NavbarItem[]>([])
    const [subCategories, setSubCategories] = useState<SubCategory[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Size selection state
    const [availableSizes, setAvailableSizes] = useState<string[]>(["S", "M", "L", "L", "XL", "2XL", "3XL"])
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
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            price: 0,
            description: "",
            sizes: [],
            colors: "",
            images: [],
            category: "",
            subCategory: "",
        },
    })

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/navbar`)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                const data = await response.json()
                setNavbar(data)
            } catch (err) {
                console.error("Failed to fetch categories:", err)
                toast.error("Error fetching categories. Please try again later.")
            } finally {
                setIsLoading(false)
            }
        }

        fetchCategories()
    }, [])

    // Add these handlers for drag and drop functionality
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (isSubmitting || selectedFiles.length >= 3) {
            toast.error("You can only upload up to 3 images")
            return
        }

        const files = e.dataTransfer.files
        if (!files || files.length === 0) return

        // Check if adding these files would exceed the limit
        if (selectedFiles.length + files.length > 3) {
            toast.error("You can only upload up to 3 images")
            return
        }

        // Create new arrays to avoid mutation
        const newSelectedFiles = [...selectedFiles]
        const newPreviewUrls = [...previewUrls]

        // Process each file
        Array.from(files).forEach((file) => {
            // Only add if it's an image file
            if (file.type.startsWith("image/")) {
                newSelectedFiles.push(file)
                newPreviewUrls.push(URL.createObjectURL(file))
            } else {
                toast.error(`File "${file.name}" is not an image`)
            }
        })

        // Update state
        setSelectedFiles(newSelectedFiles)
        setPreviewUrls(newPreviewUrls)
    }

    const [isDragging, setIsDragging] = useState(false)

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files) return

        // Check if adding these files would exceed the limit
        if (selectedFiles.length + files.length > 3) {
            toast.error("You can only upload up to 3 images")
            return
        }

        // Create new arrays to avoid mutation
        const newSelectedFiles = [...selectedFiles]
        const newPreviewUrls = [...previewUrls]

        // Process each file
        Array.from(files).forEach((file) => {
            // Only add if it's an image file
            if (file.type.startsWith("image/")) {
                newSelectedFiles.push(file)
                newPreviewUrls.push(URL.createObjectURL(file))
            } else {
                toast.error(`File "${file.name}" is not an image`)
            }
        })

        // Update state
        setSelectedFiles(newSelectedFiles)
        setPreviewUrls(newPreviewUrls)
    }

    const removeImage = (index: number) => {
        // Create new arrays without the item at the specified index
        const newSelectedFiles = selectedFiles.filter((_, i) => i !== index)

        // Revoke the object URL to avoid memory leaks
        URL.revokeObjectURL(previewUrls[index])
        const newPreviewUrls = previewUrls.filter((_, i) => i !== index)

        setSelectedFiles(newSelectedFiles)
        setPreviewUrls(newPreviewUrls)
    }

    // Clean up object URLs when component unmounts
    useEffect(() => {
        return () => {
            previewUrls.forEach((url) => URL.revokeObjectURL(url))
        }
    }, [previewUrls])

    const onSubmit = async (data: FormData) => {
        if (selectedFiles.length === 0) {
            toast.error("Please upload at least one image")
            return
        }

        setIsSubmitting(true)
        const loadingToast = toast.loading("Uploading images and submitting product...")

        try {
            // Upload images to the hosting service
            const uploadPromises = selectedFiles.map(async (file) => {
                const formData = new FormData()
                formData.append("image", file)

                try {
                    const response = await fetch(
                        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY}`,
                        {
                            method: "POST",
                            body: formData,
                        },
                    )

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`)
                    }

                    const responseData = await response.json()
                    if (responseData.success) {
                        return responseData.data.url
                    } else {
                        throw new Error(responseData.error?.message || "Image upload failed")
                    }
                } catch (error) {
                    console.error(`Error uploading image ${file.name}:`, error)
                    throw new Error(`Failed to upload ${file.name}`)
                }
            })

            // Wait for all images to upload
            const imageUrls = await Promise.all(uploadPromises)

            // Format images for the backend
            const formattedImages = imageUrls.map((url) => ({
                [`src`]: url,
            }))

            // Prepare the data to be sent
            const postData = {
                ...data,
                images: formattedImages,
            }

            // Send the data to the backend
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/products/add-product`, postData, {
                headers: {
                    "Content-Type": "application/json",
                },
                timeout: 10000, // 10 seconds timeout
            })

            // Handle success
            toast.dismiss(loadingToast)
            if (response.status >= 200 && response.status < 300) {
                toast.success("Product submitted successfully")

                // Reset form and state
                reset()
                setSelectedFiles([])
                setPreviewUrls([])
                setSelectedSizes([])
            } else {
                throw new Error(`Unexpected response status: ${response.status}`)
            }
        } catch (error: unknown) {
            toast.dismiss(loadingToast)
            console.error("Error submitting product:", error)

            if (axios.isAxiosError(error) && error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                toast.error(`Server error: ${error.response.data?.message || error.response.statusText || "Unknown error"}`)
            } else if (axios.isAxiosError(error) && error.request) {
                toast.error("No response from server. Please check your connection and try again.")
            } else if (error instanceof Error && error.message.includes("upload")) {
                toast.error("Failed to upload images. Please try again.")
            } else {
                if (error instanceof Error) {
                    toast.error(`Error: ${error.message || "Something went wrong"}`)
                } else {
                    toast.error("An unknown error occurred")
                }
            }
        } finally {
            setIsSubmitting(false)
        }
    }

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
        } else if (newSize.trim() && availableSizes.includes(newSize)) {
            toast.error("This size already exists")
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
        } else if (newCategory.trim()) {
            toast.error("This category already exists")
            setShowAddCategory(false)
            setNewCategory("")
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
        } else if (newSubCategory.trim()) {
            toast.error("This subcategory already exists")
            setShowAddSubCategory(false)
            setNewSubCategory("")
        }
    }

    // Update form validation for images based on selected files
    useEffect(() => {
        // We're just setting an array of placeholder values for validation
        // The actual image URLs will be obtained after upload during form submission
        setValue(
            "images",
            selectedFiles.map((_, index) => `placeholder-${index}`),
            { shouldValidate: true },
        )
    }, [selectedFiles, setValue])

    const watchCategory = watch("category")
    // const watchPrice = watch("price")

    return (
        <div className="w-full mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-gray-800 to-gray-600 p-6">
                    <h2 className="text-2xl font-bold text-white">Add New Product</h2>
                    <p className="text-indigo-100">Fill in the details to add a new product to your inventory</p>
                </div>

                {isLoading ? (
                    <div className="p-6 flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-7">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 ml-0.5">Product Name</label>
                                    <input
                                        {...register("name")}
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        placeholder="Enter product name"
                                        disabled={isSubmitting}
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                                </div>

                                <div className="gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 ml-0.5">Price</label>
                                        <input
                                            type="number"
                                            {...register("price")}
                                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                            placeholder="0.00"
                                            disabled={isSubmitting}
                                        />
                                        {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1 ml-0.5">Description</label>
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
                                    <label className="block text-sm font-medium mb-1 ml-0.5">Sizes</label>
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
                                    <label className="block text-sm font-medium mb-1 ml-0.5">Color</label>
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

                            {/* Categories and Subcategories */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 ml-0.5">Category</label>
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
                                    <label className="block text-sm font-medium mb-1 ml-0.5">Sub-Category</label>
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

                                {/* Images */}
                                <div>
                                    <label className="block text-sm font-medium mb-1 ml-0.5">Upload Images (Max: 3)</label>
                                    <div
                                        className={`border-2 border-dashed ${isDragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300"} rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors`}
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop}
                                        onDragEnter={handleDragEnter}
                                        onDragLeave={handleDragLeave}
                                    >
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id="image-upload"
                                            disabled={isSubmitting || selectedFiles.length >= 3}
                                        />
                                        <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                                            <Upload className="h-8 w-8 text-indigo-500 mb-2" />
                                            <p className="text-sm font-medium">
                                                {isDragging ? "Drop images here" : "Drag & drop or click to upload"}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">{`${selectedFiles.length}/3 images uploaded`}</p>
                                        </label>
                                    </div>
                                    {errors.images && <p className="mt-1 text-sm text-red-500">{errors.images.message}</p>}
                                </div>

                                {selectedFiles.length > 0 && (
                                    <div className="grid grid-cols-3 gap-3 mt-3">
                                        {/* Render selected files */}
                                        {previewUrls.map((url, index) => (
                                            <div key={index} className="relative group aspect-square rounded-md overflow-hidden border">
                                                {/* Image Preview */}
                                                <Image
                                                    src={url || "/placeholder.svg"}
                                                    alt={`Product image ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                                {/* Remove Button */}
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

                                        {/* Render empty slots */}
                                        {Array.from({ length: 3 - selectedFiles.length }).map((_, index) => (
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
                                {/* <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <h3 className="font-medium mb-2 text-indigo-600 dark:text-indigo-400">Product Preview</h3>
                                    <div className="flex items-baseline gap-2">
                                        {typeof watchPrice === "number" ? (
                                            <span className="text-xl font-bold">${watchPrice.toFixed(2)}</span>
                                        ) : (
                                            <span className="text-xl font-bold text-gray-400">$0.00</span>
                                        )}
                                    </div>
                                </div> */}
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
                )}
            </div>
            <Toaster />
        </div>
    )
}