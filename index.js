const { getLinkPreview } = require('link-preview-js');
const fetch = async () => (await import('node-fetch')).default;

// Custom fetch
const customFetch = async (url, options) => {
  const fetchModule = await fetch();
  const customOptions = {
    ...options,
    headers: {
      ...options.headers,
      'User-Agent':
        'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
    }
  };
  return fetchModule(url, customOptions);
};
//link preview
const fetchPreview = async url => {
  try {
    const data = await getLinkPreview(url, { fetch: customFetch });
    console.log(`Preview for ${url}:`, data);
  } catch (error) {
    console.error(`Error fetching preview for ${url}:`, error.message);
  }
};

const urls = [
  ' https://www.instagram.com/artcartbydiksha/',
  ' https://medium.com/@dr-bartosz-jaworski'
];

urls.forEach(fetchPreview);
