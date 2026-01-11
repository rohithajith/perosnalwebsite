"use client";

import { useForm, ValidationError } from '@formspree/react';

export default function ContactPage() {
  const [state, handleSubmit] = useForm("YOUR_FORMSPREE_ID"); // REPLACE WITH YOUR ID

  if (state.succeeded) {
      return (
         <div className="mx-auto max-w-3xl px-6 py-12 text-center">
            <h1 className="text-3xl font-bold mb-4">Thanks for reaching out!</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">I'll get back to you soon.</p>
         </div>
      );
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-12">
       <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Contact</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Send me a message below.</p>
       </div>

       <form onSubmit={handleSubmit} className="space-y-6">
         <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
               Email Address
            </label>
            <input
               id="email"
               type="email" 
               name="email"
               className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-background px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               placeholder="you@example.com"
            />
            <ValidationError 
               prefix="Email" 
               field="email"
               errors={state.errors}
               className="text-red-500 text-sm mt-1"
            />
         </div>
         
         <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
               Message
            </label>
            <textarea
               id="message"
               name="message"
               rows={5}
               className="flex w-full rounded-md border border-gray-300 dark:border-gray-700 bg-background px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               placeholder="Your message..."
            />
            <ValidationError 
               prefix="Message" 
               field="message"
               errors={state.errors}
               className="text-red-500 text-sm mt-1"
            />
         </div>

         <button 
            type="submit" 
            disabled={state.submitting}
            className="w-full inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none dark:ring-offset-gray-900 transition-colors"
         >
            {state.submitting ? "Sending..." : "Send Message"}
         </button>
       </form>
    </div>
  );
}
