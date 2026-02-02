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

## Environment variables (local & Cloudflare)

- Copy `.env.example` to `.env.local` (or `.env`) and fill in your secret values.
- The repository's `.gitignore` already excludes `.env*` so your secrets won't be committed by accident.

Example:

```bash
cp .env.example .env.local
# then edit .env.local and fill in the values
```

For Cloudflare Pages:
- Add the same variables in the Pages project's dashboard under **Settings → Environment variables** so the build and runtime have access to them.
- For Worker secrets used by `wrangler`, you can also use the CLI: `wrangler secret put NAME` (this stores the secret for Workers).

Security note: never paste secret keys into public issue trackers or share them in plaintext. Use environment variables and Cloudflare's dashboard or secret APIs to keep them safe.
