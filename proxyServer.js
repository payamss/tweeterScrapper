'use strict';

const puppeteer = require('puppeteer');
(async () => {
  const username = '';
  const password = '';

  const browser = await puppeteer.launch({
    
      args: ['--start-maximized',
      '--proxy-server=socks5://localhost:3128'
      
    ],headless:false
  });

  const page = await browser.newPage();

  await page.authenticate({
    username,
    password,
  });

  await page.goto('http://www.ip2nation.com/');

  await browser.close();
})();