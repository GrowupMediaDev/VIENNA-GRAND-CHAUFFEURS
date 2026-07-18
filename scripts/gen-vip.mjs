import { generateWithReferences } from "/Users/robiu/.claude-work/skills/nano-banana-codegen/lib/nano-banana.js";
import { mkdirSync } from "fs";

const EXT_REFS = [
  "public/images/fahrzeuge/card-business-sprinter.jpg", // black Sprinter identity + grille
  "public/images/hero-home.jpg", // Vienna palace golden-hour style
];
const INT_REFS = [
  "/Users/Robiu/Documents/Growup/vip sprinter images/WhatsApp Image 2026-07-17 at 11.06.14 AM (11).jpeg",
  "/Users/Robiu/Documents/Growup/vip sprinter images/WhatsApp Image 2026-07-17 at 11.06.14 AM (3).jpeg",
  "/Users/Robiu/Documents/Growup/vip sprinter images/WhatsApp Image 2026-07-17 at 11.06.14 AM (6).jpeg",
];

const VAN =
  "A black Mercedes-Benz Sprinter luxury VIP PASSENGER van, high-roof long-wheelbase body, " +
  "glossy black paintwork, the same blacked-out Mercedes grille and dark alloy wheels as the " +
  "reference van, BUT configured as a passenger minibus with a row of large tinted privacy " +
  "windows along the side. Keep it clearly a premium people-mover, not a windowless cargo van.";
const SCENE =
  "parked on an old cobblestone forecourt in front of a grand Viennese baroque palace of pale " +
  "limestone with ornate columns, at warm golden hour. Long soft shadows, deep glossy " +
  "reflections, cinematic wide composition, 8K hyper-realistic professional automotive " +
  "photography, natural colour grade. An empty calm scene, no people, no readable licence " +
  "plate, no added text.";

const jobs = [
  {
    output: "scripts/_raw/vip-ext-front.jpg",
    aspectRatio: "3:2",
    imageSize: "2K",
    quality: "hero",
    references: EXT_REFS,
    prompt: `${VAN} Photograph it in a three-quarter FRONT view from a low cinematic angle, ${SCENE} The van sits centre-right leaving open facade on the left for a headline.`,
  },
  {
    output: "scripts/_raw/vip-ext-side.jpg",
    aspectRatio: "4:3",
    imageSize: "2K",
    quality: "hero",
    references: EXT_REFS,
    prompt: `${VAN} Photograph it in a three-quarter view from the SIDE-REAR showing the full length of the tinted passenger windows and the sliding door, ${SCENE}`,
  },
  {
    output: "scripts/_raw/vip-int-portrait.jpg",
    aspectRatio: "3:4",
    imageSize: "2K",
    quality: "hero",
    references: INT_REFS,
    prompt:
      "A vertical portrait interior photograph looking down the cabin of a luxury VIP Mercedes " +
      "Sprinter conversion, matching the reference interiors exactly: black-and-cream two-tone " +
      "quilted leather captain's chairs facing each other, wood-look flooring, cool blue and " +
      "purple ambient LED strip lighting along the ceiling and sills, beige curtains on the " +
      "windows, fold-out tables with cupholders. Rich, glamorous, cinematic mood, 8K " +
      "hyper-realistic, no people, no added text.",
  },
];

mkdirSync("scripts/_raw", { recursive: true });
for (const [i, job] of jobs.entries()) {
  console.log(`[${i + 1}/${jobs.length}] ${job.output} ...`);
  try {
    await generateWithReferences(job);
    console.log("   done");
  } catch (e) {
    console.error("   FAILED:", e?.message || e);
  }
}
console.log("vip generation attempted");
