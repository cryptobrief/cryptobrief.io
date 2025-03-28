export const runtime = 'edge';

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';
import { marked } from 'marked';

const OUTPUT_DIR = path.join(process.cwd(), 'content/articles');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const article = await req.json();

    if (!article.title || !article.content) {
      return NextResponse.json({ success: false, error: 'Missing title or content' }, { status: 400 });
    }

    // Convert raw markdown or plaintext to HTML
    const html = marked(article.content);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You’re a skilled crypto journalist writing for CryptoBrief.io. Rewrite this article using semantic HTML (no <html>, <body>). Use <p>, <h2>, <section>, etc. Keep the tone professional but accessible. Add analysis and future implications.`,
        },
        { role: 'user', content: html },
      ],
    });

    const rewritten = completion.choices[0].message.content;

    // Generate slug
    const slug = article.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const frontmatter = `---
title: "${article.title}"
date: "${new Date().toISOString().split('T')[0]}"
description: "${article.summary || article.title}"
categories: ["Cryptocurrency"]
tags: ["News", "Crypto"]
---
`;

    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    fs.writeFileSync(path.join(OUTPUT_DIR, `${slug}.mdx`), frontmatter + '\n' + rewritten, 'utf8');

    return NextResponse.json({ success: true, slug });
  } catch (err: any) {
    console.error('[APPROVE ERROR]', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
