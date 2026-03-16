import Navbar from "@/components/Topbar"

export default function DashboardLayout({ childern }: {
    childern: React.ReactNode
}) {
    return (
        <div>
            <Navbar />
            {childern}
        </div>
    )
}