import { Headphones, Package, RefreshCw, Award } from "lucide-react"

export default function FeatureSection() {
  return (
    <div className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Fastest Shipping Card */}
          <div className="border rounded-md p-6 flex flex-col items-center text-center">
            <div className="mb-4 text-gray-500">
              <Package className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">FASTEST SHIPPING COUNTRYWIDE</h3>
          </div>

          {/* Easy Return Policy Card */}
          <div className="border rounded-md p-6 flex flex-col items-center text-center">
            <div className="mb-4 text-gray-500">
              <RefreshCw className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">EASY RETURN POLICY</h3>
          </div>

          {/* Premium Quality Product Card */}
          <div className="border rounded-md p-6 flex flex-col items-center text-center">
            <div className="mb-4 text-gray-500">
              <Award className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">PREMIUM QUALITY PRODUCT</h3>
          </div>

          {/* Online Support Card */}
          <div className="border rounded-md p-6 flex flex-col items-center text-center">
            <div className="mb-4 text-gray-500">
              <Headphones className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">ONLINE SUPPORT 24/7</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

