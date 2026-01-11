import Link from "next/link";
import { getSubstackPosts } from "@/lib/rss";
import { formatDate } from "@/lib/utils";

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getSubstackPosts();
  
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
       <div className="border-b border-gray-200 dark:border-gray-800 pb-8 mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Blog</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">Writing about technology, learning, and building.</p>
       </div>
       <div className="space-y-12">
          {posts.map((post) => (
            <article key={post.guid} className="flex flex-col space-y-3">
              <Link href={`/blog/${post.slug}`} className="block">
                <h2 className="text-2xl font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
              </Link>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                 <time dateTime={post.pubDate}>{formatDate(post.pubDate)}</time>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                 {post.contentSnippet}
              </p>
              <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                 Read more →
              </Link>
            </article>
          ))}
       </div>
    </div>
  );
}
