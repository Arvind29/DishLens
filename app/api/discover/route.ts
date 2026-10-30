export const runtime = "nodejs";

type Pick = { id: string; name: string; apiName: string; category: string };
type Part = { name: string; quantity: string; grams: number };
type Nutrients = { calories:number; protein:number; carbs:number; fat:number; fiber:number; vitaminA:number; vitaminC:number; calcium:number; iron:number };
type Photo = { url:string; source:string; pageUrl?:string; title?:string; creator?:string; license?:string } | null;

const FOOD: Record<string,Nutrients> = {
  spinach:{calories:23,protein:2.9,carbs:3.6,fat:.4,fiber:2.2,vitaminA:469,vitaminC:28.1,calcium:99,iron:2.7},
  "fenugreek leaves":{calories:49,protein:4.4,carbs:6,fat:.9,fiber:1.1,vitaminA:210,vitaminC:52,calcium:395,iron:1.9},
  "amaranth leaves":{calories:23,protein:2.5,carbs:4,fat:.3,fiber:2.2,vitaminA:146,vitaminC:43.3,calcium:215,iron:2.3},
  dill:{calories:43,protein:3.5,carbs:7,fat:1.1,fiber:2.1,vitaminA:386,vitaminC:85,calcium:208,iron:6.6},
  cabbage:{calories:25,protein:1.3,carbs:5.8,fat:.1,fiber:2.5,vitaminA:5,vitaminC:36.6,calcium:40,iron:.5},
  tomato:{calories:18,protein:.9,carbs:3.9,fat:.2,fiber:1.2,vitaminA:42,vitaminC:13.7,calcium:10,iron:.3},
  onion:{calories:40,protein:1.1,carbs:9.3,fat:.1,fiber:1.7,vitaminA:0,vitaminC:7.4,calcium:23,iron:.2},
  potato:{calories:77,protein:2,carbs:17.5,fat:.1,fiber:2.2,vitaminA:0,vitaminC:19.7,calcium:12,iron:.8},
  cauliflower:{calories:25,protein:1.9,carbs:5,fat:.3,fiber:2,vitaminA:0,vitaminC:48.2,calcium:22,iron:.4},
  "bell pepper":{calories:20,protein:.9,carbs:4.6,fat:.2,fiber:1.7,vitaminA:18,vitaminC:80,calcium:10,iron:.3},
  aubergine:{calories:25,protein:1,carbs:5.9,fat:.2,fiber:3,vitaminA:1,vitaminC:2.2,calcium:9,iron:.2},
  carrot:{calories:41,protein:.9,carbs:9.6,fat:.2,fiber:2.8,vitaminA:835,vitaminC:5.9,calcium:33,iron:.3},
  peas:{calories:81,protein:5.4,carbs:14.5,fat:.4,fiber:5.7,vitaminA:38,vitaminC:40,calcium:25,iron:1.5},
  okra:{calories:33,protein:1.9,carbs:7.5,fat:.2,fiber:3.2,vitaminA:36,vitaminC:23,calcium:82,iron:.6},
  "bottle gourd":{calories:14,protein:.6,carbs:3.4,fat:0,fiber:.5,vitaminA:0,vitaminC:10.1,calcium:26,iron:.2},
  pumpkin:{calories:26,protein:1,carbs:6.5,fat:.1,fiber:.5,vitaminA:426,vitaminC:9,calcium:21,iron:.8},
  cucumber:{calories:15,protein:.7,carbs:3.6,fat:.1,fiber:.5,vitaminA:5,vitaminC:2.8,calcium:16,iron:.3},
  "mung beans":{calories:347,protein:23.9,carbs:62.6,fat:1.2,fiber:16.3,vitaminA:6,vitaminC:4.8,calcium:132,iron:6.7},
  "red lentils":{calories:352,protein:24.6,carbs:63.1,fat:1.1,fiber:10.7,vitaminA:2,vitaminC:4.5,calcium:35,iron:6.5},
  "pigeon peas":{calories:343,protein:22.3,carbs:62.8,fat:1.5,fiber:15,vitaminA:0,vitaminC:0,calcium:130,iron:5.2},
  chickpeas:{calories:164,protein:8.9,carbs:27.4,fat:2.6,fiber:7.6,vitaminA:1,vitaminC:1.3,calcium:49,iron:2.9},
  "kidney beans":{calories:127,protein:8.7,carbs:22.8,fat:.5,fiber:6.4,vitaminA:0,vitaminC:1.2,calcium:28,iron:2.9},
  rice:{calories:365,protein:7.1,carbs:80,fat:.7,fiber:1.3,vitaminA:0,vitaminC:0,calcium:28,iron:.8},
  "whole wheat flour":{calories:340,protein:13.2,carbs:72.6,fat:2.5,fiber:10.7,vitaminA:0,vitaminC:0,calcium:34,iron:3.6},
  "flattened rice":{calories:350,protein:6.7,carbs:77,fat:1.2,fiber:2.5,vitaminA:0,vitaminC:0,calcium:20,iron:4},
  oats:{calories:389,protein:16.9,carbs:66.3,fat:6.9,fiber:10.6,vitaminA:0,vitaminC:0,calcium:54,iron:4.7},
  "pearl millet":{calories:378,protein:11,carbs:67,fat:4.2,fiber:8.5,vitaminA:0,vitaminC:0,calcium:8,iron:3},
  eggs:{calories:143,protein:12.6,carbs:.7,fat:9.5,fiber:0,vitaminA:160,vitaminC:0,calcium:56,iron:1.8},
  paneer:{calories:265,protein:18.3,carbs:1.2,fat:20.8,fiber:0,vitaminA:84,vitaminC:0,calcium:208,iron:.3},
  "plain yogurt":{calories:61,protein:3.5,carbs:4.7,fat:3.3,fiber:0,vitaminA:27,vitaminC:.5,calcium:113,iron:.1},
  milk:{calories:61,protein:3.2,carbs:4.8,fat:3.3,fiber:0,vitaminA:46,vitaminC:0,calcium:113,iron:0},
  tofu:{calories:76,protein:8.1,carbs:1.9,fat:4.8,fiber:.3,vitaminA:0,vitaminC:.1,calcium:350,iron:5.4},
  banana:{calories:89,protein:1.1,carbs:22.8,fat:.3,fiber:2.6,vitaminA:3,vitaminC:8.7,calcium:5,iron:.3},
  apple:{calories:52,protein:.3,carbs:13.8,fat:.2,fiber:2.4,vitaminA:3,vitaminC:4.6,calcium:6,iron:.1},
  mango:{calories:60,protein:.8,carbs:15,fat:.4,fiber:1.6,vitaminA:54,vitaminC:36.4,calcium:11,iron:.2},
  orange:{calories:47,protein:.9,carbs:11.8,fat:.1,fiber:2.4,vitaminA:11,vitaminC:53.2,calcium:40,iron:.1},
  papaya:{calories:43,protein:.5,carbs:10.8,fat:.3,fiber:1.7,vitaminA:47,vitaminC:60.9,calcium:20,iron:.3},
  lemon:{calories:29,protein:1.1,carbs:9.3,fat:.3,fiber:2.8,vitaminA:1,vitaminC:53,calcium:26,iron:.6},
  garlic:{calories:149,protein:6.4,carbs:33.1,fat:.5,fiber:2.1,vitaminA:0,vitaminC:31.2,calcium:181,iron:1.7},
  ginger:{calories:80,protein:1.8,carbs:17.8,fat:.8,fiber:2,vitaminA:0,vitaminC:5,calcium:16,iron:.6},
  peanuts:{calories:567,protein:25.8,carbs:16.1,fat:49.2,fiber:8.5,vitaminA:0,vitaminC:0,calcium:92,iron:4.6},
  coconut:{calories:354,protein:3.3,carbs:15.2,fat:33.5,fiber:9,vitaminA:0,vitaminC:3.3,calcium:14,iron:2.4},
  "cooking oil":{calories:884,protein:0,carbs:0,fat:100,fiber:0,vitaminA:0,vitaminC:0,calcium:0,iron:0}
};

