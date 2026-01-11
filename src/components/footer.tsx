import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.author}. All rights reserved.
          </p>
          <div className="flex gap-4">
             {/* Social links could act here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
