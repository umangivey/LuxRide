// Visual check tool: boots the Vite dev server, opens a page in headless Chromium
// (software WebGL), runs optional steps and saves screenshots. Console errors are printed
// so a broken shader or exception shows up in the terminal.
//
// Usage:
//   node scripts/shoot.mjs <url-path> <out.png> [--size 1280x800] [--wait 1500] [--eval "js"]...
// Several shots in one run:
//   node scripts/shoot.mjs --plan shots.json
//   shots.json: [{ "path": "/#3d", "out": "shots/a.png", "wait": 2000, "eval": ["..."], "size": "1280x800" }]

import { chromium } from 'playwright';
import { createServer } from 'vite';
import { readFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const args = process.argv.slice(2);
let plan = [];
if (args[0] === '--plan') {
  plan = JSON.parse(readFileSync(args[1], 'utf8'));
} else {
  const shot = { path: args[0] ?? '/', out: args[1] ?? 'shots/shot.png', eval: [] };
  for (let i = 2; i < args.length; i++) {
    if (args[i] === '--size') shot.size = args[++i];
    else if (args[i] === '--wait') shot.wait = Number(args[++i]);
    else if (args[i] === '--eval') shot.eval.push(args[++i]);
  }
  plan = [shot];
}

const server = await createServer({ server: { port: 5199, host: '127.0.0.1' }, logLevel: 'error' });
await server.listen();
const base = 'http://127.0.0.1:5199';

const executablePath = process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const browser = await chromium.launch({
  executablePath,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});

let failures = 0;
for (const shot of plan) {
  const [w, h] = (shot.size ?? '1280x800').split('x').map(Number);
  const page = await browser.newPage({ viewport: { width: w, height: h }, colorScheme: shot.dark ? 'dark' : 'light' });
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning' || process.env.SHOOT_LOG) console.log(`[${m.type()}] ${m.text()}`);
  });
  page.on('pageerror', (e) => {
    failures++;
    console.log(`[pageerror] ${e.message}`);
  });
  await page.goto(base + shot.path, { waitUntil: 'load' });
  await page.waitForTimeout(shot.wait ?? 1500);
  for (const js of shot.eval ?? []) {
    const r = await page.evaluate(js);
    if (r !== undefined) console.log('[eval]', JSON.stringify(r));
    await page.waitForTimeout(shot.evalWait ?? 400);
  }
  mkdirSync(dirname(shot.out), { recursive: true });
  await page.screenshot({ path: shot.out });
  console.log('saved', shot.out);
  await page.close();
}

await browser.close();
await server.close();
process.exit(failures ? 1 : 0);
