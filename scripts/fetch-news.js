const axios = require('axios');
const cheerio = require('cheerio');
const RSSParser = require('rss-parser');
const fs = require('fs').promises;
const path = require('path');

const parser = new RSSParser();
const CACHE_FILE = path.join(__dirname, '../.cache/news.json');

async function fetchRSSFeeds() {
  const feeds = [
    'https://cointelegraph.com/rss',
    'https://decrypt.co/feed',
    'https://bitcoinmagazine.com/.rss/full/'
  ];

  const articles = [];

  for (const feed of feeds) {
    try {
      const feedData = await parser.parseURL(feed);
      
      for (const item of feedData.items) {
        articles.push({
          id: item.guid || item.link,
          title: item.title,
          summary: item.contentSnippet || '',
          content: item.content,
          url: item.link,
          source: feedData.title,
          publishedAt: item.pubDate,
          category: item.categories?.[0] || 'Cryptocurrency'
        });
      }
    } catch (error) {
      console.error(`Error fetching feed ${feed}:`, error.message);
    }
  }

  return articles;
}

async function ensureCacheDirectory() {
  const cacheDir = path.dirname(CACHE_FILE);
  try {
    await fs.mkdir(cacheDir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

async function main() {
  try {
    console.log('Fetching news articles...');
    const articles = await fetchRSSFeeds();
    
    await ensureCacheDirectory();
    await fs.writeFile(CACHE_FILE, JSON.stringify(articles, null, 2));
    
    console.log(`Successfully cached ${articles.length} articles`);
  } catch (error) {
    console.error('Error fetching news:', error);
    process.exit(1);
  }
}

main();