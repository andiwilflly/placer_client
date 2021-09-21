import puppeteer from 'puppeteer-extra';
// import * as StealthPlugin from 'puppeteer-extra-plugin-stealth';
// import * as anon from 'puppeteer-extra-plugin-anonymize-ua';

// puppeteer.use(StealthPlugin());
// puppeteer.use(anon());
// import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';

// puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

export default async function setupBrowser() {
  return await puppeteer.launch({
    headless: true,
    devtools: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      // '--single-process', // <- this one doesn't works in Windows
      '--disable-gpu',
    ], // same
  });
}
