"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { KineticSketchBackdrop } from "./kinetic-sketch-backdrop";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function PortalSketchBackdrop() {
  const pathname = usePathname();
  const pathSegments = (pathname || "").split("/").filter(Boolean);
  const isReadingBlog = pathSegments[0] === "blog" && pathSegments.length >= 2;

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );
  const [scrollAngleDeg, setScrollAngleDeg] = useState<number>(0);

  useEffect(() => {
    if (prefersReducedMotion || isReadingBlog) return;
    const onScroll = () => {
      setScrollAngleDeg(Math.round(window.scrollY * 0.04));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [prefersReducedMotion, isReadingBlog]);

  return (
    <KineticSketchBackdrop
      angleDeg={isReadingBlog ? 0 : scrollAngleDeg}
      slideIndex={0}
      instant={prefersReducedMotion}
    />
  );
}
