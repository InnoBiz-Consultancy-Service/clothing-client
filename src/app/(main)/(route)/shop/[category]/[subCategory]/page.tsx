'use client';
import getProducts from '@/apiAction/getProducts';
import { Loader } from '@/components/Loader/Loader';
import ProductCard from '@/components/Shop/ProductCard/ProductCard';
import { ProductCardProps } from '@/types/productProps';
import { useParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const ShopPage = () => {
  const params = useParams();
  const { category, subCategory } = params;
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        let queryString = "/products?";
        if (category) {
          queryString += `category=${category}`;
        }
        if (subCategory) {
          queryString += `${category ? "&" : ""}subcategory=${subCategory}`;
        }

        const response = await getProducts({ products: `${queryString}&limit=50` });
        setProducts(response.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subCategory]);

  if (loading) {
    return <div className='flex justify-center items-center h-screen'>
      <Loader />
    </div>
  }
  return (
    <Suspense>
      <div className="container mx-auto mt-4 px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {
            products.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  _id={product._id}
                  name={product.name}
                  price={product.price}
                  image={product.images[0]?.src}
                  category={product?.category || ''}
                />
              )
            })
          }
        </div>
      </div>
    </Suspense>
  );
};

export default ShopPage;
