import Link from "next/link";
import { getSubstackPosts, type Post } from "@/lib/rss";
import { formatDate } from "@/lib/utils";
import NewsletterList from "@/components/newsletter-list";

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

  return <NewsletterList groupedPosts={groupedPosts} keys={keys} />;
}

