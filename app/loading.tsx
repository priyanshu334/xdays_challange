import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="container mx-auto p-6 space-y-8">
            {/* Header Section */}
            <div className="space-y-2">
                <Skeleton className="h-10 w-[250px]" />
                <Skeleton className="h-4 w-[400px]" />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex flex-col space-y-3">
                        <Skeleton className="h-[200px] w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-4/5" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Full Width Table/List Area */}
            <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
        </div>
    )
}