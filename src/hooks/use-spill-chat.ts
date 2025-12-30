import { useState, useRef, useEffect } from "react"
import { SDS } from "@/lib/schema"

export interface Message {
    role: "user" | "assistant";
    content: string;
}

export function useSpillChat(sdsContext: SDS | null) {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "I'm your safety assistant. Ask me about first aid, spills, or PPE." }
    ])
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages, isTyping])

    const sendMessage = async () => {
        if (!input.trim()) return

        const userMsg = input
        setMessages(prev => [...prev, { role: "user", content: userMsg }])
        setInput("")
        setIsTyping(true)

        // Mock RAG Logic execution
        // in a real app, this would be: await fetch('/api/chat', { body: { context: sdsContext, query: userMsg } })
        setTimeout(() => {
            if (!sdsContext) {
                setMessages(prev => [...prev, { role: "assistant", content: "I don't have usage data for this product loaded yet." }])
                setIsTyping(false)
                return
            }

            let response = "I'm checking the safety sheet..."
            const lowerInput = userMsg.toLowerCase()

            if (lowerInput.includes("eye") || lowerInput.includes("vision")) {
                response = `From Section 4 (First Aid): ${sdsContext.section4?.eyeContact || "Rinse cautiously with water for several minutes."}`
            } else if (lowerInput.includes("skin") || lowerInput.includes("touch")) {
                response = `From Section 4 (First Aid): ${sdsContext.section4?.skinContact || "Wash with soap and water."}`
            } else if (lowerInput.includes("spill") || lowerInput.includes("leak") || lowerInput.includes("clean")) {
                if (sdsContext.section6?.personalPrecautions) {
                    response = `From Section 6 (Accidental Release): ${sdsContext.section6.personalPrecautions}`
                } else {
                    response = "Wear protective equipment and contain the spill."
                }
            } else if (lowerInput.includes("fire") || lowerInput.includes("burn")) {
                response = `From Section 5 (Fire Fighting): ${sdsContext.section5?.extinguishingMedia || "Use water spray, alcohol-resistant foam, dry chemical, or carbon dioxide."}`
            } else if (lowerInput.includes("ppe") || lowerInput.includes("wear")) {
                response = `From Section 8 (PPE): Check standard safety equipment (Gloves, Goggles).`
            } else {
                response = "I couldn't find a specific answer in the safety sheet. Please check the full document or call emergency services."
            }

            setMessages(prev => [...prev, { role: "assistant", content: response }])
            setIsTyping(false)
        }, 800)
    }

    return {
        messages,
        input,
        setInput,
        handleSend: sendMessage,
        scrollRef,
        isTyping
    }
}
