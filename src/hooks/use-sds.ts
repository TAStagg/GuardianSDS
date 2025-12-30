import { useState, useEffect } from "react"
import { db } from "@/lib/db"
import { SDS } from "@/lib/schema"
import { MOCK_SDS_BLEACH } from "@/lib/mock-data"

export function useSDS(id: string | null) {
    const [sds, setSds] = useState<SDS | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!id) {
            setIsLoading(false)
            return
        }

        const fetchSDS = async () => {
            setIsLoading(true)
            try {
                // Try fetching from local Dexie DB
                const record = await db.sds.where("sdsId").equals(id).first()

                if (record) {
                    setSds(record.data)
                } else {
                    // Fallback to mock data for demo if not found or if ID is generic
                    // In production, this would try to fetch from an API
                    console.log(`SDS ${id} not found in DB, using mock fallback.`)
                    setSds(MOCK_SDS_BLEACH as unknown as SDS)
                }
            } catch (err) {
                console.error("Failed to fetch SDS:", err)
                setError("Failed to load SDS data")
                // Fallback on error for demo stability
                setSds(MOCK_SDS_BLEACH as unknown as SDS)
            } finally {
                setIsLoading(false)
            }
        }

        fetchSDS()
    }, [id])

    return { sds, isLoading, error }
}
