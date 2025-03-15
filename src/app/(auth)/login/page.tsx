"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Define the form validation schema with Zod
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  remember: z.boolean().optional(),
})

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)

  // Initialize the form with React Hook Form and Zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // TO DO: ekhane login function implement hobe...
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-50 to-emerald-50 p-4">
      <div className="flex w-[800px] justify-center overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="w-full p-8 lg:w-1/2">
          <div className="mx-auto max-w-md">
            <CardHeader className="space-y-1 px-0 text-center">
              <CardTitle className="text-3xl font-bold tracking-tight text-emerald-700">Welcome back</CardTitle>
              <CardDescription className="text-gray-500 mb-4">Login to your <strong>Ten Rush</strong> account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-sm font-medium">Password</FormLabel>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <FormControl>
                            <Input type={showPassword ? "text" : "password"} className="pl-10 pr-10" {...field} />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute cursor-pointer right-0 top-0 h-10 w-10 text-gray-400 hover:text-gray-600"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="remember"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl className="cursor-pointer">
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <Label htmlFor="remember" className="text-sm font-medium text-gray-600">
                          Remember me for 30 days
                        </Label>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full cursor-pointer bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700"
                  >
                    Login
                  </Button>

                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center px-0 pt-4">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/registration" className="font-medium text-emerald-600 hover:text-emerald-800">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage