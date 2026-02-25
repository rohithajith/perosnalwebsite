import Parser from "rss-parser";
import { readFile } from "node:fs/promises";
import path from "node:path";
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

type SubstackFeedItem = Parser.Item & {
  "content:encoded"?: string;
};

export async function getSubstackPosts(): Promise<Post[]> {
  const feedUrl = SITE_CONFIG.substack.feed || `https://${SITE_CONFIG.substack.username}.substack.com/feed`;

  try {
    const feed = await parser.parseURL(feedUrl);

    return feed.items.flatMap((rawItem) => {
      const item = rawItem as SubstackFeedItem;
      const link = typeof item.link === "string" ? item.link : "";
      if (!link) return [];

      let slug = "";
      try {
        // Link format: https://username.substack.com/p/slug-name
        slug = new URL(link).pathname.split("/").filter(Boolean).pop() || "";
      } catch {
        return [];
      }

      return [
        {
          title: item.title ?? "Untitled",
          link,
          pubDate: item.pubDate ?? "",
          content: item["content:encoded"] || item.content || "",
          contentSnippet: item.contentSnippet || "",
          slug,
          guid: item.guid ?? link,
          categories: Array.isArray(item.categories) ? item.categories : [],
        },
      ];
    });
  } catch (error) {
    console.error("Error fetching Substack RSS:", error);
    try {
      const cachePath = path.join(process.cwd(), "public", "posts.json");
      const raw = await readFile(cachePath, "utf8");
      const cachedPosts = JSON.parse(raw) as Post[];
      return Array.isArray(cachedPosts) ? cachedPosts : [];
    } catch (cacheError) {
      console.error("Error reading cached posts.json:", cacheError);
      return [];
    }
  }
}
