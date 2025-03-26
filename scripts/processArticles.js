const axios = require('axios');
const xml2js = require('xml2js');
const { OpenAI } = require('openai');
const openai = new OpenAI({
  apiKey: 'YOUR_OPENAI_API_KEY',
});

const RSS_FEED_URL = 'https://rss.app/feeds/tlDFsJf2MSfigEaG.xml';

async function fetchRSS() {
  try {
    const response = await axios.get(RSS_FEED_URL);
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(response.data);
    const articles = result.rss.channel[0].item;
    return articles.map(item => ({
      title: item.title[0],
      link: item.link[0],
      description: item.description[0],
    }));
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
  }
}

async function rewriteArticle(content) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4', 
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: `Rewrite this article for a more engaging and concise style:\n\n${content}` },
    ],
  });

  return response.choices[0].message.content;
}

async function processArticles() {
  const articles = await fetchRSS();
  for (const article of articles) {
    console.log('Original:', article.title);
    console.log('Link:', article.link);
    console.log('Description:', article.description);
    
    const rewrittenContent = await rewriteArticle(article.description);
    console.log('Rewritten Content:', rewrittenContent);

    // Manually approve and publish, for now logging to the console
    const isApproved = confirm('Do you approve this content?'); // You can replace this with your manual process
    
    if (isApproved) {
      console.log('Publishing:', rewrittenContent);
    } else {
      console.log('Rejected:', rewrittenContent);
    }
  }
}

processArticles();
