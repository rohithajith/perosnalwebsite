"use client";

import { useForm, ValidationError } from "@formspree/react";
import { Mail, MapPin, Clock } from "lucide-react";

export function ContactSection() {
  const [state, handleSubmit] = useForm("YOUR_FORMSPREE_ID"); // Replace with actual ID or handle via props

  if (state.succeeded) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-2xl font-bold text-green-500 mb-4">Message Sent!</h3>
        <p className="text-gray-400">Thanks for reaching out. I&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="mt-24 pt-16 border-t border-gray-200 dark:border-gray-800">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif mb-4">Let&apos;s Connect</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          I&apos;m actively seeking new opportunities and would love to discuss how my skills can contribute to your team&apos;s success.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 md:gap-24">
        {/* Left Column: Contact Info */}
        <div className="space-y-12">
          <div>
             <h3 className="text-2xl font-bold mb-4">Get In Touch</h3>
             <p className="text-gray-400 leading-relaxed mb-8">
               I&apos;m passionate about creating innovative solutions and would be excited to join a team where I can make a meaningful impact. Whether you&apos;re looking for a software engineer, AI specialist, or creative problem solver, I&apos;d love to hear about opportunities.
             </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
               <div className="p-3 bg-blue-500/10 rounded-full text-blue-500">
                 <Mail className="h-6 w-6" />
               </div>
               <div>
                  <h4 className="font-semibold text-foreground">Email</h4>
                  <a href="mailto:reachrohith@outlook.com" className="text-gray-400 hover:text-blue-500 transition-colors">reachrohith@outlook.com</a>
               </div>
            </div>
            
            <div className="flex items-start gap-4">
               <div className="p-3 bg-blue-500/10 rounded-full text-blue-500">
                 <MapPin className="h-6 w-6" />
               </div>
               <div>
                  <h4 className="font-semibold text-foreground">Location</h4>
                  <p className="text-gray-400">Aberdeen, UK</p>
               </div>
            </div>

            <div className="flex items-start gap-4">
               <div className="p-3 bg-blue-500/10 rounded-full text-blue-500">
                 <Clock className="h-6 w-6" />
               </div>
               <div>
                  <h4 className="font-semibold text-foreground">Availability</h4>
                  <p className="text-gray-400">Open to new opportunities</p>
               </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            {/* Social Icons if needed, already in Footer typically */}
          </div>
        </div>

        {/* Right Column: Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/10">
           <div className="space-y-2">
             <label htmlFor="name" className="text-sm font-medium text-gray-500">Name</label>
             <input
               id="name"
               type="text" 
               name="name"
               placeholder="Your name"
               className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black/40 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
               required
             />
             <ValidationError prefix="Name" field="name" errors={state.errors} />
           </div>

           <div className="space-y-2">
             <label htmlFor="email" className="text-sm font-medium text-gray-500">Email</label>
             <input
               id="email"
               type="email" 
               name="email"
               placeholder="your.email@example.com"
               className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black/40 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
               required
             />
             <ValidationError prefix="Email" field="email" errors={state.errors} />
           </div>

           <div className="space-y-2">
             <label htmlFor="message" className="text-sm font-medium text-gray-500">Message</label>
             <textarea
               id="message"
               name="message"
               placeholder="Tell me about the role or opportunity..."
               rows={4}
               className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black/40 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
               required
             />
             <ValidationError prefix="Message" field="message" errors={state.errors} />
           </div>

           <button 
             type="submit" 
             disabled={state.submitting}
             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
           >
             Send Message
           </button>
        </form>
      </div>
    </div>
  );
}
