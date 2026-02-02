"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { ThemeToggle } from "./theme-toggle";

export default function MobileNav({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Lock body scroll when menu is open - simple approach
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // NOTE: aggressive focus-trapping caused interactive issues on mobile.
  // For now we rely on an initial focus target and ESC-to-close; a full
  // focus-trap can be added later using a well-tested library.

  return (
    <div className="fixed inset-0 z-[9999]" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40" 
        onClick={(e) => {
          e.stopPropagation();
          console.log('Backdrop clicked');
          onClose();
        }}
        style={{ pointerEvents: 'auto' }}
      />
      
      {/* Menu Panel */}
      <div
        ref={dialogRef}
        className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-background text-foreground p-6 shadow-xl animate-slide-in-from-right overflow-y-auto"
        style={{ pointerEvents: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <img src="/minilogos.png" alt="logo" className="w-10 h-10 object-contain" />
            <span className="ml-3 font-semibold">{SITE_CONFIG.name}</span>
          </div>
          <button 
            type="button" 
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close menu" 
            className="p-2 hover:opacity-70 active:opacity-50 transition-opacity rounded-full hover:bg-foreground/10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          {SITE_CONFIG.nav.map((item) => (
            <button
              key={item.href}
              onClick={() => {
                console.log('Navigating to:', item.href);
                router.push(item.href);
                setTimeout(() => onClose(), 100);
              }}
              className="text-lg font-medium hover:opacity-70 active:opacity-50 transition-opacity py-3 px-2 rounded text-left w-full cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-6">
          <button 
            onClick={() => {
              console.log('Navigating to: /contact');
              router.push('/contact');
              setTimeout(() => onClose(), 100);
            }}
            className="block w-full text-center rounded-full py-3 bg-foreground text-background font-medium hover:opacity-90 active:scale-95 transition-all cursor-pointer"
          >
            Get in touch
          </button>
        </div>

        {/* Theme Toggle */}
        <div className="mt-6 pt-6 border-t border-foreground/10">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Theme</span>
            <ThemeToggle size="medium" />
          </div>
        </div>
      </div>
    </div>
  );
}
