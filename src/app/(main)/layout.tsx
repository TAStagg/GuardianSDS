import { Sidebar } from "@/components/layout/sidebar"

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <Sidebar />
            <main className="flex-1 flex flex-col min-h-0 overflow-y-auto w-full md:w-auto">
                {/* Top Header Placeholder (optional, for breadcrumbs or global search) */}
                <div className="h-16 border-b flex items-center px-8 bg-card/50 backdrop-blur sticky top-0 z-20 shrink-0">
                    <h2 className="text-lg font-semibold">GuardianSDS</h2>
                </div>

                <div className="flex-1 p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
