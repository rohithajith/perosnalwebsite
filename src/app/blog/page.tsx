import { getSubstackPosts } from "@/lib/rss";
import BlogList from "@/components/blog-list";

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getSubstackPosts();

  const keepTitles = [
    "Decoding Strategies in Transformers:",
    "Agentic AI Isn’t Coming for Jobs—It’s Coming for Your Value Chain",
    "How breaking down complex AI workflows into reusable, decoupled components enables faster innovation, operational resilience, and seamless scaling for developers and enterprise leaders",
    "Building Scalable and Resilient Infrastructure for AI and ML Pipelines in 2026",
    "Lessons for AI App Builders: What the Amazon vs. Perplexity Lawsuit Teaches Us About Building Smart Shopping Agents",
    "Beyond RAG vs CAG: Agentic Workflows Power the Intelligent Enterprise",
    "Choosing the Right Claude AI Model for Your Enterprise Business",
    "What Scares Leaders About AI—And How to Turn That Fear into a Competitive Advantage"
  ];

  const filteredPosts = posts.filter(post => keepTitles.includes(post.title));

  return <BlogList posts={filteredPosts} />;
}
