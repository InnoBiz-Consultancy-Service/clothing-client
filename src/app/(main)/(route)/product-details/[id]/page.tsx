"use client"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import getProducts from "@/apiAction/getProducts"
import { ProductProps } from "@/types/productProps"
import { Loader } from "@/components/Loader/Loader"
import toast, { Toaster } from 'react-hot-toast';


export default function ProductDetails({ params }: { params: { id: string } }) {
  const [details, setDetails] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const id = params.id;

  // console.log(details)

  useEffect(() => {
    if (!id) {
      setError("Product ID not found");
      setLoading(false);
      return;
    }

    const fetchProductDetails = async () => {
      try {
        // const response = await getProducts({ products: `/products/${id}` });
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        const response = await getProducts({ products: `${baseUrl}/products/${id}` });
        setDetails(response);
      } catch (err) {
        setError(`Failed to fetch product details. ${err}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);



  // handleAddToCart 
  const handleAddToCart = (details: ProductProps | null) => {
    console.log(details)
    try {
      // Save product to local storage
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

      const isProductInCart: boolean = cartItems.some((item: ProductProps) => item._id === details?._id);

      if (!isProductInCart) {
        cartItems.push(details);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        if (details) {
          toast.success(`${details.name} added to cart successfully!`);
        }
      } else {
        toast.error(`${details?.name} is already in the cart!`)
      }
    } catch {
      toast.error("Failed to add product to cart. Please try again.")

    }
  }


  if (loading) {
    return <div className="container mx-auto flex justify-center h-screen items-center px-4 py-8">
      <Loader />
    </div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images Section */}
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden border border-border">
            <Carousel>
              <CarouselContent>
                {details?.images?.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-square w-full">
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={`${details.name} - View ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold">{details?.name}</h1>
              <div className="flex space-x-2">
                <Badge variant="outline" className="bg-primary/10">
                  {details?.category}
                </Badge>
                <Badge variant="outline" className="bg-primary/10">
                  {details?.subCategory}
                </Badge>
              </div>
            </div>
            <p className="text-2xl font-semibold mt-2">৳{details?.price}</p>
          </div>

          <Card className="p-4 bg-muted/30">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{details?.description}</p>
          </Card>

          <div>
            <h3 className="font-medium mb-3">Color</h3>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-olive-600" title={details?.colors}></div>
              <span>{details?.colors}</span>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Select Size</h3>
            <div className="flex flex-wrap gap-2">
              {details?.sizes?.map((size) => (
                <Button
                  key={size}
                  variant="outline"
                  className="h-10 px-4"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap gap-2 cursor-pointer">
              <Button
                variant="outline"
                className="h-10 px-4 cursor-pointer bg-blue-200"
                onClick={() => handleAddToCart(details)}
              >
                Add To Cart
              </Button>
            </div>
          </div>


          <div className="pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="px-3 py-1">
                100% Original
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                Ten Rush Bangladesh Ltd.
              </Badge>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </div>
  );
}
