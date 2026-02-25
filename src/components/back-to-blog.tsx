"use client"

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function BackToBlog() {
  const searchParams = useSearchParams();
  const referrer = searchParams.get("referrer") || "blog";
  const backHref = referrer === "notes" ? "/notes" : "/blog";
  const backLabel = referrer === "notes" ? "Back to Newsletter" : "Back to Blog";

  return (
    <Link 
      href={backHref}
      className="inline-flex items-center text-sm text-foreground/70 hover:text-foreground mb-8 transition-colors"
    >
      <ArrowLeft className="mr-2 h-4 w-4" /> {backLabel}
    </Link>
  );
}
