// Vienna Grand Chauffeurs — Überblick + Vorteil section images, 6 vehicles.
// Run: node scripts/gen-vehicle-sections.mjs  [slug ...]
//
// Two shots per vehicle in ONE coherent monumental-steps plaza scene (distinct
// from the gallery's Stadtpalais cobblestone, so each detail page has variety):
//   ueberblick-<slug>.jpg  → 4:3 landscape  (.vover__media)
//   vorteil-<slug>.jpg     → 3:4 portrait   (.vben__frame, 621/741)
//
// Beethoven method: each vehicle uses ONLY its own reference photos; scene is
// text; modelLine names the exact grille/badge so no marque bleed.

import { generateBatch } from "/Users/robiu/.claude-work/skills/nano-banana-codegen/lib/nano-banana.js";
import fs from "node:fs";
import path from "node:path";

const REF_BASE = "/Users/Robiu/Documents/Growup/Reference";
function refs(folder) {
  const dir = path.join(REF_BASE, folder);
  return fs.readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .map((f) => path.join(dir, f));
}

const SCENE = `
Setting: a modern architectural plaza in Vienna. A wide flight of dark polished charcoal-granite steps rises behind the vehicle, flanked by smooth pale limestone / travertine walls, the ground a light warm-beige stone paving in a clean grid. Contemporary, minimal, monumental. The plaza is completely empty — no pedestrians, no other vehicles, no street clutter, no signage, no scaffolding.

Light: bright clear daytime, soft directional sunlight raking across the pale stone and catching the polished black paint of the vehicle with crisp highlights and clean cool shadows. No night, no rain, no headlights on.

Style: cinematic architectural automotive photograph, full-frame camera, 35mm lens at f/2.8, hyper-realistic colour grading, 8K, ultra-detailed, professional retouching. This is ONE single continuous photograph — never a collage, grid or split panel. No text, no logos beyond the factory badge described. Austrian license plate prefixed "W" when visible.

Mood: modern, powerful, understated luxury.`;

// Reused from the gallery script — the exact grille/badge signature per marque.
const V = {
  "e-klasse": { refs: refs("e class"),
    name: "black Mercedes-Benz E-Klasse sedan",
    modelLine: "the E-Klasse grille with its central three-pointed star, split LED headlight signature, sedan proportions, alloy wheels, chrome side-window trim",
    badge: ", factory Mercedes three-pointed star badge only" },
  "bmw-5er": { refs: refs("BMW 5er"),
    name: "black BMW 5 Series (G60) sedan",
    modelLine: "the BMW twin-kidney front grille, sharp angular L-shaped LED headlight signature, Hofmeister-kink rear window, multi-spoke alloy wheels with the blue-and-white BMW roundel on each hub",
    badge: ". IMPORTANT: this is a BMW, NOT a Mercedes — round blue-and-white BMW roundel on hood and wheels, twin-kidney grille, absolutely no Mercedes star anywhere" },
  "v-klasse": { refs: refs("v class"),
    name: "black Mercedes-Benz V-Klasse minivan",
    modelLine: "the V-Klasse face with its diamond-pattern radiator grille and central star, headlight signature, tall minivan proportions, sliding side door with its long track, alloy wheels and chrome trim",
    badge: ", factory Mercedes three-pointed star badge only" },
  "s-klasse": { refs: refs("s class"),
    name: "black Mercedes-Benz S-Klasse long-wheelbase sedan",
    modelLine: "the S-Klasse grille with its larger upright three-pointed star, headlight signature, long-wheelbase proportions, flush door handles, alloy wheels, chrome side-window trim",
    badge: ", factory Mercedes three-pointed star badge only" },
  "mercedes-eqe": { refs: refs("EQE"),
    name: "black Mercedes-Benz EQE electric sedan",
    modelLine: "the EQE's smooth CLOSED black-panel front (an EV — a solid body-coloured panel with the central star, NO combustion grille openings), the continuous full-width LED light band, the cab-forward one-bow aerodynamic silhouette, flush handles and aero alloy wheels",
    badge: ", factory Mercedes star on the closed front panel; all-electric EQE, so NO open radiator grille" },
  "business-sprinter": { refs: refs("Sprinter"),
    name: "black Mercedes-Benz Sprinter passenger van",
    modelLine: "the Sprinter's diamond-pattern grille with the large central star, headlight signature, tall van proportions, alloy wheels and the wide sliding side door with its long track",
    badge: ", factory Mercedes three-pointed star badge only" },
};

function landscape(s) {
  return `Wide cinematic 4:3 horizontal frame. Exterior **front-three-quarter view** of a pristine ${s.name} (2025 model — match the provided reference photographs exactly: ${s.modelLine}${s.badge}), angled so the front and the driver's side are visible, the vehicle sitting centre-right of the frame. The dark charcoal-granite steps rise behind and to the right, a pale limestone wall on the left, generous light-stone paving in the foreground. Full vehicle visible with breathing room above for a headline.${SCENE}`;
}
function portrait(s) {
  return `Tall cinematic 3:4 vertical frame. Exterior **front-three-quarter view** of a pristine ${s.name} (2025 model — match the provided reference photographs exactly: ${s.modelLine}${s.badge}), angled toward the camera, filling most of the vertical frame from a slightly low, powerful angle. The dark charcoal-granite steps rise tall behind the vehicle, pale limestone wall to one side, light-stone paving beneath. The front grille, badge and headlights are crisp and clearly readable.${SCENE}`;
}

const OUT = "public/images/fahrzeuge";
const jobs = [];
for (const [slug, s] of Object.entries(V)) {
  jobs.push({ prompt: landscape(s), output: `${OUT}/ueberblick-${slug}.jpg`, references: s.refs, aspectRatio: "4:3", imageSize: "2K", quality: "hero" });
  jobs.push({ prompt: portrait(s), output: `${OUT}/vorteil-${slug}.jpg`, references: s.refs, aspectRatio: "3:4", imageSize: "2K", quality: "hero" });
}

const only = process.argv.slice(2);
const run = only.length ? jobs.filter((j) => only.some((s) => j.output.includes(`-${s}.jpg`))) : jobs;

console.log(`Generating ${run.length} section images…\n`);
const results = await generateBatch(run, {
  delayMs: 7000,
  onProgress: (job, i, total) => console.log(`[${i + 1}/${total}] ${job.output}`),
});
const fail = results.filter((r) => !r.ok);
console.log(`\nDone. ${results.length - fail.length}/${results.length} saved.`);
if (fail.length) { fail.forEach((r) => console.error(`  ${r.job.output}: ${r.error}`)); process.exit(1); }
