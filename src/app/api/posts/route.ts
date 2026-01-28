import { getSubstackPosts } from "@/lib/rss";

export async function GET() {
  try {
    const posts = await getSubstackPosts();
    return Response.json(posts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return Response.json([], { status: 500 });
  }
}
