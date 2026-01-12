import { NextResponse } from 'next/server';
import { getSubstackPosts } from '@/lib/rss';

export async function GET() {
  try {
    const posts = await getSubstackPosts();
    const trimmed = posts.map((p) => ({
      title: p.title,
      slug: p.slug,
      description: p.contentSnippet || p.content?.slice(0, 200) || '',
      pubDate: p.pubDate,
    }));

    return NextResponse.json({ posts: trimmed });
  } catch (err) {
    return NextResponse.json({ posts: [] });
  }
}
