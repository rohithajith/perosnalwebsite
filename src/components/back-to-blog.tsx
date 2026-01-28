"use client"

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function BackToBlog() {
  const searchParams = useSearchParams();
  const referrer = searchParams.get("referrer") || "blog";
  const backHref = referrer === "notes" ? "/notes" : "/blog";
  const backLabel = referrer === "notes" ? "Back to Newsletter" : "Back to Blog";

  const handleClick = () => {
    try {
      // Clear scroll data before navigating away
      sessionStorage.removeItem("blog-scroll");
      sessionStorage.removeItem("blog-scroll-source");
    } catch (e) {
      // ignore
    }
  };

  return (
    <Link 
      href={backHref}
      onClick={handleClick}
      className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 mb-8 transition-colors"
    >
      <ArrowLeft className="mr-2 h-4 w-4" /> {backLabel}
    </Link>
  );
}
