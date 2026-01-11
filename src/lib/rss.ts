import Parser from "rss-parser";
import { SITE_CONFIG } from "./constants";

const parser = new Parser({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  },
});

export interface Post {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  slug: string;
  guid: string;
  categories: string[];
}

export async function getSubstackPosts(): Promise<Post[]> {
  const feedUrl = SITE_CONFIG.substack.feed || `https://${SITE_CONFIG.substack.username}.substack.com/feed`;
  
  try {
    const feed = await parser.parseURL(feedUrl);
    
    return feed.items.map((item: any) => {
      // Extract slug from link
      // Link format: https://username.substack.com/p/slug-name
      const url = new URL(item.link);
      const slug = url.pathname.split("/").pop() || "";

      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        content: item["content:encoded"] || item.content,
        contentSnippet: item.contentSnippet || "",
        slug,
        guid: item.guid,
        categories: item.categories || [],
      };
    });
  } catch (error) {
    console.error("Error fetching Substack RSS:", error);
    return [];
  }
}
