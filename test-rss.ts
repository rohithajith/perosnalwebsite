import Parser from "rss-parser";

const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  }
});
const feedUrl = "https://aiintegrationsforbiz.substack.com/feed";

async function test() {
  console.log("Fetching from:", feedUrl);
  try {
    const feed = await parser.parseURL(feedUrl);
    console.log("Feed Title:", feed.title);
    console.log("Feed Description:", feed.description);
    console.log("Items count:", feed.items.length);
    console.log("Full Feed Object keys:", Object.keys(feed));
  } catch (error) {
    console.error("Error:", error);
  }
}

test();
