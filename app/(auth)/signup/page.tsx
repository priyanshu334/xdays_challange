"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const signupSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})
export default function SingupPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
    })
    const onSubmit = async (data: z.infer<typeof signupSchema>) => {
        setLoading(true)
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            if (res.ok) {
                toast.success("signup successfully")
                router.push("/dashboard")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Signup
                    </CardTitle>
                    <CardDescription>
                        Create your account and track your habits professioanlly
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <p className="text-red-500">{errors.name.message}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="[EMAIL_ADDRESS]"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-red-500">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <p className="text-red-500">{errors.password.message}</p>
                                )}
                            </div>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Creating account..." : "Create account"}
                            </Button>
                        </div>
                    </form>
                </CardContent>

            </Card>
        </div>
    )
}