import Navbar from "@/components/Topbar"

export default function DashboardLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}