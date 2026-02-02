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
        <p className="text-xl text-foreground max-w-2xl">
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
              <p className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">{project.role}</p>
              <p className="text-foreground leading-relaxed text-sm">
                {project.description}
              </p>
            </a>
          ) : (
            <div key={project.title} className="flex flex-col items-start">
              <div className="mb-4">
                 <span className="text-4xl">{project.emoji}</span>
                 <h2 className="text-xl font-bold mt-2">{project.title}</h2>
              </div>
              <p className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">{project.role}</p>
              <p className="text-foreground leading-relaxed text-sm">
                {project.description}
              </p>
            </div>
          )
        ))}
      </div>

      <h3 className="text-foreground mb-8 mt-16 font-serif text-3xl">In production</h3>
      <div className="mb-16 mt-16">
        <a
          href="https://landingpage.reviewhelp.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[70%] md:w-auto md:min-w-[280px] md:max-w-xs flex flex-col items-start p-6 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 shadow-md hover:shadow-xl transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-500 border-l-4 border-l-blue-600 dark:border-l-blue-500 hover:ring-4 hover:ring-blue-200/50 dark:hover:ring-blue-500/30"
        >
          <div className="w-full mb-6">
              <div className="w-20 h-20 rounded-lg bg-white flex items-center justify-center shadow-sm border border-gray-200 mb-4">
                <img src="/adobe-express-file.png" alt="ReviewHelp logo" className="w-[76px] h-[76px] object-contain" />
              </div>
             <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">ReviewHelp</h2>
             <p className="text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full mt-3 uppercase tracking-wider inline-block">Founder</p>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
            Turn satisfied customers into public advocates with a streamlined review flow that plugs into your existing customer journey, reducing friction and operational overhead while keeping everything fully manual and compliant.
          </p>
        </a>
      </div>

      <AwardsSection />
    </div>
  );
}
