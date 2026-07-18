import sharp from "sharp";
import { writeFileSync } from "fs";

const OUT = "public/images/fahrzeuge";
const q = { quality: 82, mozjpeg: true };

// [src, dest, width, height]
const jobs = [
  // generated exteriors
  ["scripts/_raw/vip-ext-front.jpg", `${OUT}/vip-minibus-hero.jpg`, 2000, 1493],
  ["scripts/_raw/vip-ext-front.jpg", `${OUT}/card-vip-minibus.jpg`, 1400, 1400],
  ["scripts/_raw/vip-ext-side.jpg", `${OUT}/ueberblick-vip-minibus.jpg`, 1800, 1344],
  // generated portrait interior (vorteil)
  ["scripts/_raw/vip-int-portrait.jpg", `${OUT}/vorteil-vip-minibus.jpg`, 1792, 2400],
  // real interior photos → gallery
  ["scripts/_vip/vip-7.jpg", `${OUT}/vip-minibus-gal-1.jpg`, 2000, 1493], // wide overview + tables
  ["scripts/_vip/vip-11.jpg", `${OUT}/vip-minibus-gal-2.jpg`, 2000, 1493], // captain seat rows
  ["scripts/_vip/vip-5.jpg", `${OUT}/vip-minibus-gal-3.jpg`, 2000, 1493], // entertainment screen
  ["scripts/_vip/vip-8.jpg", `${OUT}/vip-minibus-gal-4.jpg`, 2000, 1493], // wide cabin (kabineBg)
  ["scripts/_vip/vip-12.jpg", `${OUT}/vip-minibus-gal-5.jpg`, 2000, 1493], // seat + fold-out table
];

for (const [src, dest, w, h] of jobs) {
  const buf = await sharp(src).resize(w, h, { fit: "cover", position: "centre" }).jpeg(q).toBuffer();
  writeFileSync(dest, buf);
  console.log(`${dest}  ${w}x${h}  ${(buf.length / 1024) | 0}KB`);
}
console.log("vip assets written");
