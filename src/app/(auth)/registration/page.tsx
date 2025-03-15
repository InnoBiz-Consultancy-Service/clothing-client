"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { Loader2, Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const formSchema = z
    .object({
        name: z.string().min(2, {
            message: "First name must be at least 2 characters"
        }),
        email: z.string().email({
            message: "Please enter a valid email address.",
        }),
        phone: z.string().min(10, {
            message: "Phone number must be at least 10 digits.",
        }),
        password: z
            .string()
            .min(8, {
                message: "Password must be at least 8 characters.",
            })
            .regex(/[A-Z]/, {
                message: "Password must contain at least one uppercase letter.",
            })
            .regex(/[a-z]/, {
                message: "Password must contain at least one lowercase letter.",
            })
            .regex(/[0-9]/, {
                message: "Password must contain at least one number.",
            }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })

export default function RegistrationPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
    })

    const [isLoading, setIsLoading] = useState(false)

    // handle form submission
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        // TO DO: Done
        setIsLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })

            const data = await response.json()

            if (response.ok) {
                //To DO: Ai khane alert er poriborte toast use kora jabe...
                alert("Registration successful")
                form.reset()
            } else {
                //To DO: ai khane alert er poriborte toast use kora jabe...
                alert("Registration failed")
                console.error("Registration Error:", data)
            }
        } catch (error) {
            // To DO: Ai khane alert er poriborte toast use kora jabe...
            alert("An error occurred")
            console.error("Error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="mx-auto max-w-[400px] space-y-6 p-4">
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                <p className="text-sm text-muted-foreground">Enter your details below to create your account</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel className="text-sm font-medium">Name</FormLabel>
                                <div className="relative">
                                    <FormControl>
                                        <Input type="text" placeholder="Enter your name" {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel className="text-sm font-medium">Email Address</FormLabel>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    <FormControl>
                                        <Input type="email" placeholder="your.email@example.com" className="pl-10" {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                        <Input placeholder="Enter your phone number" className="pl-10" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter your password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Confirm your password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full cursor-pointer bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700" disabled={isLoading}>

                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        {isLoading ? "Account Creating..." : "Create Account"}

                    </Button>
                </form>
            </Form>

            <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline hover:underline-offset-4">
                    <span className="font-medium text-emerald-600 hover:text-emerald-800">Login</span>
                </Link>
            </div>
        </div>
    )
}