import { Browser, Page } from "puppeteer";
import { grab } from "./catcher";
import { ENVIRONMENTS } from "./constants/urls";

export async function spawnPages(browser: Browser, dragons: Map<string, string>) {
  for (const [env_name, env_url] of ENVIRONMENTS) {
    const page: Page = await browser.newPage();
    await page.goto(env_url, {
      waitUntil: "networkidle0",
      timeout: 0,
    });
    console.info(`${new Date().toLocaleString()} - Loaded environment: ${env_name}`);
    loop(browser, page, dragons);
  }
}

async function loop(browser: Browser, page: any, dragons: Map<string, string>) {
  try {
    await grab(browser, page, dragons);
    await page.reload({
      waitUntil: "networkidle0",
      timeout: 0,
    });
  } finally {
    loop(browser, page, dragons);
  }
}
