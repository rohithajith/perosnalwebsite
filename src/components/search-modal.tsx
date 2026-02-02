"use client";
import { useState, useEffect, useRef } from "react";
import { Search, FileText, Loader } from "lucide-react";
import Link from "next/link";

interface SearchResult {
  title: string;
  description: string;
  href: string;
}

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const cacheRef = useRef<SearchResult[]>([]);

  // Fetch all blog posts once on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/posts.json");
        if (res.ok) {
          const posts = await res.json();
          cacheRef.current = posts.map((post: any) => ({
            title: post.title,
            description: post.contentSnippet || post.description || "",
            href: `/blog/${post.slug}?referrer=search`,
          }));
        }
      } catch (e) {
        console.error("Failed to fetch posts:", e);
      } finally {
        setLoading(false);
      }
    };

    if (open && cacheRef.current.length === 0) {
      fetchPosts();
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  // Search as user types
  useEffect(() => {
    const q = query.toLowerCase().trim();
    if (q) {
      const filtered = cacheRef.current.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-background border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <Search className="w-5 h-5 text-foreground/60" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-base text-foreground placeholder-gray-400 focus:outline-none"
            placeholder="Search blogs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {loading && <Loader className="w-4 h-4 text-foreground/60 animate-spin" />}
          {!loading && (
            <button
              className="text-xs text-foreground/60 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
              onClick={onClose}
            >
              ESC
            </button>
          )}
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {loading && cacheRef.current.length === 0 ? (
            <div className="text-foreground/60 text-center py-12">
              <Loader className="w-5 h-5 animate-spin mx-auto mb-2" />
              Loading blogs...
            </div>
          ) : !query ? (
            <div className="text-foreground/60 text-center py-8 text-sm">
              Start typing to search...
            </div>
          ) : results.length === 0 ? (
            <div className="text-foreground/60 text-center py-12">
              No results found for &quot;{query}&quot;
            </div>
          ) : (
            <div>
              <div className="px-3 py-2 text-xs font-semibold text-foreground/70 uppercase tracking-wider">
                Blogs ({results.length})
              </div>
              {results.map((item, idx) => (
                <Link
                  key={`blog-${idx}`}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-start gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="mt-1 text-blue-500">
                    <FileText className="w-4 h-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground truncate">
                      {item.title}
                    </div>
                    <div className="text-sm text-foreground/70 line-clamp-2">
                      {item.description || "No description available"}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

