export type ContactLink = {
  label: string
  text: string
  href: string
}

export const profile = {
  name: 'Henry Burke',
  host: 'henry@shipping',
  jobTitle: 'Software Engineer',
  employer: 'Walmart Global Tech',
  about:
    'Software engineer at Walmart Global Tech, building tools for pharmacy teams across 4,500+ stores.',
  /** Search-result and link-preview description; keep it under ~160 characters. */
  description:
    'Henry Burke, software engineer at Walmart Global Tech building tools for pharmacy teams across 4,500+ stores, and co-owner of BurntBase.',
}

/**
 * The site's public origin, used for canonical URLs, the sitemap and link
 * previews. Set NEXT_PUBLIC_SITE_URL to pin it; otherwise Vercel's production
 * domain is used (also on preview deploys, so canonicals point at production).
 */
const vercelProductionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelProductionHost ? `https://${vercelProductionHost}` : 'http://localhost:3000')

export const contactLinks: ContactLink[] = [
  { label: 'github', text: 'github.com/hqbcodes', href: 'https://github.com/hqbcodes' },
  { label: 'linkedin', text: 'linkedin.com/in/hqburke', href: 'https://linkedin.com/in/hqburke' },
  { label: 'email', text: 'hqbcodes@gmail.com', href: 'mailto:hqbcodes@gmail.com' },
  // Resume is parked until there's a real URL; uncomment to bring it back.
  // { label: 'resume', text: '[RESUME URL]', href: '#contact' },
]
