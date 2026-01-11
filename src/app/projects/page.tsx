import { SITE_CONFIG } from "@/lib/constants";
import Link from "next/link";
import { AwardsSection } from "@/components/awards-section";

export const metadata = {
  title: "Projects",
  description: "Open source projects and tools I've worked on.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:py-20">
      <div className="mb-16">
        <h1 className="text-5xl md:text-6xl font-serif mb-6">Projects</h1>
        <p className="text-xl text-gray-500 max-w-2xl">
          Here&apos;s an overview of some of my open-source projects I&apos;ve worked on.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {SITE_CONFIG.projects.map((project) => (
          <div key={project.title} className="flex flex-col items-start">
            <div className="mb-4">
               <span className="text-4xl">{project.emoji}</span>
               <h2 className="text-xl font-bold mt-2">{project.title}</h2>
            </div>
            <p className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">{project.role}</p>
            <p className="text-gray-400 leading-relaxed text-sm">
              {project.description}
            </p>
          </div>
        ))}
      </div>

      <AwardsSection />
    </div>
  );
}
