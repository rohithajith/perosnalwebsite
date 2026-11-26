import { SITE_CONFIG } from "@/lib/constants";
import { AwardsSection } from "@/components/awards-section";
import Image from "next/image";

export const metadata = {
  title: "Projects",
  description: "Open source projects and tools I've worked on.",
};

interface ProjectItem {
  title: string;
  role: string;
  emoji: string;
  logo?: string;
  description: string;
  url: string;
}

export default function ProjectsPage() {
  const projects = SITE_CONFIG.projects as ProjectItem[];

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:py-20">
      <div className="mb-16">
        <h1 className="text-5xl md:text-6xl font-serif mb-6">Projects</h1>
        <p className="text-xl text-foreground max-w-2xl">
          Here&apos;s an overview of some of my open-source projects I&apos;ve worked on.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {projects.map((project) => {
          const inner = (
            <>
              <div className="mb-4">
                {project.logo ? (
                  <Image
                    src={project.logo}
                    alt={`${project.title} logo`}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain rounded-lg"
                  />
                ) : (
                  <span className="text-4xl">{project.emoji}</span>
                )}
                <h2 className="text-xl font-bold mt-2 group-hover:underline decoration-1 underline-offset-4">
                  {project.title}
                </h2>
              </div>
              <p className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">
                {project.role}
              </p>
              <p className="text-foreground leading-relaxed text-sm">
                {project.description}
              </p>
            </>
          );

          return project.url !== "#" ? (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-start"
            >
              {inner}
            </a>
          ) : (
            <div key={project.title} className="flex flex-col items-start">
              {inner}
            </div>
          );
        })}
      </div>

      <AwardsSection />
    </div>
  );
}
