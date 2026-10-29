# FoodVerse AI — Multimodal Food Intelligence

A responsive React + Vite frontend prototype for a food intelligence platform. It includes food recognition, nutrition estimation, freshness checks, kitchen hygiene review, cooking assistance, and a personalized meal planner.

## Requirements
- Node.js 18.18+ (Node.js 20+ recommended)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```
The production-ready static site is generated in `dist/`.

## Deploy
### Vercel
1. Push this folder to a Git repository.
2. Import the repository in Vercel.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.

### Netlify
1. Import the repository.
2. Build command: `npm run build`.
3. Publish directory: `dist`.

## What works in this prototype
- Responsive dashboard and sidebar navigation.
- Upload an image for a local demo analysis flow (image preview + illustrative sample results).
- Nutrition, freshness, hygiene, cooking assistant, and meal planner views.
- Search/filter UI, interactive tabs, demo notifications, and editable preferences.

## Important integration note
This is a front-end prototype and **does not call a real AI model or scientifically validate freshness/hygiene**. The analysis results are clearly presented as demo estimates. For production AI, add a secure backend API that accepts uploaded media and calls your selected vision/LLM services. Keep API keys on the server, validate uploads, obtain user consent, and show uncertainty for food safety recommendations. Never use image-only predictions as a definitive food-safety verdict.
