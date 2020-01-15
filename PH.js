const puppeteer = require('puppeteer');

(async () => {
        // prepare for headless chrome
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // set user agent (override the default headless User Agent)
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.0 Safari/537.36');

        // go to Google home page
        await page.goto('https://google.com');

        // get the User Agent on the context of Puppeteer
        const userAgent = await page.evaluate(() => navigator.userAgent );

        // If everything correct then no 'HeadlessChrome' sub string on userAgent
        console.log(userAgent);

        await browser.close();
})();