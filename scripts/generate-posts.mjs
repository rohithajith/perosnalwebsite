#!/usr/bin/env node
import Parser from "rss-parser";
import fs from "fs";

const feedUrl = "https://aiintegrationsforbiz.substack.com/feed";

const parser = new Parser({
  headers: {
    "User-Agent": "rss-fetcher",
  },
});

async function main() {
  try {
    const feed = await parser.parseURL(feedUrl);
    const posts = (feed.items || []).map((item) => {
      const url = new URL(item.link || "");
      const slug = url.pathname.split("/").pop() || "";
      return {
        title: item.title || "",
        link: item.link || "",
        pubDate: item.pubDate || "",
        content: item["content:encoded"] || item.content || "",
        contentSnippet: item.contentSnippet || "",
        slug,
        guid: item.guid || "",
        categories: item.categories || [],
        description: item.contentSnippet || item.content || "",
      };
    });

    const outPath = new URL("../public/posts.json", import.meta.url).pathname;
    fs.writeFileSync(outPath, JSON.stringify(posts, null, 2), "utf-8");
    console.log("Wrote", posts.length, "posts to public/posts.json");
  } catch (err) {
    console.error("Failed to generate posts.json:", err);
    process.exit(1);
  }
}

main();
