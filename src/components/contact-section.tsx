"use client";

import { useState } from "react";
import { Mail, MapPin, Clock } from "lucide-react";

function AnimatedSuccess() {
  return (
    <div className="py-12 text-center success-container">
      <div className="success-check" aria-hidden>
        <svg viewBox="0 0 64 64" width="96" height="96" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.12" />
          <circle cx="32" cy="32" r="22" fill="none" stroke="#10b981" strokeWidth="4" opacity="0.18" />
          <path className="check" d="M18 34 L28 44 L46 22" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="success-text">
        <h3 className="text-2xl font-bold text-green-500">Message Sent!</h3>
        <p className="text-foreground">Thanks for reaching out. I&apos;ll get back to you soon.</p>
      </div>

      {/* removed 'Send another' button as requested */}
    </div>
  );
}

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<null | "idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      // Submit to Formspree endpoint
      const res = await fetch("https://formspree.io/f/xnjzdygz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data?.error || data?.message || "Failed to send message");
        setStatus("error");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setErrorMsg(message || "Failed to send message");
      setStatus("error");
    }
  }
  if (status === "sent") {
    return <AnimatedSuccess />;
  }

  return (
    <div className="mt-24 pt-16 border-t border-gray-200 dark:border-gray-800">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif mb-4">Let&apos;s Connect</h2>
        <p className="text-foreground max-w-2xl mx-auto">
          I&apos;m actively seeking new opportunities and would love to discuss how my skills can contribute to your team&apos;s success.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 md:gap-24">
        {/* Left Column: Contact Info */}
        <div className="space-y-12">
          <div>
             <h3 className="text-2xl font-bold mb-4">Get In Touch</h3>
             <p className="text-foreground leading-relaxed mb-8">
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
                  <a href="mailto:rohithajith2405@gmail.com" className="text-foreground hover:text-blue-500 transition-colors">rohithajith2405@gmail.com</a>
               </div>
            </div>
            
            <div className="flex items-start gap-4">
               <div className="p-3 bg-blue-500/10 rounded-full text-blue-500">
                 <MapPin className="h-6 w-6" />
               </div>
               <div>
                  <h4 className="font-semibold text-foreground">Location</h4>
                  <p className="text-foreground">Aberdeen, UK</p>
               </div>
            </div>

            <div className="flex items-start gap-4">
               <div className="p-3 bg-blue-500/10 rounded-full text-blue-500">
                 <Clock className="h-6 w-6" />
               </div>
               <div>
                  <h4 className="font-semibold text-foreground">Availability</h4>
                  <p className="text-foreground">Open to new opportunities</p>
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
             <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
             <input
               id="name"
               type="text" 
               name="name"
               value={name}
               onChange={(e) => setName(e.target.value)}
               placeholder="Your name"
               className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black/40 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
               required
             />
           </div>

           <div className="space-y-2">
             <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
             <input
               id="email"
               type="email" 
               name="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder="your.email@example.com"
               className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black/40 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
               required
             />
           </div>

           <div className="space-y-2">
             <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
             <textarea
               id="message"
               name="message"
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               placeholder="Tell me about the role or opportunity..."
               rows={4}
               className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black/40 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
               required
             />
           </div>

           {status === "error" && (
             <div className="text-sm text-red-500">{errorMsg || "Failed to send message."}</div>
           )}

           <button 
             type="submit" 
             disabled={status === "sending"}
             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
           >
             {status === "sending" ? "Sending..." : "Send Message"}
           </button>
        </form>
      </div>
    </div>
  );
}
