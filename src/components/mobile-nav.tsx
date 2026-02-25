"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { SITE_CONFIG } from "@/lib/constants";
import { ThemeToggle } from "./theme-toggle";

const MENU_CLOSE_ANIMATION_MS = 220;
const MENU_NAV_DELAY_MS = 120;

export default function MobileNav({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const navTimeoutRef = useRef<number | null>(null);

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const requestClose = React.useCallback(() => {
    setOpen(false);
    if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = window.setTimeout(() => {
      onClose();
      closeTimeoutRef.current = null;
    }, MENU_CLOSE_ANIMATION_MS);
  }, [onClose]);

  const navigateAndClose = React.useCallback(
    (href: string) => {
      requestClose();
      if (navTimeoutRef.current) window.clearTimeout(navTimeoutRef.current);
      // Delay navigation slightly so the closing menu still captures the tap.
      navTimeoutRef.current = window.setTimeout(() => {
        router.push(href);
        navTimeoutRef.current = null;
      }, MENU_NAV_DELAY_MS);
    },
    [requestClose, router]
  );

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = requestAnimationFrame(() => {
      setOpen(true);
      closeBtnRef.current?.focus();
    });

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") requestClose();
    }
    document.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKey);
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      if (navTimeoutRef.current) {
        window.clearTimeout(navTimeoutRef.current);
        navTimeoutRef.current = null;
      }
    };
  }, [requestClose]);

  return (
    <div className="fixed inset-0 z-[9999]" role="dialog" aria-modal="true" aria-label="Mobile navigation menu">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        className={`absolute inset-0 transition-all duration-200 ease-out motion-reduce:transition-none ${
          open
            ? "bg-black/20 dark:bg-black/40 backdrop-blur-md opacity-100"
            : "bg-black/0 backdrop-blur-0 opacity-0"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          requestClose();
        }}
        style={{ pointerEvents: "auto" }}
      />

      {/* Floating iOS-style menu panel */}
      <div
        ref={dialogRef}
        className={`absolute right-4 top-20 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-black/10 bg-white text-black shadow-[0_20px_60px_rgba(0,0,0,0.16)] ring-1 ring-white/60 supports-[backdrop-filter]:backdrop-blur-3xl dark:border-white/10 dark:bg-zinc-900/72 dark:text-white dark:ring-white/5 dark:shadow-[0_24px_70px_rgba(0,0,0,0.45)] transition-all duration-220 ease-out motion-reduce:transition-none ${
          open ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-3 scale-95"
        }`}
        style={{ pointerEvents: "auto", transformOrigin: "top right" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-white/50 blur-2xl dark:bg-white/10" />
          <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-sky-200/30 blur-2xl dark:bg-sky-400/10" />
        </div>

        <div className="relative p-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center min-w-0">
              <Image src="/minilogos-favicon.png" alt="logo" width={36} height={36} className="w-9 h-9 object-contain rounded-lg" />
              <span className="ml-3 font-semibold text-base truncate text-black dark:text-white">{SITE_CONFIG.name}</span>
            </div>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                requestClose();
              }}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-black shadow-sm ring-1 ring-black/10 transition hover:opacity-80 dark:bg-white/10 dark:text-white dark:ring-white/10"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="mt-4 rounded-2xl border border-black/10 bg-white p-2 shadow-inner shadow-white/70 dark:border-white/10 dark:bg-white/5 dark:shadow-none">
            <nav className="flex flex-col gap-1">
              {SITE_CONFIG.nav.map((item, index) => (
                <button
                  key={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigateAndClose(item.href);
                  }}
                  className="group relative flex items-center justify-between rounded-xl px-3 py-3 text-left text-black transition hover:bg-black/5 active:scale-[0.99] dark:text-white dark:hover:bg-white/5"
                >
                  <span className="text-base font-medium">{item.label}</span>
                  <span className="text-black/40 transition group-hover:translate-x-0.5 dark:text-white/45">›</span>
                  {index < SITE_CONFIG.nav.length - 1 && (
                    <span className="pointer-events-none absolute bottom-0 left-3 right-3 h-px bg-black/10 dark:bg-white/8" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigateAndClose("/contact");
              }}
              className="block w-full text-center rounded-2xl py-3.5 bg-black text-white font-medium shadow-lg shadow-black/25 hover:opacity-90 active:scale-[0.99] transition-all dark:bg-white dark:text-black"
            >
              Get in touch
            </button>
          </div>

          <div
            className="mt-4 rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-inner shadow-white/60 transition hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:shadow-none"
            role="button"
            tabIndex={0}
            aria-label="Toggle theme"
            onClick={(e) => {
              e.stopPropagation();
              toggleTheme();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                toggleTheme();
              }
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-black dark:text-white">Theme</span>
              <ThemeToggle size="medium" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
