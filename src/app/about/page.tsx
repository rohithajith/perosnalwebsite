import { SITE_CONFIG } from "@/lib/constants";
import { MapPin, Book, Globe } from "lucide-react";
import { ContactSection } from "@/components/contact-section";
import Image from "next/image";

export const metadata = {
  title: "About Me",
  description: `About ${SITE_CONFIG.name}`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:py-20">

      <div className="grid md:grid-cols-[300px_1fr] gap-8 md:gap-12">
        {/* Left Column: Profile */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:justify-start md:pt-0 mt-6 md:mt-24">
          <div className="h-64 w-64 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-800 mx-auto md:mx-0 mb-6">
            <Image
              src="/profile.jpeg"
              alt="Profile picture"
              width={256}
              height={256}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          
          <div className="space-y-4 w-full">
            
            <div className="space-y-2 text-sm text-foreground -ml-[5px]"> 
               <div className="flex items-center justify-center md:justify-start gap-2">
                 <MapPin className="h-4 w-4" />
                 <span>Aberdeen, UK</span> 
               </div>
               <div className="flex items-center justify-center md:justify-start gap-2">
                 <Book className="h-4 w-4" />
                 <span>Data Scientist</span>
               </div>
               <div className="flex items-center justify-center md:justify-start gap-2">
                 <Globe className="h-4 w-4" />
                 <span>Language - English</span>
               </div>
               <div className="flex items-center justify-center md:justify-start gap-2">
                 <span className="h-2 w-2 rounded-full bg-green-500"></span>
                 <span>Open to Work</span>
               </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bio */}
        <div className="prose dark:prose-invert prose-lg text-foreground max-w-none">
          <p>
            I am a <strong>Visionary Data Scientist</strong> with hands-on expertise in AI models and agents,
            passionate about designing autonomous AI systems that turn ambitious ideas into real-world solutions.
          </p>
          <p>
            My specialization lies in <strong>full-stack AI agent architectures, LLMs, and intelligent product automation</strong>. 
            I thrive on igniting innovation through cutting-edge technology.
          </p>
        </div>
      </div>
      
      <ContactSection />
    </div>
  );
}
