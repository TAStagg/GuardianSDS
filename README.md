# GuardianSDS

**GuardianSDS** is an AI-native Safety Data Sheet (SDS) management and compliance platform. Built for facilities managers, hospitals, and industrial teams, it moves safety documentation from "dead PDFs" into a proactive, searchable, and voice-activated safety engine.

## 🚀 Key Features
* **AI-Neural Extraction:** Automatically converts manufacturer PDFs into structured JSON data using Vision-Language Models.
* **Emergency Mode:** One-tap/Voice-activated access to Section 4 (First Aid) and Section 8 (PPE) without a login.
* **The Sentinel:** Automated agents that monitor manufacturer databases for revisions to ensure 2025 OSHA compliance.
* **Secondary Labeling:** Instant GHS-compliant label generation for secondary containers.
* **Offline-First:** Critical safety data is cached locally on iPad/Mobile devices for access during network outages.

## 🛠️ Tech Stack
* **Frontend:** Next.js 15, React, Tailwind CSS
* **Backend:** Node.js, PostgreSQL (Prisma)
* **AI Engine:** OpenAI GPT-4o-mini / specialized OCR pipelines
* **API Integrations:** Support for CloudSDS and SDS Manager APIs

## 📦 Getting Started
1. **Clone the repo:** `git clone https://github.com/TAStagg/GuardianSDS.git`
2. **Install dependencies:** `npm install`
3. **Set up Environment Variables:** Copy `.env.example` to `.env` and add your API keys.
4. **Run development server:** `npm run dev`

## ⚖️ License
Distributed under the MIT License. See `LICENSE` for more information.
