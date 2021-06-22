import { Browser, launch } from "puppeteer";
import { readDragons } from "./src/app/constants/dragons";
import { login } from "./src/app/login";
import { spawnPages } from "./src/app/pages";
const puppeteer = require('puppeteer-extra')
const adBlock = require('puppeteer-extra-plugin-adblocker')

async function main() {
    try {
        puppeteer.use(adBlock());
        console.info(`${new Date()} - Start`);
        const dragons: Map<string, string> = readDragons();
        const browser: Browser = await launch();
        await login(browser);
        await spawnPages(browser, dragons);
    } catch (error) {
        console.error(`${new Date()} - ${error}`);
        process.exit();
    }
}

main();



