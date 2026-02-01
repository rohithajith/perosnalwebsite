import { SITE_CONFIG } from "@/lib/constants";
import { MapPin, Book } from "lucide-react";
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
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 md:justify-center md:h-full">
          <div className="h-64 w-64 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-800 mx-auto md:mx-0 -mt-4">
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
            
            <div className="space-y-2 text-sm text-black dark:text-gray-400 -ml-[5px]"> 
               <div className="flex items-center justify-center md:justify-start gap-2">
                 <MapPin className="h-4 w-4" />
                 <span>Aberdeen, UK</span> 
               </div>
               <div className="flex items-center justify-center md:justify-start gap-2">
                 <Book className="h-4 w-4" />
                 <span>Data Scientist</span>
               </div>
               <div className="flex items-center justify-center md:justify-start gap-2">
                 <span className="h-2 w-2 rounded-full bg-green-500"></span>
                 <span>Open to Work</span>
               </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bio */}
        <div className="prose dark:prose-invert prose-lg text-black dark:text-gray-400 max-w-none">
          <p>
            I am a <strong>Visionary Data Scientist</strong> with hands-on expertise in AI models and agents,
            passionate about designing autonomous AI systems that turn ambitious ideas into real-world solutions.
          </p>
          <p>
            My specialization lies in <strong>full-stack AI agent architectures, LLMs, and intelligent product automation</strong>. 
            I thrive on igniting innovation through cutting-edge technology.
          </p>
          
          <h3 className="text-foreground mt-8 mb-4 font-serif text-2xl">Experience</h3>
          
          <div className="not-prose space-y-8">
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-foreground text-lg">HotelAI (MSc Dissertation)</h4>
                <span className="text-sm text-black dark:text-gray-400">2025</span>
              </div>
              <p className="text-sm text-black dark:text-gray-400 mb-2">Creator • RGU, Aberdeen</p>
              <ul className="list-disc list-outside ml-4 text-base space-y-1 text-black dark:text-gray-400">
                <li>Developed a self-driving AI system to manage hotel operations and guest experiences end-to-end.</li>
                <li>Fine-tuned a local LLaMA 3.2 model using 500+ synthetic dialogues via Nvidia Nemotron.</li>
                <li>Built LangGraph agents for check-in, ID verification, room service, and complaint handling.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-foreground text-lg">Blackbucks Pvt Ltd</h4>
                <span className="text-sm text-black dark:text-gray-400">09/2021 - 02/2022</span>
              </div>
              <p className="text-sm text-black dark:text-gray-400 mb-2">AI ML Teaching Assistant</p>
              <ul className="list-disc list-outside ml-4 text-base space-y-1 text-black dark:text-gray-400">
                <li>Supported instructors in delivering AI/ML course materials and assisted students with complex concepts.</li>
                <li>Provided guidance on practical implementation of AI/ML algorithms, tools, and techniques.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-foreground text-lg">Qubit AI Technologies</h4>
                <span className="text-sm text-black dark:text-gray-400">09/2020 - 05/2021</span>
              </div>
              <p className="text-sm text-black dark:text-gray-400 mb-2">Product Intern</p>
              <ul className="list-disc list-outside ml-4 text-base space-y-1 text-black dark:text-gray-400">
                <li>Developed a Drowsiness Detection edge device (Raspberry Pi) using computer vision to alert distracted drivers.</li>
                <li>Created an OCR content extractor for structured & unstructured documents.</li>
                <li>Conducted load testing on servers using JMeter and Python scripts.</li>
              </ul>
            </div>
          </div>

          <h3 className="text-foreground mt-8 mb-4 font-serif text-2xl">Technical Skills</h3>
          <ul className="list-disc">
             <li><strong>Tech Stack:</strong> Python, AWS, Deep Learning, OpenCV, TensorFlow, Scikit-Learn, Raspberry Pi.</li>
          </ul>

        </div>
      </div>
      
      <ContactSection />
    </div>
  );
}