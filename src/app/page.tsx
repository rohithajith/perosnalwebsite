import Link from "next/link";
import { getSubstackPosts, type Post } from "@/lib/rss";
import { formatDate } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

export const revalidate = 3600;

export default async function Home() {
  const posts = await getSubstackPosts();

  // Group posts by Year/Month
  const groupedPosts: Record<string, Post[]> = {};
  
  posts.forEach((post) => {
    const date = new Date(post.pubDate);
    // Format: "2026 January"
    const key = date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
    if (!groupedPosts[key]) {
      groupedPosts[key] = [];
    }
    groupedPosts[key].push(post);
  });

  const keys = Object.keys(groupedPosts).sort((a, b) => { // Sort descending by date
     return new Date(b).getTime() - new Date(a).getTime();
  });

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:py-20">
      <h1 className="text-5xl md:text-6xl mb-16" style={{ fontFamily: "var(--font-pt-mono)" }}>Index</h1>

      <div className="space-y-16">
        {keys.map((key) => (
          <div key={key} className="grid md:grid-cols-[200px_1fr] gap-8">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest pt-1">{key}</h2>
            <div className="space-y-10">
              {groupedPosts[key].map((post) => (
                <article key={post.guid} className="group">
                  <Link href={`/blog/${post.slug}`} className="block space-y-2">
                    <h3 className="text-xl font-medium group-hover:underline decoration-1 underline-offset-4">
                      {post.title}
                    </h3>
                    <div className="text-sm text-black dark:text-gray-400">
                      {formatDate(post.pubDate)} — {post.categories.slice(0, 3).join(", ") || "Blog"}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="py-12 border-t border-dashed border-gray-200 dark:border-gray-800">
             <p className="text-xl text-black dark:text-gray-400 mb-2">No posts found yet.</p>
             <p className="text-black dark:text-gray-400">
               Check out my <a href={SITE_CONFIG.substack.url} target="_blank" className="underline hover:text-foreground">Substack</a> directly or come back later!
             </p>
          </div>
        )}
      </div>
    </div>
  );
}
