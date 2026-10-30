# DishLens

**Your ingredients. More possibilities.**

DishLens is a visual-first dish discovery app. Select ingredients you already have and explore both combination recipes and dishes centered on a single ingredient. Open each dish for ingredient quantities, cooking instructions, substitutions, food context, and estimated nutrition.

## Features

- Search and select common vegetables, leafy greens, pulses, grains, fruits, dairy, eggs and pantry ingredients.
- Includes Indian and Maharashtrian ingredients such as palak, methi, chawli bhaji and shepu.
- Gemini-generated recipe ideas, methods and substitutions based on the selected ingredients.
- Combination recipes and single-ingredient ideas are labelled separately.
- Dish photos are searched through TheMealDB and Openverse. A photo is shown only when the result appears relevant to the dish name; otherwise DishLens states that no relevant photo could be verified.
- Nutrition is calculated separately from Gemini using bundled approximate generic-food reference values. Ingredient-weight coverage is shown so unmatched foods are not silently treated as measured.

## Run locally

1. Use Node.js 20 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Set `GEMINI_API_KEY` in `.env.local`. Keep the key server-side; never prefix it with `NEXT_PUBLIC_`.
5. Run `npm run dev` and open http://localhost:3000.

The default model is `gemini-3.8-flash`; override it with `GEMINI_MODEL` if required. The model must be available to your API key.

## Deploy to Vercel

Import `Arvind29/DishLens` as a Next.js project and add `GEMINI_API_KEY` to Vercel's Production, Preview and Development environments. `GEMINI_MODEL` is optional. Redeploy after adding environment variables.

## Data sources and limitations

- Gemini API: recipe ideas, cooking methods, substitutions and general food context.
- TheMealDB: recipe search and ingredient artwork — https://www.themealdb.com/docs_api_guide.php
- Openverse: fallback search for openly licensed photos — https://api.openverse.org/v1/
- USDA FoodData Central: https://fdc.nal.usda.gov/ — bundled values are approximate generic-food references, not a live comprehensive food-composition lookup.

Nutrition values are estimates. Raw/cooked form, ingredient variety, exact quantity, preparation and substitutions affect the result. Unknown ingredient types are excluded from calculations and reduce displayed coverage. This is general food education, not medical advice.
