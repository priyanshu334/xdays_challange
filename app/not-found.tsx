"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MoveLeft, Home } from "lucide-react" // Optional icons for flair

export default function NotFound() {
    const router = useRouter()

    return (
        <div className="flex h-[80vh] w-full items-center justify-center p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle className="text-4xl font-bold">404</CardTitle>
                    <CardDescription className="text-lg">
                        Oops! The page you're looking for doesn't exist.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        It might have been moved, or the URL might be incorrect.
                    </p>
                </CardContent>

                <CardFooter className="flex justify-center gap-3">
                    <Button variant="outline" onClick={() => router.back()}>
                        <MoveLeft className="mr-2 h-4 w-4" />
                        Go Back
                    </Button>

                    <Button onClick={() => router.push("/")}>
                        <Home className="mr-2 h-4 w-4" />
                        Home
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}