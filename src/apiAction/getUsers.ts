import axios from "axios";

const getUsers = async ({ admin }: { admin: string }) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}${admin}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users data:", error);
        return null;
    }
};

export default getUsers;
