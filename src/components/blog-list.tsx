"use client"

import Link from "next/link";
import React, { useEffect } from "react";
import type { Post } from "@/lib/rss";
import { formatDate } from "@/lib/utils";

interface Props {
  posts: Post[];
}

export default function BlogList({ posts }: Props) {
  useEffect(() => {
    try {
      const source = sessionStorage.getItem("blog-scroll-source");
      const pos = sessionStorage.getItem("blog-scroll");
      if (source === "blog" && pos) {
        const y = parseInt(pos, 10);
        if (!Number.isNaN(y)) {
          window.scrollTo({ top: y, behavior: "auto" });
        }
      }
    } catch (e) {
      // ignore
    }

    // Cleanup: clear scroll data when leaving the blog page
    return () => {
      try {
        sessionStorage.removeItem("blog-scroll");
        sessionStorage.removeItem("blog-scroll-source");
      } catch (e) {
        // ignore
      }
    };
  }, []);

  const saveScroll = () => {
    try {
      sessionStorage.setItem("blog-scroll", String(window.scrollY || window.pageYOffset || 0));
      sessionStorage.setItem("blog-scroll-source", "blog");
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="border-b border-gray-200 dark:border-gray-800 pb-8 mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Blog</h1>
        <p className="text-xl text-foreground">Exploring cutting-edge AI strategies, agentic workflows, scalable infrastructure, and enterprise solutions to drive innovation and operational excellence.</p>
      </div>
      <div className="space-y-12">
        {posts.map((post) => (
          <article key={post.guid} className="flex flex-col space-y-3">
            <Link href={`/blog/${post.slug}?referrer=blog`} onClick={saveScroll} className="block">
              <h2 className="text-2xl font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
            </Link>
            <div className="text-sm text-foreground">
              <time dateTime={post.pubDate}>{formatDate(post.pubDate)}</time>
            </div>
            <p className="text-foreground/90 leading-relaxed">
              {post.contentSnippet}
            </p>
            <Link href={`/blog/${post.slug}?referrer=blog`} onClick={saveScroll} className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
