"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import z from "zod"
const schema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z.string().min(3, "Description must be at least 3 characters long"),
    durationDays: z.number().min(1, "Duration must be at least 1 day"),
    startDate: z.string().min(1, "Start date is required"),
})

export default function NewChallengePage() {

    const router = useRouter()

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
            description: "",
            durationDays: 30
        }
    })

    async function onSubmit(data: z.infer<typeof schema>) {

        const res = await fetch("/api/challanges", {
            method: "POST",
            body: JSON.stringify(data)
        })

        if (res.ok) {
            router.push("/dashboard")
        }
    }

    return (

        <div className="max-w-xl mx-auto">

            <Card>

                <CardHeader>
                    <CardTitle>Create Challenge</CardTitle>
                </CardHeader>

                <CardContent>

                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >

                        <Input
                            placeholder="Goal title"
                            {...form.register("title")}
                        />

                        <Textarea
                            placeholder="Describe your challenge"
                            {...form.register("description")}
                        />

                        <Input
                            type="number"
                            placeholder="Duration (days)"
                            {...form.register("durationDays", { valueAsNumber: true })}
                        />

                        <Input
                            type="date"
                            {...form.register("startDate")}
                        />

                        <Button className="w-full">
                            Create Challenge
                        </Button>

                    </form>

                </CardContent>

            </Card>

        </div>

    )
}