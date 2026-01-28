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
        <p className="text-xl text-black dark:text-gray-400 max-w-2xl">
          Here&apos;s an overview of some of my open-source projects I&apos;ve worked on.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {SITE_CONFIG.projects.map((project) => (
          project.url !== "#" ? (
            <a key={project.title} href={project.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-start">
              <div className="mb-4">
                 <span className="text-4xl">{project.emoji}</span>
                 <h2 className="text-xl font-bold mt-2">{project.title}</h2>
              </div>
              <p className="text-sm font-medium text-black dark:text-gray-400 mb-4 uppercase tracking-wider">{project.role}</p>
              <p className="text-black dark:text-gray-400 leading-relaxed text-sm">
                {project.description}
              </p>
            </a>
          ) : (
            <div key={project.title} className="flex flex-col items-start">
              <div className="mb-4">
                 <span className="text-4xl">{project.emoji}</span>
                 <h2 className="text-xl font-bold mt-2">{project.title}</h2>
              </div>
              <p className="text-sm font-medium text-black dark:text-gray-400 mb-4 uppercase tracking-wider">{project.role}</p>
              <p className="text-black dark:text-gray-400 leading-relaxed text-sm">
                {project.description}
              </p>
            </div>
          )
        ))}
      </div>

      <h3 className="text-foreground mb-8 mt-16 font-serif text-3xl">In production</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mb-16 mt-16">
        <a href="https://landingpage.reviewhelp.uk" target="_blank" rel="noopener noreferrer" className="flex flex-col items-start p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-md hover:shadow-lg transition-shadow duration-300 hover:border-blue-300 dark:hover:border-blue-500 border-l-4 border-l-blue-500">
          <div className="mb-2">
             <img src="/Adobe Express - file.png" alt="ReviewHelp logo" className="w-28 h-28" />
             <h2 className="text-2xl font-bold mt-2">ReviewHelp</h2>
          </div>
          <p className="text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full mb-2 uppercase tracking-wider inline-block">Founder</p>
          <p className="text-black dark:text-gray-400 leading-relaxed text-sm mt-2">
            Turn satisfied customers into public advocates with a streamlined review flow that plugs into your existing customer journey, reducing friction and operational overhead while keeping everything fully manual and compliant.
          </p>
        </a>
      </div>

      <AwardsSection />
    </div>
  );
}
