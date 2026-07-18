import { generateWithReferences } from "/Users/robiu/.claude-work/skills/nano-banana-codegen/lib/nano-banana.js";

const EXT_REFS = [
  "maybach/mb-maybach-front-view-slider-1-2.webp",
  "maybach/mb-maybach-rear-view-slider-two-2.webp",
  "maybach/mb-maybach-rear-view-two-slider-2.webp",
];
const INT_REFS = [
  "maybach/DGM_2849-1.webp",
  "maybach/DGM_2770.webp",
  "maybach/DGM_2798.webp",
];

const CAR =
  "The exact car in the reference photos: a black Mercedes-Maybach S-Class long-wheelbase " +
  "luxury sedan with the upright Maybach chrome pinstripe grille, chrome window trim, and the " +
  "distinctive multi-spoke chrome-and-black Maybach wheels. Keep the car's proportions, badges " +
  "and details faithful to the references.";
const SCENE =
  "parked on an old cobblestone forecourt in front of a grand Viennese baroque palace of pale " +
  "limestone with ornate columns, at warm golden hour. Long soft shadows, deep glossy " +
  "reflections on the black paint, cinematic wide composition, 8K hyper-realistic professional " +
  "automotive photography, natural colour grade. An empty calm scene, no people, no readable " +
  "licence plate, no added text or logos.";

const jobs = [
  {
    output: "scripts/_raw/maybach-ext-front.jpg",
    aspectRatio: "3:2",
    imageSize: "2K",
    quality: "hero",
    references: EXT_REFS,
    prompt:
      `${CAR} Photograph it in a three-quarter FRONT view from a low cinematic angle, ${SCENE} ` +
      "The car sits centre-right in the frame leaving open facade on the left.",
  },
  {
    output: "scripts/_raw/maybach-ext-rear.jpg",
    aspectRatio: "4:3",
    imageSize: "2K",
    quality: "hero",
    references: EXT_REFS,
    prompt:
      `${CAR} Photograph it in a three-quarter REAR view showing the rear and side, ${SCENE}`,
  },
  {
    output: "scripts/_raw/maybach-int-portrait.jpg",
    aspectRatio: "3:4",
    imageSize: "2K",
    quality: "hero",
    references: INT_REFS,
    prompt:
      "A vertical portrait interior photograph of the rear executive cabin of a Mercedes-Maybach " +
      "S-Class, matching the reference interiors exactly: black diamond-quilted Nappa leather rear " +
      "seats with the Maybach crest embroidered on the headrests, black Alcantara headliner, chrome " +
      "and piano-black trim, the rear centre console with tablet controller. Soft warm daylight " +
      "coming through the side window, shallow depth of field, 8K hyper-realistic, luxurious and " +
      "serene mood, no people, no added text.",
  },
];

import { mkdirSync } from "fs";
mkdirSync("scripts/_raw", { recursive: true });

for (const [i, job] of jobs.entries()) {
  console.log(`[${i + 1}/${jobs.length}] ${job.output} ...`);
  try {
    await generateWithReferences(job);
    console.log(`   done`);
  } catch (e) {
    console.error(`   FAILED:`, e?.message || e);
  }
}
console.log("maybach generation attempted");
