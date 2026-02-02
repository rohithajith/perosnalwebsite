"use client";

import { Trophy, Medal, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface AwardProps {
  title: string;
  organization: string;
  year: string;
  description: string;
  tier: "gold" | "silver" | "bronze" | "special";
  pdfUrl?: string;
}

const GRADIENTS = {
  // made gold gradient richer/brighter for light mode
  gold: "from-amber-400 via-yellow-500 to-amber-600",
  silver: "from-slate-200 via-gray-400 to-zinc-600",
  bronze: "from-amber-700 via-orange-600 to-red-600",
  special: "from-emerald-300 via-emerald-500 to-teal-600",
};

const ICONS = {
  gold: Trophy,
  silver: Medal,
  bronze: Medal,
  special: Star,
};

function AwardCard({ title, organization, year, description, tier, pdfUrl }: AwardProps) {
  const Icon = ICONS[tier];
  
  const CardContent = (
    <div className="group relative isolate overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.015] dark:from-white/[0.05] dark:to-white/[0.005] hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      
      {/* 1. Rotating Perimeter Gradient Ring */}
      {/* Utilising a pseudo-border effect via absolute positioning behind content */}
      <div className={cn(
        // slightly stronger base opacity in light mode, reduce in dark
        "absolute -inset-[150%] opacity-30 dark:opacity-20 group-hover:opacity-50 transition-opacity duration-500 animate-spin-slow",
        `bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)]`
      )} />

       {/* Colored Gradient Ring specifically matching tier */}
      <div className={cn(
        // keep a subtle tier color visible in light mode, smaller in dark
        "absolute inset-0 opacity-10 dark:opacity-5 group-hover:opacity-30 dark:group-hover:opacity-20 transition-opacity duration-700",
        `bg-gradient-to-br ${GRADIENTS[tier]}`
      )} />


      {/* 2. Content */}
      <div className="relative z-10 p-6 flex flex-col h-full bg-background/50 backdrop-blur-sm dark:bg-black/20">
        <div className="flex justify-between items-start mb-4">
           <div className={cn("p-3 rounded-xl bg-gradient-to-br opacity-80 group-hover:opacity-100 transition-opacity", GRADIENTS[tier])}>
              <Icon className="h-6 w-6 text-white drop-shadow-md" strokeWidth={1.5} />
           </div>
           <span className="text-sm font-mono text-foreground bg-white/10 dark:bg-white/5 py-1 px-3 rounded-full border border-white/10">
             {year}
           </span>
        </div>
        
        <h3 className="font-bold text-lg mb-1 group-hover:text-blue-500 transition-colors">{title}</h3>
        <p className="text-sm font-medium text-foreground mb-3">{organization}</p>
        <p className="text-sm text-foreground leading-relaxed">
          {description}
        </p>

        {/* 3. Radial Gradient Spotlight Effect */}
        <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
             style={{
               background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255,255,255,0.06), transparent 40%)`
             }}
        />
        
        {/* Simple Top Spotlight for ambient feel */}
        <div className="absolute -inset-[1px] rounded-2xl pointer-events-none">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>
      </div>
    </div>
  );
  
  if (pdfUrl) {
    return (
      <a 
        href={pdfUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {CardContent}
      </a>
    );
  }
  
  return CardContent;
}

export function AwardsSection() {
  return (
    <section className="mt-16 mb-8">
      <h3 className="text-foreground mb-8 font-serif text-3xl">Awards & Achievements</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <AwardCard 
          title="RGU Innovation Award"
          organization="Robert Gordon University"
          year="2025"
          description="Received for outstanding dissertation project (HotelAI) demonstrating exceptional innovation in AI application."
          tier="gold"
          pdfUrl="/Final-A2-poster_2025.pdf"
        />
        <AwardCard 
          title="Hackathon Winner"
          organization="Global-ec & RGU"
          year="2024"
          description="Ideated, developed, and led a team to create a winning machine learning model for solving real-world challenges."
          tier="gold"
        />
      </div>
    </section>
  );
}
