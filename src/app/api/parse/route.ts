import { NextRequest, NextResponse } from 'next/server';
import { getOCRService } from '@/lib/ocr';
import { getExtractorService } from '@/lib/extractor';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Convert File to ArrayBuffer then to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 1. OCR Step
        const ocrService = getOCRService();
        const ocrResult = await ocrService.extractText(buffer);
        console.log(`OCR Confidence: ${ocrResult.confidence}`);

        // 2. Extraction Step
        const extractorService = getExtractorService();
        const sdsData = await extractorService.extractSDS(ocrResult.text);

        return NextResponse.json({
            success: true,
            data: sdsData,
            metadata: {
                ocrConfidence: ocrResult.confidence,
                ocrTextPreview: ocrResult.text.substring(0, 100) + "..."
            }
        });

    } catch (error) {
        console.error('Error processing SDS:', error);
        return NextResponse.json(
            { error: 'Failed to process SDS', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
