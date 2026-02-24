import "server-only";
import { load } from "cheerio";
import type { AnyNode } from "domhandler";

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function unwrapElements($: ReturnType<typeof load>, selector: string) {
  $(selector).each((_, el) => {
    $(el).replaceWith($(el).contents());
  });
}

function isMeaningfullyEmpty($: ReturnType<typeof load>, el: AnyNode) {
  const node = $(el);
  const text = node.text().replace(/\u200b/g, "").trim();
  const hasMedia = node.find("img, picture, iframe, video, audio").length > 0;
  const hasInteractive = node.find("a, button, input, form").length > 0;
  return !text && !hasMedia && !hasInteractive;
}

function convertInlineBackticksInTextNodes($: ReturnType<typeof load>) {
  const convertChildren = (el: AnyNode) => {
    $(el)
      .contents()
      .each((_, child) => {
        const node = child as unknown as { type?: string; data?: string; name?: string };

        if (node.type === "text" && typeof node.data === "string" && node.data.includes("`")) {
          const parts = node.data.split(/`([^`]+)`/g);
          if (parts.length > 1) {
            const html = parts
              .map((part, index) =>
                index % 2 === 1 ? `<code>${escapeHtml(part)}</code>` : escapeHtml(part)
              )
              .join("");
            $(child).replaceWith(html);
          }
          return;
        }

        if (node.type === "tag" && node.name && !["code", "pre", "script", "style"].includes(node.name)) {
          convertChildren(child);
        }
      });
  };

  $("p, li, blockquote, h1, h2, h3, h4, h5, h6").each((_, el) => convertChildren(el));
}

/**
 * Normalizes imported Substack HTML so it renders well inside Tailwind Typography.
 * Removes newsletter widgets / UI controls and flattens image wrappers.
 */
export function enhanceMediaInHTML(html: string) {
  if (!html) return html;

  const $ = load(html, {}, false);

  // Drop embedded widgets and editor-only controls that render badly without Substack CSS.
  $(
    [
      "script",
      "style",
      "noscript",
      ".subscription-widget-wrap-editor",
      ".subscription-widget",
      ".button-wrapper",
      ".image-link-expand",
      ".restack-image",
      ".view-image",
      ".fake-input-wrapper",
    ].join(",")
  ).remove();

  // Flatten common Substack wrappers around media.
  unwrapElements($, ".captioned-image-container");
  unwrapElements($, ".image2-inset");

  $("a.image-link").each((_, el) => {
    const anchor = $(el);
    if (anchor.find("img, picture").length > 0) {
      anchor.replaceWith(anchor.contents());
    }
  });

  // Turn <div><hr></div> into a plain <hr>.
  $("div").each((_, el) => {
    const node = $(el);
    const children = node.children();
    if (children.length === 1 && children.first().is("hr") && !node.text().trim()) {
      node.replaceWith("<hr>");
    }
  });

  // Strip noisy attrs/classes from imported HTML so prose styles win.
  $("*").each((_, el) => {
    const attribs = (el as unknown as { attribs?: Record<string, string> }).attribs ?? {};
    Object.keys(attribs).forEach((name) => {
      if (name === "class" || name === "style" || name.startsWith("data-")) {
        $(el).removeAttr(name);
      }
    });
  });

  // Normalize links
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href") || "";
    if (/^https?:\/\//i.test(href)) {
      $(el).attr("target", "_blank");
      $(el).attr("rel", "noopener noreferrer");
    }
  });

  // Substack RSS often preserves markdown backticks as literal text.
  // Convert them to real <code> tags so headings/inline terms match Substack rendering.
  convertInlineBackticksInTextNodes($);

  // Remove empty paragraphs/divs left after cleanup.
  $("p, div").each((_, el) => {
    if (isMeaningfullyEmpty($, el)) {
      $(el).remove();
    }
  });

  // Media loading/animation attrs
  $("img").each((_, el) => {
    const img = $(el);
    if (!img.attr("loading")) img.attr("loading", "lazy");
    if (!img.attr("decoding")) img.attr("decoding", "async");
    img.attr("fetchpriority", "low");
    img.addClass("lazy-media");
    if (!img.attr("onload")) img.attr("onload", "this.classList.add('loaded')");
  });

  $("iframe").each((_, el) => {
    const frame = $(el);
    if (!frame.attr("loading")) frame.attr("loading", "lazy");
    frame.addClass("lazy-media");
    if (!frame.attr("onload")) frame.attr("onload", "this.classList.add('loaded')");
  });

  // Wrap pictures/standalone imgs/iframes with a skeleton wrapper (without breaking picture markup).
  $("picture").each((_, el) => {
    const picture = $(el);
    if (picture.parent().is(".media-wrapper")) return;
    picture.wrap('<div class="media-wrapper"></div>');
    picture.before('<div class="media-skeleton"></div>');
  });

  $("img").each((_, el) => {
    const img = $(el);
    if (img.parents("picture").length > 0) return;
    if (img.parent().is(".media-wrapper")) return;
    img.wrap('<div class="media-wrapper"></div>');
    img.before('<div class="media-skeleton"></div>');
  });

  $("iframe").each((_, el) => {
    const frame = $(el);
    if (frame.parent().is(".media-wrapper")) return;
    frame.wrap('<div class="media-wrapper"></div>');
    frame.before('<div class="media-skeleton"></div>');
  });

  return $.html();
}
