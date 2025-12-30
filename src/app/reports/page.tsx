"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Filter } from "lucide-react"

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Compliance Reports</h1>
                    <p className="text-muted-foreground mt-1">Generate and download safety compliance audits.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                    <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Export All
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Report Card 1 */}
                <Card className="hover:bg-secondary/20 transition-colors cursor-pointer">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-blue-500" />
                            Missing SDS Strings
                        </CardTitle>
                        <CardDescription>Items in inventory without verified SDS.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">3 Items</p>
                        <p className="text-xs text-muted-foreground mt-1">Last generated: Today</p>
                    </CardContent>
                </Card>

                {/* Report Card 2 */}
                <Card className="hover:bg-secondary/20 transition-colors cursor-pointer">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-green-500" />
                            Active Compliance
                        </CardTitle>
                        <CardDescription>Department readiness summary.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">98% Score</p>
                        <p className="text-xs text-muted-foreground mt-1">Last generated: Yesterday</p>
                    </CardContent>
                </Card>

                {/* Report Card 3 */}
                <Card className="hover:bg-secondary/20 transition-colors cursor-pointer">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-purple-500" />
                            Sentinel Updates
                        </CardTitle>
                        <CardDescription>Changes detected by background monitoring.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">12 Updates</p>
                        <p className="text-xs text-muted-foreground mt-1">Last generated: 1h ago</p>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-muted/50 rounded-lg p-8 text-center border border-dashed">
                <h3 className="text-lg font-medium">Custom Report Builder</h3>
                <p className="text-muted-foreground text-sm mt-2">Select parameters to generate a specific audit log.</p>
                <Button variant="secondary" className="mt-4">Build Report</Button>
            </div>
        </div>
    )
}
