const puppeteer = require('puppeteer');
const fs =require('fs-extra');
console.clear();
var proxyEnable=false;
var headlessVal=true;
(async function main() {
    try {
        let browser;
        if (proxyEnable) {
             browser = await puppeteer.launch(    
                {args: ['--start-maximized','--proxy-server=socks5://localhost:3128'],headless:headlessVal});
        } else {
             browser = await puppeteer.launch({headless:headlessVal});
        }
        
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.0 Safari/537.36');
        await page.goto('https://twitter.com/payamss')
        //await page.goto('https://twitter.com/explore')
        await page.waitForSelector('p.TweetTextSize');
        console.log("showing");
        await fs.writeFile('Out.csv','TCount,AllTweets\n');
        const tweets =await page.evaluate(()=>
        Array.from(document.querySelectorAll("p.TweetTextSize")).map((partner)=>partner.innerText.trim())
        );
        for (let i = 0; i < tweets.length; i++) {
            const element = i+'- '+ tweets[i];
            console.log(element);
            await fs.appendFile('Out.csv',`"${i}","${tweets[i]}"\n`);
        }

        // const tweets =await page.$$('p.TweetTextSize')
        // console.log(tweets.length)
        // for (let i = 0; i < tweets.length; i++) {
        //     const tweet = tweets[i];
        //     const txt=await tweet.getProperty('textContent')
        //     console.log(txt)
        // }
        console.log("done");
       await browser.close();

    } catch (e) {
        console.log("catch");
        console.log(e);
    }

})();
