import { getSubstackPosts } from "@/lib/rss";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { enhanceMediaInHTML } from "@/lib/post-html";
import { Metadata } from "next";
import BackToBlog from "@/components/back-to-blog";
import { Suspense } from "react";

export const revalidate = 3600;

export async function generateStaticParams() {
   const posts = await getSubstackPosts();
   return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
   const { slug }  = await params;
   const posts = await getSubstackPosts();
   const post = posts.find(p => p.slug === slug);
   
   if (!post) return { title: "Post Not Found" };

   return {
      title: post.title,
      description: post.contentSnippet.slice(0, 160),
      openGraph: {
         title: post.title,
         description: post.contentSnippet.slice(0, 160),
         type: "article",
         publishedTime: post.pubDate,
      }
   };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
   const { slug } = await params;
   const posts = await getSubstackPosts();
   const post = posts.find(p => p.slug === slug);
   
   if (!post) notFound();

   return (
      <article className="blog-post-shell mx-auto max-w-3xl px-6 py-12">
         <Suspense fallback={<div className="mb-8"></div>}>
            <BackToBlog />
         </Suspense>
         
         <header className="mb-10">
            <h1 className="blog-post-title text-3xl md:text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
            <time className="blog-post-meta text-foreground/70" dateTime={post.pubDate}>
               {formatDate(post.pubDate)}
            </time>
         </header>

         <div
            className="blog-prose prose prose-lg max-w-none dark:prose-invert
              prose-headings:font-bold prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100
              prose-p:text-zinc-700 dark:prose-p:text-zinc-300
              prose-li:text-zinc-700 dark:prose-li:text-zinc-300
              prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100
              prose-a:text-blue-700 dark:prose-a:text-blue-400 hover:prose-a:underline
              prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-200
              prose-blockquote:border-l-zinc-400 dark:prose-blockquote:border-l-zinc-500
              prose-blockquote:not-italic
              prose-hr:border-zinc-200 dark:prose-hr:border-zinc-800
              prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: enhanceMediaInHTML(post.content) }}
         />
      </article>
   );
}
