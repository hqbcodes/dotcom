import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import BlogList from './components/BlogList'
import OffHours from './components/OffHours'
import Footer from './components/Footer'
import { contactLinks, profile, siteUrl } from './data/profile'

// Tells search engines who the site is about and links the profiles below to it.
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  url: siteUrl,
  jobTitle: profile.jobTitle,
  description: profile.about,
  worksFor: { '@type': 'Organization', name: profile.employer },
  sameAs: contactLinks.map((link) => link.href).filter((href) => href.startsWith('https://')),
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Nav />
      <main>
        <Hero />
        <Projects />
        <OffHours />
        <BlogList />
      </main>
      <Footer />
    </>
  )
}
