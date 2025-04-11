import React from 'react';

const products = [
    { name: "T-shirt", icon: "👕" },
    { name: "Polo T-shirt", icon: "🎽" },
    { name: "Hoodie/Sweatshirt", icon: "🧥" },
    { name: "Sports T-shirt", icon: "🏅" },
    { name: "Cap/Hat", icon: "🧢" },
    { name: "Certified Face Mask", icon: "😷" },
    { name: "Water Bottle", icon: "🥤" },
    { name: "Pants", icon: "👖" },

];

const ProductLineup = () => {
    return (
        <div>
            {/* Title Section */}
            <div className="relative flex items-center justify-center mb-6">
                <div className="bg-teal-100 px-6 py-3 rounded-md inline-block text-center">
                    <span className="text-xl md:text-2xl font-bold">PRODUCT LINEUP</span>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <div
                        key={index}
                        className="p-4 border rounded-lg shadow text-center hover:shadow-lg transition duration-300"
                    >
                        <span className="text-3xl sm:text-4xl">{product.icon}</span>
                        <p className="mt-2 text-base sm:text-lg font-medium">{product.name}</p>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default ProductLineup;
