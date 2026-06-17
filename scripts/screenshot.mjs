import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.SHOT_BASE || "http://localhost:3000";
const LABEL = process.env.SHOT_LABEL || "before";
const OUT = `/tmp/shots/${LABEL}`;
mkdirSync(OUT, { recursive: true });

const pages = [
  ["home", "/"],
  ["about", "/about"],
  ["memberships", "/memberships"],
  ["spa", "/spa"],
  ["rules", "/rules"],
  ["faq", "/faq"],
  ["contact", "/contact"],
  ["privacy", "/privacy"],
  ["terms", "/terms"],
  ["media-policy", "/media-policy"]
];

const viewports = [
  ["desktop", 1440, 900],
  ["mobile", 390, 844]
];

const browser = await chromium.launch();
for (const [vpName, w, h] of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: vpName === "mobile" ? 2 : 1
  });
  const page = await ctx.newPage();
  for (const [name, path] of pages) {
    const url = `${BASE}${path}`;
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
      // Scroll through the page so IntersectionObserver reveals fire and lazy
      // images load, then return to top before capturing full page.
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let y = 0;
          const step = () => {
            window.scrollTo(0, y);
            y += window.innerHeight * 0.8;
            if (y < document.body.scrollHeight) {
              setTimeout(step, 60);
            } else {
              window.scrollTo(0, document.body.scrollHeight);
              setTimeout(resolve, 250);
            }
          };
          step();
        });
      });
      await page.waitForTimeout(400);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      await page.screenshot({ path: `${OUT}/${name}-${vpName}.png`, fullPage: true });
      console.log(`✓ ${name} ${vpName}`);
    } catch (e) {
      console.log(`✗ ${name} ${vpName}: ${e.message}`);
    }
  }
  await ctx.close();
}
await browser.close();
console.log(`Done → ${OUT}`);
