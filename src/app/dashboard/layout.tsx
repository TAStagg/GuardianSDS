import { Sidebar } from "@/components/layout/sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <Sidebar />
            <main className="flex-1 flex flex-col min-h-0 overflow-y-auto">
                {/* Top Header Placeholder (optional, for breadcrumbs or global search) */}
                <header className="h-16 border-b flex items-center px-8 bg-card/50 backdrop-blur sticky top-0 z-20">
                    <h2 className="text-lg font-semibold">Dashboard</h2>
                </header>

                <div className="flex-1 p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
