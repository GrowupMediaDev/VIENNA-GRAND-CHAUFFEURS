import sharp from "sharp";

const OUT = "public/images/fahrzeuge";
const q = { quality: 82, mozjpeg: true };

// [src, dest, width, height]
const jobs = [
  // exteriors (generated)
  ["scripts/_raw/maybach-ext-front.jpg", `${OUT}/maybach-gal-1.jpg`, 2000, 1493],
  ["scripts/_raw/maybach-ext-front.jpg", `${OUT}/card-maybach.jpg`, 1400, 1400],
  ["scripts/_raw/maybach-ext-rear.jpg", `${OUT}/maybach-gal-2.jpg`, 2000, 1493],
  ["scripts/_raw/maybach-ext-rear.jpg", `${OUT}/ueberblick-maybach.jpg`, 1800, 1344],
  // interiors (real photos)
  ["maybach/DGM_2849-1.webp", `${OUT}/maybach-gal-3.jpg`, 2000, 1493],
  ["maybach/DGM_2770.webp", `${OUT}/maybach-gal-4.jpg`, 2000, 1493],
  ["maybach/DGM_2798.webp", `${OUT}/maybach-gal-5.jpg`, 2000, 1493],
  // vorteil portrait (generated)
  ["scripts/_raw/maybach-int-portrait.jpg", `${OUT}/vorteil-maybach.jpg`, 1792, 2400],
];

for (const [src, dest, w, h] of jobs) {
  const buf = await sharp(src)
    .resize(w, h, { fit: "cover", position: "centre" })
    .jpeg(q)
    .toBuffer();
  const { writeFileSync } = await import("fs");
  writeFileSync(dest, buf);
  console.log(`${dest}  ${w}x${h}  ${(buf.length / 1024) | 0}KB`);
}
console.log("maybach assets written");
