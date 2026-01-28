"use client"

import Link from "next/link";
import React, { useEffect } from "react";
import type { Post } from "@/lib/rss";
import { formatDate } from "@/lib/utils";

interface Props {
  groupedPosts: Record<string, Post[]>;
  keys: string[];
}

export default function NewsletterList({ groupedPosts, keys }: Props) {
  useEffect(() => {
    try {
      const source = sessionStorage.getItem("newsletter-scroll-source");
      const pos = sessionStorage.getItem("newsletter-scroll");
      if (source === "newsletter" && pos) {
        const y = parseInt(pos, 10);
        if (!Number.isNaN(y)) {
          window.scrollTo({ top: y, behavior: "auto" });
        }
      }
    } catch (e) {
      // ignore
    }

    // Cleanup: clear scroll data when leaving the newsletter page
    return () => {
      try {
        sessionStorage.removeItem("newsletter-scroll");
        sessionStorage.removeItem("newsletter-scroll-source");
      } catch (e) {
        // ignore
      }
    };
  }, []);

  const saveScroll = () => {
    try {
      sessionStorage.setItem("newsletter-scroll", String(window.scrollY || window.pageYOffset || 0));
      sessionStorage.setItem("newsletter-scroll-source", "newsletter");
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:py-20">
      <div className="mb-16">
        <h1 className="text-5xl md:text-6xl font-serif mb-6">Newsletter</h1>
        <p className="text-xl text-black dark:text-gray-400 max-w-2xl">
          Insights on enterprise AI, automation systems, and emerging tools that transform business operations. Subscribe for practical guides, real-world implementations, and strategic analysis delivered to your inbox.
        </p>
        <a href="https://aiintegrationsforbiz.substack.com/subscribe?next=https%3A%2F%2Fsubstack.com%2F%40integrationswithai%3F&utm_source=profile-page&utm_medium=web&utm_campaign=substack_profile&just_signed_up=true" className="inline-block w-full sm:w-auto bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors mt-6">
          Subscribe
        </a>
      </div>

      <div className="space-y-16">
        {keys.map((key) => (
          <div key={key} className="grid md:grid-cols-[200px_1fr] gap-8">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest pt-1">{key}</h2>
            <div className="space-y-10">
              {groupedPosts[key].map((post) => (
                <article key={post.guid} className="group">
                  <Link href={`/blog/${post.slug}?referrer=notes`} onClick={saveScroll} className="block space-y-2">
                    <h3 className="text-xl font-medium group-hover:underline decoration-1 underline-offset-4">
                      {post.title}
                    </h3>
                    <div className="text-sm text-black dark:text-gray-400">
                      {formatDate(post.pubDate)} — {post.categories.slice(0, 3).join(", ") || "Newsletter"}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
