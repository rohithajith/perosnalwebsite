import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { SITE_CONFIG } from "@/lib/constants";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold text-lg tracking-widest uppercase font-serif">
            {SITE_CONFIG.name}
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold tracking-widest uppercase">
            <span className="text-muted-foreground mr-2 hidden lg:inline-block">Search ⌘K</span>
            {SITE_CONFIG.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
             <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
