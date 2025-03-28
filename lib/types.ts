import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface Article {
  id?: string;
  slug: string;
  title: string;
  description: string;
  content: string | MDXRemoteSerializeResult;
  url?: string;
  imageUrl?: string;
  source?: string;
  date: string;
  categories?: string[];
  tags?: string[];
}

export interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
}

export interface MarketSentiment {
  value: number;
  classification: 'Extreme Fear' | 'Fear' | 'Neutral' | 'Greed' | 'Extreme Greed';
  timestamp: string;
}