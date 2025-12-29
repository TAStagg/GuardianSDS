import Dexie, { Table } from 'dexie';
import { SDS } from './schema';

export interface SdsRecord {
    id?: number;
    sdsId: string;
    data: SDS;
    lastUpdated: Date;
    isPinned: boolean; // For "High Hazard" force caching
}

export class GuardianDB extends Dexie {
    sds!: Table<SdsRecord>;

    constructor() {
        super('GuardianDB');
        this.version(1).stores({
            sds: '++id, sdsId, isPinned'
        });
    }
}

export const db = new GuardianDB();

// Helper to save SDS
export async function cacheSDS(sdsId: string, data: SDS, isPinned: boolean = false) {
    try {
        // Check if exists
        const existing = await db.sds.where('sdsId').equals(sdsId).first();
        if (existing && existing.id) {
            await db.sds.update(existing.id, {
                data,
                lastUpdated: new Date(),
                isPinned
            });
        } else {
            await db.sds.add({
                sdsId,
                data,
                lastUpdated: new Date(),
                isPinned
            });
        }
        console.log(`SDS ${sdsId} cached successfully.`);
    } catch (error) {
        console.error("Failed to cache SDS:", error);
    }
}
