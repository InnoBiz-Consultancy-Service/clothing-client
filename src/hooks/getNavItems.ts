import axios from "axios";
interface Post {
  id: string;
  category: string;
  subCategory: string;
}
export const getNavItems = async (): Promise<Post[]> => {
  try {
    const response = await axios.get<Post[]>("https://clothing-server-hazel.vercel.app/api/v1/navbar");
    return response.data;
  } catch (error) {
    console.error("ডাটা লোড করতে সমস্যা হয়েছে:", error);
    throw error;
  }
};
