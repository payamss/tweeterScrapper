const puppeteer = require('puppeteer');

(async () => {
    // set some options (set headless to false so we can see 
    // this automated browsing experience)
    let launchOptions = { headless: false, 
                          args: ['--start-maximized',
                                 '--proxy-server=socks4://96.9.77.192:55796'] // this is where we set the proxy
                        };

    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    // set viewport and user agent (just in case for nice viewing)
    await page.setViewport({width: 1366, height: 768});
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

    // go to whatismycountry.com to see if proxy works (based on geography location)
    await page.goto('https://whatismycountry.com');

    // close the browser
    // await browser.close();
})();