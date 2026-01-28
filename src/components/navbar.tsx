"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { SITE_CONFIG } from "@/lib/constants";
import { useState, useEffect } from "react";
import { SearchModal } from "@/components/search-modal";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const logoSrc = resolvedTheme === 'dark' ? '/darkmodecut.png' : '/lightmode.png';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" style={{ height: '80px' }}>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8" style={{ height: '80px' }}>
        <div className="flex items-center gap-8">
          {pathname !== '/about' && mounted && (
            <Link href="/" className="flex items-center">
              <img
                src={logoSrc}
                alt={`${SITE_CONFIG.name} Logo`}
                style={{ height: '80px' }}
                className="w-auto"
              />
            </Link>
          )}
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold tracking-widest uppercase">
            <button
              className="text-muted-foreground mr-2 hidden lg:inline-block hover:text-blue-600 transition-colors"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              type="button"
            >
              Search ⌘K
            </button>
            {SITE_CONFIG.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>
          <div className="flex items-center gap-2 md:hidden">
             <ThemeToggle />
          </div>
        </div>
      </div>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
