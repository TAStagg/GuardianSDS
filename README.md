# GuardianSDS

📄 Project Description & "The Why"
The Mission: Democratizing Safety Compliance
Currently, the market for Safety Data Sheet (SDS) management is dominated by high-cost, proprietary "electronic filing cabinets." For many hospitals, clinics, and industrial facilities, the recurring subscription costs of these platforms are prohibitively expensive. This creates a dangerous gap where safety documentation remains locked in physical binders or outdated, hard-to-navigate legacy systems.

GuardianSDS was created to break this barrier. We believe that critical safety information should be accessible, intelligent, and affordable.

Why GuardianSDS?
Cost Barrier Removal: Most facility managers want to do the right thing, but "Compliance Taxes" from software vendors eat into maintenance and safety budgets. This project provides a world-class solution that costs a facility nearly nothing to run.

Accessibility for All: By utilizing modern web tech and QR-code mapping, we ensure that a housekeeper, a lab tech, or a nurse can access life-saving first-aid data in seconds, not minutes.

Customization Through Open Source: No two facilities are identical. Because this project is open source, organizations can modify the code to integrate with their specific inventory systems, custom floor plans, or internal safety protocols without waiting for a vendor's "roadmap."

Community-Driven Safety: We are building a standard for safety data extraction. As more developers and safety professionals contribute, the "Neural OCR" engine becomes more accurate for everyone.

🛠 Why I Created This
"As a Facilities and IT Manager in the healthcare sector, I’ve seen firsthand how the high cost of compliance software can prevent smaller facilities from adopting the best safety tools. I wanted to build a solution that allows facilities to take ownership of their data, protect their staff, and meet OSHA/The Joint Commission standards without the 'enterprise' price tag." — Terry Stagg

**GuardianSDS** is an AI-native Safety Data Sheet (SDS) management and compliance platform. Built for facilities managers, hospitals, and industrial teams, it moves safety documentation from "dead PDFs" into a proactive, searchable, and voice-activated safety engine.

## 🚀 Key Features
* **AI-Neural Extraction:** Automatically converts manufacturer PDFs into structured JSON data using Vision-Language Models.
* **Emergency Mode:** One-tap/Voice-activated access to Section 4 (First Aid) and Section 8 (PPE) without a login.
* **The Sentinel:** Automated agents that monitor manufacturer databases for revisions to ensure 2025 OSHA compliance.
* **Secondary Labeling:** Instant GHS-compliant label generation for secondary containers.
* **Offline-First:** Critical safety data is cached locally on iPad/Mobile devices for access during network outages.

## 🛠️ Tech Stack
* **Frontend:** Next.js 16, React, Tailwind CSS
* **Backend:** Node.js, PostgreSQL (Prisma)
* **AI Engine:** OpenAI GPT-4o-mini / specialized OCR pipelines
* **API Integrations:** Support for CloudSDS and SDS Manager APIs

## 📦 Getting Started
1. **Clone the repo:** `git clone https://github.com/TAStagg/GuardianSDS.git`
2. **Install dependencies:** `npm install`
3. **Set up Environment Variables:** Copy `.env.example` to `.env` and add your API keys.
4. **Run development server:** `npm run dev`

## 🐳 Docker Quickstart (One-Click)

To run the entire system (Frontend, Backend, Database) locally without installing Node.js or Postgres:

1.  **Install Docker Desktop** (if not already installed).
2.  **Create env file:** Copy `.env.example` to `.env` and fill in any required API keys (e.g., `OPENAI_API_KEY`).
    *   *Note: The database connection is handled automatically by Docker.*
3.  **Run:**
    ```bash
    docker-compose up
    ```
4.  Open [http://localhost:3000](http://localhost:3000).

To stop the system: `Ctrl+C` or `docker-compose down`.

## ⚖️ License
Distributed under the MIT License. See `LICENSE` for more information.
