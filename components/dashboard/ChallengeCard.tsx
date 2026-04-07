"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Trophy, ArrowRight } from "lucide-react"
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
}

export function ChallengeCard({ challenge, progress, daysCompleted }: ChallengeCardProps) {
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
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Started {formatDistanceToNow(new Date(challenge.startDate))} ago</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Trophy className="w-3.5 h-3.5 text-amber-500" />
                        <span>{daysCompleted} logs</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild variant="secondary" className="w-full group/btn">
                    <Link href={`/dashboard/challenges/${challenge.id}`} className="flex items-center justify-center gap-2">
                        View Progress
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
