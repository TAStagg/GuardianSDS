export const MOCK_SDS_BLEACH = {
    section1: {
        productName: "Concentrated Bleach",
        productCode: "B-204",
        manufacturer: {
            name: "Clorox Professional Products",
            emergencyPhone: "1-800-446-1011"
        }
    },
    section2: {
        signalWord: "DANGER",
        hazardStatements: [
            { code: "H314", statement: "Causes severe skin burns and eye damage" },
            { code: "H290", statement: "May be corrosive to metals" },
            { code: "H400", statement: "Very toxic to aquatic life" }
        ],
        precautionaryStatements: [
            { code: "P280", statement: "Wear protective gloves/protective clothing/eye protection/face protection" }
        ]
    },
    section4: {
        eyeContact: "Rinse immediately with plenty of water, also under the eyelids, for at least 15 minutes. Remove contact lenses, if present and easy to do. Continue rinsing.",
        skinContact: "Wash off immediately with soap and plenty of water.",
        inhalation: "Move to fresh air."
    },
    section5: {
        extinguishingMedia: "Use extinguishing measures that are appropriate to local circumstances and the surrounding environment."
    },
    section6: {
        personalPrecautions: "Avoid contact with skin, eyes and clothing. Use personal protective equipment."
    },
    section9: {
        physicalState: "Clear, pale yellow liquid",
        pH: "~12.5",
        odor: "Bleach"
    }
}

export const MOCK_SDS_CLEANER = {
    section1: {
        productName: "Mock Clean-O-Max",
        productCode: "CMX-2025",
        manufacturer: {
            name: "Acme Chemical Corp",
            emergencyPhone: "1-800-555-0199",
        },
    },
    section2: {
        signalWord: "DANGER",
        hazardStatements: [
            { code: "H318", statement: "Causes serious eye damage" },
        ],
        precautionaryStatements: [
            { code: "P280", statement: "Wear eye protection/face protection" },
        ],
    },
    section3: {
        ingredients: [
            { chemicalName: "Sodium Hypochlorite", casNumber: "7681-52-9", concentration: "5-10%" },
        ],
    },
    section4: {
        eyeContact: "Rinse cautiously with water for several minutes. Remove contact lenses, if present and easy to do. Continue rinsing.",
    },
    section16: {
        revisionDate: "2024-01-01",
    },
}
