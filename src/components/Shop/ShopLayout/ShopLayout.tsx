// "use client"
// import getNavbarData from "@/apiAction/getNavbarData"
// import { Checkbox } from "@/components/ui/checkbox"
// import type { navProps } from "@/types/navProps"
// import { Label } from "@radix-ui/react-label"
// import type React from "react"
// import { useEffect, useState } from "react"
// import { Filter } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import { useParams } from "next/navigation";
// const ShopLayout: React.FC = () => {
//     const [categories, setCategories] = useState([])
//     const [isOpen, setIsOpen] = useState(false)


//     const params = useParams();
//     const category = params.category;
//     const product = params.subCategory;

//     console.log("Category:", category);
//     console.log("Product:", product);


//     useEffect(() => {
//         const fetchNav = async () => {
//             const response = await getNavbarData()
//             setCategories(response)
//         }
//         fetchNav()
//     }, [])

//     const FilterContent = () => (
//         <div className="w-full space-y-6">
//             <h3 className="text-lg font-semibold">Filter Products</h3>

//             <div className="space-y-6">
//                 {categories.map((category: navProps) => (
//                     <div key={category._id} className="space-y-3">
//                         <div className="flex items-center space-x-2">
//                             <Checkbox id={`category-${category._id}`} />
//                             <Label htmlFor={`category-${category._id}`} className="text-sm font-medium cursor-pointer">
//                                 {category.title}
//                             </Label>
//                         </div>

//                         <div className="space-y-2 pl-6">
//                             {category.items.map((subcategory, idx) => (
//                                 <div key={idx} className="flex items-center space-x-2">
//                                     <Checkbox className="cursor-pointer" id={`${category.title}-${subcategory.name}`} />
//                                     <Label htmlFor={`${category.title}-${subcategory.name}`} className="text-sm font-normal cursor-pointer">
//                                         {subcategory.name}
//                                     </Label>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )

//     return (
//         <>
//             {/* Mobile Filter Button - Only visible on mobile */}
//             <div className="md:hidden mb-4">
//                 <Sheet open={isOpen} onOpenChange={setIsOpen}>
//                     <SheetTrigger asChild>
//                         <Button variant="outline" size="icon" className="flex items-center gap-2">
//                             <Filter className="h-5 w-5" />
//                             <span className="sr-only md:not-sr-only md:inline-block">Filters</span>
//                         </Button>
//                     </SheetTrigger>
//                     <SheetContent side="left" className="w-[280px] sm:w-[350px]">
//                         <FilterContent />
//                     </SheetContent>
//                 </Sheet>
//             </div>

//             {/* Desktop Filter - Hidden on mobile */}
//             <div className="hidden md:block">
//                 <FilterContent />
//             </div>
//         </>
//     )
// }

// export default ShopLayout

// "use client";
// import getNavbarData from "@/apiAction/getNavbarData";
// import { Checkbox } from "@/components/ui/checkbox";
// import type { navProps } from "@/types/navProps";
// import { Label } from "@radix-ui/react-label";
// import type React from "react";
// import { useEffect, useState } from "react";
// import { Filter } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { useParams } from "next/navigation";

// const ShopLayout: React.FC = () => {
//     const [categories, setCategories] = useState<navProps[]>([]);
//     const [isOpen, setIsOpen] = useState(false);
//     const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//     const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);

//     const params = useParams();
//     const category = params.category;
//     const product = params.subCategory;

//     console.log("Category:", category);
//     console.log("Product:", product);

//     useEffect(() => {
//         const fetchNav = async () => {
//             const response = await getNavbarData();
//             setCategories(response);
//         };
//         fetchNav();
//     }, []);

//     const handleCategoryChange = (category: string) => {
//         const newCategories = selectedCategories.includes(category)
//             ? selectedCategories.filter((cat) => cat !== category)
//             : [...selectedCategories, category];
//         setSelectedCategories(newCategories);
//     };

//     const handleSubcategoryChange = (subcategory: string, parentCategory: string) => {
//         // Remove the parent category name from the subcategory value
//         const formattedSubcategory = subcategory.replace(`${parentCategory}-`, "");

//         const newSubcategories = selectedSubcategories.includes(formattedSubcategory)
//           ? selectedSubcategories.filter((sub) => sub !== formattedSubcategory)
//           : [...selectedSubcategories, formattedSubcategory];

//         if (!selectedCategories.includes(parentCategory)) {
//           setSelectedCategories([...selectedCategories, parentCategory]);
//         }

//         setSelectedSubcategories(newSubcategories);
//       };

//     useEffect(() => {
//         const queryParams = new URLSearchParams();
//         if (selectedCategories.length > 0) {
//             queryParams.set("category", selectedCategories.join(","));
//         }
//         if (selectedSubcategories.length > 0) {
//             queryParams.set("subcategory", selectedSubcategories.join(","));
//         }
//         const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
//         window.history.replaceState(null, "", newUrl);
//     }, [selectedCategories, selectedSubcategories]);

