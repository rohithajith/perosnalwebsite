import { getSubstackPosts } from "@/lib/rss";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

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
         <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
         </Link>
         
         <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
            <time className="text-gray-500 dark:text-gray-400" dateTime={post.pubDate}>
               {formatDate(post.pubDate)}
            </time>
         </header>

         <div 
            className="prose prose-lg dark:prose-invert max-w-none prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline prose-headings:font-bold prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content }} 
         />
      </article>
   );
}
