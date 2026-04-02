export const SITE_CONFIG = {
  name: "Rohith Ajith",
  tagline: "Data Scientist | Building Autonomous AI Agents",
  description: "Visionary Data Scientist specializing in full-stack AI agent architectures, LLMs, and intelligent product automation.",
  url: "https://rohithajith.com", // Placeholder
  author: "Rohith Ajith",
  substack: {
    username: "aiintegrationsforbiz",
    url: "https://aiintegrationsforbiz.substack.com",
    feed: "https://aiintegrationsforbiz.substack.com/feed",
  },
  social: {
    twitter: "https://x.com/_outoftheblurr", // Placeholder
    linkedin: "https://www.linkedin.com/in/rohithajith/",
    substack: "https://substack.com/@integrationswithai?",
    threads: "https://www.threads.com/@outoftheblurr",
  },
  nav: [
    { label: "Blog", href: "/blog" },
    { label: "Projects", href: "/projects" },
    { label: "Newsletter", href: "/notes" },
    { label: "About Me", href: "/about" },
  ],
  projects: [
    {
      title: "HotelAI Agent System",
      role: "Creator",
      emoji: "🏨",
      description: "Autonomous AI system managing hotel operations using fine-tuned LLaMA 3.2 and LangGraph agents. Handled check-in, ID verification, and room service.",
      url: "/Final-A2-poster_2025.pdf",
    },
    {
      title: "Drowsiness Detection Edge AI",
      role: "Product Intern",
      emoji: "👁️",
      description: "Edge-based computer vision system (Raspberry Pi) to detect driver drowsiness and distraction in real-time to improve road safety.",
      url: "#",
    },
    {
      title: "OCR Content Extractor",
      role: "Developer",
      emoji: "📄",
      description: "Intelligent document processing pipeline extracting structured data from unstructured documents for automated workflows.",
      url: "#",
    },
    {
      title: "Hoteldevbox",
      role: "Founder",
      emoji: "🤖",
      description: "AI-powered development platform for hotels that acts as a virtual software and operations team. Operators describe needs in plain language, and the system helps build, deploy, and manage tailored tools like dynamic pricing agents, guest communication workflows, review monitoring, revenue forecasting, website fixes, and operational dashboards. It combines hospitality-specific context with AI planning, code generation, deployment, and monitoring, with approval safeguards for critical changes.",
      url: "#",
    },
    {
      title: "Offshore Logistics MCP Server",
      role: "Builder",
      emoji: "⚓",
      description: "Designed and built a domain-specific MCP server for offshore maritime logistics as a structured interface layer between operational systems and AI. It exposes logistics and supply-chain context through MCP tools and resources, enabling AI models and agents to use real operational data without brittle one-off integrations. Supports inventory visibility, shipment tracking, supplier and PO context, transfer planning, and stock reservation with auditability.",
      url: "#",
    },
  ],
  blogs: [
    {
      title: "Decoding Strategies in Transformers",
      slug: "decoding-strategies-in-transformers",
      description: "A deep dive into how different decoding strategies affect LLM outputs and performance."
    },
    {
      title: "The Week Enterprise AI Got Serious",
      slug: "the-week-enterprise-ai-got-serious",
      description: "Reflections on the rapid adoption of AI in enterprise settings and what it means for the future."
    },
    {
      title: "The Loop Breaker: Why I Ditched VS",
      slug: "the-loop-breaker-why-i-ditched-vs",
      description: "Lessons learned from switching development environments and breaking old habits."
    }
  ],
};
