"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, AlertTriangle, CheckCircle, Package, RefreshCw } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Compliance Heartbeat</h1>
                    <p className="text-muted-foreground mt-1">Live overview of your facility's chemical safety status.</p>
                </div>
                <div className="flex gap-2">
                    <Badge variant="outline" className="px-4 py-1">Last Scan: 2 mins ago</Badge>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Health Score</CardTitle>
                        <Activity className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">98%</div>
                        <p className="text-xs text-muted-foreground">
                            +2% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Library Status</CardTitle>
                        <Package className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,240</div>
                        <p className="text-xs text-muted-foreground">
                            Total Chemicals
                        </p>
                        <div className="mt-2 h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-[95%]"></div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Outdated SDS</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">
                            Require attention
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Emergency Mode</CardTitle>
                        <ShieldAlert className="h-4 w-4 text-destructive" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Active</div>
                        <p className="text-xs text-muted-foreground">
                            System ready
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Area */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                            New SDS uploads and system alerts from the past 24 hours.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center">
                                    <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
                                        <FileIcon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">New SDS Added: Clorox Bleach</p>
                                        <p className="text-sm text-muted-foreground">Uploaded by Admin • 2h ago</p>
                                    </div>
                                    <div className="ml-auto font-medium text-green-500 text-sm">Verified</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-4 border-l-4 border-l-purple-500">
                    <CardHeader>
                        <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center gap-2">
                            <RefreshCw className="h-5 w-5" />
                            Sentinel Updates
                        </CardTitle>
                        <CardDescription>
                            2 monitored chemicals have updated SDS versions.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-start justify-between p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                                <div>
                                    <h4 className="font-semibold text-sm">Concentrated Bleach</h4>
                                    <p className="text-xs text-muted-foreground">Manufacturer: Clorox Professional</p>
                                    <div className="mt-2 text-xs bg-white dark:bg-black p-2 rounded border">
                                        <span className="font-bold text-red-500">CHANGE DETECTED:</span> Signal Word changed from <span className="line-through text-muted-foreground">WARNING</span> to <span className="font-bold">DANGER</span>.
                                    </div>
                                </div>
                                <Button size="sm" variant="outline">Review Diff</Button>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                                <div>
                                    <h4 className="font-semibold text-sm">Ammonia Multi-Surface</h4>
                                    <p className="text-xs text-muted-foreground">Updated: Today at 4:30 AM</p>
                                </div>
                                <Button size="sm" variant="outline">Review Diff</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Department Alerts</CardTitle>
                        <CardDescription>
                            Areas requiring immediate review.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {["Housekeeping", "Maintenance", "Oncology"].map((dept) => (
                                <div key={dept} className="flex items-center justify-between p-2 border rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors">
                                    <span className="text-sm font-medium">{dept}</span>
                                    <Badge variant="warning">Review</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
        </svg>
    )
}

function ShieldAlert(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
    )
}
