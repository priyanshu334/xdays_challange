import { db } from "@/db"
import { challenges, dailyLogs } from "@/db/schemas"
import { getCurrentUser } from "@/lib/auth/get-user"
import { eq, and } from "drizzle-orm"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Sparkles, Calendar, Quote } from "lucide-react"
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
    const isBeforeStart = dayNumber < 1
    const isChallengeOver = dayNumber > challenge.durationDays
    const activeDayNumber = Math.min(Math.max(dayNumber, 1), challenge.durationDays)
    const progress = Math.min(Math.max((activeDayNumber / challenge.durationDays) * 100, 0), 100)

    const todayLog = await db.query.dailyLogs.findFirst({
        where: and(
            eq(dailyLogs.challengeId, id),
            eq(dailyLogs.dayNumber, activeDayNumber)
        ),
    })

    return (
        <div className="min-h-screen bg-transparent py-12 px-4">
            <div className="max-w-2xl mx-auto space-y-8">
                
                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <Button asChild variant="ghost" className="hover:bg-white/10 transition-colors">
                        <Link href={`/dashboard/challenges/${id}`}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Challenge
                        </Link>
                    </Button>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Day {activeDayNumber} of {challenge.durationDays}</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
                        Daily Check-in
                    </h1>
                    <p className="text-muted-foreground">
                        Stay consistent. Stay accountable. Finish what you started.
                    </p>
                </div>

                {/* Main Card */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-linear-to-r from-primary/50 to-purple-500/50 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative glass-card border border-white/10 rounded-3xl p-8 backdrop-blur-xl bg-black/40 space-y-8">
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-yellow-500" />
                                    {challenge.title}
                                </h2>
                                <span className="text-sm font-medium text-primary">
                                    {Math.round(progress)}% Complete
                                </span>
                            </div>
                            <Progress value={progress} className="h-2 bg-white/5" />
                        </div>

                        {isBeforeStart ? (
                            <div className="text-center py-6 space-y-3">
                                <h3 className="text-xl font-semibold">Challenge has not started yet</h3>
                                <p className="text-muted-foreground">
                                    Your start date is in the future. Come back on day 1 and keep the streak alive.
                                </p>
                            </div>
                        ) : isChallengeOver ? (
                            <div className="text-center py-6 space-y-3">
                                <h3 className="text-xl font-semibold">Challenge duration is complete</h3>
                                <p className="text-muted-foreground">
                                    Great effort. Start a new challenge to keep building momentum.
                                </p>
                                <Button asChild variant="outline" className="rounded-2xl">
                                    <Link href="/dashboard/challenges/new">Create New Challenge</Link>
                                </Button>
                            </div>
                        ) : todayLog?.completed ? (
                            <div className="space-y-6 py-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-bold text-green-500">Day {activeDayNumber} Complete!</h3>
                                        <p className="text-muted-foreground">
                                            Awesome work! You&apos;re one step closer to your goal.
                                        </p>
                                    </div>
                                </div>

                                {todayLog.note && (
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 relative">
                                        <Quote className="absolute -top-3 -left-3 w-8 h-8 text-white/10 rotate-12" />
                                        <p className="italic text-white/80">
                                            &ldquo;{todayLog.note}&rdquo;
                                        </p>
                                    </div>
                                )}

                                <Button asChild variant="outline" className="w-full rounded-2xl h-12 border-white/10 hover:bg-white/5">
                                    <Link href={`/dashboard/challenges/${id}`}>
                                        View All Logs
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <form action={checkInAction} className="space-y-6">
                                <input type="hidden" name="challengeId" value={id} />
                                
                                <div className="space-y-3">
                                    <Label htmlFor="note" className="text-lg font-medium">
                                        Today&apos;s Notes (Optional)
                                    </Label>
                                    <Textarea 
                                        id="note"
                                        name="note"
                                        placeholder="What did you achieve today? Any challenges overcome?"
                                        className="min-h-[120px] bg-white/5 border-white/10 rounded-2xl focus:ring-primary/50 text-base"
                                    />
                                    <p className="text-xs text-muted-foreground px-1">
                                        Recording your progress helps you stay motivated and track your growth over time.
                                    </p>
                                </div>

                                <Button className="w-full rounded-2xl h-14 text-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-[1.01] active:scale-[0.99] group">
                                    Complete Day {activeDayNumber}
                                    <CheckCircle2 className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                                </Button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Daily Tip/Insight */}
                {!todayLog?.completed && !isBeforeStart && !isChallengeOver && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                            <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="font-medium">Daily Tip</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Consistency is more important than intensity in the beginning. Even a small step forward is a victory. Keep going!
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}