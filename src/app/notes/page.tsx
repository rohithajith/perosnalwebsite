import Link from "next/link";
import { getSubstackPosts, type Post } from "@/lib/rss";
import { formatDate } from "@/lib/utils";

export const revalidate = 3600;

export default async function NotesPage() {
  const posts = await getSubstackPosts();

  // Group posts by Year/Month
  const groupedPosts: Record<string, Post[]> = {};
  
  posts.forEach((post) => {
    const date = new Date(post.pubDate);
    const key = date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
    if (!groupedPosts[key]) {
      groupedPosts[key] = [];
    }
    groupedPosts[key].push(post);
  });

  const keys = Object.keys(groupedPosts).sort((a, b) => { 
     return new Date(b).getTime() - new Date(a).getTime();
  });

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:py-20">
      <div className="mb-16">
        <h1 className="text-5xl md:text-6xl font-serif mb-6">Newsletter</h1>
        <p className="text-xl text-gray-500 max-w-2xl">
          I write about AI, Engineering, and the future of software. 
          Here is an archive of all issues.
        </p>
      </div>

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
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(post.pubDate)} — {post.categories.slice(0, 3).join(", ") || "Newsletter"}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <p className="text-gray-500">No posts found.</p>
        )}
      </div>
    </div>
  );
}