//     const FilterContent = () => (
//         <div className="w-full space-y-6">
//             <h3 className="text-lg font-semibold">Filter Products</h3>
//             <div className="space-y-6">
//                 {categories.map((category: navProps) => (
//                     <div key={category._id} className="space-y-3">
//                         <div className="flex items-center space-x-2">
//                             <Checkbox
//                                 id={`category-${category._id}`}
//                                 checked={selectedCategories.includes(category.title)}
//                                 onCheckedChange={() => handleCategoryChange(category.title)}
//                             />
//                             <Label htmlFor={`category-${category._id}`} className="text-sm font-medium cursor-pointer">
//                                 {category.title}
//                             </Label>
//                         </div>
//                         <div className="space-y-2 pl-6">
//                             {category.items.map((subcategory) => {
//                                 const uniqueSubcategoryId = `${category.title}-${subcategory.name}`; // Unique ID
//                                 return (
//                                     <div key={uniqueSubcategoryId} className="flex items-center space-x-2">
//                                         <Checkbox
//                                             id={uniqueSubcategoryId}
//                                             checked={selectedSubcategories.includes(uniqueSubcategoryId)}
//                                             onCheckedChange={() => handleSubcategoryChange(uniqueSubcategoryId, category.title)}
//                                         />
//                                         <Label htmlFor={uniqueSubcategoryId} className="text-sm font-normal cursor-pointer">
//                                             {subcategory.name}
//                                         </Label>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );

//     return (
//         <>
//             <div className="md:hidden mb-4">
//                 <Sheet open={isOpen} onOpenChange={setIsOpen}>
//                     <SheetTrigger asChild>
//                         <Button variant="outline" size="icon" className="flex items-center gap-2">
//                             <Filter className="h-5 w-5" />
//                             <span className="sr-only md:not-sr-only md:inline-block">Filters</span>
//                         </Button>
//                     </SheetTrigger>
//                     <SheetContent side="left" className="w-[280px] sm:w-[350px]">
//                         <FilterContent />
//                     </SheetContent>
//                 </Sheet>
//             </div>
//             <div className="hidden md:block">
//                 <FilterContent />
//             </div>
//         </>
//     );
// };

// export default ShopLayout;


// "use client";
// import getNavbarData from "@/apiAction/getNavbarData";
// import { Checkbox } from "@/components/ui/checkbox";
// import type { navProps } from "@/types/navProps";
// import { Label } from "@radix-ui/react-label";
// import type React from "react";
// import { useEffect, useState } from "react";
// import { Filter } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { useSearchParams } from "next/navigation";

// const ShopLayout: React.FC = () => {
//     const [categories, setCategories] = useState<navProps[]>([]);
//     const [isOpen, setIsOpen] = useState(false);
//     const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//     const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);

//     const params = useParams();
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const categoryParam = params.category;
//     const productParam = params.subCategory;

//     // Load filter states from URL on initial load
//     useEffect(() => {
//         const categoryQuery = searchParams.get('category');
//         const subcategoryQuery = searchParams.get('subcategory');

//         if (categoryQuery) {
//             setSelectedCategories(categoryQuery.split(','));
//         }

//         if (subcategoryQuery) {
//             setSelectedSubcategories(subcategoryQuery.split(','));
//         }
//     }, [searchParams]);

//     useEffect(() => {
//         const fetchNav = async () => {
//             const response = await getNavbarData();
//             setCategories(response);
//         };
//         fetchNav();
//     }, []);

//     const handleCategoryChange = (category: string) => {
//         const newCategories = selectedCategories.includes(category)
//             ? selectedCategories.filter((cat) => cat !== category)
//             : [...selectedCategories, category];
//         setSelectedCategories(newCategories);
//     };

//     const handleSubcategoryChange = (subcategory: string) => {
//         const newSubcategories = selectedSubcategories.includes(subcategory)
//             ? selectedSubcategories.filter((sub) => sub !== subcategory)
//             : [...selectedSubcategories, subcategory];

//         setSelectedSubcategories(newSubcategories);
//     };

//     // Update URL when filters change
//     useEffect(() => {
//         const queryParams = new URLSearchParams();
//         if (selectedCategories.length > 0) {
//             queryParams.set("category", selectedCategories.join(","));
//         }
//         if (selectedSubcategories.length > 0) {
//             queryParams.set("subcategory", selectedSubcategories.join(","));
//         }
//         const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
//         window.history.replaceState(null, "", newUrl);
//     }, [selectedCategories, selectedSubcategories]);

