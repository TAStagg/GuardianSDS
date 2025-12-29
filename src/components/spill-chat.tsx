"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
    role: "user" | "assistant";
    content: string;
}

// Mock RAG Interface
interface SpillChatProps {
    sdsContext: any; // The full SDS JSON object to query against
}

export function SpillChat({ sdsContext }: SpillChatProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "I'm your safety assistant. Ask me about first aid, spills, or PPE." }
    ])
    const [input, setInput] = useState("")
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = () => {
        if (!input.trim()) return

        const userMsg = input
        setMessages(prev => [...prev, { role: "user", content: userMsg }])
        setInput("")

        // Simple Mock RAG Logic
        setTimeout(() => {
            let response = "I'm checking the safety sheet..."
            const lowerInput = userMsg.toLowerCase()

            if (lowerInput.includes("eye") || lowerInput.includes("vision")) {
                response = `From Section 4 (First Aid): ${sdsContext?.section4?.eyeContact || "Rinse cautiously with water for several minutes."}`
            } else if (lowerInput.includes("skin") || lowerInput.includes("touch")) {
                response = `From Section 4 (First Aid): ${sdsContext?.section4?.skinContact || "Wash with soap and water."}`
            } else if (lowerInput.includes("spill") || lowerInput.includes("leak")) {
                response = `From Section 6 (Accidental Release): ${sdsContext?.section6?.personalPrecautions || "Wear protective equipment. Contain spill."}`
            } else if (lowerInput.includes("fire")) {
                response = `From Section 5 (Fire Fighting): ${sdsContext?.section5?.extinguishingMedia || "Use water spray, alcohol-resistant foam, dry chemical, or carbon dioxide."}`
            } else {
                response = "I couldn't find a specific answer in the safety sheet. Please check the full document or call emergency services."
            }

            setMessages(prev => [...prev, { role: "assistant", content: response }])
        }, 600)
    }

    return (
        <>
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl bg-blue-600 hover:bg-blue-700 text-white z-50 transition-transform hover:scale-105"
                >
                    <MessageCircle className="h-8 w-8" />
                </Button>
            )}

            {isOpen && (
                <Card className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] shadow-2xl z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 pointer-events-auto">
                    <CardHeader className="bg-blue-600 text-white rounded-t-lg p-4 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <MessageCircle className="h-5 w-5" />
                            Spill-Chat AI
                        </CardTitle>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:text-white/80 hover:bg-blue-700">
                            <X className="h-5 w-5" />
                        </Button>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
                        {/* Messages Area */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
                            {messages.map((m, i) => (
                                <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                                    <div className={cn(
                                        "max-w-[80%] rounded-lg p-3 text-sm",
                                        m.role === "user"
                                            ? "bg-blue-600 text-white rounded-br-none"
                                            : "bg-secondary text-foreground rounded-bl-none"
                                    )}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="flex gap-2">
                            <Input
                                placeholder="Ask about hazards..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                className="flex-1"
                            />
                            <Button size="icon" onClick={handleSend} disabled={!input.trim()}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </>
    )
}
