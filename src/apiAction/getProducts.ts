import axios from "axios";

const getProducts = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/products`);
        return response.data;
    } catch (error) {
        console.error("Error fetching Products data:", error);
        return null;
    }
};

export default getProducts;
