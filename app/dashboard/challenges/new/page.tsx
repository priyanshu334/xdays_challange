"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar, Target, Clock, AlignLeft, ArrowLeft, Loader2, Sparkles } from "lucide-react"
import Link from "next/link"
import z from "zod"

const schema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z.string().min(3, "Description must be at least 3 characters long"),
    durationDays: z.number().min(1, "Duration must be at least 1 day"),
    startDate: z.string().min(1, "Start date is required"),
})

export default function NewChallengePage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
            description: "",
            durationDays: 30,
            startDate: new Date().toISOString().split("T")[0]
        }
    })

    async function onSubmit(data: z.infer<typeof schema>) {
        setLoading(true)
        try {
            const res = await fetch("/api/challenges", {
                method: "POST",
                body: JSON.stringify(data)
            })

            if (res.ok) {
                router.push("/dashboard")
                router.refresh()
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container max-w-2xl mx-auto py-10 px-4 sm:px-8 space-y-6">
            <Link 
                href="/dashboard" 
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-2"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </Link>

            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight outfit text-gradient flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-primary" />
                    Create New Challenge
                </h1>
                <p className="text-muted-foreground">
                    Define your goal and commit to 1% improvement every day.
                </p>
            </div>

            <Card className="glass-card border-none shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-primary to-primary/20" />
                
                <CardHeader>
                    <CardTitle className="outfit">Challenge Details</CardTitle>
                    <CardDescription>
                        Set the parameters for your next success story.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="grid gap-2">
                            <Label htmlFor="title" className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-primary md:hidden lg:flex" />
                                Goal Title
                            </Label>
                            <Input
                                id="title"
                                placeholder="e.g., 100 Days of Code, 75 Hard"
                                className="bg-background/50 border-primary/10 focus:border-primary/30"
                                {...form.register("title")}
                            />
                            {form.formState.errors.title && (
                                <p className="text-xs text-destructive">{form.formState.errors.title.message}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description" className="flex items-center gap-2">
                                <AlignLeft className="w-4 h-4 text-primary md:hidden lg:flex" />
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                placeholder="What is your main objective?"
                                className="bg-background/50 border-primary/10 focus:border-primary/30 min-h-[100px]"
                                {...form.register("description")}
                            />
                            {form.formState.errors.description && (
                                <p className="text-xs text-destructive">{form.formState.errors.description.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="duration" className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-primary" />
                                    Duration (Days)
                                </Label>
                                <Input
                                    id="duration"
                                    type="number"
                                    placeholder="30"
                                    className="bg-background/50 border-primary/10 focus:border-primary/30"
                                    {...form.register("durationDays", { valueAsNumber: true })}
                                />
                                {form.formState.errors.durationDays && (
                                    <p className="text-xs text-destructive">{form.formState.errors.durationDays.message}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="startDate" className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    Start Date
                                </Label>
                                <Input
                                    id="startDate"
                                    type="date"
                                    className="bg-background/50 border-primary/10 focus:border-primary/30"
                                    {...form.register("startDate")}
                                />
                                {form.formState.errors.startDate && (
                                    <p className="text-xs text-destructive">{form.formState.errors.startDate.message}</p>
                                )}
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full h-11 group relative overflow-hidden mt-4" 
                            disabled={loading}
                        >
                            <span className={loading ? "opacity-0" : "flex items-center gap-2"}>
                                Launch Challenge <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
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
        </div>
    )
}