function normalize(value:string){return value.toLowerCase().replace(/[^a-z0-9 ]/g," ").replace(/ +/g," ").trim();}
function foodKey(name:string):string|undefined{
  const n=normalize(name);
  const aliases:[string,string][]=[
    ["moong","mung beans"],["mung bean","mung beans"],["green gram","mung beans"],
    ["masoor","red lentils"],["red lentil","red lentils"],["toor","pigeon peas"],["arhar","pigeon peas"],["pigeon pea","pigeon peas"],
    ["chana","chickpeas"],["chickpea","chickpeas"],["rajma","kidney beans"],["kidney bean","kidney beans"],
    ["palak","spinach"],["spinach","spinach"],["methi","fenugreek leaves"],["fenugreek","fenugreek leaves"],
    ["chawli bhaji","amaranth leaves"],["amaranth","amaranth leaves"],["shepu","dill"],["bell pepper","bell pepper"],
    ["capsicum","bell pepper"],["brinjal","aubergine"],["eggplant","aubergine"],["aubergine","aubergine"],
    ["atta","whole wheat flour"],["wheat flour","whole wheat flour"],["poha","flattened rice"],["flattened rice","flattened rice"],
    ["curd","plain yogurt"],["yogurt","plain yogurt"],["egg","eggs"],["cooking oil","cooking oil"],["oil","cooking oil"],["ghee","cooking oil"],
    ["bhindi","okra"],["okra","okra"],["matar","peas"],["peas","peas"],["lauki","bottle gourd"],["bottle gourd","bottle gourd"],["bajra","pearl millet"],["pearl millet","pearl millet"]
  ];
  for(const [alias,key] of aliases)if(n.includes(alias))return key;
  for(const key of Object.keys(FOOD))if(n===key||n.includes(key))return key;
  return undefined;
}
function calculateNutrition(parts:Part[],servings:number){
  const total: Nutrients={calories:0,protein:0,carbs:0,fat:0,fiber:0,vitaminA:0,vitaminC:0,calcium:0,iron:0};
  let totalGrams=0,matchedGrams=0;
  for(const part of parts){
    const grams=Math.max(0,Math.min(5000,Number(part.grams)||0));
    if(!grams)continue;
    totalGrams+=grams;
    const key=foodKey(part.name);
    const reference=key?FOOD[key]:undefined;
    if(!reference)continue;
    matchedGrams+=grams;
    (Object.keys(total) as (keyof Nutrients)[]).forEach(k=>{total[k]+=reference[k]*grams/100;});
  }
  const divisor=Math.max(1,Math.min(20,Math.round(servings||1)));
  const perServing={...total};
  (Object.keys(perServing) as (keyof Nutrients)[]).forEach(k=>{perServing[k]=Math.round(perServing[k]/divisor*10)/10;});
  return {perServing,coveragePercent:totalGrams?Math.round(matchedGrams/totalGrams*100):0,source:"Approximate generic-food values based on common USDA FoodData Central entries."};
}
function tokens(value:string){return normalize(value).split(" ").filter(w=>w.length>2&&!["with","and","the","for","indian","style","recipe"].includes(w));}
async function jsonFetch(url:string):Promise<any|null>{
  try{const response=await fetch(url,{cache:"no-store",signal:AbortSignal.timeout(6500),headers:{Accept:"application/json"}});if(!response.ok)return null;return await response.json();}catch{return null;}
}
async function getDishPhoto(name:string):Promise<Photo>{
  const wanted=tokens(name);
  const mealData=await jsonFetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+encodeURIComponent(name));
  const meals=Array.isArray(mealData?.meals)?mealData.meals:[];
  const ranked=meals.map((meal:any)=>{
    const words=tokens(String(meal.strMeal||""));
    const overlap=wanted.filter(word=>words.includes(word)).length;
    return {meal,score:overlap/Math.max(1,wanted.length)};
  }).sort((a:any,b:any)=>b.score-a.score)[0];
  if(ranked&&ranked.score>=.5&&ranked.meal.strMealThumb){
    return {url:ranked.meal.strMealThumb,source:"TheMealDB",title:ranked.meal.strMeal,pageUrl:"https://www.themealdb.com/"};
  }
  const query=new URLSearchParams({q:name+" Indian food dish",page_size:"10",license_type:"commercial,modification,share"});
  const openverse=await jsonFetch("https://api.openverse.org/v1/images/?"+query.toString());
  const items=Array.isArray(openverse?.results)?openverse.results:[];
  const candidates=items.map((item:any)=>{
    const tags=Array.isArray(item.tags)?item.tags.map((tag:any)=>typeof tag==="string"?tag:tag.name||"").join(" "):"";
    const text=normalize(String(item.title||"")+" "+tags);
    const overlap=wanted.filter(word=>text.includes(word)).length;
    return {item,overlap,score:overlap/Math.max(1,wanted.length)};
  }).filter((candidate:any)=>candidate.overlap>0&&candidate.score>=(wanted.length<3?.5:.34)).sort((a:any,b:any)=>b.score-a.score);
  const item=candidates[0]?.item;
  if(item&&(item.thumbnail||item.url)){
    return {url:item.thumbnail||item.url,source:"Openverse",pageUrl:item.foreign_landing_url||item.url,title:item.title||name,creator:item.creator||undefined,license:item.license?String(item.license).toUpperCase()+(item.license_version?" "+item.license_version:""):undefined};
  }
  return null;
}

