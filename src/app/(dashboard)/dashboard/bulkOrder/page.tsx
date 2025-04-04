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
import getProducts from "@/apiAction/getProducts";
import withAdminAuth from "@/components/Secure/WithAdminAuth";
import { Order } from "@/types/OrderProps";
import { useSession } from "next-auth/react";

const Page = () => {

  const [orderData, setOrderData] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { data } = useSession();
  useEffect(() => {
    const fetchBulkProduct = async () => {
      const response = await getProducts({ products: `/bulkOrder?email=${data?.user?.email}` })
      setOrderData(response)
    }
    fetchBulkProduct()
  }, [data?.user?.email])

  return (
    <div className="container mx-auto p-4">
      <div className=" rounded-lg  h-[80vh] ">

        <div className="h-full">
          <div className="">
            <table className="w-full min-w-max bg-white">
              <thead className="sticky top-0 text-white bg-[#364153] shadow">
                <tr className="border-b">
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Company</th>
                  <th className="p-3 border">Product Type</th>
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orderData?.length > 0 ? (
                  orderData?.map((order, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3 border">{order.name}</td>
                      <td className="p-3 border">{order.email}</td>
                      <td className="p-3 border">{order.company}</td>
                      <td className="p-3 border">{order.productType}</td>
                      <td className="p-3 border">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="cursor-pointer"
                              variant={'outline'}
                              onClick={() => setSelectedOrder(order)}
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-l mx-auto">
                            <DialogHeader>
                              <DialogTitle>Order Details</DialogTitle>
                              <DialogDescription>
                                {selectedOrder && (
                                  <div className="space-y-2 overflow-y-auto max-h-[60vh] p-2">

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
                    <td colSpan={5} className="text-center p-4">
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

export default withAdminAuth(Page)
