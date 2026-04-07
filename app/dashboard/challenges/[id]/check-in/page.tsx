import { db } from "@/db"
import { challenges, dailyLogs } from "@/db/schemas"
import { getCurrentUser } from "@/lib/auth/get-user"
import { eq, and } from "drizzle-orm"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { checkInAction } from "@/app/actions/checkIn"

export default async function CheckInPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const user = await getCurrentUser()
    if (!user) redirect("/login")

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, id),
    })

    if (!challenge || challenge.userId !== user.userId) {
        redirect("/dashboard")
    }

    // 🧠 calculate today's day number
    const startDate = new Date(challenge.startDate)
    startDate.setHours(0, 0, 0, 0)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dayNumber = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1

    const todayLog = await db.query.dailyLogs.findFirst({
        where: and(
            eq(dailyLogs.challengeId, id),
            eq(dailyLogs.dayNumber, dayNumber)
        ),
    })

    return (
        <div className="container mx-auto py-10 px-4 max-w-xl space-y-8">

            {/* Header */}
            <div className="flex items-center gap-4">
                <Button asChild variant="ghost">
                    <Link href={`/dashboard/challenges/${id}`}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Link>
                </Button>

                <h1 className="text-2xl font-bold">
                    Daily Check-in
                </h1>
            </div>

            {/* Card */}
            <div className="glass-card p-8 rounded-2xl text-center space-y-6">
                <h2 className="text-xl font-semibold">
                    {challenge.title}
                </h2>

                {todayLog?.completed ? (
                    <div className="space-y-3">
                        <p className="text-green-600 font-semibold text-lg">
                            ✅ Already completed today!
                        </p>
                        <p className="text-muted-foreground">
                            Keep the streak going 🚀
                        </p>
                    </div>
                ) : (
                    <form action={checkInAction}>
                        <input type="hidden" name="challengeId" value={id} />
                        <Button className="w-full rounded-full">
                            Mark as Complete ✅
                        </Button>
                    </form>
                )}
            </div>
        </div>
    )
}