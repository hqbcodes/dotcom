import type { MetadataRoute } from 'next'
import { siteUrl } from './data/profile'

// One entry per page. Add blog posts and project pages here once they have
// their own routes.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
