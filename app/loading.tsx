import { Skeleton } from "@/components/ui/skeleton"
export default function Loading() {
    return (
        <div>
            <h1>Loading...</h1>
            <Skeleton className="h-16 w-full" />
        </div>
    )
}