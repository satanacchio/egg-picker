import { Browser, Page } from 'puppeteer';
import { LOGIN_URL } from './constants/urls';
import { LOGIN_FAIL } from './constants/util';

export async function login(browser: Browser) {
    const page: Page = await browser.newPage();
    await page.goto(LOGIN_URL, {
        waitUntil: 'networkidle0',
        timeout: 0
    });
    await page.type('input[name=username]', process.env.npm_config_username);
    await page.type('input[name=password]', process.env.npm_config_password);
    await page.focus('input[name=password]');
    await page.keyboard.press('Enter');
    await page.waitForNavigation({
        waitUntil: 'networkidle0',
        timeout: 0
    });
    if (await page.url() === LOGIN_URL) {
        throw LOGIN_FAIL;
    }
    console.info(`${new Date()} - Logged in`);
    await page.close();
}








