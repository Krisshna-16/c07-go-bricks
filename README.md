# GO-BRICS Competitor Content Audit Report

**TASK_C07 | Shungite Shield | GO-BRICS Business Lab | June 2026**

A structured, high-fidelity marketing intelligence dashboard that audits 3 competitor wellness brands in the Indian market to identify content gaps and strategic growth opportunities for the **Shungite Shield** brand. 

This project was built for **GO-BRICS Business Lab** content strategy planning and provides structured insights ready for Content Lead review and executive sign-off.

---

## 🚀 Key Features

* **Tab 1: Overview Panel** — Includes audit metadata (date, platforms covered, preparer), four high-impact metric cards (Brands Audited, Total Posts, Avg Engagement, Opportunity Score), and a formal executive summary.
* **Tab 2: Brand Profiles** — Compiles detailed dossiers of three major competitors in India (*Crystal Wellness India*, *EMF Shield Pro*, and *AyurVeda Natural Store*) listing follower metrics, weekly posting frequencies, content themes, best/worst format analysis, tone of voice, website strategies, and strengths/weaknesses checklists. Includes live search and platform filter controls.
* **Tab 3: Comparison Matrix** — Displays a side-by-side comparison table highlighting Shungite Shield's target metrics (Month 3) in custom neon green. Paired with a **Recharts BarChart** mapping average engagement rates and an interactive **Target Metric Planner** simulator.
* **Tab 4: Strategic Recommendations** — Lists 5 prioritized strategic recommendations detailing gap analysis, implementation actions, and projected target performance impacts. Features an overall opportunity scorecard.
* **Print-Optimized Report** — Includes dedicated print media styles that output a clean, professional, multi-page A4 PDF report with custom signature fields for team lead and director sign-off upon printing.

---

## 🛠️ Technology Stack

* **Core**: React 19, Vite, JavaScript (ESM)
* **Styling**: Tailwind CSS v4 (with custom `@theme` configuration)
* **Visualizations**: Recharts
* **Icons**: Lucide React (with locally defined robust SVG fallbacks for social icons)
* **Typography**: Inter (via Google Fonts API)

---

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Krisshna-16/c07-go-bricks.git
cd c07-go-bricks
npm install
```

### Running Locally
To launch the interactive dashboard on your local machine:
```bash
npm run dev
```

### Building for Production
To bundle and optimize the project assets for deployment:
```bash
npm run build
```
This generates a minified `/dist` bundle containing single HTML, CSS, and JS files.