export async function POST(request:Request){
  const apiKey=process.env.GEMINI_API_KEY;
  if(!apiKey)return Response.json({error:"GEMINI_API_KEY is not configured. Add it to .env.local or the Vercel project environment variables."},{status:503});
  let body:{ingredients?:Pick[];goal?:string};
  try{body=await request.json();}catch{return Response.json({error:"Request body must be valid JSON."},{status:400});}
  const picks=(Array.isArray(body.ingredients)?body.ingredients:[]).filter(item=>item&&typeof item.id==="string"&&typeof item.name==="string"&&typeof item.apiName==="string").slice(0,12);
  if(!picks.length)return Response.json({error:"Select at least one ingredient before discovering dishes."},{status:400});
  const goal=typeof body.goal==="string"?body.goal:"Balanced";
  const model=(process.env.GEMINI_MODEL||"gemini-3.8-flash").trim();
  const prompt=[
    "You are DishLens, an ingredient-first recipe planner for everyday cooks, including Indian and Maharashtrian home cooking.",
    "The user selected these ingredients: "+JSON.stringify(picks.map(item=>({id:item.id,name:item.name,canonicalName:item.apiName,category:item.category}))),
    "Preference: "+goal+".",
    "Return 4 to 6 practical, recognizable dishes. When at least 2 ingredients are selected, target 3 combination dishes that use 2 or more selected items and 2 ideas centered on exactly one selected item. When only one ingredient is selected, give distinct practical ways to cook or use that item.",
    "Use only the exact selected ids in ingredientIds. Combination recipes have at least 2 selected ids. Single-ingredient ideas have exactly 1 selected id. Normal household staples and seasonings may be added. Do not claim a food treats or prevents a disease.",
    "Fields per recipe: name, description, ingredientIds, timeMinutes, servings, ingredients (array of name, quantity, grams), steps (5-8 ordered and actionable strings), substitutions (1-3), nutritionHighlights (1-2 factual food-context notes). grams are numeric edible-portion estimates for the whole recipe. For pulses, dals, beans, rice, grains and oats, grams must be dry/uncooked weights before soaking or cooking; for vegetables and fruit use raw edible weight; for eggs use edible weight without shells; for dairy and oil use the amount added. Quantity should roughly match grams. Include oil if used. Do not output calories or nutrient values.",
    "Return only valid JSON with this structure: {\"recipes\":[{\"name\":\"...\",\"description\":\"...\",\"ingredientIds\":[\"...\"],\"timeMinutes\":30,\"servings\":2,\"ingredients\":[{\"name\":\"spinach\",\"quantity\":\"2 cups\",\"grams\":60}],\"steps\":[\"...\",\"...\",\"...\",\"...\",\"...\"],\"substitutions\":[\"...\"],\"nutritionHighlights\":[\"...\"]}]}"
  ].join("\n");
  let generated="";
  try{
    const response=await fetch("https://generativelanguage.googleapis.com/v1beta/models/"+encodeURIComponent(model)+":generateContent?key="+encodeURIComponent(apiKey),{
      method:"POST",headers:{"Content-Type":"application/json"},cache:"no-store",signal:AbortSignal.timeout(25000),
      body:JSON.stringify({contents:[{role:"user",parts:[{text:prompt}]}],generationConfig:{temperature:.55,responseMimeType:"application/json"}})
    });
    const data=await response.json();
    if(!response.ok)return Response.json({error:"Gemini request failed: "+(data?.error?.message||("HTTP "+response.status))},{status:502});
    generated=data?.candidates?.[0]?.content?.parts?.map((part:any)=>part.text||"").join("")||"";
  }catch(error){
    return Response.json({error:error instanceof Error&&error.name==="TimeoutError"?"Gemini took too long to respond. Please retry.":"Could not reach Gemini. Check the API key and server network, then retry."},{status:502});
  }
  let parsed:any;
  try{parsed=JSON.parse(generated.trim().replace(/^\x60\x60\x60(?:json)?\s*/i,"").replace(/\s*\x60\x60\x60$/,""));}catch{return Response.json({error:"Gemini returned invalid JSON. Retry or select an available model."},{status:502});}
  const allowed=new Set(picks.map(item=>item.id));
  const recipes=(Array.isArray(parsed.recipes)?parsed.recipes:[]).map((item:any,index:number)=>{
    const ids=Array.isArray(item.ingredientIds)?item.ingredientIds.filter((id:string)=>allowed.has(id)):[];
    const ingredients:Part[]=(Array.isArray(item.ingredients)?item.ingredients:[]).map((part:any)=>({
      name:String(part?.name||"Unknown").slice(0,100),
      quantity:String(part?.quantity||"").slice(0,100),
      grams:Math.max(0,Math.min(5000,Number(part?.grams)||0))
    })).filter((part:Part)=>part.grams>0).slice(0,24);
    if(!String(item.name||"").trim()||!ids.length||!ingredients.length)return null;
    const servings=Math.max(1,Math.min(6,Math.round(Number(item.servings)||2)));
    return {
      id:"dish-"+index+"-"+String(item.name).toLowerCase().replace(/[^a-z0-9]+/g,"-"),
      name:String(item.name).slice(0,100),description:String(item.description||"").slice(0,260),
      matchType:ids.length>1?"combination":"single",
      selectedIngredientNames:ids.map((id:string)=>picks.find(pick=>pick.id===id)?.name||id),
      timeMinutes:Math.max(10,Math.min(90,Math.round(Number(item.timeMinutes)||30))),servings,ingredients,
      steps:(Array.isArray(item.steps)?item.steps:[]).map((step:any)=>String(step).slice(0,700)).filter(Boolean).slice(0,10),
      substitutions:(Array.isArray(item.substitutions)?item.substitutions:[]).map((value:any)=>String(value).slice(0,220)).filter(Boolean).slice(0,4),
      nutritionHighlights:(Array.isArray(item.nutritionHighlights)?item.nutritionHighlights:[]).map((value:any)=>String(value).slice(0,250)).filter(Boolean).slice(0,3),
      nutrients:calculateNutrition(ingredients,servings),photo:null as Photo
    };
  }).filter(Boolean);
  if(!recipes.length)return Response.json({error:"Gemini returned no usable recipes linked to your selected ingredients. Try another selection."},{status:502});
  const withPhotos=await Promise.all(recipes.slice(0,6).map(async(recipe:any)=>({...recipe,photo:await getDishPhoto(recipe.name)})));
  return Response.json({recipes:withPhotos,model},{headers:{"Cache-Control":"no-store"}});
}
