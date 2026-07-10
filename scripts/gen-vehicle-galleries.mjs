// Vienna Grand Chauffeurs — 30 vehicle gallery images (6 vehicles × 5 shots).
// Run: node scripts/gen-vehicle-galleries.mjs
//
// Proven Beethoven method: locked TEXT scene + each vehicle's OWN reference
// photos only (never a scene image of a different car — that was what turned
// every sedan into an E-Klasse). Per-vehicle modelLine names the exact grille /
// badge signature and says "match the references exactly".
//
// Output: public/images/fahrzeuge/<slug>-gal-<1..5>.jpg  (gal-1 = hero)
// 4:3 · 2K · hero quality · daytime Vienna Stadtpalais scene.

import { generateBatch } from "/Users/robiu/.claude-work/skills/nano-banana-codegen/lib/nano-banana.js";
import fs from "node:fs";
import path from "node:path";

const REF_BASE = "/Users/Robiu/Documents/Growup/Reference";
function refs(folder) {
  const dir = path.join(REF_BASE, folder);
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .map((f) => path.join(dir, f));
}

// Locked across every shot — one coherent scene, 5 angles per vehicle.
const SCENE = `
Setting: a quiet cobblestone street in Vienna's first district running alongside a Wiener Stadtpalais. The building presents a cream-and-ochre baroque limestone facade with tall arched windows, ornate wrought-iron balconies, sandstone reliefs above the windows, and a single black cast-iron gaslamp post on the kerb. Mature green chestnut trees frame the street on the opposite side, casting dappled shadows on the cobblestones. The street is empty — no pedestrians, no other vehicles, no contemporary street clutter, no traffic signs, no scaffolding, no scooters.

Light: late-afternoon warm golden sunlight raking across the limestone facade, catching the polished paint of the vehicle with crisp warm highlights and cool reflected shadows. Deep blue sky above the cornice line with a few wisps of cirrus. The gaslamp is unlit (it is still day). Long but soft shadows on the cobblestones.

Style: shot on a full-frame camera, 35mm lens at f/2.8 for wide compositions, 50mm at f/2.0 for medium compositions, 50mm at f/2.8 for interior shots. Hyper-realistic colour grading with warm highlights and cool shadows. 8K, ultra-detailed, professional retouching. This is ONE single continuous photograph — never a collage, grid, or split panel. Natural, realistic human anatomy. No text, no logos beyond the factory badge described. Austrian license plate prefixed "W" when visible.

Mood: calm, dignified, restrained — the energy of a vehicle waiting between appointments in an elegant city.`;

// Five locked angles. Each is prepended to SCENE.
function shots(spec) {
  const { name, modelLine, badge, interiorTrim, boardingDoor, interiorView, dimensions } = spec;
  return {
    1: `Wide cinematic 4:3 horizontal frame. Exterior **front-three-quarter view** of a pristine ${name} (2025 model — match the provided reference photographs exactly: ${modelLine}${badge}). The vehicle is parked at the kerb, angled so the front three-quarter is fully visible. Generous breathing room — the baroque limestone facade fills the upper background, the gaslamp visible to one side. Cobblestone foreground. THIS is the primary hero shot.`,

    2: `Wide cinematic 4:3 horizontal frame. Exterior **rear-three-quarter view** of the same pristine ${name} (2025 model — match references: ${modelLine}${badge}). The taillight signature and the long ${dimensions} flank are both clearly readable, trim catching the warm golden sunlight. The baroque limestone facade rises behind the vehicle, the gaslamp anchoring one edge. Cobblestone foreground.`,

    3: `Cinematic 4:3 horizontal frame. **Boarding moment** — the ${boardingDoor} of the same pristine ${name} (2025 model — match references: ${modelLine}${badge}) is held wide open, revealing the ${interiorTrim} cabin. A male chauffeur in a dark navy three-piece suit stands beside the open door, one hand resting near the door's edge, gesturing inward, natural realistic posture. Parked on the cobblestone street, baroque facade behind. Warm daylight raking into the open cabin, catching the leather stitching.`,

    4: `4:3 horizontal frame. **Interior view from inside the cabin** of the same ${name} — ${interiorView}. ${interiorTrim} in clear focus, polished detail trim catching warm late-afternoon daylight through the side window. The defocused exterior through the window shows a hint of the baroque limestone facade and the gaslamp, matching the exterior shots' scene. 50mm lens, f/2.8.`,

    5: `Wide atmospheric 4:3 establishing shot. The same pristine ${name} (2025 model — match references: ${modelLine}${badge}) parked along the kerb of the cobblestone Vienna street, **photographed from much further back** so the street context dominates: the long sweep of the cream-baroque limestone Stadtpalais facade with ornate iron balconies and arched windows fills most of the frame, gaslamp post and chestnut trees framing the composition, the vehicle sitting relatively small in the lower-mid frame as one elegant element among the architecture. Street recedes into soft late-afternoon haze. Deep blue sky with cirrus. 35mm lens, f/4.`,
  };
}

