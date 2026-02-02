import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { getSubstackPosts } from '@/lib/rss'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getSubstackPosts()
  
  const postsUrls = posts.map((post) => ({
    url: `${SITE_CONFIG.url}/blog/${post.slug}`,
    lastModified: new Date(post.pubDate),
  }))

  const routes = [
    '',
    '/blog',
    '/notes',
    '/about',
    '/contact',
  ].map((route) => ({
    url: `${SITE_CONFIG.url}${route}`,
    lastModified: new Date(),
  }))

  return [...routes, ...postsUrls]
}
