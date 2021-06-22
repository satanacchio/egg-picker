import { Browser, launch } from "puppeteer";
import { readDragons } from "./src/app/constants/dragons";
import { login } from "./src/app/login";
import { spawnPages } from "./src/app/pages";

async function main() {
    try {
        console.info(`${new Date().toLocaleString()} - Start`);
        const dragons: Map<string, string> = readDragons();
        const browser: Browser = await launch();
        await login(browser);
        await spawnPages(browser, dragons);
    } catch (error) {
        console.error(`${new Date().toLocaleString()} - ${error}`);
        process.exit();
    }
}

main();