//     const FilterContent = () => (
//         <div className="w-full max-h-screen overflow-y-auto space-y-6">
//             <h3 className="text-lg font-semibold">Filter Products</h3>
//             <div className="space-y-6">
//                 {categories.map((category: navProps) => (
//                     <div key={category._id} className="space-y-3">
//                         <div className="flex items-center space-x-2">
//                             <Checkbox
//                                 id={`category-${category._id}`}
//                                 checked={selectedCategories.includes(category.title)}
//                                 onCheckedChange={() => handleCategoryChange(category.title)}
//                             />
//                             <Label htmlFor={`category-${category._id}`} className="text-sm font-medium cursor-pointer">
//                                 {category.title}
//                             </Label>
//                         </div>
//                         <div className="space-y-2 pl-6">
//                             {category.items.map((subcategory) => (
//                                 <div key={subcategory.name} className="flex items-center space-x-2">
//                                     <Checkbox
//                                         id={`${category.title}-${subcategory.name}`}
//                                         checked={selectedSubcategories.includes(subcategory.name)}
//                                         onCheckedChange={() => handleSubcategoryChange(subcategory.name)}
//                                     />
//                                     <Label 
//                                         htmlFor={`${category.title}-${subcategory.name}`} 
//                                         className="text-sm font-normal cursor-pointer"
//                                     >
//                                         {subcategory.name}
//                                     </Label>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );

//     return (
//         <>
//             <div className="md:hidden mb-4">
//                 <Sheet open={isOpen} onOpenChange={setIsOpen}>
//                     <SheetTrigger asChild>
//                         <Button variant="outline" size="icon" className="flex items-center gap-2">
//                             <Filter className="h-5 w-5" />
//                             <span className="sr-only md:not-sr-only md:inline-block">Filters</span>
//                         </Button>
//                     </SheetTrigger>
//                     <SheetContent side="left" className="w-[280px] sm:w-[350px]">
//                         <FilterContent />
//                     </SheetContent>
//                 </Sheet>
//             </div>
//             <div className="hidden md:block">
//                 <FilterContent />
//             </div>
//         </>
//     );
// };

// export default ShopLayout;

"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Filter } from "lucide-react"
import getNavbarData from "@/apiAction/getNavbarData"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import type { navProps } from "@/types/navProps"

const ShopFilter = () => {
  const [categories, setCategories] = useState<navProps[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])

  const params = useParams()
  const category = params.category as string
  const subCategory = params.subCategory as string

  // Load filter states from URL on initial load
  useEffect(() => {
    const fetchNav = async () => {
      const response = await getNavbarData()
      setCategories(response)
    }
    fetchNav()

    if (category) {
      setSelectedCategories(category.split(","))
    }

    if (subCategory) {
      setSelectedSubcategories(subCategory.split(","))
    }
  }, [category, subCategory])

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((cat) => cat !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategories((prev) => {
      if (prev.includes(subcategory)) {
        return prev.filter((sub) => sub !== subcategory)
      } else {
        return [...prev, subcategory]
      }
    })
  }

  // Update URL when filters change
  useEffect(() => {
    if (categories.length === 0) return

    const params = new URLSearchParams(window.location.search)

    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories.join(","))
    } else {
      params.delete("category")
    }

    if (selectedSubcategories.length > 0) {
      params.set("subcategory", selectedSubcategories.join(","))
    } else {
      params.delete("subcategory")
    }

    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`
    window.history.pushState(null, "", newUrl)
  }, [selectedCategories, selectedSubcategories, categories])

  const FilterContent = () => (
    <div className="w-full max-h-screen overflow-y-auto space-y-6">
      <h3 className="text-lg font-semibold">Filter Products</h3>
      <div className="space-y-6">
        {categories.map((category: navProps) => (
          <div key={category._id} className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category._id}`}
                checked={selectedCategories.includes(category.title)}
                onCheckedChange={() => handleCategoryChange(category.title)}
              />
              <Label htmlFor={`category-${category._id}`} className="text-sm font-medium cursor-pointer">
                {category.title}
              </Label>
            </div>
            {category.items && category.items.length > 0 && (
              <div className="space-y-2 pl-6">
                {category.items.map((subcategory) => (
                  <div key={`${category._id}-${subcategory.name}`} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${category._id}-${subcategory.name}`}
                      checked={selectedSubcategories.includes(subcategory.name)}
                      onCheckedChange={() => handleSubcategoryChange(subcategory.name)}
                    />
                    <Label
                      htmlFor={`${category._id}-${subcategory.name}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {subcategory.name}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <>
      <div className="md:hidden mb-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              <span className="sr-only md:not-sr-only md:inline-block">Filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] sm:w-[350px]">
            <FilterContent />
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:block">
        <FilterContent />
      </div>
    </>
  )
}

export default ShopFilter