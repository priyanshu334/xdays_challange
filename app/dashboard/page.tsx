import Link from "next/link"
import { ChallengeCard } from "@/components/dashboard/ChallengeCard"
import { Button } from "@/components/ui/button"
import { Plus, Trophy, Activity, Target } from "lucide-react"
import { getCurrentUser } from "@/lib/auth/get-user"
import { db } from "@/db"
import { challenges, dailyLogs } from "@/db/schemas"
import { desc, eq, inArray } from "drizzle-orm"
import { redirect } from "next/navigation"
import {
    computeCurrentStreak,
    daysLeftInChallenge,
    getDayNumberFromStart,
} from "@/lib/challenges/utils"

export const dynamic = "force-dynamic"

async function getChallengesWithProgress(userId: string) {
    const userChallenges = await db
        .select()
        .from(challenges)
        .where(eq(challenges.userId, userId))
        .orderBy(desc(challenges.createdAt))

    if (userChallenges.length === 0) return []

    const ids = userChallenges.map((c) => c.id)
    const allLogs = await db
        .select()
        .from(dailyLogs)
        .where(inArray(dailyLogs.challengeId, ids))

    const logsByChallenge = new Map<string, typeof allLogs>()
    for (const log of allLogs) {
        const list = logsByChallenge.get(log.challengeId) ?? []
        list.push(log)
        logsByChallenge.set(log.challengeId, list)
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return userChallenges.map((challenge) => {
        const logs = logsByChallenge.get(challenge.id) ?? []
        const daysCompletedCount = logs.filter((l) => l.completed).length
        const progress = Math.min((daysCompletedCount / challenge.durationDays) * 100, 100)
        const startDate = new Date(challenge.startDate)
        const currentDayNumber = getDayNumberFromStart(startDate, today)
        const completedNums = logs.filter((l) => l.completed).map((l) => l.dayNumber)
        const streak = computeCurrentStreak(completedNums, currentDayNumber, challenge.durationDays)
        const todayCompleted = logs.some(
            (l) => l.dayNumber === currentDayNumber && l.completed
        )
        const daysLeft = daysLeftInChallenge(currentDayNumber, challenge.durationDays)

        return {
            ...challenge,
            progress,
            daysCompleted: daysCompletedCount,
            currentDayNumber,
            todayCompleted,
            streak,
            daysLeft,
        }
    })
}

export default async function DashboardPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect("/login")
    }

    const challengesData = await getChallengesWithProgress(user.userId)
    const checkInCandidate = challengesData.find(
        (challenge) =>
            challenge.currentDayNumber >= 1 &&
            challenge.currentDayNumber <= challenge.durationDays &&
            !challenge.todayCompleted
    )

    return (
        <div className="container mx-auto py-10 px-4 sm:px-8 space-y-8">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight outfit text-gradient">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Track your progress and stay consistent with your goals.
                    </p>
                </div>
                <Button asChild className="group rounded-full px-6 shadow-lg shadow-primary/20">
                    <Link href="/dashboard/challenges/new" className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        New Challenge
                    </Link>
                </Button>
                {checkInCandidate ? (
                    <Button asChild className="group rounded-full px-6 shadow-lg shadow-primary/20">
                        <Link href={`/dashboard/challenges/${checkInCandidate.id}/check-in`}>
                            Check-in Today ✅
                        </Link>
                    </Button>
                ) : (
                    <Button asChild variant="outline" className="group rounded-full px-6">
                        <Link href="/dashboard/challenges/new">
                            Start a Fresh Challenge
                        </Link>
                    </Button>
                )}
            </header>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Target className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground font-medium">Active Challenges</p>
                        <p className="text-2xl font-bold">{challengesData.length}</p>
                    </div>
                </div>
                <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
                    <div className="size-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground font-medium">Check-ins Logged</p>
                        <p className="text-2xl font-bold">
                            {challengesData.reduce((acc, curr) => acc + curr.daysCompleted, 0)}
                        </p>
                    </div>
                </div>
                <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
                    <div className="size-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <Activity className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground font-medium">Avg. Progress</p>
                        <p className="text-2xl font-bold">
                            {challengesData.length > 0
                                ? Math.round(challengesData.reduce((acc, curr) => acc + curr.progress, 0) / challengesData.length)
                                : 0}%
                        </p>
                    </div>
                </div>
            </div>

            {challengesData.length === 0 ? (
                <div className="glass-card flex flex-col items-center justify-center py-20 text-center rounded-3xl border-dashed border-primary/20">
                    <div className="size-20 rounded-full bg-primary/5 flex items-center justify-center mb-6 animate-float">
                        <Plus className="w-10 h-10 text-primary/40" />
                    </div>
                    <h2 className="text-2xl font-bold outfit">No challenges yet</h2>
                    <p className="text-muted-foreground mt-2 max-w-xs mx-auto">
                        Ready to level up? Create your first challenge and start tracking your evolution today.
                    </p>
                    <Button asChild variant="outline" className="mt-8 rounded-full">
                        <Link href="/dashboard/challenges/new">
                            Create First Challenge
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {challengesData.map((challenge) => (
                        <ChallengeCard
                            key={challenge.id}
                            challenge={challenge}
                            progress={challenge.progress}
                            daysCompleted={challenge.daysCompleted}
                            todayCompleted={challenge.todayCompleted}
                            currentDayNumber={challenge.currentDayNumber}
                            streak={challenge.streak}
                            daysLeft={challenge.daysLeft}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}