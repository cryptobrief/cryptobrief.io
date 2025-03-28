require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');
const { marked } = require('marked');

const CACHE_FILE = path.join(__dirname, '../.cache/news.json');
const OUTPUT_DIR = path.join(__dirname, '../content/articles');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

marked.setOptions({
  headerIds: true,
  gfm: true,
});

async function processArticle({ title, content }) {
  const html = marked(content || '');

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `You’re a skilled crypto journalist writing for CryptoBrief.io. Rewrite this article using semantic HTML (without <html>, <head>, <body>). Use <p>, <h2>, <section>, etc. Keep the tone professional but accessible. Include market analysis and future implications.`,
      },
      {
        role: 'user',
        content: html,
      },
    ],
  });

  return response.choices[0].message.content;
}

async function main() {
  const raw = fs.readFileSync(CACHE_FILE, 'utf8');
  const articles = JSON.parse(raw);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const article of articles.slice(0, 5)) { // limit to 5 per run
    try {
      const rewritten = await processArticle(article);
      const slug = article.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const mdx = `---
title: "${article.title}"
date: "${new Date().toISOString().split('T')[0]}"
description: "${article.summary || article.title}"
categories: ["Cryptocurrency"]
tags: ["News", "Crypto"]
---

${rewritten}`;

      fs.writeFileSync(path.join(OUTPUT_DIR, `${slug}.mdx`), mdx, 'utf8');
      console.log(`✅ Generated: ${slug}.mdx`);
    } catch (error) {
      console.error(`❌ Failed to process: ${article.title}`, error.message);
    }
  }
}

main();
