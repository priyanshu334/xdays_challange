"use server"

import { db } from "@/db"
import { dailyLogs, challenges } from "@/db/schemas"
import { getCurrentUser } from "@/lib/auth/get-user"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function checkInAction(formData: FormData) {
    const user = await getCurrentUser()
    if (!user) return

    const challengeId = formData.get("challengeId") as string

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId),
    })

    if (!challenge) return

    const startDate = new Date(challenge.startDate)
    startDate.setHours(0, 0, 0, 0)
    
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const diffInDays = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1

    // 🚫 prevent duplicate check-in
    const existing = await db.query.dailyLogs.findFirst({
        where: and(
            eq(dailyLogs.challengeId, challengeId),
            eq(dailyLogs.dayNumber, diffInDays)
        ),
    })

    if (existing) return

    await db.insert(dailyLogs).values({
        challengeId,
        dayNumber: diffInDays,
        completed: true,
    })

    revalidatePath(`/dashboard/challenges/${challengeId}`)
    revalidatePath(`/dashboard/challenges/${challengeId}/check-in`)
}