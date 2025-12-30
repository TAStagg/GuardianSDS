"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Printer, Share2, FileDown, ArrowLeft, Skull, Flame, Hand, Eye, Shield, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { SpillChat } from "@/components/spill-chat"
import { GhsLabel } from "@/components/ghs-label"
import { useSDS } from "@/hooks/use-sds"

export default function SDSDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const [showLabel, setShowLabel] = useState(false)
    const [id, setId] = useState<string | null>(null)

    // Unwrap params
    useEffect(() => {
        params.then(p => setId(p.id))
    }, [params])

    const { sds: sdsData, isLoading } = useSDS(id)

    if (isLoading || !sdsData) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Loading SDS...</span>
            </div>
        )
    }

    return (
        <div className="space-y-6 relative">
            <SpillChat sdsContext={sdsData} />

            {showLabel && (
                <GhsLabel sds={sdsData} onClose={() => setShowLabel(false)} />
            )}

            {/* Sticky Action Header */}
            <div className="sticky top-0 -mx-8 px-8 py-4 bg-background/80 backdrop-blur border-b z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/library">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <div>
                            <h1 className="text-xl font-bold">{sdsData.section1?.productName}</h1>
                            <p className="text-xs text-muted-foreground">{sdsData.section1?.manufacturer?.name} • Code: {sdsData.section1?.productCode}</p>
                        </div>          </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Share2 className="mr-2 h-4 w-4" /> Share
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowLabel(true)}>
                        <Printer className="mr-2 h-4 w-4" /> Print Label
                    </Button>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                        <AlertTriangle className="mr-2 h-4 w-4" /> Emergency View
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Left Column: Quick Info */}
                <div className="space-y-6">
                    <Card className="border-l-4 border-l-red-500">
                        <CardHeader>
                            <CardTitle className="text-red-500 flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5" />
                                {sdsData.section2?.signalWord || "WARNING"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4 mb-4">
                                {/* Dynamic Pictograms would go here based on H-codes */}
                                <div className="h-16 w-16 bg-red-100 rounded-lg border-2 border-red-500 flex items-center justify-center">
                                    <Skull className="h-8 w-8 text-red-600" />
                                </div>
                            </div>
                            <p className="text-sm font-medium">Hazard Statements</p>
                            <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1 mt-2">
                                {sdsData.section2?.hazardStatements?.map((h: any, i: number) => (
                                    <li key={i}>{h.code}: {h.statement}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>PPE Required</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2">
                                {/* Placeholders for PPE Icons */}
                                <div className="flex flex-col items-center gap-1">
                                    <div className="h-10 w-10 bg-blue-100 rounded flex items-center justify-center text-blue-600">
                                        <Hand className="h-6 w-6" />
                                    </div>
                                    <span className="text-xs text-muted-foreground">Gloves</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="h-10 w-10 bg-blue-100 rounded flex items-center justify-center text-blue-600">
                                        <Eye className="h-6 w-6" />
                                    </div>
                                    <span className="text-xs text-muted-foreground">Goggles</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="h-10 w-10 bg-blue-100 rounded flex items-center justify-center text-blue-600">
                                        <Shield className="h-6 w-6" />
                                    </div>
                                    <span className="text-xs text-muted-foreground">Apron</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Detailed 16 Sections */}
                <div className="md:col-span-2 space-y-4">

                    {/* Section 4: First Aid (Prioritized) */}
                    <Card className="border-blue-500 border">
                        <CardHeader className="bg-blue-50 dark:bg-blue-950/20 pb-4">
                            <CardTitle className="text-blue-700 dark:text-blue-300">Section 4: First-Aid Measures</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div>
                                <h4 className="font-semibold text-sm">Eye Contact</h4>
                                <p className="text-sm mt-1">{sdsData.section4?.eyeContact}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm">Skin Contact</h4>
                                <p className="text-sm mt-1">{sdsData.section4?.skinContact}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm">Inhalation</h4>
                                <p className="text-sm mt-1">{sdsData.section4?.inhalation}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Other sections example */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Section 3: Composition</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 text-sm font-medium border-b pb-2 mb-2">
                                <span>Chemical Name</span>
                                <span>Concentration</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <span>{sdsData.section1?.productName}</span>
                                <span>100%</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Section 9: Physical Properties</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-secondary p-3 rounded-lg">
                                    <p className="text-xs text-muted-foreground">Appearance</p>
                                    <p className="text-sm font-medium">{sdsData.section9?.physicalState || "N/A"}</p>
                                </div>
                                <div className="bg-secondary p-3 rounded-lg">
                                    <p className="text-xs text-muted-foreground">pH</p>
                                    <p className="text-sm font-medium">{sdsData.section9?.pH || "N/A"}</p>
                                </div>
                                <div className="bg-secondary p-3 rounded-lg">
                                    <p className="text-xs text-muted-foreground">Odor</p>
                                    <p className="text-sm font-medium">{sdsData.section9?.odor || "N/A"}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    )
}
