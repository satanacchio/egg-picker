import { Browser, ElementHandle, Page } from "puppeteer";
import { OVERBURDENED, OVERBURDENED_INFO, TAKEN, TAKEN_INFO } from "./constants/util";

export async function grab(browser: Browser, page: Page, dragons: Map<string, string>) {
  const div: ElementHandle<Element> = await page.$(".eggs");
  const eggs = await div.$$eval("div", (nodes) =>
    nodes.map((childNode: any) => {
      return {
        url: childNode.firstChild.getAttribute("href"),
        description: childNode.innerText,
      };
    })
  );
  eggs.forEach(async (egg) => {
    const dragon = dragons.get(egg.description);
    if (dragon) {
      const newPage: Page = await browser.newPage();
      await newPage.goto(egg.url, {
        waitUntil: "networkidle0",
        timeout: 0,
      });
      const innerText = await newPage.$eval("p", (e) => e.innerHTML);
      switch (innerText) {
        case OVERBURDENED:
          console.error(`${new Date().toLocaleString()} - ${OVERBURDENED_INFO}`);
          break;
        case TAKEN:
          console.info(`${new Date().toLocaleString()} - ${TAKEN_INFO}`);
          break;
        default:
          console.info(`${new Date().toLocaleString()} - ${dragon} Egg acquired`);
          await newPage.screenshot({ path: `${Date.now()}.png` });
          break;
      }
      await newPage.close();
    }
  });
}
