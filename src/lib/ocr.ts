import { createWorker } from 'tesseract.js';

export interface OCRResult {
    text: string;
    confidence?: number;
}

export interface OCRService {
    extractText(imagePathOrBuffer: string | Buffer): Promise<OCRResult>;
}

export class TesseractOCRService implements OCRService {
    async extractText(imagePathOrBuffer: string | Buffer): Promise<OCRResult> {
        // MOCK OCR for Demo: Bypass actual Tesseract to avoid timeouts/PDF issues.
        // Tesseract.js requires image inputs (png/jpg) or complex PDF handling.
        // Since our extractor is also mocked, we just return dummy text to unblock the flow.

        console.log("Mock OCR: Skipping Tesseract execution for stability.");

        return {
            text: "RAW SDS CONTENT.... [MOCK DATA FOR DEMO] ... SECTION 1 IDENTIFICATION ...",
            confidence: 99.9,
        };
    }
}

// Factory to get the OCR service (allows easy swapping)
export function getOCRService(): OCRService {
    // In the future, we can check ENV vars to return TextractService
    return new TesseractOCRService();
}
