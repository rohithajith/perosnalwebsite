import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Enhance media tags in HTML string to improve loading behavior and show
 * a simple CSS-based skeleton while images/iframes load.
 *
 * - Adds `loading="lazy"`, `decoding="async"`, `fetchpriority="low"`
 * - Adds a `lazy-media` class and an inline onload to flip the visible state
 *
 * Note: This mutates the HTML string only and is safe to use before
 * `dangerouslySetInnerHTML` since the project already renders external HTML.
 */
export function enhanceMediaInHTML(html: string) {
  if (!html) return html;

  // Add attributes to <img> tags
  html = html.replace(/<img([^>]*?)\/>/gi, (match, attrs) => {
    // Ensure we don't duplicate attributes if they already exist
    let newAttrs = attrs;
    if (!/loading=/.test(attrs)) newAttrs += ' loading="lazy"';
    if (!/decoding=/.test(attrs)) newAttrs += ' decoding="async"';
    if (!/fetchpriority=/.test(attrs)) newAttrs += ' fetchpriority="low"';
    if (!/class=/.test(attrs)) newAttrs += ' class="lazy-media"';
    else newAttrs = newAttrs.replace(/class=(['\"])(.*?)\1/, (m: string, q: string, v: string) => `class=${q}${v} lazy-media${q}`);

    // Inline onload to add a loaded class which our CSS uses to transition opacity
    if (!/onload=/.test(newAttrs)) newAttrs += ' onload="this.classList.add(\'loaded\')"';

    return `<div class=\"media-wrapper\"><div class=\"media-skeleton\"></div><img${newAttrs} /></div>`;
  });

  // Add lazy loading to iframes (e.g., embedded videos)
  html = html.replace(/<iframe([^>]*?)>/gi, (match, attrs) => {
    let newAttrs = attrs;
    if (!/loading=/.test(attrs)) newAttrs += ' loading="lazy"';
    if (!/class=/.test(attrs)) newAttrs += ' class="lazy-media"';
    else newAttrs = newAttrs.replace(/class=(['\"])(.*?)\1/, (m: string, q: string, v: string) => `class=${q}${v} lazy-media${q}`);
    if (!/onload=/.test(newAttrs)) newAttrs += ' onload="this.classList.add(\'loaded\')"';

    return `<div class=\"media-wrapper\"><div class=\"media-skeleton\"></div><iframe${newAttrs}></iframe></div>`;
  });

  return html;
}
