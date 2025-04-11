"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CircleX } from "lucide-react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  images: { src: string }[];
  image: { src: string }[];
  color?: string;
  size?: string;
};

const CartPage = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  // console.log(cartData)

  useEffect(() => {
    const loadCartData = () => {
      try {
        const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
        const formattedItems = items.map((item: Partial<CartItem>) => ({
          ...item,
          price: Number(item.price) || 0,
          quantity: Number(item.quantity) || 1,
        }));
        setCartData(formattedItems);
      } catch (error) {
        console.error("Error loading cart data:", error);
        setCartData([]);
      }
    };

    loadCartData();
  }, []);


  const updateQuantity = (index: number, newQuantity: number) => {
    setCartData(prevCart => {
      const updatedCart = [...prevCart];
      updatedCart[index] = {
        ...updatedCart[index],
        quantity: Math.max(1, newQuantity)
      };
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const totalPrice = cartData.reduce((total, item) => total + item.price * item.quantity, 0);

  // handleRemoveProduct
  const handleRemoveProduct = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will remove the item from your cart",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    });

    if (result.isConfirmed) {
      try {
        const updatedCartItems = cartData.filter((item) => item._id !== id);
        setCartData(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

        Swal.fire({
          title: "Removed!",
          text: "The item has been removed from your cart.",
          icon: "success",
        });
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: "An error occurred while removing the item.",
          icon: "error",
        });
        console.error(err);
      }
    }
  };


  // handleProceedButton
  const handleProceedButton = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!session) {
      toast.error("Please login to proceed to checkout.")
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      return;
    }

    const selectedProducts = cartData.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    }));

    // console.log(selectedProducts)
    const email = session.user?.email;

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/carts/add-to-cart`,
        {
          products: selectedProducts,
          email: email,
        }
      );
      toast.success('Products added to cart successfully!');

      // Optional: redirect to checkout
      router.push("/shipping");
    } catch {
      toast.error('Failed to add products to cart');

    }
  };



  return (
    <div className="p-4 bg-gray-100 flex justify-center">
      <div className="w-full max-w-4xl bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          Your Cart <span className="text-gray-500">({cartData.length} items)</span>
        </h1>

        {cartData.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg">Your cart is empty</p>
            <Link href="/shop">
              <button className="mt-4 px-6 py-2 bg-black text-white rounded-lg transition-colors cursor-pointer">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b pb-4 mb-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 text-left">Image</th>
                    <th className="p-2 text-left">Product Name</th>
                    <th className="p-2">Quantity</th>
                    <th className="p-2 text-right">Price</th>
                    <th className="p-2 text-left">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((item, index) => (
                    <tr key={item._id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-2 text-center align-middle">
                        <div className="w-16 h-16 flex items-center justify-center mx-auto my-2">

                          {item.image || (item.images && item.images[0]?.src) ? (
                            <Image
                              src={typeof item.image === "string" ? item.image : item.images[0]?.src || ""}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="object-cover rounded"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                              <span className="text-xs text-gray-500">
                                {item.name ? item.name.substring(0, 10) + (item.name.length > 10 ? "..." : "") : "No Image"}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="p-2">
                        <Link
                          href={`/product-details/${item._id}`}
                          className="font-medium hover:underline hover:text-blue-600 transition-colors"
                        >
                          {item.name}
                        </Link>
                        {(item.color || item.size) && (
                          <div className="text-xs text-gray-500 mt-1">
                            {item.color && <span>Color: {item.color}</span>}
                            {item.color && item.size && <span className="mx-1">|</span>}
                            {item.size && <span>Size: {item.size}</span>}
                          </div>
                        )}
                      </td>

                      <td className="p-2 text-center align-middle">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            className="w-8 h-8 border rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            className="w-8 h-8 border rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td className="p-2 text-right align-middle">
                        {(item.price * item.quantity)} tk
                      </td>

                      <td className="p-2 text-center align-middle">
                        <button
                          onClick={() => handleRemoveProduct(item._id)}
                          className="hover:text-red-500 transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <CircleX className="w-6 h-6" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 border rounded-lg bg-gray-50">
              <div className="flex justify-between font-semibold">
                <span>Subtotal:</span>
                <span>{totalPrice} tk</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Shipping Charge:</span>
                <span>0.00 tk</span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t">
                <span>Total:</span>
                <span>{totalPrice} tk</span>
              </div>

              <button
                className="w-full mt-4 p-3 bg-black text-white rounded-lg cursor-pointer transition-colors"
                onClick={handleProceedButton}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
      <Toaster />

    </div>
  );
};

export default CartPage;