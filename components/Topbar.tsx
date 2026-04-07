import Link from "next/link"
import { ModeToggle } from "./ModeToggle"
import { Button } from "./ui/button"
import { getCurrentUser } from "@/lib/auth/get-user"
import { Trophy, LayoutDashboard, LogOut, Zap } from "lucide-react"

export default async function Navbar() {
    const user = await getCurrentUser()

    return (
        <header className="sticky top-0 z-50 w-full border-b border-primary/5 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 transition-all hover:opacity-80 active:scale-95">
                    <div className="size-9 rounded-xl bg-linear-to-br from-primary to-primary/60 flex items-center justify-center text-white shadow-lg shadow-primary/20">
                        <Zap className="w-5 h-5 fill-current" />
                    </div>
                    <span className="text-xl font-bold tracking-tight outfit text-gradient">XDays</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link href="/#features" className="text-muted-foreground transition-colors hover:text-primary">Features</Link>
                    <Link href="/#how" className="text-muted-foreground transition-colors hover:text-primary">How it works</Link>
                    {user && (
                        <Link href="/dashboard" className="flex items-center gap-1.5 text-primary font-semibold">
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                        </Link>
                    )}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 mr-2">
                        <ModeToggle />
                    </div>

                    {!user ? (
                        <>
                            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hidden sm:block">
                                Sign in
                            </Link>

                            <Button asChild className="rounded-full px-6 shadow-lg shadow-primary/20 group">
                                <Link href="/signup" className="flex items-center gap-2">
                                    Start Challenge <Trophy className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                </Link>
                            </Button>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Button asChild variant="ghost" size="sm" className="hidden sm:flex text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all">
                                <Link href="/api/auth/logout" className="flex items-center gap-2">
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </Link>
                            </Button>
                            <Button asChild size="sm" className="rounded-full sm:hidden">
                                <Link href="/dashboard">
                                    Dashboard
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>

            </div>
        </header>
    )
}