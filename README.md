# Personal Website

A minimalistic personal website built with Next.js (App Router) and Tailwind CSS.
Features Substack RSS integration for blog posts.

## Features

- **Blog**: Fetches posts from Substack RSS feed.
- **Notes**: Placeholder for Substack Notes or short updates.
- **About & Contact**: Static pages with Formspree contact form.
- **Dark Mode**: Automatic system detection with manual toggle.
- **SEO**: Sitemap, Robots.txt, and Meta tags.

## Configuration

1. Open `src/lib/constants.ts` and update your personal information:
   - `name`, `tagline`, `description`
   - `substack.username` (Crucial for fetching posts)
   - `social` links
2. Open `src/app/contact/page.tsx` and update the Formspree ID.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).
