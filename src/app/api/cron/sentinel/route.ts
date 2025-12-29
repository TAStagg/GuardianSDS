import { NextRequest, NextResponse } from 'next/server';
import { sentinel } from '@/lib/sentinel';

export async function GET(req: NextRequest) {
    // In production, verify CRON_SECRET header
    // const authHeader = req.headers.get('authorization');
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) { ... }

    try {
        // 1. Get list of Monitored IDs (Mocked)
        const monitoredIds = ["BLEACH-001", "AMMONIA-023", "SOLVENT-X"];

        // 2. Run Sentinel Check
        const updates = await sentinel.checkUpdates(monitoredIds);

        // 3. Store updates (In real app: save to DB, create Notifications)
        // For now, we just return them

        return NextResponse.json({
            success: true,
            checked: monitoredIds.length,
            updatesFound: updates.length,
            updates
        });

    } catch (error) {
        console.error("Sentinel Job Failed:", error);
        return NextResponse.json({ error: 'Sentinel Job Failed' }, { status: 500 });
    }
}
