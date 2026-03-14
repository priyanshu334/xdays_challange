import Link from "next/link"
import { ModeToggle } from "./ModeToggle"
import { Button } from "./ui/button" // Reusing your UI components for consistency

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
                    <div className="size-8 rounded bg-amber-600 flex items-center justify-center text-white font-black italic">X</div>
                    <span className="text-xl font-bold tracking-tight">XDays</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <Link href="#features" className="transition-colors hover:text-amber-600">Features</Link>
                    <Link href="#how" className="transition-colors hover:text-amber-600">How it works</Link>
                    <Link href="#pricing" className="transition-colors hover:text-amber-600">Pricing</Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <div className="mr-2 border-r pr-4 hidden sm:block">
                        <ModeToggle />
                    </div>

                    <Link href="/login" className="text-sm font-medium hover:text-amber-600 transition-colors hidden sm:block">
                        Sign in
                    </Link>

                    <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-6 shadow-md shadow-amber-500/20">
                        <Link href="/signup">
                            Start Challenge
                        </Link>
                    </Button>
                </div>

            </div>
        </header>
    )
}