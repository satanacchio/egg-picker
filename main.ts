import { Browser, launch } from "puppeteer";
import { readDragons } from "./src/constants/dragons";
import { login } from "./src/login";
import { spawnPages } from "./src/pages";

async function main() {
  try {
    console.info(`${new Date().toLocaleString()} - Start`);
    const dragons: Map<string, string> = readDragons();
    const browser: Browser = await launch();
    await login(browser);
    await spawnPages(browser, dragons);
  } catch (error) {
    console.error(`${new Date().toLocaleString()} - ${error}`);
    process.exit(1);
  }
}

main();