const VEHICLES = {
  "e-klasse": {
    refs: refs("e class"),
    spec: {
      name: "black Mercedes-Benz E-Klasse sedan",
      modelLine:
        "the E-Klasse grille with its central three-pointed star, split LED headlight signature, sedan body proportions, alloy wheels, chrome side-window trim",
      badge: ", factory Mercedes three-pointed star badge only",
      interiorTrim:
        "cream-and-charcoal Nappa leather with polished open-pore wood inserts and brushed aluminium accents",
      boardingDoor: "rear passenger door",
      interiorView:
        "the rear seat looking forward from a low side angle — rear bench, polished wood console and a portion of the front headrests visible",
      dimensions: "sedan-length",
    },
  },
  "bmw-5er": {
    refs: refs("BMW 5er"),
    spec: {
      name: "black BMW 5 Series (G60) sedan",
      modelLine:
        "the BMW twin-kidney front grille, sharp angular L-shaped LED headlight signature, the Hofmeister-kink rear window, sedan body proportions, multi-spoke alloy wheels with the blue-and-white BMW roundel on each hub",
      badge:
        ". IMPORTANT: this is a BMW, NOT a Mercedes — the round blue-and-white BMW roundel badge on the hood, wheels and bootlid, twin-kidney grille, absolutely no Mercedes star anywhere",
      interiorTrim:
        "black and cream Merino leather with dark open-pore ash wood, a crystal-effect gear selector and the curved iDrive display",
      boardingDoor: "rear passenger door",
      interiorView:
        "the rear seat looking forward — Merino leather bench, the curved dashboard display and a portion of the front seats visible",
      dimensions: "sedan-length",
    },
  },
  "v-klasse": {
    refs: refs("v class"),
    spec: {
      name: "black Mercedes-Benz V-Klasse minivan",
      modelLine:
        "the V-Klasse face with its diamond-pattern radiator grille and central star, headlight signature, tall minivan body proportions, sliding side door with its long track, alloy wheels and chrome trim",
      badge: ", factory Mercedes three-pointed star badge only",
      interiorTrim:
        "dark Nappa leather executive captain's chairs facing each other across a polished wood table",
      boardingDoor: "wide sliding side door",
      interiorView:
        "the middle cabin from the rear bench looking forward — two executive captain's chairs facing each other across a polished wood table, daylight through the side windows",
      dimensions: "long minivan",
    },
  },
  "s-klasse": {
    refs: refs("s class"),
    spec: {
      name: "black Mercedes-Benz S-Klasse long-wheelbase sedan",
      modelLine:
        "the S-Klasse grille with its larger upright three-pointed star, headlight signature, long-wheelbase body proportions, flush door handles, alloy wheels, chrome side-window trim",
      badge: ", factory Mercedes three-pointed star badge only",
      interiorTrim:
        "cream Nappa leather with polished walnut-burl wood inserts, brushed aluminium accents and subtle ambient lighting",
      boardingDoor: "rear passenger door",
      interiorView:
        "the extended-legroom rear seat looking forward — Nappa leather, walnut-burl console with the rear-cabin tablet visible, ambient lighting subtle",
      dimensions: "extended long-wheelbase",
    },
  },
  "mercedes-eqe": {
    refs: refs("EQE"),
    spec: {
      name: "black Mercedes-Benz EQE electric sedan",
      modelLine:
        "the EQE's smooth CLOSED black-panel front (an EV — a solid body-coloured panel with the central star, NO combustion grille openings), the continuous full-width LED light band across the front, the cab-forward one-bow aerodynamic silhouette, flush door handles and aero alloy wheels",
      badge:
        ", factory Mercedes three-pointed star on the closed front panel; it is an all-electric EQE, so NO open radiator grille",
      interiorTrim:
        "modern EV cabin with light Nappa leather, the wide MBUX Hyperscreen glass dashboard and rose-gold ambient accents",
      boardingDoor: "rear passenger door",
      interiorView:
        "the rear seat looking forward — light Nappa leather, the glowing wide MBUX Hyperscreen dashboard visible between the front seats, rose-gold ambient light lines",
      dimensions: "aerodynamic sedan-length",
    },
  },
  "business-sprinter": {
    refs: refs("Sprinter"),
    spec: {
      name: "black Mercedes-Benz Sprinter passenger van",
      modelLine:
        "the Sprinter's diamond-pattern grille with the large central star, headlight signature, tall van body proportions, alloy wheels and the wide sliding side door with its long track",
      badge: ", factory Mercedes three-pointed star badge only",
      interiorTrim:
        "cream Nappa leather multi-row executive seating with polished wood floor trim and brushed aluminium accents",
      boardingDoor: "wide sliding side door with a single stepwell visible",
      interiorView:
        "the rear passenger cabin from the front looking backward — two staggered rows of executive captain's chairs in cream Nappa leather, high windows letting in daylight, polished wood floor trim",
      dimensions: "long-wheelbase van",
    },
  },
};

const COMMON = { aspectRatio: "4:3", imageSize: "2K", quality: "hero" };
const OUT_DIR = "public/images/fahrzeuge";

const jobs = [];
for (const [slug, { refs: vehicleRefs, spec }] of Object.entries(VEHICLES)) {
  const sh = shots(spec);
  for (let i = 1; i <= 5; i++) {
    jobs.push({
      prompt: sh[i] + SCENE,
      output: `${OUT_DIR}/${slug}-gal-${i}.jpg`,
      references: vehicleRefs,
      ...COMMON,
    });
  }
}

// Allow regenerating a subset:  node scripts/gen-vehicle-galleries.mjs bmw-5er mercedes-eqe
const only = process.argv.slice(2);
const run = only.length
  ? jobs.filter((j) => only.some((s) => j.output.includes(`/${s}-gal-`)))
  : jobs;

console.log(`Generating ${run.length} vehicle gallery images…\n`);

const results = await generateBatch(run, {
  delayMs: 7000,
  onProgress: (job, i, total) => console.log(`[${i + 1}/${total}] ${job.output}`),
});

const ok = results.filter((r) => r.ok);
const fail = results.filter((r) => !r.ok);
console.log(`\nDone. ${ok.length}/${results.length} saved.`);
if (fail.length) {
  console.error("\nFailures (re-run with these slugs):");
  fail.forEach((r) => console.error(`  ${r.job.output}: ${r.error}`));
  process.exit(1);
}
