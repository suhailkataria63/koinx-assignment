# KoinX Tax Loss Harvesting Assignment

A responsive React-based tax loss harvesting interface built for the KoinX assignment. It shows pre-harvesting and after-harvesting capital gains, displays crypto holdings, and updates the after-harvesting view based on the assets selected by the user.

## Live Demo

Live Demo: https://koinx-tax-assignment.vercel.app

## GitHub

GitHub Repo: https://github.com/suhailkataria63/koinx-assignment

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Mock APIs
- lucide-react

## Features

- Pre-harvesting capital gains card
- Dynamic after-harvesting capital gains card
- Real-time updates based on selected holdings
- Individual holding selection
- Select all / deselect all
- Short-Term and Long-Term sorting
- View all / show less holdings
- Hover tooltip for full currency values
- Hover tooltip for "How it works?"
- Light and dark mode
- Responsive layout
- Loader and error states
- Clean component-based structure

## Business Logic

- Net Capital Gains = Profits - Losses
- Realised Capital Gains = Short-term net gains + Long-term net gains
- After Harvesting initially mirrors Pre Harvesting
- When a holding is selected:
  - Positive STCG/LTCG gain is added to profits
  - Negative STCG/LTCG gain is added to losses using `Math.abs`
- The original capital gains API data is not mutated
- Savings/reduction message appears only when post-harvesting capital gains are lower than pre-harvesting capital gains

## Mock API

- Holdings API is mocked locally
- Capital Gains API is mocked locally
- API delay is simulated to show a realistic loading state

## Assumptions

- This is a frontend demo and not tax advice
- The holdings dataset is enriched with a mix of profit/loss values to better demonstrate selection, sorting, and harvesting behavior
- Amount to Sell is shown as the full holding amount when an asset is selected
- Duplicate coin symbols are handled using generated stable IDs

## Folder Structure

```text
src/
  api/
  components/
  data/
  hooks/
  types/
  utils/
  App.tsx
  main.tsx
  index.css
```

## Setup Instructions

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Deployment

The app can be deployed on Vercel or Netlify.

- Build command: `npm run build`
- Output directory: `dist`