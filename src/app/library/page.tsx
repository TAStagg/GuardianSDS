"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Folder, Plus, FileText, Filter, Loader2, AlertCircle, CheckCircle, X } from "lucide-react"
import { cacheSDS } from "@/lib/db"
import { cn } from "@/lib/utils"

export default function LibraryPage() {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)
    const router = useRouter()

    const handleUploadClick = () => {
        setUploadStatus(null)
        fileInputRef.current?.click()
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        setUploadStatus(null)

        try {
            const formData = new FormData()
            formData.append("file", file)

            const res = await fetch("/api/parse", {
                method: "POST",
                body: formData,
            })

            const json = await res.json()
            if (json.success && json.data) {
                // Generate a temporary ID for this session/demo
                const tempId = `UPLOAD-${Date.now()}`

                // Save to local offline web-database (Dexie) so we can view it
                await cacheSDS(tempId, json.data)

                setUploadStatus({ type: 'success', message: 'SDS uploaded and parsed successfully! Redirecting...' })

                // Redirect to view it
                setTimeout(() => {
                    router.push(`/sds/${tempId}`)
                }, 1000)
            } else {
                setUploadStatus({ type: 'error', message: "Failed to parse SDS. Please try a different file." })
            }
        } catch (error) {
            console.error(error)
            setUploadStatus({ type: 'error', message: "Upload failed. Please check your connection." })
        } finally {
            setIsUploading(false)
            // Reset input so same file can be selected again if needed
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    return (
        <div className="space-y-6">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
            />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">SDS Library</h1>
                    <p className="text-muted-foreground mt-1">Manage and organize your Safety Data Sheets.</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={handleUploadClick} disabled={isUploading}>
                        {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                        {isUploading ? "Processing..." : "Upload SDS"}
                    </Button>
                    <Button variant="outline">
                        <Folder className="mr-2 h-4 w-4" />
                        New Folder
                    </Button>
                </div>
            </div>

            {/* Status Banner */}
            {uploadStatus && (
                <div className={cn(
                    "p-4 rounded-lg flex items-center gap-3 shadow-sm animate-in fade-in slide-in-from-top-2",
                    uploadStatus.type === 'success' ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
                )}>
                    {uploadStatus.type === 'success' ? <CheckCircle className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
                    <p className="text-sm font-medium flex-1">{uploadStatus.message}</p>
                    <button onClick={() => setUploadStatus(null)} className="hover:opacity-70">
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}

            {/* Search Bar */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search by Product Name, Manufacturer, or CAS #..."
                        className="pl-8"
                    />
                </div>
                <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                </Button>
            </div>

            {/* Folders Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Housekeeping", "Maintenance", "Dietary", "Oncology", "Laboratory", "Facilities", "Central Supply", "Radiology"].map((folder) => (
                    <Card key={folder} className="cursor-pointer hover:bg-secondary/20 transition-colors group">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                <Folder className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-medium">{folder}</h3>
                                <p className="text-xs text-muted-foreground">24 Files</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <h2 className="text-xl font-semibold mt-8">All Files</h2>

            {/* List View */}
            <Card>
                <CardContent className="p-0">
                    <div className="divide-y">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-500">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Simple Green All-Purpose Cleaner</h4>
                                        <p className="text-sm text-muted-foreground">Sunshine Makers Inc. • ID: SG-2024-001</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden md:block">
                                        <p className="text-sm font-medium">Rev: Jan 12, 2024</p>
                                        <p className="text-xs text-muted-foreground">Updated 2mo ago</p>
                                    </div>
                                    <Button variant="ghost" size="sm">View</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
