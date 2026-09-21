// Renders every raster brand asset from the vector sources in the repo.
//
// Run it after changing app/icon.svg or public/brand/horizon-wordmark.svg.
// Nothing in the site imports this file and it is not part of the build, so
// the renderer is installed for the one run and taken straight back out —
// package.json and the lockfile end up exactly as they started:
//
//   pnpm add -D puppeteer-core
//   node scripts/render-brand-assets.mjs
//   pnpm remove puppeteer-core
//   git status          # check what changed, then commit the PNGs
//
// It needs Chrome on the machine. It looks in the usual places; set CHROME to
// the binary if it is somewhere else.
//
// See docs/BRAND-ASSETS.md for what each output is for.
//
// Why a browser and not an image library: the sources are SVG, and the only
// SVG renderer available here is the same engine that will draw the icon for
// real. Every size below is rendered natively at that size rather than
// resampled down from one big bitmap, so the small ones get the renderer's own
// hinting instead of resampling mush — which is the whole point at 16px.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const p = (...bits) => join(ROOT, ...bits);

// The brand ground, from tailwind.config.ts (night-950).
const GROUND = '#17061D';

// Chrome, wherever it lives. Override with CHROME=/path/to/chrome.
const CHROME =
  process.env.CHROME ??
  [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
  ].find(Boolean);

/**
 * One square icon: the mark at `scale` of the width, optionally on the brand
 * ground. `scale` is what keeps a maskable icon inside Android's safe circle.
 */
function squarePage(markSvg, size, { scale, background }) {
  const inset = ((1 - scale) / 2) * 100;
  return `<!doctype html><meta charset="utf-8"><style>
    html,body{margin:0;padding:0}
    body{width:${size}px;height:${size}px;overflow:hidden;
         background:${background ?? 'transparent'}}
    .m{position:absolute;inset:${inset}%}
    .m svg{width:100%;height:100%;display:block}
  </style><div class="m">${markSvg}</div>`;
}

/** The link-preview card. Same furniture as the hero, laid out for 1200×630. */
function cardPage(wordmarkSvg) {
  return `<!doctype html><meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&family=JetBrains+Mono:wght@500&display=swap">
  <style>
    html,body{margin:0;padding:0}
    body{width:1200px;height:630px;overflow:hidden;position:relative;
         background:${GROUND};font-family:'Jost',system-ui,sans-serif}
    /* Light rising off the horizon, the site's one atmospheric move. */
    .glow{position:absolute;inset:auto 0 0 0;height:440px;
      background:radial-gradient(52% 78% at 50% 100%,
        rgb(248 106 67 / .34), rgb(177 56 72 / .13) 48%, transparent 74%)}
    .hill{position:absolute;inset:auto 0 0 0;height:150px}
    .hill svg{position:absolute;inset:auto 0 0 0;width:100%;height:100%}
    .stack{position:absolute;inset:0;display:flex;flex-direction:column;
           align-items:center;justify-content:center;padding-bottom:104px}
    .eyebrow{font-family:'JetBrains Mono',monospace;font-size:19px;font-weight:500;
             letter-spacing:.2em;text-transform:uppercase;color:#FFCB5C;margin:0}
    .mark{margin-top:38px;width:620px}
    .mark svg{width:100%;height:auto;display:block}
    .tag{margin:34px 0 0;font-size:34px;font-weight:300;letter-spacing:-.01em;color:#FAF6FB}
  </style>
  <div class="glow"></div>
  <div class="hill">
    <svg viewBox="0 0 1200 150" preserveAspectRatio="none">
      <defs>
        <linearGradient id="h" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#B13848" stop-opacity="0"/>
          <stop offset=".2" stop-color="#B13848" stop-opacity=".8"/>
          <stop offset=".5" stop-color="#FF884F"/>
          <stop offset=".8" stop-color="#B13848" stop-opacity=".8"/>
          <stop offset="1" stop-color="#B13848" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path fill="#0E0312" d="M0 96 C 260 52 460 34 600 34 C 740 34 940 52 1200 96 L1200 150 L0 150 Z"/>
      <path fill="none" stroke="url(#h)" stroke-width="3" vector-effect="non-scaling-stroke"
            d="M0 96 C 260 52 460 34 600 34 C 740 34 940 52 1200 96"/>
    </svg>
  </div>
  <div class="stack">
    <p class="eyebrow">FIRST Tech Challenge &middot; Team 36596 &middot; Portland, Oregon</p>
    <div class="mark">${wordmarkSvg}</div>
    <p class="tag">Building towards what&rsquo;s next</p>
  </div>`;
}

async function shoot(
  browser,
  html,
  size,
  { transparent = false, jpeg = false } = {},
) {
  const page = await browser.newPage();
  await page.setViewport({
    width: size.w,
    height: size.h,
    deviceScaleFactor: 1,
  });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const buf = await page.screenshot({
    omitBackground: transparent,
    type: jpeg ? 'jpeg' : 'png',
    ...(jpeg ? { quality: 88 } : {}),
  });
  await page.close();
  return buf;
}

/**
 * Pack native renders into one .ico.
 *
 * 32-bit BGRA, bottom-up, each with the 1bpp AND mask the format still
 * requires. Deliberately not PNG-in-ICO: this file exists for the browsers
 * that ignore the SVG, so it uses the encoding every one of them has always
 * read.
 */
