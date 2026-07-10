// Vienna Grand Chauffeurs — square card images (img.card), 6 vehicles.
// Run: node scripts/gen-vehicle-cards.mjs  [slug ...]
//
// img.card renders in BOTH portrait (fleet grid 4/5, flotte slider ~1:1) and
// landscape (Preise 16/10, booking thumb 4/3) containers, so a 1:1 square with
// the vehicle centered + generous margin on all sides survives every crop.
// Same monumental-steps scene as ueberblick/vorteil for a coherent look.

import { generateBatch } from "/Users/robiu/.claude-work/skills/nano-banana-codegen/lib/nano-banana.js";
import fs from "node:fs";
import path from "node:path";

const REF_BASE = "/Users/Robiu/Documents/Growup/Reference";
const refs = (folder) => fs.readdirSync(path.join(REF_BASE, folder))
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  .map((f) => path.join(REF_BASE, folder, f));

const SCENE = `
Setting: a modern architectural plaza in Vienna. A wide flight of dark polished charcoal-granite steps rises behind the vehicle, flanked by smooth pale limestone / travertine walls, the ground a light warm-beige stone paving in a clean grid. Contemporary, minimal, monumental. The plaza is completely empty — no pedestrians, no other vehicles, no clutter, no signage.

Light: bright clear daytime, soft directional sunlight raking across the pale stone and catching the polished black paint with crisp highlights and clean cool shadows. No night, no rain, no headlights on.

Style: cinematic architectural automotive photograph, full-frame camera, 50mm lens at f/4, hyper-realistic colour grading, 8K, ultra-detailed, professional retouching. ONE single continuous photograph — never a collage, grid or split panel. No text, no logos beyond the factory badge described. Austrian license plate prefixed "W" when visible.

Mood: modern, powerful, understated luxury.`;

const V = {
  "e-klasse": { refs: refs("e class"), name: "black Mercedes-Benz E-Klasse sedan",
    modelLine: "the E-Klasse grille with its central three-pointed star, split LED headlight signature, sedan proportions, alloy wheels, chrome side-window trim",
    badge: ", factory Mercedes three-pointed star badge only" },
  "bmw-5er": { refs: refs("BMW 5er"), name: "black BMW 5 Series (G60) sedan",
    modelLine: "the BMW twin-kidney front grille, sharp angular L-shaped LED headlight signature, Hofmeister-kink rear window, multi-spoke alloy wheels with the blue-and-white BMW roundel on each hub",
    badge: ". IMPORTANT: this is a BMW, NOT a Mercedes — round blue-and-white BMW roundel on hood and wheels, twin-kidney grille, absolutely no Mercedes star anywhere" },
  "v-klasse": { refs: refs("v class"), name: "black Mercedes-Benz V-Klasse minivan",
    modelLine: "the V-Klasse face with its diamond-pattern radiator grille and central star, headlight signature, tall minivan proportions, sliding side door with its long track, alloy wheels and chrome trim",
    badge: ", factory Mercedes three-pointed star badge only" },
  "s-klasse": { refs: refs("s class"), name: "black Mercedes-Benz S-Klasse long-wheelbase sedan",
    modelLine: "the S-Klasse grille with its larger upright three-pointed star, headlight signature, long-wheelbase proportions, flush door handles, alloy wheels, chrome side-window trim",
    badge: ", factory Mercedes three-pointed star badge only" },
  "mercedes-eqe": { refs: refs("EQE"), name: "black Mercedes-Benz EQE electric sedan",
    modelLine: "the EQE's smooth CLOSED black-panel front (an EV — a solid body-coloured panel with the central star, NO combustion grille openings), the continuous full-width LED light band, the cab-forward one-bow aerodynamic silhouette, flush handles and aero alloy wheels",
    badge: ", factory Mercedes star on the closed front panel; all-electric EQE, so NO open radiator grille" },
  "business-sprinter": { refs: refs("Sprinter"), name: "black Mercedes-Benz Sprinter passenger van",
    modelLine: "the Sprinter's diamond-pattern grille with the large central star, headlight signature, tall van proportions, alloy wheels and the wide sliding side door with its long track",
    badge: ", factory Mercedes three-pointed star badge only" },
};

const square = (s) => `Square 1:1 frame. Exterior **front-three-quarter view** of a pristine ${s.name} (2025 model — match the provided reference photographs exactly: ${s.modelLine}${s.badge}). The vehicle sits CENTERED in the frame with generous empty breathing room on ALL FOUR sides — above, below, left and right — so the whole car stays fully visible whether the image is later cropped to a tall portrait or a wide landscape. The complete vehicle is clearly visible from front-three-quarter, not touching any edge. Dark charcoal-granite steps behind, pale limestone wall, light-stone paving beneath.${SCENE}`;

const OUT = "public/images/fahrzeuge";
const jobs = Object.entries(V).map(([slug, s]) => ({
  prompt: square(s), output: `${OUT}/card-${slug}.jpg`, references: s.refs,
  aspectRatio: "1:1", imageSize: "2K", quality: "hero",
}));

const only = process.argv.slice(2);
const run = only.length ? jobs.filter((j) => only.some((s) => j.output.includes(`card-${s}.jpg`))) : jobs;

console.log(`Generating ${run.length} card images…\n`);
const results = await generateBatch(run, {
  delayMs: 7000,
  onProgress: (job, i, total) => console.log(`[${i + 1}/${total}] ${job.output}`),
});
const fail = results.filter((r) => !r.ok);
console.log(`\nDone. ${results.length - fail.length}/${results.length} saved.`);
if (fail.length) { fail.forEach((r) => console.error(`  ${r.job.output}: ${r.error}`)); process.exit(1); }
