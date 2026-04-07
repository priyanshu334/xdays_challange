import { Zap, Twitter, Github, Linkedin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-primary/5 py-12 bg-card/20 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
             <Link href="/" className="flex items-center gap-2 transition-all hover:opacity-80">
                <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <Zap className="w-4 h-4 fill-current" />
                </div>
                <span className="text-xl font-bold tracking-tight outfit text-gradient">XDays</span>
            </Link>
            <p className="text-sm text-muted-foreground font-medium max-w-xs text-center md:text-left">
              The ultimate OS for high-performers who finish what they start.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex gap-8 text-sm font-bold outfit uppercase tracking-widest text-muted-foreground">
              <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
              <Link href="#how" className="hover:text-primary transition-colors">Method</Link>
              <Link href="/login" className="hover:text-primary transition-colors">Login</Link>
            </div>

            <div className="flex gap-6 text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-all hover:scale-110"><Twitter className="size-5" /></Link>
              <Link href="#" className="hover:text-primary transition-all hover:scale-110"><Github className="size-5" /></Link>
              <Link href="#" className="hover:text-primary transition-all hover:scale-110"><Linkedin className="size-5" /></Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-muted-foreground/60 outfit uppercase tracking-widest">
          <div>© {new Date().getFullYear()} XDays Platform. All rights reserved.</div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

