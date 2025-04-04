"use client"
import React, { useEffect, useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import getProducts from "@/apiAction/getProducts"
import withAdminAuth from "@/components/Secure/WithAdminAuth"
import { useSession } from "next-auth/react"
import { Order } from "@/types/OrderProps"

const Page = () => {
  const [orderData, setOrderData] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [totalItems, setTotalItems] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { data } = useSession()

  useEffect(() => {
    const fetchBulkProduct = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await getProducts({
          products: `/bulkOrder?email=${data?.user?.email}&page=${currentPage}&limit=${itemsPerPage}`,
        })

        // Handle the server response structure
        if (response && response.data && Array.isArray(response.data)) {
          setOrderData(response.data)
          setTotalItems(response.totalOrders || 0)
        } else {
          setError("Unexpected data format received from server")
          setOrderData([])
          setTotalItems(0)
        }
      } catch (error) {
        console.error("Error fetching orders:", error)
        setError("Failed to load orders. Please try again.")
        setOrderData([])
        setTotalItems(0)
      } finally {
        setIsLoading(false)
      }
    }

    if (data?.user?.email) {
      fetchBulkProduct()
    }
  }, [data?.user?.email, currentPage, itemsPerPage])

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const renderPagination = () => {
    if (totalItems <= 0) return null

    // Calculate page numbers to show
    const pageNumbers = []
    const maxVisiblePages = 5

    // Calculate start and end page numbers
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pageNumbers.push(1)
      if (startPage > 2) {
        pageNumbers.push("...")
      }
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push("...")
      }
      pageNumbers.push(totalPages)
    }

    return (
      <div className="flex flex-col md:flex-row items-center justify-between mt-6 space-y-4 md:space-y-0">
        <div className="text-sm text-gray-600">
          Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
          <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of{" "}
          <span className="font-medium">{totalItems}</span> orders
        </div>

        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1 || isLoading}
            onClick={() => handlePageChange(1)}
            className="h-8 w-8 p-0"
            aria-label="First page"
          >
            «
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1 || isLoading}
            onClick={() => handlePageChange(currentPage - 1)}
            className="h-8 w-8 p-0"
            aria-label="Previous page"
          >
            ‹
          </Button>

          {pageNumbers.map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className="px-2">...</span>
              ) : (
                <Button
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  disabled={isLoading}
                  onClick={() => typeof page === "number" && handlePageChange(page)}
                  className={`h-8 w-8 p-0 ${page === currentPage ? "pointer-events-none" : ""}`}
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages || isLoading || totalPages === 0}
            onClick={() => handlePageChange(currentPage + 1)}
            className="h-8 w-8 p-0"
            aria-label="Next page"
          >
            ›
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages || isLoading || totalPages === 0}
            onClick={() => handlePageChange(totalPages)}
            className="h-8 w-8 p-0"
            aria-label="Last page"
          >
            »
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-md h-[80vh] overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold text-gray-800">Bulk Orders</h1>
          </div>
          <div className="flex-grow overflow-auto">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-4">{error}</div>
            )}
            <table className="w-full min-w-max bg-white rounded-md overflow-hidden shadow-sm">
              <thead className="sticky top-0 text-white bg-gray-800 shadow">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Company</th>
                  <th className="p-3 text-left">Product Type</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center p-4">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                      </div>
                    </td>
                  </tr>
                ) : orderData && orderData.length > 0 ? (
                  orderData.map((order, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-3">{order.name}</td>
                      <td className="p-3">{order.email}</td>
                      <td className="p-3">{order.company}</td>
                      <td className="p-3">{order.productType}</td>
                      <td className="p-3 text-center">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="cursor-pointer"
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md mx-auto">
                            <DialogHeader>
                              <DialogTitle className="text-xl font-bold">Order Details</DialogTitle>
                              <DialogDescription>
                                {selectedOrder && (
                                  <div className="space-y-3 overflow-y-auto max-h-[60vh] p-2 mt-4">
                                    <p>
                                      <strong className="text-black">Name:</strong> {selectedOrder.name}
                                    </p>
                                    <p>
                                      <strong className="text-black">Email:</strong> {selectedOrder.email}
                                    </p>
                                    <p>
                                      <strong className="text-black">Phone:</strong> {selectedOrder.phone}
                                    </p>
                                    <p>
                                      <strong className="text-black">Company:</strong> {selectedOrder.company}
                                    </p>
                                    <p>
                                      <strong className="text-black">Address:</strong>{" "}
                                      {selectedOrder.address || "Not provided"}
                                    </p>
                                    <p>
                                      <strong className="text-black">Product Type:</strong> {selectedOrder.productType}
                                    </p>
                                    <p>
                                      <strong className="text-black">Quantity:</strong> {selectedOrder.quantity}
                                    </p>
                                    <p>
                                      <strong className="text-black">Delivery Date:</strong>{" "}
                                      {selectedOrder.deliveryDate}
                                    </p>
                                    <p>
                                      <strong className="text-black">Description:</strong> {selectedOrder.description}
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
                      {error ? "Error loading orders" : "No orders available"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t">{renderPagination()}</div>
        </div>
      </div>
    </div>
  )
}

export default withAdminAuth(Page)