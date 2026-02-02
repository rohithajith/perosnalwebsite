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
          
          <h3 className="text-foreground mt-8 mb-4 font-serif text-2xl">Experience</h3>
          
          <div className="not-prose space-y-8">
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-foreground text-lg">Price Optimization based on Price Elasticity of Demand</h4>
              </div>
              <p className="text-sm text-foreground mb-2">Built a pricing optimization framework for a cafe menu using price elasticity of demand to find profit-maximizing price points while preserving demand.</p>
              <ul className="list-disc list-outside ml-4 text-base space-y-1 text-foreground">
                <li><strong>Problem & Impact:</strong> Focused on highly price-sensitive products (burgers, coke, lemonade, coffee), balancing margin and volume to avoid revenue loss and improve profitability across events, weekends, and weather conditions.</li>
                <li><strong>What I Built:</strong> Loaded and joined product, transaction and calendar data (holidays, weekends, seasons, temperature); performed EDA and data cleaning; modeled price elasticity with regression (statsmodels OLS); derived demand curves and simulated revenue/profit across price points to identify optimal prices and actionable recommendations.</li>
                <li><strong>Tech Stack:</strong> Python, Pandas, NumPy, Statsmodels, Matplotlib, Seaborn, Jupyter Notebook.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-foreground text-lg">End-to-End ML Pipeline for Truck Delay Prediction</h4>
              </div>
              <p className="text-sm text-foreground mb-2">Built an end-to-end machine learning data pipeline to tackle truck delay prediction for a logistics use case, enabling data-driven decisions around on-time deliveries and operational efficiency.</p>
              <ul className="list-disc list-outside ml-4 text-base space-y-1 text-foreground">
                <li><strong>Problem & Impact:</strong> Designed the solution around delayed truck shipments, focusing on reducing operational costs, improving customer satisfaction, and optimizing route planning under varying traffic and weather conditions.</li>
                <li><strong>What I Built:</strong> Set up relational data infrastructure on AWS RDS (PostgreSQL & MySQL); performed SQL-based analysis and data validation; configured an AWS SageMaker notebook environment; implemented EDA, preprocessing, and feature engineering; integrated Hopsworks Feature Store to create and serve reusable feature groups.</li>
                <li><strong>Tech Stack:</strong> Python, SQL, NumPy, Pandas, Matplotlib, Seaborn, PyMySQL, Psycopg2, PostgreSQL, MySQL, AWS RDS, AWS SageMaker, Hopsworks, MySQL Workbench, pgAdmin4.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-foreground text-lg">HotelAI (MSc Dissertation)</h4>
                <span className="text-sm text-foreground">2025</span>
              </div>
              <p className="text-sm text-foreground mb-2">Creator • RGU, Aberdeen</p>
              <ul className="list-disc list-outside ml-4 text-base space-y-1 text-foreground">
                <li><strong>Problem & Impact:</strong> Built to help hotels, resorts and short-stay hosts deliver personalized, always-on guest support, automate routine workflows, and increase upsell revenue — all while keeping data on-prem for privacy and low latency.</li>
                <li><strong>What I Built:</strong> Architected a modular LLM-agent platform with a SupervisorAgent that routes requests to specialized agents (CheckinAgent, RoomServiceAgent, MaintenanceAgent, EmergencyAgent, WellnessAgent). Fine-tuned a quantized Llama 3B model on synthetic guest dialogues for on-site deployment; integrated LangChain RAG pipelines for retrieval-augmented responses; implemented a realtime memory component to capture guest preferences and context-aware behaviour; and designed an ethical data-collection & retraining loop to continuously improve agents from anonymised usage data.</li>
                <li><strong>Tech Stack:</strong> Llama 3.x (3B, quantized), LangChain, custom LLM agents, on-prem deployment, synthetic data generation, CRM integrations.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-foreground text-lg">Blackbucks Pvt Ltd</h4>
                <span className="text-sm text-foreground">09/2021 - 02/2022</span>
              </div>
              <p className="text-sm text-foreground mb-2">AI ML Teaching Assistant</p>
              <ul className="list-disc list-outside ml-4 text-base space-y-1 text-foreground">
                <li>Supported instructors in delivering AI/ML course materials and assisted students with complex concepts.</li>
                <li>Provided guidance on practical implementation of AI/ML algorithms, tools, and techniques.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-foreground text-lg">Qubit AI Technologies</h4>
                <span className="text-sm text-foreground">09/2020 - 05/2021</span>
              </div>
              <p className="text-sm text-foreground mb-2">Product Intern</p>
              <ul className="list-disc list-outside ml-4 text-base space-y-1 text-foreground">
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