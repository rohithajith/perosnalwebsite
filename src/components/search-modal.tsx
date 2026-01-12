"use client";
import { useState, useEffect, useRef } from "react";
import { Search, FileText } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [posts, setPosts] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
      // fetch posts from API route
      setLoading(true);
      fetch("/api/posts")
        .then((r) => r.json())
        .then((data) => {
          setPosts(data.posts || []);
        })
        .catch(() => setPosts([]))
        .finally(() => setLoading(false));
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

  // Use posts fetched from server
  const allResults: SearchResult[] = posts;

  const q = query.toLowerCase().trim();
  const filtered = q
    ? allResults.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      )
    : allResults;

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
          <Search className="w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-base text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none"
            placeholder="Search blogs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
            onClick={onClose}
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="text-gray-400 text-center py-12">
              No results found for &quot;{query}&quot;
            </div>
          ) : (
            <div>
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Blogs ({filtered.length})
              </div>
              {filtered.map((item, idx) => (
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
                    <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                      {item.description}
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
