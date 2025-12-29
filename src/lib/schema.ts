import { z } from 'zod';

export const SignalWordSchema = z.enum(['DANGER', 'WARNING', 'UNKNOWN']).optional();

export const GHS_Section1_Identification = z.object({
    productName: z.string().describe("Product Identifier"),
    productCode: z.string().optional().describe("Product Code/SKU"),
    recommendedUse: z.string().optional(),
    manufacturer: z.object({
        name: z.string(),
        address: z.string().optional(),
        emergencyPhone: z.string().optional(),
    }).describe("Supplier Details"),
});

export const GHS_Section2_Hazards = z.object({
    classification: z.string().optional(),
    signalWord: SignalWordSchema,
    hazardStatements: z.array(z.object({
        code: z.string(),
        statement: z.string(),
    })).describe("H-Codes"),
    precautionaryStatements: z.array(z.object({
        code: z.string(),
        statement: z.string(),
    })).describe("P-Codes"),
    pictograms: z.array(z.string()).optional(),
});

export const GHS_Section3_Composition = z.object({
    ingredients: z.array(z.object({
        chemicalName: z.string(),
        commonName: z.string().optional(),
        casNumber: z.string(),
        concentration: z.string().optional(), // Range like "10-30%"
    })),
});

export const GHS_Section4_FirstAid = z.object({
    generalAdvice: z.string().optional(),
    inhalation: z.string().optional(),
    skinContact: z.string().optional(),
    eyeContact: z.string().optional(),
    ingestion: z.string().optional(),
    mostImportantSymptoms: z.string().optional(),
    immediateMedicalAttention: z.string().optional(),
});

export const GHS_Section5_FireFighting = z.object({
    extinguishingMedia: z.string().optional(),
    specificHazards: z.string().optional(),
    protectiveEquipment: z.string().optional(),
});

export const GHS_Section6_AccidentalRelease = z.object({
    personalPrecautions: z.string().optional(),
    environmentalPrecautions: z.string().optional(),
    methodsForContainmentAndCleaningUp: z.string().optional(),
});

export const GHS_Section7_HandlingStorage = z.object({
    handling: z.string().optional(),
    storage: z.string().optional(),
});

export const GHS_Section8_ExposureControls = z.object({
    exposureLimits: z.array(z.object({
        chemicalName: z.string(),
        limitType: z.string(), // e.g., TWA, STEL
        value: z.string(),
    })).optional(),
    engineeringControls: z.string().optional(),
    personalProtectiveEquipment: z.object({
        eyeFace: z.string().optional(),
        skinBody: z.string().optional(),
        respiratory: z.string().optional(),
    }).optional(),
});

export const GHS_Section9_PhysicalChemical = z.object({
    physicalState: z.string().optional(),
    color: z.string().optional(),
    odor: z.string().optional(),
    pH: z.string().optional(),
    flashPoint: z.string().optional(),
    relativeDensity: z.string().optional(),
    solubility: z.string().optional(),
});

export const GHS_Section10_StabilityReactivity = z.object({
    reactivity: z.string().optional(),
    chemicalStability: z.string().optional(),
    conditionsToAvoid: z.string().optional(),
    incompatibleMaterials: z.string().optional(),
    hazardousDecompositionProducts: z.string().optional(),
});

export const GHS_Section11_Toxicological = z.object({
    acuteToxicity: z.string().optional(),
    skinCorrosionIrritation: z.string().optional(),
    seriousEyeDamageIrritation: z.string().optional(),
    carcinogenicity: z.string().optional(),
});

export const GHS_Section12_Ecological = z.object({
    toxicity: z.string().optional(),
    persistenceDegradability: z.string().optional(),
    bioaccumulativePotential: z.string().optional(),
    mobilityInSoil: z.string().optional(),
});

export const GHS_Section13_Disposal = z.object({
    disposalMethods: z.string().optional(),
    contaminatedPackaging: z.string().optional(),
});

export const GHS_Section14_Transport = z.object({
    unNumber: z.string().optional(),
    properShippingName: z.string().optional(),
    hazardClass: z.string().optional(),
    packingGroup: z.string().optional(),
});

export const GHS_Section15_Regulatory = z.object({
    safetyHealthEnvironmentalRegulations: z.string().optional(),
});

export const GHS_Section16_Other = z.object({
    revisionDate: z.string().optional(),
    otherInformation: z.string().optional(),
});

// Main SDS Schema
export const SDSSchema = z.object({
    section1: GHS_Section1_Identification,
    section2: GHS_Section2_Hazards,
    section3: GHS_Section3_Composition,
    section4: GHS_Section4_FirstAid,
    section5: GHS_Section5_FireFighting,
    section6: GHS_Section6_AccidentalRelease,
    section7: GHS_Section7_HandlingStorage,
    section8: GHS_Section8_ExposureControls,
    section9: GHS_Section9_PhysicalChemical,
    section10: GHS_Section10_StabilityReactivity,
    section11: GHS_Section11_Toxicological,
    section12: GHS_Section12_Ecological,
    section13: GHS_Section13_Disposal,
    section14: GHS_Section14_Transport,
    section15: GHS_Section15_Regulatory,
    section16: GHS_Section16_Other,
});

export type SDS = z.infer<typeof SDSSchema>;