function packIco(entries) {
  const dir = Buffer.alloc(6 + entries.length * 16);
  dir.writeUInt16LE(0, 0); // reserved
  dir.writeUInt16LE(1, 2); // type: icon
  dir.writeUInt16LE(entries.length, 4);

  const payloads = [];
  let offset = dir.length;

  entries.forEach(({ size, rgba }, i) => {
    const rowMask = Math.ceil(size / 32) * 4; // AND mask rows pad to 4 bytes
    const header = Buffer.alloc(40);
    header.writeUInt32LE(40, 0); // header size
    header.writeInt32LE(size, 4); // width
    header.writeInt32LE(size * 2, 8); // height: image + mask
    header.writeUInt16LE(1, 12); // planes
    header.writeUInt16LE(32, 14); // bits per pixel
    header.writeUInt32LE(0, 16); // BI_RGB
    header.writeUInt32LE(size * size * 4 + rowMask * size, 20);

    const pixels = Buffer.alloc(size * size * 4);
    for (let y = 0; y < size; y++) {
      // Bottom-up.
      const src = (size - 1 - y) * size * 4;
      for (let x = 0; x < size; x++) {
        const s = src + x * 4;
        const d = (y * size + x) * 4;
        pixels[d] = rgba[s + 2]; // B
        pixels[d + 1] = rgba[s + 1]; // G
        pixels[d + 2] = rgba[s]; // R
        pixels[d + 3] = rgba[s + 3]; // A
      }
    }

    // Fully transparent everywhere: the alpha channel above is what modern
    // renderers use, and a zeroed mask is what the old ones expect to see.
    const mask = Buffer.alloc(rowMask * size, 0);
    const body = Buffer.concat([header, pixels, mask]);

    const e = 6 + i * 16;
    dir.writeUInt8(size === 256 ? 0 : size, e);
    dir.writeUInt8(size === 256 ? 0 : size, e + 1);
    dir.writeUInt8(0, e + 2); // palette
    dir.writeUInt8(0, e + 3); // reserved
    dir.writeUInt16LE(1, e + 4); // planes
    dir.writeUInt16LE(32, e + 6); // bpp
    dir.writeUInt32LE(body.length, e + 8);
    dir.writeUInt32LE(offset, e + 12);

    offset += body.length;
    payloads.push(body);
  });

  return Buffer.concat([dir, ...payloads]);
}

/** Read a screenshot back out as raw RGBA, using the browser's own decoder. */
async function toRgba(browser, png, size) {
  const page = await browser.newPage();
  const data = await page.evaluate(
    async (b64, s) => {
      const img = new Image();
      img.src = 'data:image/png;base64,' + b64;
      await img.decode();
      const c = document.createElement('canvas');
      c.width = s;
      c.height = s;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);
      return Array.from(ctx.getImageData(0, 0, s, s).data);
    },
    Buffer.from(png).toString('base64'),
    size,
  );
  await page.close();
  return Buffer.from(data);
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
});

const markSvg = await readFile(p('app', 'icon.svg'), 'utf8');
const wordmarkSvg = await readFile(
  p('public', 'brand', 'horizon-wordmark.svg'),
  'utf8',
);

await mkdir(p('public', 'icons'), { recursive: true });
const wrote = [];

// 1. favicon.ico — the transparent mark, native at each size.
const icoSizes = [16, 24, 32, 48];
const icoEntries = [];
for (const size of icoSizes) {
  const png = await shoot(
    browser,
    squarePage(markSvg, size, { scale: 1 }),
    { w: size, h: size },
    { transparent: true },
  );
  icoEntries.push({ size, rgba: await toRgba(browser, png, size) });
}
await writeFile(p('app', 'favicon.ico'), packIco(icoEntries));
wrote.push(`app/favicon.ico  ${icoSizes.join(', ')}`);

// 2. Square icons on the brand ground. iOS and Android both draw these inside
//    their own rounded shape, so the mark is inset rather than bleeding out.
const squares = [
  { file: ['app', 'apple-icon.png'], size: 180, scale: 0.76 },
  { file: ['public', 'icons', 'icon-192.png'], size: 192, scale: 0.76 },
  { file: ['public', 'icons', 'icon-512.png'], size: 512, scale: 0.76 },
  // Maskable: Android crops to any shape inside the central 80% circle, so the
  // mark has to fit that circle, not the square.
  {
    file: ['public', 'icons', 'icon-maskable-512.png'],
    size: 512,
    scale: 0.54,
  },
];
for (const { file, size, scale } of squares) {
  const png = await shoot(
    browser,
    squarePage(markSvg, size, { scale, background: GROUND }),
    { w: size, h: size },
  );
  await writeFile(p(...file), png);
  wrote.push(`${file.join('/')}  ${size}×${size}`);
}

// 3. The link-preview card.
const card = await shoot(
  browser,
  cardPage(wordmarkSvg),
  { w: 1200, h: 630 },
  { jpeg: true },
);
await writeFile(p('app', 'opengraph-image.jpg'), card);
wrote.push(
  `app/opengraph-image.jpg  1200×630  ${Math.round(card.length / 1024)} KB`,
);

await browser.close();
console.log(wrote.map((l) => '  ' + l).join('\n'));
