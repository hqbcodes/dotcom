import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import BlogList from './components/BlogList'
import OffHours from './components/OffHours'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
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
