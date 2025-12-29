import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { purchaseOrder, items } = body;

        console.log(`Webhook: Received PO ${purchaseOrder} with ${items?.length} items.`);

        // Logic: Check if items exist in our SDS library
        const alerts = [];

        // Type definition for items
        interface POItem {
            sku: string;
            name: string;
        }

        if (items && Array.isArray(items)) {
            for (const item of items) {
                // Mock Check: If item name contains "Mystery", flag it
                if ((item as POItem).name.includes("Mystery")) {
                    alerts.push({
                        type: "MISSING_SDS",
                        message: `New Chemical detected in PO ${purchaseOrder}: ${item.name}. No SDS on file.`,
                        sku: item.sku
                    });
                }
            }
        }

        // In a real app, we would write these alerts to the DB
        if (alerts.length > 0) {
            console.log("Webhook: Generated Alerts:", alerts);
        }

        return NextResponse.json({ success: true, alertsGenerated: alerts.length });

    } catch (error) {
        console.error("Webhook Failed:", error);
        return NextResponse.json({ error: 'Invalid Payload' }, { status: 400 });
    }
}
