"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Phone, ExternalLink } from "lucide-react"

export default function EmergencyView() {
    // In reality, fetch data based on [token] or [id]
    const mockData = {
        productName: "Concentrated Bleach",
        manufacturer: "Clorox Professional",
        firstAid: {
            eyes: "Rinse immediately with plenty of water, also under the eyelids, for at least 15 minutes.",
            skin: "Wash off immediately with soap and plenty of water.",
            inhalation: "Move to fresh air."
        },
        emergencyPhone: "1-800-446-1011"
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 space-y-8 font-mono">
            {/* High Contrast Header */}
            <div className="border-4 border-red-500 p-4 rounded-lg bg-red-950/50 text-center animate-pulse">
                <h1 className="text-3xl font-black uppercase tracking-wider text-red-500">EMERGENCY MODE</h1>
                <p className="text-red-300 font-bold">READ ONLY • OFF-LINE SAFE</p>
            </div>

            <div className="space-y-4">
                <h2 className="text-4xl font-bold">{mockData.productName}</h2>
                <p className="text-xl text-gray-400">{mockData.manufacturer}</p>
            </div>

            <div className="grid gap-6">
                <Card className="bg-white text-black border-4 border-yellow-400">
                    <CardHeader>
                        <CardTitle className="text-2xl font-black flex items-center gap-2">
                            <AlertTriangle className="h-8 w-8 text-black" />
                            FIRST AID: EYES
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">
                        {mockData.firstAid.eyes}
                    </CardContent>
                </Card>

                <Card className="bg-gray-900 border-2 border-white">
                    <CardHeader>
                        <CardTitle className="text-xl text-white">SKIN CONTACT</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xl text-white">
                        {mockData.firstAid.skin}
                    </CardContent>
                </Card>

                <Card className="bg-gray-900 border-2 border-white">
                    <CardHeader>
                        <CardTitle className="text-xl text-white">INHALATION</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xl text-white">
                        {mockData.firstAid.inhalation}
                    </CardContent>
                </Card>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-black border-t border-gray-800 flex flex-col gap-4">
                <Button className="w-full text-xl py-8 bg-green-600 hover:bg-green-700 text-white font-bold">
                    <Phone className="mr-4 h-6 w-6" />
                    CALL {mockData.emergencyPhone}
                </Button>
            </div>
        </div>
    )
}
