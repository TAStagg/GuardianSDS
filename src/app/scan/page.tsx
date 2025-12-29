"use client"

import { useEffect, useState } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function ScanPage() {
    const [scanResult, setScanResult] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        // Basic config for html5-qrcode
        const scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
        )

        scanner.render(
            (decodedText) => {
                // Success callback
                scanner.clear()
                setScanResult(decodedText)

                // In a real app, you'd validate the URL matches a Guardian SDS link
                // For now, assume decodedText is the SDS ID or full URL
                if (decodedText.includes("/sds/")) {
                    router.push(decodedText)
                } else {
                    // Assume it's just an ID
                    router.push(`/sds/${decodedText}`)
                }
            },
            (errorMessage) => {
                // Error callback (ignore frequent read errors)
                console.warn(errorMessage)
            }
        )

        return () => {
            scanner.clear().catch(console.error)
        }
    }, [router])

    return (
        <div className="p-6 space-y-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-center">Scan QR Code</h1>

            <Card>
                <CardContent className="p-4">
                    <div id="reader" className="w-full"></div>
                </CardContent>
            </Card>

            {scanResult && (
                <div className="text-center">
                    <p className="mb-2 text-sm text-muted-foreground">Scanned Result:</p>
                    <div className="p-3 bg-secondary rounded border break-all">
                        {scanResult}
                    </div>
                    <Button className="mt-4" onClick={() => window.location.href = scanResult}>
                        Open Link
                    </Button>
                </div>
            )}
        </div>
    )
}
