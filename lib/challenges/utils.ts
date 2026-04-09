/** Calendar day index: 1 = start day, based on local midnight boundaries. */
export function getDayNumberFromStart(startDate: Date, today = new Date()): number {
    const t = new Date(today)
    t.setHours(0, 0, 0, 0)
    const s = new Date(startDate)
    s.setHours(0, 0, 0, 0)
    return Math.floor((t.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1
}

/**
 * Consecutive completed days counting backward from the current window day
 * (min(today, duration)), stopping at the first gap.
 */
export function computeCurrentStreak(
    completedDayNumbers: number[],
    currentDayNumber: number,
    durationDays: number
): number {
    const valid = new Set(
        completedDayNumbers.filter((d) => d >= 1 && d <= durationDays)
    )
    if (currentDayNumber < 1) return 0
    const end = Math.min(Math.max(currentDayNumber, 1), durationDays)
    let streak = 0
    for (let d = end; d >= 1; d--) {
        if (valid.has(d)) streak++
        else break
    }
    return streak
}

/** Full days left in the challenge from "today" (includes today when still in range). */
export function daysLeftInChallenge(
    currentDayNumber: number,
    durationDays: number
): number {
    if (currentDayNumber < 1) return durationDays
    if (currentDayNumber > durationDays) return 0
    return durationDays - currentDayNumber + 1
}

export function isChallengeActiveWindow(
    currentDayNumber: number,
    durationDays: number
): boolean {
    return currentDayNumber >= 1 && currentDayNumber <= durationDays
}
