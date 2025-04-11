import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
    id: string;
    email: string;
    name: string;
}

interface ExtendedJWT extends JWT {
    user?: User;
}

interface ExtendedSession extends Session {
    user: User;
}

export const authOptions: NextAuthOptions = {
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
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user as User;
            }
            return token as ExtendedJWT;
        },
        async session({ session, token }) {
            (session as ExtendedSession).user = (token as ExtendedJWT).user as User;
            return session as ExtendedSession;
        },
    },
    secret: process.env.NEXT_AUTH_SECRET,
};