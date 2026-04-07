"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

export default function LoginPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        setLoading(true)
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            if (res.ok) {
                toast.success("Welcome back!")
                router.push("/dashboard")
                router.refresh()
            } else {
                toast.error("Invalid credentials. Please try again.")
            }
        } catch (error) {
            console.error(error)
            toast.error("An unexpected error occurred.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container relative flex min-h-screen flex-col items-center justify-center lg:px-0">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-3xl font-bold tracking-tight outfit text-gradient">
                        Welcome Back
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your credentials to access your dashboard
                    </p>
                </div>

                <Card className="glass-card border-none shadow-2xl">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-semibold tracking-tight outfit">Login</CardTitle>
                        <CardDescription>
                            Access your progress and continue your evolution
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-primary/60" />
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    className="bg-background/50 border-primary/10 focus:border-primary/30 transition-all"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-primary/60" />
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="bg-background/50 border-primary/10 focus:border-primary/30 transition-all"
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                            <Button 
                                type="submit" 
                                className="w-full group relative overflow-hidden" 
                                disabled={loading}
                            >
                                <span className={cn(
                                    "flex items-center justify-center gap-2 transition-all",
                                    loading && "opacity-0"
                                )}>
                                    Login <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                                {loading && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    </div>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <p className="px-8 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/signup"
                        className="underline underline-offset-4 hover:text-primary transition-colors font-medium"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}