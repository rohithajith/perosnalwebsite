import { getSubstackPosts } from "@/lib/rss";
import { notFound } from "next/navigation";
import { formatDate, enhanceMediaInHTML } from "@/lib/utils";
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
      <article className="mx-auto max-w-3xl px-6 py-12">
         <Suspense fallback={<div className="mb-8"></div>}>
            <BackToBlog />
         </Suspense>
         
         <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
            <time className="text-foreground/70" dateTime={post.pubDate}>
               {formatDate(post.pubDate)}
            </time>
         </header>

         <div
            className="prose prose-lg dark:prose-invert max-w-none prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline prose-headings:font-bold prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: enhanceMediaInHTML(post.content) }}
         />
      </article>
   );
}
