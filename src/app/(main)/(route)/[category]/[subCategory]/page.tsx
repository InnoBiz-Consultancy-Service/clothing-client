"use client"
import getProducts from '@/apiAction/getProducts';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SubCategoryPage = () => {
    const [products, setProducts] = useState([])
    const params = useParams();
    const { category, subCategory } = params;
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts({ products: `/products?category=${category}&subcategory=${subCategory}` });
                // console.log(response)
                setProducts(response.products)
            } catch (error) {
                console.log(error)
            }
        }

        fetchProducts();
    }, [category, subCategory])
    console.log(products)
    return (
        <div>
            <h1>Category: {category}</h1>
            <h2>Subcategory: {subCategory}</h2>
        </div>
    );
};

export default SubCategoryPage;