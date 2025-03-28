import type { Article } from './types';

// Mock data for edge runtime
const articles: Article[] = [
  {
    slug: 'bitcoin-atms-convenience-meets-risk',
    title: "Bitcoin ATMs: Convenience Meets Risk—Here's What You Need to Know",
    date: "2025-03-26",
    description: "Bitcoin ATMs offer easy crypto transactions, but beware of scams. Learn how to stay safe.",
    content: `
      <p>Bitcoin ATMs (BTMs) have become increasingly popular as a way to buy and sell cryptocurrency, but they come with both benefits and risks that users need to understand.</p>

      <h2>What are Bitcoin ATMs?</h2>
      <p>Bitcoin ATMs are kiosks that allow users to purchase Bitcoin and other cryptocurrencies using cash or debit cards. Unlike traditional ATMs, these machines don't dispense cash but instead facilitate the purchase of digital assets.</p>

      <h2>Benefits of Bitcoin ATMs</h2>
      <ul>
        <li>Convenience and accessibility</li>
        <li>Quick transactions</li>
        <li>No bank account required</li>
        <li>Privacy for small transactions</li>
      </ul>

      <h2>Risks and Considerations</h2>
      <p>While Bitcoin ATMs offer convenience, they come with several risks:</p>
      <ul>
        <li>Higher fees compared to online exchanges</li>
        <li>Potential for scams and fraud</li>
        <li>Limited consumer protection</li>
        <li>Transaction limits</li>
      </ul>

      <h2>Safety Tips</h2>
      <p>To protect yourself when using Bitcoin ATMs:</p>
      <ul>
        <li>Verify the ATM operator's legitimacy</li>
        <li>Double-check wallet addresses</li>
        <li>Keep transaction receipts</li>
        <li>Be aware of local regulations</li>
      </ul>
    `,
    categories: ["Bitcoin", "Scams", "Guides"],
    tags: ["Bitcoin ATM", "Crypto Scams", "Safety Tips"],
  },
  {
    slug: 'ethereum-layer-2-solutions-hit-new-milestone-with-10m-daily-transactions',
    title: "Ethereum Layer 2 Solutions Hit New Milestone with 10M Daily Transactions",
    date: "2025-03-27",
    description: "Ethereum's Layer 2 scaling solutions have reached a significant milestone, collectively processing over 10 million daily transactions, surpassing the mainnet's throughput for the first time. This achievement marks a crucial turning point in Ethereum's scaling journey.",
    content: `
      <article>
        <p>Ethereum's Layer 2 scaling solutions have reached a significant milestone, collectively processing over 10 million daily transactions, surpassing the mainnet's throughput for the first time. This achievement marks a crucial turning point in Ethereum's scaling journey.</p>

        <section>
          <h2>Adoption and User Growth</h2>
          <p>Leading L2 networks like Arbitrum, Optimism, and zkSync have seen exponential growth in user adoption, driven by lower fees and faster transaction speeds. The surge in activity comes as more DeFi protocols and NFT platforms deploy on these scaling solutions.</p>
        </section>

        <section>
          <h2>Market Analysis</h2>
          <p>Market analysts suggest this milestone could accelerate Ethereum's ecosystem growth, as it demonstrates the viability of the "rollup-centric roadmap" championed by Vitalik Buterin. The success of L2s is particularly timely given the increasing demand for blockchain scalability in DeFi and gaming applications.</p>
        </section>

        <section>
          <h2>Future Implications</h2>
          <p>This breakthrough in Layer 2 adoption suggests a bright future for Ethereum scalability. As more projects migrate to L2 solutions, we can expect to see continued growth in transaction volumes and decreased costs for users.</p>
        </section>
      </article>
    `,
    categories: ["Cryptocurrency", "Market Analysis", "Technology"],
    tags: ["Market Update", "Analysis", "Trends"],
  },
  {
    slug: 'gamestop-plans-bitcoin-investment',
    title: "GameStop Follows MicroStrategy's Lead, Plans $1.3B Bitcoin Buy",
    date: "2025-03-27",
    description: "Gaming retailer GameStop announces plans to invest $1.3B in Bitcoin through convertible notes offering, following MicroStrategy's corporate treasury strategy.",
    content: `
      <article>
        <p>In a bold move that mirrors MicroStrategy's Bitcoin strategy, gaming retail giant GameStop has announced plans to raise $1.3 billion through convertible notes to invest in Bitcoin. This decision marks another significant step in the mainstream adoption of cryptocurrency by major corporations.</p>

        <h2>Investment Policy Update</h2>
        <p>GameStop's board of directors has unanimously approved an update to its investment policy, enabling the company to allocate capital into Bitcoin. The gaming retailer plans to use the net proceeds from their offering for "general corporate purposes, including the acquisition of Bitcoin" in alignment with their new investment strategy.</p>

        <h2>Funding Structure</h2>
        <p>The company's approach involves:</p>
        <ul>
          <li>Issuing $1.3 billion in 0.00% Convertible Senior Notes due 2030</li>
          <li>Offering initial purchasers an additional $200 million option within 13 days</li>
          <li>Notes will be unsecured obligations with no regular interest</li>
          <li>Maturity date set for April 1, 2030</li>
          <li>Flexible conversion options including cash, Class A common stock, or both</li>
        </ul>

        <h2>Market Impact and Analysis</h2>
        <p>This move positions GameStop alongside other forward-thinking corporations that are diversifying their balance sheets with Bitcoin. Following MicroStrategy's lead, this decision signals growing confidence in cryptocurrency as a treasury reserve asset among traditional businesses.</p>

        <h2>Looking Ahead</h2>
        <p>As more corporations adopt Bitcoin as a treasury reserve asset, we might be witnessing a broader shift in corporate finance strategies. GameStop's decision could set a precedent for other retail companies looking to modernize their treasury management approaches.</p>
      </article>
    `,
    categories: ["Bitcoin", "Investments", "Corporate Strategy"],
    tags: ["GameStop", "Bitcoin Investment", "Corporate Treasury", "MicroStrategy", "Convertible Notes"],
  }
];

export async function getArticle(slug: string): Promise<Article | null> {
  const article = articles.find(a => a.slug === slug);
  if (!article) return null;
  return article;
}

export async function getAllArticles(): Promise<Article[]> {
  return articles.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });
}