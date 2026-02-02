"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

type ThemeToggleProps = {
  size?: "normal" | "medium" | "large";
};

export function ThemeToggle({ size = "normal" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const sizeClasses = size === "large" ? "w-12 h-12" : size === "medium" ? "w-11 h-11" : "w-10 h-8";
  const iconSize = size === "large" ? "h-6 w-6" : size === "medium" ? "h-5 w-5" : "h-4 w-4";

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className={`relative inline-flex items-center justify-center rounded-full transition-colors focus:outline-none ${sizeClasses}`}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {/* background ring */}
      <span className="absolute inset-0 rounded-full bg-white/0 dark:bg-black/0 pointer-events-none" />

      {/* Sun icon (light) */}
      <Sun
        className={`transition-transform transition-opacity ${iconSize} ${
          theme === "dark" ? "opacity-0 scale-90" : "opacity-100 scale-100"
        }`}
      />

      {/* Moon icon (dark) */}
      <Moon
        className={`absolute transition-transform transition-opacity ${iconSize} ${
          theme === "dark" ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      />

      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
