"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { PhoneInput } from "./PhoneInput/PhoneInput"
import axios from "axios"
import { useState } from "react"

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    email: z.string().email("Please enter a valid email address"),
    company: z.string().min(2, "Company name must be at least 2 characters"),
    address: z.string().min(5, "Please enter a valid address"),
    productType: z.string().min(2, "Please specify the product type"),
    deliveryDate: z.string().min(1, "Please select a delivery date"),
    quantity: z.string().min(1, "Please enter the quantity"),
    description: z.string().optional(),
})

export default function ContactForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            company: "",
            address: "",
            productType: "",
            deliveryDate: "",
            quantity: "",
            description: "",
        },
    })

    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/bulkOrder`, values);
            form.reset();
            console.log("Order saved and emails sent:", response.data);
            // TO DO: Ai khane ekta alert dite hobe je order submit hoise...
            alert("Order submitted successfully!");

        } catch (error) {
            console.error("Error submitting order:", error);
            alert("Failed to submit order. Please try again.");
        }
        setIsLoading(false)

    }

    return (
        <div className="container mx-auto p-6">
            <div className="grid gap-8 lg:grid-cols-2">
                {/* Form Section */}
                <div>
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold tracking-tight">Share Your Needs</h1>
                        <p className="text-muted-foreground">We&apos;ll Make It Happen!</p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Your Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid gap-6 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <PhoneInput
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    error={!!form.formState.errors.phone}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="you@example.com" type="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="company"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company/Organization</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your company name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="productType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Type</FormLabel>
                                        <FormControl>
                                            <Input placeholder="T-shirt, Polo T-shirt, Jacket, Gift Item etc." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid gap-6 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="deliveryDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Estimated Delivery Date</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="quantity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Approx. Quantity</FormLabel>
                                            <FormControl>
                                                <Input type="number" min="1" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description (Optional)</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Additional details about your requirements" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 cursor-pointer"
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                {isLoading ? "Submitting..." : "Submit Order"}
                            </Button>
                        </form>
                    </Form>
                </div>

                {/* Contact Information Section */}
                <div className="space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-2xl font-bold">Or, we are just a call away</h2>
                        <p className="text-muted-foreground">Your Solutions Await!</p>
                    </div>

                    <Card className="p-6">
                        <div className="space-y-4">
                            <h3 className="font-semibold">The Office</h3>

                            <div className="flex items-start gap-3 text-sm">
                                <MapPin className="mt-1 h-4 w-4" />
                                <p>
                                    Level 9, Example Square (Opposite of Mall)
                                    <br />
                                    Plot 3, Road 1, Section 1, City-1216
                                </p>
                            </div>

                            <div className="flex items-center gap-3 text-sm">
                                <Phone className="h-4 w-4" />
                                <p>+1 234 567 890</p>
                            </div>

                            <div className="flex items-center gap-3 text-sm">
                                <Mail className="h-4 w-4" />
                                <p>contact@example.com</p>
                            </div>

                            <div className="flex items-center gap-3 text-sm">
                                <Clock className="h-4 w-4" />
                                <div>
                                    <p>Saturday-Thursday</p>
                                    <p>10:00 AM - 07:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Map Placeholder */}
                    <div className="aspect-video w-full rounded-lg my-16 md:my-0 bg-muted">
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d895.6762636951644!2d89.67332406946473!3d26.108545002832503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e2eb000e25a331%3A0x93b62c43260a0714!2sBhurungamari%20Gol%20Chottor!5e0!3m2!1sen!2sbd!4v1742046675716!5m2!1sen!2sbd" className="w-[300px] md:w-[400px] lg:w-[600px] h-[300px]" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}