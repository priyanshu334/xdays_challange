import { NextResponse } from "next/server"

import { db } from "@/db"
import { challenges } from "@/db/schemas"

import { getCurrentUser } from "@/lib/auth/get-user"
import z from "zod"
import { eq } from "drizzle-orm"

const createChallengeSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z.string().min(3, "Description must be at least 3 characters long"),
    durationDays: z.number().min(1, "Duration must be at least 1 day"),
    startDate: z.string().min(1, "Start date is required"),
})
export async function POST(req: Request) {

    const user = await getCurrentUser()

    if (!user) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        )
    }

    const body = await req.json()

    const parsed = createChallengeSchema.safeParse(body)

    if (!parsed.success) {
        return NextResponse.json(
            { error: "Invalid input" },
            { status: 400 }
        )
    }

    const { title, description, durationDays, startDate } = parsed.data

    const endDate = new Date(startDate)

    endDate.setDate(endDate.getDate() + durationDays)

    const challenge = await db
        .insert(challenges)
        .values({
            userId: user.userId,
            title,
            description,
            durationDays,
            startDate: new Date(startDate),
            endDate
        })
        .returning()

    return NextResponse.json(challenge[0])
}

export async function GET() {
    const user = await getCurrentUser()
    if (!user) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        )

    }
    const userChallenges = await db.select().from(challenges).where(eq(challenges.userId, user.userId))
    return NextResponse.json(userChallenges)
}