import { authOptions } from "@/components/Auth/authOptions";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };