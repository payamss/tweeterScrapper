'use strict';

const puppeteer = require('puppeteer');
(async () => {
  const username = '';
  const password = '';

  const browser = await puppeteer.launch({
    args: [
        
      
    ],headless:false
  });

  const page = await browser.newPage();

  await page.authenticate({
    username,
    password,
  });

  await page.goto('https://www.google.com/');

  await browser.close();
})();