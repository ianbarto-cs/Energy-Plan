# Warren Tech Central Microgrid Plan

A React-based interactive planning dashboard for the Warren Tech Central microgrid project, designed to guide teams through the Energy Career Challenge.

**Live:** https://ianbarto-cs.github.io/Energy-Plan

## Features

- 📊 District overview with building details
- 🔍 Information acquisition checklist
- ⚙️ Microgrid design specifications
- 💻 Software tools and analysis roadmap
- ✅ Deliverables tracker with progress visualization

## Prerequisites

- Node.js 16+ and npm

## Setup & Local Development

1. **Clone the repo:**
   ```bash
   git clone https://github.com/ianbarto-cs/Energy-Plan.git
   cd Energy-Plan
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Deploy to GitHub Pages

### Option 1: Automatic (via GitHub Actions)

The repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys on every push to `main`. Just push your changes:

```bash
git push origin main
```

The site will deploy to `https://ianbarto-cs.github.io/Energy-Plan` within 2–3 minutes.

### Option 2: Manual

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Deploy using gh-pages:**
   ```bash
   npm run deploy
   ```

The site will go live at `https://ianbarto-cs.github.io/Energy-Plan` within 1–2 minutes.

## Project Structure

```
Energy-Plan/
├── public/
│   ├── index.html       # HTML entry point
├── src/
│   ├── WarrenTechPlan.jsx  # Main React component
│   ├── index.js         # React render & app setup
│   ├── index.css        # Global styles
├── package.json         # Dependencies & deployment scripts
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## Build Scripts

- `npm start` – Start development server (localhost:3000)
- `npm run build` – Create optimized production build
- `npm run deploy` – Deploy to GitHub Pages (manual)

## Technologies

- React 18 with Hooks
- Create React App
- gh-pages for deployment
- GitHub Actions for CI/CD

## License

Educational project for Jefferson County Public Schools Energy Career Challenge.
