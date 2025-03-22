import axios from "axios";

const getNavbarData = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/navbar`);
        return response.data;
    } catch (error) {
        console.error("Error fetching navbar data:", error);
        return null;
    }
};

export default getNavbarData;
