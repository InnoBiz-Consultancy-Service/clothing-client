"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [orderData, setOrderData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/bulkOrder")
      .then((res) => res.json())
      .then((data) => setOrderData(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="border border-gray-300 rounded-lg shadow-md overflow-hidden">
        <div className="max-h-[80vh] overflow-y-auto">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="sticky top-0 text-white bg-gradient-to-r from-gray-800 to-purple-700 shadow">
                <tr className="border-b">
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Company</th>
                  <th className="p-3 border">Product Type</th>
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orderData.length > 0 ? (
                  orderData.map((order, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3 border">{order.name}</td>
                      <td className="p-3 border">{order.email}</td>
                      <td className="p-3 border">{order.company}</td>
                      <td className="p-3 border">{order.productType}</td>
                      <td className="p-3 border">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="bg-gradient-to-r from-[#5652ca] to-[#73145b]  hover:from-[#73145b] hover:to-[#5652ca] "
                              onClick={() => setSelectedOrder(order)}
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-lg mx-auto">
                            <DialogHeader>
                              <DialogTitle>Order Details</DialogTitle>
                              <DialogDescription>
                                {selectedOrder && (
                                  <div className="space-y-2 overflow-y-auto max-h-[60vh] p-2">
                                    <p>
                                      <strong className="text-black">
                                        Product ID:
                                      </strong>{" "}
                                      {selectedOrder._id}
                                    </p>
                                    <p>
                                      <strong className="text-black">
                                        Name:
                                      </strong>{" "}
                                      {selectedOrder.name}
                                    </p>
                                    <p>
                                      <strong className="text-black">
                                        Email:
                                      </strong>{" "}
                                      {selectedOrder.email}
                                    </p>
                                    <p>
                                      <strong className="text-black">
                                        Phone:
                                      </strong>{" "}
                                      {selectedOrder.phone}
                                    </p>
                                    <p>
                                      <strong className="text-black">
                                        Company:
                                      </strong>{" "}
                                      {selectedOrder.company}
                                    </p>
                                    <p>
                                      <strong className="text-black">
                                        Product Type:
                                      </strong>{" "}
                                      {selectedOrder.productType}
                                    </p>
                                    <p>
                                      <strong className="text-black">
                                        Quantity:
                                      </strong>{" "}
                                      {selectedOrder.quantity}
                                    </p>
                                    <p>
                                      <strong className="text-black">
                                        Delivery Date:
                                      </strong>{" "}
                                      {selectedOrder.deliveryDate}
                                    </p>
                                    <p>
                                      <strong className="text-black">
                                        Description:
                                      </strong>{" "}
                                      {selectedOrder.description}
                                    </p>
                                  </div>
                                )}
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4">
                      No orders available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
