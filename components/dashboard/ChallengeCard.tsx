"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Trophy, ArrowRight, Flame } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Progress } from "../ui/progress"

interface ChallengeCardProps {
    challenge: {
        id: string
        title: string
        description: string | null
        durationDays: number
        startDate: string | Date
        endDate: string | Date
        createdAt: string | Date | null
    }
    progress: number // percentage
    daysCompleted: number
    todayCompleted?: boolean
    currentDayNumber?: number
    streak?: number
    daysLeft?: number
}

export function ChallengeCard({ challenge, progress, daysCompleted, todayCompleted, currentDayNumber, streak = 0, daysLeft }: ChallengeCardProps) {
    const canCheckInToday = !!currentDayNumber && currentDayNumber >= 1 && currentDayNumber <= challenge.durationDays && !todayCompleted
    const inActiveWindow =
        currentDayNumber !== undefined &&
        currentDayNumber >= 1 &&
        currentDayNumber <= challenge.durationDays
    const footerHref = canCheckInToday ? `/dashboard/challenges/${challenge.id}/check-in` : `/dashboard/challenges/${challenge.id}`
    const footerLabel = canCheckInToday ? "Check in today" : "View Progress"

    return (
        <Card className="glass-card hover:shadow-primary/5 transition-all group border-none">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl outfit font-bold group-hover:text-primary transition-colors">
                        {challenge.title}
                    </CardTitle>
                    <div className="bg-primary/10 text-primary text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full">
                        {challenge.durationDays} Days
                    </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 min-h-10">
                    {challenge.description || "No description provided."}
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-primary">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2 bg-primary/10" />
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Started {formatDistanceToNow(new Date(challenge.startDate))} ago</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Trophy className="w-3.5 h-3.5 text-amber-500" />
                        <span>{daysCompleted}/{challenge.durationDays} days</span>
                    </div>
                    {inActiveWindow && streak > 0 && (
                        <div className="flex items-center gap-1 text-orange-500 font-medium">
                            <Flame className="w-3.5 h-3.5" />
                            <span>{streak} day streak</span>
                        </div>
                    )}
                    {inActiveWindow && daysLeft !== undefined && daysLeft > 0 && (
                        <span className="text-muted-foreground">{daysLeft} days left</span>
                    )}
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild variant="secondary" className="w-full group/btn">
                    <Link href={footerHref} className="flex items-center justify-center gap-2">
                        {footerLabel}
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
