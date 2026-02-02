"use client";

import Link from "next/link";
import * as React from "react";
import { ThemeToggle } from "./theme-toggle";
import { SITE_CONFIG } from "@/lib/constants";
import { useState, useEffect, useRef } from "react";
import { SearchModal } from "@/components/search-modal";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const logoSrc = resolvedTheme === "dark" ? "/darkmodecut.png" : "/lightmode.png";
  const [showToggle, setShowToggle] = useState(false);
  const leaveTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
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

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) {
        clearTimeout(leaveTimerRef.current);
        leaveTimerRef.current = null;
      }
    };
  }, []);

  const aboutIndex = SITE_CONFIG.nav.findIndex((it) => it.href === "/about");
  const mainNavItems = aboutIndex >= 0 ? SITE_CONFIG.nav.slice(0, aboutIndex + 1) : SITE_CONFIG.nav;
  const trailingNavItems = aboutIndex >= 0 ? SITE_CONFIG.nav.slice(aboutIndex + 1) : [];

  return (
    <header className="sticky top-5 z-40 w-full flex justify-center pointer-events-none">
      <div className="mx-4 w-full max-w-4xl pointer-events-auto">
        {/* Wrapper group: default single pill; on hover children get their own pill styles */}
        <div
          className="group relative w-full"
          onMouseEnter={() => {
            if (leaveTimerRef.current) {
              clearTimeout(leaveTimerRef.current);
              leaveTimerRef.current = null;
            }
            setShowToggle(true);
          }}
          onMouseLeave={() => {
            leaveTimerRef.current = window.setTimeout(() => {
              setShowToggle(false);
              leaveTimerRef.current = null;
            }, 180);
          }}
        >
          <div className="w-full">
            <div className="relative w-full">
              {/* Parent pill (default) - stable layout; we won't animate its size/position to avoid shifting */}
              <div className="bg-background/60 supports-[backdrop-filter]:backdrop-blur-lg rounded-full py-3 px-6 shadow-lg transition-all duration-300 ease-in-out">
                <div className="flex items-center justify-between gap-6">
                  {/* Left: logo only */}
                  <div className="flex items-center pointer-events-auto">
                    {mounted && pathname && (
                      <Link href="/" className="flex items-center">
                        <img src={logoSrc} alt={`${SITE_CONFIG.name} Logo`} style={{ height: 64 }} className="w-auto" />
                      </Link>
                    )}
                  </div>

                  {/* Right: nav + search (always right aligned). Toggle remains hidden until hover. */}
                  <div className="flex items-center gap-3 md:gap-6 pointer-events-auto flex-nowrap">
                    <button
                      onClick={() => setSearchOpen(true)}
                      aria-label="Open search"
                      className="text-muted-foreground mr-0 hidden md:inline-flex items-center gap-2 hover:text-foreground/80 transition-colors text-base font-medium whitespace-nowrap"
                    >
                      Search ⌘K
                    </button>

                    {/* Mobile hamburger: visible on small screens only */}
                    <button
                      onClick={() => setMobileOpen(true)}
                      aria-label="Open menu"
                      className="md:hidden inline-flex items-center justify-center rounded-full bg-background/60 supports-[backdrop-filter]:backdrop-blur-lg ring-1 ring-foreground/6 w-12 h-8 px-2 py-1"
                    >
                      <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="1" width="20" height="2" rx="1" fill="currentColor" />
                        <rect y="6" width="20" height="2" rx="1" fill="currentColor" />
                        <rect y="11" width="20" height="2" rx="1" fill="currentColor" />
                      </svg>
                    </button>

                    <nav className="hidden md:flex items-center gap-3 md:gap-6 text-sm font-semibold uppercase tracking-wider transition-all duration-300 ease-in-out whitespace-nowrap">
                      {SITE_CONFIG.nav.map((item) => (
                        <Link key={item.href} href={item.href} className="text-foreground hover:text-foreground/80 transition-colors">
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>

              {/* Right floating toggle bubble: appears on hover, positioned absolutely so it doesn't shift layout */}
              {/* Fixed floating toggle bubble that visibly emerges to the right on hover */}
              <div
                className={`absolute right-[-6rem] top-1/2 -translate-y-1/2 z-50 ${showToggle ? "pointer-events-auto" : "pointer-events-none"}`}
                onMouseEnter={() => {
                  if (leaveTimerRef.current) {
                    clearTimeout(leaveTimerRef.current);
                    leaveTimerRef.current = null;
                  }
                  setShowToggle(true);
                }}
                onMouseLeave={() => {
                  leaveTimerRef.current = window.setTimeout(() => {
                    setShowToggle(false);
                    leaveTimerRef.current = null;
                  }, 180);
                }}
              >
                <div
                  className={`rounded-full bg-background/60 ring-1 ring-foreground/6 shadow-2xl transform transition-all duration-200 ease-out ${
                    showToggle ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-90"
                  }`}
                >
                  <div className="flex items-center justify-center w-16 h-16">
                    <ThemeToggle size="large" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      {/* Mobile slide-over menu */}
      {mobileOpen && (
        <MobileNav onClose={() => setMobileOpen(false)} />
      )}
    </header>
  );
}

function MobileNav({ onClose }: { onClose: () => void }) {
  // Render client-side interactive slide-over
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <aside className="ml-auto w-80 max-w-full bg-background text-foreground p-6 shadow-xl animate-slide-in-from-right">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <img src="/minilogos.png" alt="logo" className="w-10 h-10 object-contain" />
            <span className="ml-3 font-semibold">{SITE_CONFIG.name}</span>
          </div>
          <button onClick={onClose} aria-label="Close menu" className="p-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          {SITE_CONFIG.nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={onClose} className="text-lg font-medium">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6">
          <button onClick={() => { onClose(); setTimeout(() => {}, 0); }} className="w-full rounded-full py-2 bg-foreground text-background">Get in touch</button>
        </div>
      </aside>
    </div>
  );
}
