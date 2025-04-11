"use client";
import { CartItem, FormData } from "@/types/formData";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"

const Checkout = () => {
  const { register, handleSubmit, getValues } = useForm<FormData>();
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [showModal, setShowModal] = useState(false);
  const [modalPaymentMethod, setModalPaymentMethod] = useState("cash");
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    const fetchCartData = async () => {
      if (!email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/carts/get-cart-items`, {
          params: { email },
        });

        if (Array.isArray(response.data)) {
          setCartData(response.data);
        } else if (response.data.cartItems && Array.isArray(response.data.cartItems)) {
          setCartData(response.data.cartItems);
        } else if (response.data.products && Array.isArray(response.data.products)) {
          setCartData(response.data.products);
        } else {
          setError("Invalid cart data structure");
        }
      } catch (err) {
        console.error("Error fetching cart data:", err);
        setError("Failed to load cart data");
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [email]);

  const onSubmit = () => {
    // Show modal instead of submitting directly
    setShowModal(true);
  };

  const handleConfirmOrder = async () => {
    setIsSubmitting(true);

    try {
      // Get all form values
      const formValues = getValues();

      // Prepare complete order data
      const orderData = {
        billingInformation: {
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          companyName: formValues.companyName,
          address: formValues.address,
          email: formValues.email,
          phoneNumber: formValues.phoneNumber
        },
        cartItems: cartData.map(item => ({
          productId: item.productId,
          productName: item.productName,
          productPrice: item.productPrice,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
          image: item.images[0]?.src || "/placeholder-image.jpg"
        })),
        orderSummary: {
          subTotal: subTotal,
          shipping: shipping,
          total: total
        },
        paymentMethod: modalPaymentMethod,
        shippingCharge: shipping,
        total: total,
        email: email
      };

      try {
        setError("");

        if (modalPaymentMethod === "cash") {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/paymentMethod/cashOnDelivery`,
            orderData
          );

          console.log("Cash on delivery order successful:", response.data);
          setShowModal(false);
          localStorage.removeItem("cartItems");
          router.push(`${process.env.FRONTEND_URL}/paymentSuccess`);

        } else if (modalPaymentMethod === "bkash") {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/paymentMethod/bkash/create`,

            {
              products: orderData.cartItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
              email: orderData.email,
              shippingCharge: shipping,
              info: orderData.billingInformation,
            },
            { withCredentials: true }

          );

          // console.log(response.data)

          if (response.data.bkashURL) {

            localStorage.removeItem("cartItems");

            return window.location.href = response.data.bkashURL
          }


          // TO DO: Bkash er error er kaj baki ace

        }
      } catch (err) {
        console.error("Error submitting order:", err);
        if (axios.isAxiosError(err) && err.response?.data) {
          setError(
            err.response.data.error ||
            err.response.data.message ||
            "Failed to submit order. Please try again."
          );
        } else {
          setError("Failed to submit order. Please try again.");
        }
      }


    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate Order Summary
  const subTotal = cartData.reduce((acc, item) => acc + (item.productPrice * item.quantity), 0);
  // const shipping = subTotal > 500 ? 0 : 10;
  const shipping = 0;
  const total = subTotal + shipping;

  if (!session) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Please log in to view your cart</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Loading your cart...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h2 className="text-xl font-bold mb-4 text-red-500">{error}</h2>
      </div>
    );
  }

  if (cartData.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 gap-8">
      {/* Billing Form */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Billing Information</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  {...register("firstName", { required: "First name is required" })}
                  placeholder="First name"
                  className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="relative">
                <input
                  {...register("lastName", { required: "Last name is required" })}
                  placeholder="Last name"
                  className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="relative col-span-2">
                <input
                  {...register("companyName")}
                  placeholder="Company name (Optional)"
                  className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="relative col-span-2">
                <input
                  {...register("address", { required: "Address is required" })}
                  placeholder="Address"
                  className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="relative col-span-2">
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  type="email"
                  defaultValue={`${email}`}
                  className="w-full border border-gray-300 p-3 rounded-lg shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                  disabled
                />
              </div>
              <div className="relative col-span-2">
                <input
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                  })}
                  placeholder="Phone number"
                  className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>


            {/* Order Summary */}
            <div className="border shadow-md rounded-lg p-4">
              <div className="p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  {cartData.map((item) => (
                    <div key={item.productId} className="border-b pb-2">
                      <div className="flex items-center gap-4">
                        <Image
                          src={item.images[0]?.src || "/placeholder-image.jpg"}
                          alt={item.productName}
                          width={100}
                          height={100}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-sm text-gray-500">{item.productPrice} tk</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 my-4 mx-2">
                        <p className="text-sm text-gray-500">{item.quantity} x</p>
                        <p className="text-sm text-[#0FABCA] font-[600]">{item.totalPrice} tk</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="flex justify-between"><span>Subtotal :</span> <span>{subTotal} tk</span></p>
                <p className="flex justify-between"><span>Shipping:</span> <span>{shipping} tk</span></p>
                <p className="flex justify-between font-bold text-lg"><span>Total:</span> <span>{total} tk</span></p>
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-800 hover:to-purple-700 text-white py-2 rounded-lg transition cursor-pointer"
              >
                Submit Order
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Payment Confirmation Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(1px)',
            WebkitBackdropFilter: 'blur(1px)'
          }}
        >
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-xl border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Confirm Payment Method</h2>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4 p-3 border rounded hover:bg-gray-50">
                <input
                  type="radio"
                  id="modal-cash"
                  name="modalPayment"
                  value="cash"
                  checked={modalPaymentMethod === "cash"}
                  onChange={() => setModalPaymentMethod("cash")}
                  className="h-5 w-5"
                />
                <label htmlFor="modal-cash" className="flex items-center gap-2 cursor-pointer w-full">
                  <span className="text-2xl">💵</span>
                  <div>
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Pay when you receive the order</p>
                  </div>
                </label>
              </div>

              <div className="flex items-center gap-4 p-3 border rounded hover:bg-gray-50">
                <input
                  type="radio"
                  id="modal-bkash"
                  name="modalPayment"
                  value="bkash"
                  checked={modalPaymentMethod === "bkash"}
                  onChange={() => setModalPaymentMethod("bkash")}
                  className="h-5 w-5"
                />
                <label htmlFor="modal-bkash" className="flex items-center gap-2 cursor-pointer w-full">
                  <span className="text-2xl">
                    <Image src="https://freelogopng.com/images/all_img/1656235223bkash-logo.png" alt="Bkash Logo" width={40} height={40} />
                  </span>
                  <div>
                    <p className="font-medium">Bkash Payment</p>
                    <p className="text-sm text-gray-500">Pay via bKash mobile payment</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-100 transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmOrder}
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <h1 className="cursor-not-allowed">Processing...</h1>
                  </>
                ) : (
                  "Confirm Order"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;