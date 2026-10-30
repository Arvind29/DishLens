# DishLens

Your ingredients. More possibilities.

DishLens is a visual-first dish discovery app. Choose ingredients you already have and explore both combination recipes and dishes centered on a single ingredient. Open each dish for quantities, cooking instructions, substitutions, food context, and transparent nutrition estimates.

## Setup

1. Use Node.js 20 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY`.
4. Run `npm run dev` and open http://localhost:3000.

The Gemini key is used only on the server. The app does not fabricate recipe results when the key is missing or a model request fails.

## Recipe and photo sources

- Gemini API: recipe ideas, methods, substitutions and general food context.
- TheMealDB: dish photo lookup and ingredient artwork (https://www.themealdb.com/docs_api_guide.php).
- Openverse: openly licensed photo fallback (https://api.openverse.org/v1/).
- Bundled generic-food nutrition estimates based on common USDA FoodData Central entries (https://fdc.nal.usda.gov/). Values are approximate; unmatched ingredient weight is excluded and reflected in coverage.

Nutrition is for general food education, not diagnosis or treatment. Photo relevance is checked by dish-name overlap. When no suitable result is found, DishLens indicates that no relevant photo could be verified rather than inventing one.

## Deploy

Import `Arvind29/DishLens` into Vercel as a Next.js project and add `GEMINI_API_KEY` to the Production and Preview environment variables. `GEMINI_MODEL` is optional; the default in the app is `gemini-3.8-flash`.
