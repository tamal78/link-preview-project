// Script Using Puppeteer

const puppeteer = require('puppeteer');

async function fetchPageData(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });
    const data = await page.evaluate(() => {
      return {
        title: document.title,
        url: window.location.href,
        description: document.querySelector('meta[name="description"]')?.content
      };
    });

    console.log(`Data for ${url}:`, data);
  } catch (error) {
    console.error(`Error fetching data for ${url}:`, error.message);
  } finally {
    await browser.close();
  }
}

const urls = [
  ' https://www.instagram.com/artcartbydiksha/',
  ' https://medium.com/@dr-bartosz-jaworski'
];

// Fetch previews for each URL
urls.forEach(fetchPageData);
