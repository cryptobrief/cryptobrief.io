require('dotenv').config();

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { OpenAI } = require('openai');
const readline = require('readline');
const { marked } = require('marked');

// Initialize OpenAI with API key from .env file
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Configure marked for HTML output
marked.setOptions({
  headerIds: true,
  gfm: true,
});

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function processArticle(inputPath) {
  try {
    // Read the input file
    const fileContent = fs.readFileSync(inputPath, 'utf8');
    
    // Extract title and content
    const titleMatch = fileContent.match(/Title: (.*)/);
    const title = titleMatch ? titleMatch[1] : '';
    const content = fileContent.split('\n\n').slice(1).join('\n\n');

    // Use GPT to enhance the content
    const contentResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You're a skilled crypto journalist writing for CryptoBrief.io. Write the article using semantic HTML elements, but DO NOT include any html, head, or body tags. Follow these rules:
          1. Start with a clear introduction wrapped in <p> tags
          2. Use proper heading hierarchy (<h2>, <h3>) for sections
          3. Wrap paragraphs in <p> tags
          4. Use semantic elements like <section>, <article>, and <aside> where appropriate
          5. DO NOT include <!DOCTYPE>, <html>, <head>, or <body> tags
          6. Keep the tone professional but accessible
          7. Include market analysis and future implications sections`
        },
        {
          role: 'user',
          content: `Convert this content to properly formatted HTML:\n\n${content}`
        }
      ],
    });

    const enhancedContent = contentResponse.choices[0].message.content;

    // Create the MDX frontmatter
    const today = new Date().toISOString().split('T')[0];
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const mdxContent = `---
title: "${title}"
date: "${today}"
description: "${content.split('\n')[0]}"
categories: ["Cryptocurrency", "Market Analysis", "Technology"]
tags: ["Market Update", "Analysis", "Trends"]
---

${enhancedContent}`;

    // Save the MDX file
    const outputDir = path.join(process.cwd(), 'content/articles');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const outputPath = path.join(outputDir, `${slug}.mdx`);
    
    fs.writeFileSync(outputPath, mdxContent, 'utf8');
    console.log(`Article saved as: ${outputPath}`);

    return { title, slug };
  } catch (error) {
    console.error('Error processing article:', error);
    throw error;
  }
}

// Main execution
async function main() {
  try {
    const inputPath = path.join(process.cwd(), 'test-article.txt');
    const result = await processArticle(inputPath);
    console.log('Article processed successfully:', result);
    rl.close();
  } catch (error) {
    console.error('Failed to process article:', error);
    rl.close();
    process.exit(1);
  }
}

main();