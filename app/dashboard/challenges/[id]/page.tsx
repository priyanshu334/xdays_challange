import Link from "next/link"
import { db } from "@/db"
import { challenges, dailyLogs } from "@/db/schemas"
import { getCurrentUser } from "@/lib/auth/get-user"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trophy, Activity, Calendar, CheckCircle2, Flame } from "lucide-react"
import {
    computeCurrentStreak,
    daysLeftInChallenge,
    getDayNumberFromStart,
} from "@/lib/challenges/utils"

export default async function ChallengePage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const user = await getCurrentUser()
    if (!user) {
        return redirect("/login")
    }

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, id),
    })

    if (!challenge) {
        return redirect("/dashboard")
    }

    if (challenge.userId !== user.userId) {
        return redirect("/dashboard")
    }

    const logs = await db.query.dailyLogs.findMany({
        where: eq(dailyLogs.challengeId, id),
        orderBy: (dailyLogs, { asc }) => [asc(dailyLogs.dayNumber)],
    })
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const startDate = new Date(challenge.startDate)
    const currentDayNumber = getDayNumberFromStart(startDate, today)
    const canCheckInToday =
        currentDayNumber >= 1 && currentDayNumber <= challenge.durationDays
    const todayCompleted = logs.some(
        (log) => log.dayNumber === currentDayNumber && log.completed
    )
    const completedNums = logs.filter((l) => l.completed).map((l) => l.dayNumber)
    const streak = computeCurrentStreak(completedNums, currentDayNumber, challenge.durationDays)
    const daysLeft = daysLeftInChallenge(currentDayNumber, challenge.durationDays)

    const getLogDate = (dayNum: number) => {
        const d = new Date(challenge.startDate)
        d.setDate(d.getDate() + (dayNum - 1))
        return d.toDateString()
    }

    // ✅ calculate progress
    const completedDays = logs.filter((l) => l.completed).length
    const progress = Math.min((completedDays / challenge.durationDays) * 100, 100)

    return (
        <div className="container mx-auto py-10 px-4 sm:px-8 space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button asChild variant="ghost">
                        <Link href="/dashboard">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Link>
                    </Button>

                    <div>
                        <h1 className="text-3xl font-bold outfit text-gradient">
                            {challenge.title}
                        </h1>
                        <p className="text-muted-foreground">
                            Stay consistent and complete your challenge 🚀
                        </p>
                        {challenge.description && (
                            <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
                                {challenge.description}
                            </p>
                        )}
                    </div>
                </div>
                {canCheckInToday && (
                    <Button asChild className="rounded-full px-6">
                        <Link href={`/dashboard/challenges/${id}/check-in`}>
                            {todayCompleted ? "Checked in today" : "Daily Check-in"}
                        </Link>
                    </Button>
                )}
            </div>
            {canCheckInToday && todayCompleted && (
                <div className="glass-card p-4 rounded-2xl flex items-center gap-2 text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" />
                    You have completed today&apos;s check-in. Keep the momentum going.
                </div>
            )}

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Progress
                        </p>
                        <p className="text-2xl font-bold">
                            {Math.round(progress)}%
                        </p>
                    </div>
                </div>

                <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
                    <div className="size-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <Activity className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Completed Days
                        </p>
                        <p className="text-2xl font-bold">
                            {completedDays}
                        </p>
                    </div>
                </div>

                <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
                    <div className="size-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                        <Flame className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Current Streak
                        </p>
                        <p className="text-2xl font-bold">
                            {streak}
                        </p>
                    </div>
                </div>

                <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
                    <div className="size-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Days Left
                        </p>
                        <p className="text-2xl font-bold">
                            {daysLeft}
                        </p>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="glass-card p-6 rounded-2xl">
                <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">
                        Overall Progress
                    </span>
                    <span className="text-sm text-muted-foreground">
                        {Math.round(progress)}%
                    </span>
                </div>

                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div
                        className="bg-primary h-full transition-all"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Logs */}
            <div className="glass-card p-6 rounded-2xl">
                <h2 className="text-xl font-semibold mb-4">
                    Daily Logs
                </h2>

                {logs.length === 0 ? (
                    <p className="text-muted-foreground text-center py-10">
                        No logs yet. Start today 💪
                    </p>
                ) : (
                    <div className="grid gap-3">
                        {logs.map((log) => (
                            <div
                                key={log.id}
                                className="flex items-center justify-between p-4 rounded-xl border transition-all hover:bg-muted/30"
                            >
                                <div>
                                    <p className="font-medium">
                                        Day {log.dayNumber}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {getLogDate(log.dayNumber)}
                                    </p>
                                </div>

                                <div>
                                    {log.completed ? (
                                        <span className="text-green-600 font-semibold flex items-center gap-2">
                                            Done ✅
                                        </span>
                                    ) : (
                                        <span className="text-muted-foreground">
                                            Pending
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}