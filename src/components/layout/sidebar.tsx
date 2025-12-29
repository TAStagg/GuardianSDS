"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    Activity,
    Library,
    FileText,
    Settings,
    Menu,
    ShieldAlert
} from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Activity },
    { name: "SDS Library", href: "/library", icon: Library },
    { name: "Reports", href: "/reports", icon: FileText },
    { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
    const pathname = usePathname()
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    return (
        <>
            {/* Mobile Toggle */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2 bg-background border rounded-md">
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            {/* Sidebar Container */}
            <AnimatePresence>
                {(isMobileOpen || (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
                    <motion.div
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        className={cn(
                            "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r flex flex-col transition-transform md:translate-x-0 md:static",
                            isMobileOpen ? "translate-x-0" : "-translate-x-full"
                        )}
                    >
                        {/* Logo Area */}
                        <div className="h-16 flex items-center px-6 border-b">
                            <ShieldAlert className="h-8 w-8 text-primary mr-2" />
                            <span className="font-bold text-xl tracking-tight">GuardianSDS</span>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 px-4 py-6 space-y-2">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                                            isActive
                                                ? "bg-primary text-primary-foreground"
                                                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                        )}
                                    >
                                        <item.icon className="mr-3 h-5 w-5" />
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </nav>

                        {/* Footer / User Profile Stub */}
                        <div className="p-4 border-t">
                            <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-secondary"></div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium">Facility Admin</p>
                                    <p className="text-xs text-muted-foreground">General Hospital</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Overlay for mobile */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
        </>
    )
}
