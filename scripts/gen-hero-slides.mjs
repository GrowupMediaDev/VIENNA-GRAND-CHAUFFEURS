import { generateWithReferences } from "/Users/robiu/.claude-work/skills/nano-banana-codegen/lib/nano-banana.js";

const REF = ["public/images/hero-home.jpg"];
const STYLE =
  "Match the reference photograph's exact look: warm golden-hour sunlight, a grand " +
  "Viennese baroque palace of pale limestone with ornate columns as the backdrop, " +
  "old cobblestone forecourt, cinematic wide-angle composition, deep glossy reflections " +
  "on black paintwork, 8K hyper-realistic professional automotive photography, natural " +
  "colour grade. No text, no readable licence plate, no logos other than the Mercedes star.";

const jobs = [
  {
    output: "public/images/hero-slide-2.jpg",
    aspectRatio: "16:9",
    imageSize: "2K",
    quality: "hero",
    references: REF,
    prompt:
      "A brand-new black Mercedes-Benz S-Class luxury sedan, glossy black paint, " +
      "photographed in a three-quarter front view from a low cinematic angle, parked on " +
      "the cobblestone forecourt of a grand Viennese baroque palace at golden hour. The car " +
      "sits on the right third of the frame leaving open sky and facade on the left for text. " +
      "An empty, calm scene with no people. " + STYLE,
  },
  {
    output: "public/images/hero-slide-3.jpg",
    aspectRatio: "16:9",
    imageSize: "2K",
    quality: "hero",
    references: REF,
    prompt:
      "A black Mercedes-Benz V-Class luxury van (people mover), glossy black paint, " +
      "photographed in a three-quarter side view, parked in the elegant courtyard of a " +
      "Viennese baroque palace at golden hour, warm sunlight on the stone facade behind it, " +
      "long soft shadows across the cobblestones. An empty, calm scene with no people, the " +
      "van positioned centre-right leaving room on the left for a headline. " + STYLE,
  },
];

for (const [i, job] of jobs.entries()) {
  console.log(`[${i + 1}/${jobs.length}] generating ${job.output} ...`);
  try {
    await generateWithReferences(job);
    console.log(`   done: ${job.output}`);
  } catch (e) {
    console.error(`   FAILED ${job.output}:`, e?.message || e);
  }
}
console.log("all hero slides attempted");
