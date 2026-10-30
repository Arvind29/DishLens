"use client";

import { useMemo, useState } from "react";

type Ingredient = { id: string; name: string; apiName: string; category: string; image: string; emoji: string };
type Nutrition = { calories: number; protein: number; carbs: number; fat: number; fiber: number; vitaminA: number; vitaminC: number; calcium: number; iron: number };
type FoodPart = { name: string; quantity: string; grams: number };
type Photo = { url: string; source: string; pageUrl?: string; title?: string; creator?: string; license?: string } | null;
type Recipe = {
  id: string; name: string; description: string; matchType: "combination" | "single";
  selectedIngredientNames: string[]; timeMinutes: number; servings: number;
  ingredients: FoodPart[]; steps: string[]; substitutions: string[]; nutritionHighlights: string[];
  nutrients: { perServing: Nutrition; coveragePercent: number; source: string }; photo: Photo;
};

const INGREDIENTS: Ingredient[] = [
  {id:"palak",name:"Palak (spinach)",apiName:"spinach",category:"Leafy greens",image:"spinach",emoji:"🥬"},
  {id:"methi",name:"Methi leaves",apiName:"fenugreek leaves",category:"Leafy greens",image:"fenugreek_leaves",emoji:"🌿"},
  {id:"amaranth",name:"Chawli bhaji (amaranth)",apiName:"amaranth leaves",category:"Leafy greens",image:"amaranth_leaves",emoji:"🌱"},
  {id:"shepu",name:"Shepu (dill)",apiName:"dill",category:"Leafy greens",image:"dill",emoji:"🌿"},
  {id:"cabbage",name:"Cabbage",apiName:"cabbage",category:"Leafy greens",image:"cabbage",emoji:"🥬"},
  {id:"tomato",name:"Tomato",apiName:"tomato",category:"Vegetables",image:"tomato",emoji:"🍅"},
  {id:"onion",name:"Onion",apiName:"onion",category:"Vegetables",image:"onion",emoji:"🧅"},
  {id:"potato",name:"Potato",apiName:"potato",category:"Vegetables",image:"potato",emoji:"🥔"},
  {id:"cauliflower",name:"Cauliflower",apiName:"cauliflower",category:"Vegetables",image:"cauliflower",emoji:"🥦"},
  {id:"capsicum",name:"Capsicum",apiName:"bell pepper",category:"Vegetables",image:"bell_pepper",emoji:"🫑"},
  {id:"brinjal",name:"Brinjal (eggplant)",apiName:"aubergine",category:"Vegetables",image:"aubergine",emoji:"🍆"},
  {id:"carrot",name:"Carrot",apiName:"carrot",category:"Vegetables",image:"carrot",emoji:"🥕"},
  {id:"peas",name:"Green peas",apiName:"peas",category:"Vegetables",image:"peas",emoji:"🫛"},
  {id:"okra",name:"Bhindi (okra)",apiName:"okra",category:"Vegetables",image:"okra",emoji:"🌱"},
  {id:"bottle-gourd",name:"Bottle gourd",apiName:"bottle gourd",category:"Vegetables",image:"bottle_gourd",emoji:"🥒"},
  {id:"pumpkin",name:"Pumpkin",apiName:"pumpkin",category:"Vegetables",image:"pumpkin",emoji:"🎃"},
  {id:"cucumber",name:"Cucumber",apiName:"cucumber",category:"Vegetables",image:"cucumber",emoji:"🥒"},
  {id:"moong",name:"Moong dal",apiName:"mung beans",category:"Pulses & beans",image:"mung_beans",emoji:"🫘"},
  {id:"masoor",name:"Masoor dal",apiName:"red lentils",category:"Pulses & beans",image:"red_lentils",emoji:"🫘"},
  {id:"toor",name:"Toor dal",apiName:"pigeon peas",category:"Pulses & beans",image:"pigeon_peas",emoji:"🫘"},
  {id:"chickpeas",name:"Chana (chickpeas)",apiName:"chickpeas",category:"Pulses & beans",image:"chickpeas",emoji:"🫘"},
  {id:"rajma",name:"Rajma",apiName:"kidney beans",category:"Pulses & beans",image:"kidney_beans",emoji:"🫘"},
  {id:"rice",name:"Rice",apiName:"rice",category:"Grains",image:"rice",emoji:"🍚"},
  {id:"atta",name:"Wheat flour (atta)",apiName:"whole wheat flour",category:"Grains",image:"flour",emoji:"🌾"},
  {id:"poha",name:"Poha",apiName:"flattened rice",category:"Grains",image:"rice",emoji:"🍚"},
  {id:"oats",name:"Oats",apiName:"oats",category:"Grains",image:"oats",emoji:"🌾"},
  {id:"bajra",name:"Bajra (pearl millet)",apiName:"pearl millet",category:"Grains",image:"millet",emoji:"🌾"},
  {id:"eggs",name:"Eggs",apiName:"eggs",category:"Protein & dairy",image:"egg",emoji:"🥚"},
  {id:"paneer",name:"Paneer",apiName:"paneer",category:"Protein & dairy",image:"paneer",emoji:"🧀"},
  {id:"curd",name:"Curd (yogurt)",apiName:"plain yogurt",category:"Protein & dairy",image:"yogurt",emoji:"🥣"},
  {id:"milk",name:"Milk",apiName:"milk",category:"Protein & dairy",image:"milk",emoji:"🥛"},
  {id:"tofu",name:"Tofu",apiName:"tofu",category:"Protein & dairy",image:"tofu",emoji:"◻️"},
  {id:"banana",name:"Banana",apiName:"banana",category:"Fruits",image:"banana",emoji:"🍌"},
  {id:"apple",name:"Apple",apiName:"apple",category:"Fruits",image:"apple",emoji:"🍎"},
  {id:"mango",name:"Mango",apiName:"mango",category:"Fruits",image:"mango",emoji:"🥭"},
  {id:"orange",name:"Orange",apiName:"orange",category:"Fruits",image:"orange",emoji:"🍊"},
  {id:"papaya",name:"Papaya",apiName:"papaya",category:"Fruits",image:"papaya",emoji:"🍈"},
  {id:"lemon",name:"Lemon",apiName:"lemon",category:"Fruits",image:"lemon",emoji:"🍋"},
  {id:"garlic",name:"Garlic",apiName:"garlic",category:"Pantry",image:"garlic",emoji:"🧄"},
  {id:"ginger",name:"Ginger",apiName:"ginger",category:"Pantry",image:"ginger",emoji:"🌿"},
  {id:"peanuts",name:"Peanuts",apiName:"peanuts",category:"Pantry",image:"peanuts",emoji:"🥜"},
  {id:"coconut",name:"Coconut",apiName:"coconut",category:"Pantry",image:"coconut",emoji:"🥥"},
  {id:"oil",name:"Cooking oil",apiName:"cooking oil",category:"Pantry",image:"olive_oil",emoji:"🫒"}
];
const CATEGORIES = ["All","Leafy greens","Vegetables","Pulses & beans","Grains","Protein & dairy","Fruits","Pantry"];
const NUTRIENT_ROLES = [
  ["Protein","Helps build and maintain muscles and other body tissues."],
  ["Fiber","Supports regular digestion and contributes to fullness."],
  ["Carbohydrates","Provide a major source of energy for everyday activity."],
  ["Fat","Provides energy and helps the body absorb vitamins A, D, E and K."],
  ["Vitamin A","Supports normal vision, immune function and cell growth."],
  ["Vitamin C","Supports collagen formation and helps the body absorb non-heme iron."],
  ["Calcium","Needed for healthy bones and teeth, and normal muscle function."],
  ["Iron","Needed to make hemoglobin, which carries oxygen in the blood."]
];
const number = (value:number,digits=0) => Number.isFinite(value) ? value.toFixed(digits) : "—";
const ingredientImage = (slug:string) => "https://www.themealdb.com/images/ingredients/" + slug + ".png";

