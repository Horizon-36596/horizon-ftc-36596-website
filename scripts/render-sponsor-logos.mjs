// Renders every sponsor logo as a white PNG on a transparent background, for
// merch and anything else printed on a dark ground.
//
// The paths come from components/sponsorLogoData.ts, the same file the site
// draws the logo wall from, so the merch and the website can never disagree
// about what a sponsor's mark looks like. Like render-brand-assets.mjs, the
// renderer is installed for the one run and taken straight back out:
//
//   pnpm add -D puppeteer-core
//   node --experimental-strip-types scripts/render-sponsor-logos.mjs
//   pnpm remove puppeteer-core
//
// Output: merch/sponsor-logos-white/<key>.png, 3000 px on the longest side of
// the mark plus a small transparent margin.
//
// Marks drawn in more than one tone (Protocase) keep their tints as partial
// transparency. That prints correctly with DTF or DTG; a screen printer will
// want those areas as a halftone.

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';
import { LOGOS } from '../components/sponsorLogoData.ts';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'merch', 'sponsor-logos-white');

const LONGEST = 3000;
const MARGIN = 90;

const CHROME =
  process.env.CHROME ??
  [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
  ].find(Boolean);

function svgFor(mark) {
  const [, , vw, vh] = mark.viewBox.split(/\s+/).map(Number);
  const scale = LONGEST / Math.max(vw, vh);
  const w = Math.round(vw * scale);
  const h = Math.round(vh * scale);
  const paths = (Array.isArray(mark.path) ? mark.path : [mark.path])
    .map((p) => {
      const d = typeof p === 'string' ? p : p.d;
      const opacity =
        typeof p === 'string' ? '' : ` fill-opacity="${p.opacity}"`;
      const rule = mark.fillRule ? ` fill-rule="${mark.fillRule}"` : '';
      return `<path d="${d}" fill="#FFFFFF"${opacity}${rule}/>`;
    })
    .join('');
  return {
    w: w + MARGIN * 2,
    h: h + MARGIN * 2,
    html: `<!doctype html><style>html,body{margin:0;background:transparent}</style>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="${mark.viewBox}"
           width="${w}" height="${h}" style="display:block;margin:${MARGIN}px">${paths}</svg>`,
  };
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
});
await mkdir(OUT, { recursive: true });

for (const [key, mark] of Object.entries(LOGOS)) {
  const { w, h, html } = svgFor(mark);
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load' });
  const png = await page.screenshot({ omitBackground: true, type: 'png' });
  await page.close();
  await writeFile(join(OUT, `${key}.png`), png);
  console.log(`  merch/sponsor-logos-white/${key}.png  ${w}×${h}`);
}

await browser.close();
