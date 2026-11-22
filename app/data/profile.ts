export type ContactLink = {
  label: string
  text: string
  href: string
}

export const profile = {
  name: 'Henry Burke',
  host: 'henry@shipping',
  about:
    'Software engineer at Walmart Global Tech, building tools for pharmacy teams across 4,500+ stores.',
}

export const contactLinks: ContactLink[] = [
  { label: 'github', text: 'github.com/Pigf00d', href: 'https://github.com/Pigf00d' },
  { label: 'linkedin', text: 'linkedin.com/in/hqburke', href: 'https://linkedin.com/in/hqburke' },
  { label: 'email', text: 'hqbcodes@gmail.com', href: 'mailto:hqbcodes@gmail.com' },
  // Resume is parked until there's a real URL; uncomment to bring it back.
  // { label: 'resume', text: '[RESUME URL]', href: '#contact' },
]