export default function HomePage() {
  const [search,setSearch] = useState("");
  const [category,setCategory] = useState("All");
  const [selected,setSelected] = useState<string[]>([]);
  const [goal,setGoal] = useState("Balanced");
  const [recipes,setRecipes] = useState<Recipe[]>([]);
  const [loading,setLoading] = useState(false);
  const [searched,setSearched] = useState(false);
  const [error,setError] = useState("");
  const [active,setActive] = useState<Recipe|null>(null);

  const visible = useMemo(() => INGREDIENTS.filter(item =>
    (category === "All" || item.category === category) &&
    (item.name + " " + item.apiName + " " + item.category).toLowerCase().includes(search.toLowerCase().trim())
  ),[category,search]);
  const chosen = INGREDIENTS.filter(item => selected.includes(item.id));

  function toggle(id:string) {
    setSelected(current => current.includes(id) ? current.filter(value => value !== id) : [...current,id]);
  }

  async function discover() {
    if (!selected.length || loading) return;
    setLoading(true); setSearched(true); setError(""); setRecipes([]); setActive(null);
    try {
      const response = await fetch("/api/discover",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ingredients:chosen.map(({id,name,apiName,category})=>({id,name,apiName,category})),goal})
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Dish discovery failed.");
      if (!Array.isArray(data.recipes) || !data.recipes.length) throw new Error("No matching dishes were returned. Try a different selection.");
      setRecipes(data.recipes);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "A network error occurred. Please retry.");
    } finally {
      setLoading(false);
      window.setTimeout(()=>document.getElementById("results")?.scrollIntoView({behavior:"smooth",block:"start"}),80);
    }
  }

  function photoCredit(photo:Photo) {
    if (!photo) return null;
    const title = [photo.title,photo.creator,photo.license].filter(Boolean).join(" · ") || photo.source;
    return <div className="photo-credit">Photo: {photo.pageUrl ? <a href={photo.pageUrl} target="_blank" rel="noreferrer">{title}</a> : title}</div>;
  }

  function photoView(photo:Photo,name:string) {
    if (!photo) return <div className="photo-missing"><strong>◌</strong><span>No relevant photo could be verified for this dish.</span></div>;
    return <img src={photo.url} alt={"Photo of "+name} loading="lazy" referrerPolicy="no-referrer" onError={event=>{event.currentTarget.style.display="none";}} />;
  }

  return <>
    <header className="site-header">
      <a className="brand" href="#top"><span className="brand-mark">◒</span><span><span className="brand-name">DishLens</span><span className="brand-sub">COOK WITH WHAT YOU HAVE</span></span></a>
      <nav className="nav"><a href="#discover">Discover dishes</a><a href="#how">How it works</a><a className="nav-cta" href="#discover">Build my meal ↗</a></nav>
    </header>

    <div id="top" className="hero-wrap"><section className="hero">
      <div><div className="eyebrow">✳ &nbsp; SMARTER EVERYDAY COOKING</div>
        <h1>Your ingredients.<br/><em>More possibilities.</em></h1>
        <p className="hero-copy">Start with what’s already in your kitchen. Find combinations worth cooking, discover one-ingredient ideas, and understand what’s on your plate.</p>
        <div className="hero-tags"><span>◉ Ingredient-first discovery</span><span>↗ Practical substitutions</span><span>＋ Nutrition estimates</span></div>
      </div>
      <div className="hero-art"><div className="plate"><img src="https://www.themealdb.com/images/media/meals/1548772327.jpg" alt="A prepared meal" onError={event=>{event.currentTarget.style.display="none";}}/></div>
        <div className="float-note note-left"><span className="float-icon">🥬</span><span><b>Start with your fridge</b>Choose ingredients you have</span></div>
        <div className="float-note note-right"><span className="float-icon">✳</span><span><b>Explore your options</b>Recipes, steps and nutrition</span></div>
      </div>
    </section></div>

    <main className="main">
      <section id="discover">
        <div className="section-head"><div><div className="kicker">STEP 01 · PICK YOUR INGREDIENTS</div><h2>What’s in your kitchen?</h2><p>Select what you have, even if it’s just one item. Mix any categories.</p></div><span className="count">{selected.length} selected</span></div>
        <div className="layout">
          <div className="panel picker">
            <div className="picker-head"><b>Browse ingredients</b><span className="count">{visible.length} options</span></div>
            <label className="search"><span>⌕</span><input value={search} onChange={event=>setSearch(event.target.value)} placeholder="Search spinach, dal, tomato…" aria-label="Search ingredients"/></label>
            <div className="tabs" role="tablist" aria-label="Ingredient category">
              {CATEGORIES.map(item=><button key={item} type="button" role="tab" aria-selected={category===item} className={"tab"+(category===item?" active":"")} onClick={()=>setCategory(item)}>{item}</button>)}
            </div>
            <div className="ingredient-grid">
              {visible.length===0 ? <div className="no-items">No ingredients found. Try a broader search.</div> : visible.map(item=>{
                const isSelected=selected.includes(item.id);
                return <button key={item.id} type="button" aria-pressed={isSelected} className={"ingredient"+(isSelected?" selected":"")} onClick={()=>toggle(item.id)}>
                  <span className="check">{isSelected?"✓":"+"}</span>
                  <span className="ingredient-visual"><span className="ingredient-emoji">{item.emoji}</span><img src={ingredientImage(item.image)} alt="" loading="lazy" onError={event=>{event.currentTarget.style.display="none";}}/></span>
                  <span className="ingredient-name">{item.name}</span>
                </button>;
              })}
            </div>
          </div>

          <aside className="panel selected">
            <div className="selected-head"><h3>Your basket</h3><button type="button" className="clear" onClick={()=>setSelected([])} disabled={!selected.length}>Clear all</button></div>
            <p className="help">We look for recipes that combine your picks, plus dishes centered on a single selected ingredient.</p>
            <div className="chips">{chosen.length ? chosen.map(item=><span className="chip" key={item.id}>{item.name}<button type="button" aria-label={"Remove "+item.name} onClick={()=>toggle(item.id)}>×</button></span>) : <div className="empty">Your selected ingredients will appear here.</div>}</div>
            <hr className="divider"/>
            <label>What sounds right today?</label>
            <div className="prefs">{["Balanced","Higher protein","Lighter meal","Quick to cook"].map(item=><button key={item} type="button" aria-pressed={goal===item} className={"pref"+(goal===item?" active":"")} onClick={()=>setGoal(item)}>{item}</button>)}</div>
            <button type="button" className="discover" disabled={!selected.length||loading} onClick={discover}>{loading?"Finding matching dishes…":"Discover dishes  →"}</button>
            <p className="small-note">AI-assisted recipes. Nutrition is calculated separately from bundled generic-food reference values.</p>
          </aside>
        </div>
      </section>

      <section id="results" className="results">
        <div className="results-head"><div><div className="kicker">STEP 02 · EXPLORE YOUR OPTIONS</div><h2>{searched?"Dishes for your ingredients":"A better way to decide what to cook"}</h2><p>{searched?"Open a dish for quantities, method, substitutions and estimated nutrition.":"Choose ingredients above to get recipes tailored to your kitchen."}</p></div>{recipes.length>0&&<span className="count">{recipes.length} ideas found</span>}</div>
        {loading&&<div className="skeletons"><div className="skeleton"/><div className="skeleton"/><div className="skeleton"/></div>}
        {!loading&&error&&<div className="error"><h3>Dish discovery needs attention</h3><p>{error}{error.toLowerCase().includes("gemini_api_key")||error.toLowerCase().includes("configure")?" Add GEMINI_API_KEY to .env.local or your Vercel environment variables, then retry.":""}</p></div>}
        {!loading&&!error&&recipes.length>0&&<div className="results-grid">{recipes.map(recipe=><article className="recipe-card" key={recipe.id}>
          <button type="button" className="recipe-button" onClick={()=>setActive(recipe)} aria-label={"Open recipe "+recipe.name}>
            <div className="dish-photo">{photoView(recipe.photo,recipe.name)}<span className="dish-badge">{recipe.matchType==="combination"?"INGREDIENT COMBINATION":"SINGLE-INGREDIENT IDEA"}</span></div>
            <div className="recipe-body"><div className="recipe-kicker">{recipe.selectedIngredientNames.join(" + ")}</div><h3 className="recipe-title">{recipe.name}</h3><p className="recipe-description">{recipe.description}</p>
              <div className="recipe-meta"><span>◷ {recipe.timeMinutes} min</span><span>•</span><span>{recipe.servings} servings</span><span>•</span><span>{recipe.ingredients.length} ingredients</span></div>
              <div className="macros"><div className="macro"><b>{number(recipe.nutrients.perServing.calories)}</b><small>kcal / serving</small></div><div className="macro"><b>{number(recipe.nutrients.perServing.protein,1)} g</b><small>protein</small></div><div className="macro"><b>{number(recipe.nutrients.perServing.fiber,1)} g</b><small>fiber</small></div></div>
              {photoCredit(recipe.photo)}
            </div>
          </button>
        </article>)}</div>}
        {!loading&&!error&&!searched&&<div className="empty-results"><h3>Your next dish starts with a few picks.</h3><p>Select one or more ingredients above. DishLens will look for combination recipes and recipes centered on an individual ingredient.</p></div>}
      </section>

      <section id="how" className="how"><div className="how-head"><div className="kicker">HOW DISHLENS WORKS</div><h2>From ingredients to a clear plan</h2><p>Useful ideas, with the important details kept visible.</p></div>
        <div className="how-grid"><div className="how-card"><span className="step">01</span><h3>Choose what you have</h3><p>Search leafy greens, vegetables, pulses, grains, fruits, dairy and everyday pantry ingredients.</p></div><div className="how-card"><span className="step">02</span><h3>Compare real options</h3><p>Review combination ideas and one-ingredient recipes. Photos appear only when a relevant source result is found.</p></div><div className="how-card"><span className="step">03</span><h3>Cook with context</h3><p>See measured quantities, step-by-step cooking, substitutions and transparent nutrition estimates.</p></div></div>
      </section>
      <footer className="footer"><div><b>DishLens</b><br/>Your ingredients. More possibilities.</div><div className="footer-note">Nutrition figures are estimates, not medical advice. Photos and source details belong to their respective providers and creators.</div></footer>
    </main>

    {active&&<div className="modal-backdrop" role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget)setActive(null);}}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="recipe-dialog-title">
        <div className="modal-bar"><button type="button" className="close" onClick={()=>setActive(null)} aria-label="Close recipe">×</button></div>
        <div className="modal-content">
          <div className="modal-title-row"><div><div className="kicker">{active.matchType==="combination"?"INGREDIENT COMBINATION":"SINGLE-INGREDIENT IDEA"}</div><h2 id="recipe-dialog-title">{active.name}</h2><p>{active.description}</p></div><span className="time-pill">◷ {active.timeMinutes} min · {active.servings} servings</span></div>
          <div className="modal-columns"><div><h3>Ingredients</h3><div className="ingredient-list">{active.ingredients.map((part,index)=><div className="modal-ingredient" key={part.name+index}><span>{part.name}</span><b>{part.quantity}</b></div>)}</div>
            {active.substitutions.length>0&&<div className="extra"><b>Easy substitutions</b><p>{active.substitutions.join(" · ")}</p></div>}
            {active.nutritionHighlights.length>0&&<div className="extra"><b>Food context</b><p>{active.nutritionHighlights.join(" ")}</p></div>}
          </div><div><h3>How to cook it</h3><ol className="steps">{active.steps.map((step,index)=><li key={index}>{step}</li>)}</ol></div></div>
          <div className="nutrition"><div className="nutrition-head"><div><h3>Estimated nutrition per serving</h3><p>Calculated from matched generic-food reference values, not generated by Gemini.</p></div><span className="coverage">{active.nutrients.coveragePercent}% ingredient-weight coverage</span></div>
            <div className="nutrients"><div className="nutrient"><b>{number(active.nutrients.perServing.calories)} kcal</b><span>Energy</span></div><div className="nutrient"><b>{number(active.nutrients.perServing.protein,1)} g</b><span>Protein</span></div><div className="nutrient"><b>{number(active.nutrients.perServing.carbs,1)} g</b><span>Carbohydrates</span></div><div className="nutrient"><b>{number(active.nutrients.perServing.fat,1)} g</b><span>Fat</span></div><div className="nutrient"><b>{number(active.nutrients.perServing.fiber,1)} g</b><span>Fiber</span></div><div className="nutrient"><b>{number(active.nutrients.perServing.vitaminA)} µg RAE</b><span>Vitamin A</span></div><div className="nutrient"><b>{number(active.nutrients.perServing.vitaminC,1)} mg</b><span>Vitamin C</span></div><div className="nutrient"><b>{number(active.nutrients.perServing.calcium)} mg</b><span>Calcium · iron {number(active.nutrients.perServing.iron,1)} mg</span></div></div>
            <div className="roles">{NUTRIENT_ROLES.map(([name,description])=><div className="role" key={name}><b>{name}</b><span>{description}</span></div>)}</div>
            <p className="fineprint">{active.nutrients.source} Coverage is the percentage of listed ingredient weight matched to the bundled reference table; unmatched ingredients are excluded. Cooking method, variety and substitutions change the result. General food education only, not diagnosis or treatment.</p>
            {photoCredit(active.photo)}
          </div>
        </div>
      </section>
    </div>}
  </>;
}
