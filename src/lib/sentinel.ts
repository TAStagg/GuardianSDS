import { SDS } from './schema';

export interface SentinelUpdate {
    sdsId: string;
    chemicalName: string;
    manufacturer: string;
    foundDate: Date;
    changes: DiffResult[];
    newPdfUrl?: string;
}

export interface DiffResult {
    section: string;
    field: string;
    oldValue: string;
    newValue: string;
    severity: 'HIGH' | 'MEDIUM' | 'LOW';
}

export class SentinelService {

    // MOCK: Simulate checking a list of manufacturers
    async checkUpdates(monitoredIds: string[]): Promise<SentinelUpdate[]> {
        console.log(`Sentinel: Checking manufacturers for ${monitoredIds.length} SDS items...`);

        // Simulate finding an update for one specific item
        const updates: SentinelUpdate[] = [];

        // Mock logic: randomly decide if "Concentrated Bleach" has an update
        // For demo purposes, we will ALWAYS return an update if it's in the list
        if (monitoredIds.includes("BLEACH-001")) {
            updates.push({
                sdsId: "BLEACH-001",
                chemicalName: "Concentrated Bleach",
                manufacturer: "Clorox Professional",
                foundDate: new Date(),
                changes: [
                    {
                        section: "Section 2: Hazards",
                        field: "Signal Word",
                        oldValue: "WARNING",
                        newValue: "DANGER",
                        severity: "HIGH"
                    },
                    {
                        section: "Section 9: Physical Properties",
                        field: "pH",
                        oldValue: "11.5",
                        newValue: "12.5",
                        severity: "LOW"
                    }
                ]
            });
        }

        return updates;
    }

    // CORE: Compare two SDS objects
    generateDiff(oldSds: SDS, newSds: SDS): DiffResult[] {
        const diffs: DiffResult[] = [];

        // Compare Signal Word (High Priority)
        if (oldSds.section2?.signalWord !== newSds.section2?.signalWord) {
            diffs.push({
                section: "Section 2",
                field: "Signal Word",
                oldValue: oldSds.section2?.signalWord || "N/A",
                newValue: newSds.section2?.signalWord || "N/A",
                severity: "HIGH"
            });
        }

        // Compare H-Codes (High Priority)
        // Simplified logic: Check count or basic existence for demo
        const oldCodes = oldSds.section2?.hazardStatements.map(h => h.code).join(',') || "";
        const newCodes = newSds.section2?.hazardStatements.map(h => h.code).join(',') || "";
        if (oldCodes !== newCodes) {
            diffs.push({
                section: "Section 2",
                field: "Hazard Codes",
                oldValue: oldCodes,
                newValue: newCodes,
                severity: "HIGH"
            });
        }

        return diffs;
    }
}

export const sentinel = new SentinelService();
