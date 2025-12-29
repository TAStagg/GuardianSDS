"use client"

import { Button } from "@/components/ui/button"
import { Printer, X } from "lucide-react"
import { SDS } from "@/lib/schema"
import { useRef } from "react"

interface GhsLabelProps {
    sds: SDS;
    onClose: () => void;
}

export function GhsLabel({ sds, onClose }: GhsLabelProps) {
    // Use a ref for the printable area if we were using a library,
    // but for simplicity and robustness we'll use a specific print media query on the main content
    // or just a dedicated print layout. 
    // For this demo, we will create a modal that "dominates" the print view.

    const handlePrint = () => {
        window.print();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-white text-black rounded-lg shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Screen-only Header */}
                <div className="p-4 border-b flex justify-between items-center print:hidden bg-gray-50">
                    <h2 className="text-lg font-bold">Secondary Label Preview</h2>
                    <div className="flex gap-2">
                        <Button onClick={handlePrint}>
                            <Printer className="mr-2 h-4 w-4" /> Print
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Printable Label Area */}
                <div className="p-8 overflow-y-auto bg-gray-100 print:bg-white print:p-0 print:overflow-visible flex justify-center">
                    {/* The Actual Sticker (Standard 4x6 approx ratio) */}
                    <div className="w-[400px] h-[600px] bg-white border-4 border-black p-4 flex flex-col justify-between shadow-lg print:shadow-none print:w-full print:h-full print:border-none">

                        {/* Header: Product ID */}
                        <div className="border-b-4 border-black pb-2">
                            <h1 className="text-3xl font-black uppercase leading-tight">{sds?.section1?.productName || "PRODUCT NAME"}</h1>
                            <p className="font-bold text-lg">{sds?.section1?.productCode || "UNKNOWN SKU"}</p>
                        </div>

                        {/* Body: Pictograms & Signal Word */}
                        <div className="flex-1 flex flex-col items-center justify-center gap-4 py-4">
                            <div className="flex gap-4">
                                {/* Mock Pictograms - In real app, map codes to SVG images */}
                                <div className="w-24 h-24 border-4 border-red-500 transform rotate-45 flex items-center justify-center overflow-hidden">
                                    <div className="transform -rotate-45 font-black text-6xl text-black">!</div>
                                </div>
                                {sds?.section2?.signalWord === 'DANGER' && (
                                    <div className="w-24 h-24 border-4 border-red-500 transform rotate-45 flex items-center justify-center overflow-hidden">
                                        <div className="transform -rotate-45 font-black text-4xl text-black">☠</div>
                                    </div>
                                )}
                            </div>

                            <div className="text-5xl font-black uppercase tracking-widest text-red-600 mt-4">
                                {sds?.section2?.signalWord || "WARNING"}
                            </div>
                        </div>

                        {/* Footer: Hazards */}
                        <div className="border-t-4 border-black pt-2 space-y-2">
                            <div className="text-sm font-bold">
                                {sds?.section2?.hazardStatements?.map(h => (
                                    <p key={h.code}>{h.code}: {h.statement}</p>
                                ))}
                            </div>
                            <div className="text-xs mt-4 pt-2 border-t border-gray-400">
                                <p className="font-bold">MANUFACTURER:</p>
                                <p>{sds?.section1?.manufacturer?.name}</p>
                                <p>Tel: {sds?.section1?.manufacturer?.emergencyPhone}</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* CSS for printing: hide everything else */}
                <style jsx global>{`
          @media print {
            body > * { display: none !important; }
            body > div:last-child { display: flex !important; } /* A bit hacky, but forcing the modal container (usually last) to show */
            .print\\:hidden { display: none !important; }
            .print\\:bg-white { background-color: white !important; }
            .print\\:p-0 { padding: 0 !important; }
            .print\\:shadow-none { box-shadow: none !important; }
            .print\\:w-full { width: 100% !important; }
            .print\\:h-full { height: 100% !important; }
            .print\\:border-none { border: none !important; }
            .print\\:overflow-visible { overflow: visible !important; }
            /* Target the label container directly if possible, or ensure the modal is the only thing visible */
          }
        `}</style>
            </div>
        </div>
    )
}
