"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { User, Bell, Shield, Database } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-1">Manage your account preferences and application configuration.</p>
            </div>

            <div className="grid gap-6">
                {/* Profile Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Profile Information
                        </CardTitle>
                        <CardDescription>Update your personal details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">First Name</label>
                                <Input defaultValue="Facility" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Last Name</label>
                                <Input defaultValue="Admin" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input defaultValue="admin@generalhospital.com" />
                        </div>
                        <Button>Save Changes</Button>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            Notifications
                        </CardTitle>
                        <CardDescription>Configure how you receive alerts.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <p className="font-medium">Sentinel Updates</p>
                                <p className="text-sm text-muted-foreground">Receive alerts when SDS versions change.</p>
                            </div>
                            <Badge variant="secondary">Enabled</Badge>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <p className="font-medium">Missing SDS Alerts</p>
                                <p className="text-sm text-muted-foreground">Notify when purchasing items without SDS.</p>
                            </div>
                            <Badge variant="secondary">Enabled</Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* System */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Database className="h-5 w-5" />
                            System & Data
                        </CardTitle>
                        <CardDescription>Manage offline storage and cache.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Offline Cache (Dexie)</p>
                                <p className="text-sm text-muted-foreground">Using 4.2 MB of storage.</p>
                            </div>
                            <Button variant="destructive" size="sm">Clear Cache</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
