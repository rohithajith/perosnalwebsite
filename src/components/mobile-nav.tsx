"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export default function MobileNav({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const prevActive = document.activeElement as HTMLElement | null;
    // focus the first link when opened
    requestAnimationFrame(() => firstLinkRef.current?.focus());

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      prevActive?.focus();
    };
  }, [onClose]);

  // Simple focus trap: keep focus within dialog
  useEffect(() => {
    function trap(e: FocusEvent) {
      if (!dialogRef.current) return;
      const el = e.target as Node;
      if (!dialogRef.current.contains(el)) {
        e.preventDefault();
        firstLinkRef.current?.focus();
      }
    }
    document.addEventListener("focusin", trap as any);
    return () => document.removeEventListener("focusin", trap as any);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <aside
        ref={dialogRef}
        className="ml-auto w-80 max-w-full bg-background text-foreground p-6 shadow-xl animate-slide-in-from-right"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <img src="/minilogos.png" alt="logo" className="w-10 h-10 object-contain" />
            <span className="ml-3 font-semibold">{SITE_CONFIG.name}</span>
          </div>
          <button type="button" onClick={onClose} aria-label="Close menu" className="p-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          {SITE_CONFIG.nav.map((item, idx) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="text-lg font-medium"
              ref={idx === 0 ? firstLinkRef : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6">
          <button type="button" onClick={() => { onClose(); }} className="w-full rounded-full py-2 bg-foreground text-background">
            Get in touch
          </button>
        </div>
      </aside>
    </div>
  );
}
