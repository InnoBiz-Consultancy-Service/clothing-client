import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const response = await loginResponse.json();
          console.log("Backend API Response:", response);  

          if (loginResponse.ok && response.user) {
            return {
              id: response.user.id,
              email: response.user.email,
              name: response.user.name,
            };
          } else {
            console.error("Backend API Error:", response.message);
            return null;
          }
        } catch (error) {
          console.error("Error during login:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", // Custom login page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user; // Store user data in the token
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user; // Store user data in the session
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET, // Use environment variable for secret
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };