import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/ui/Primitives'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { WhatIBuild } from '@/components/sections/WhatIBuild'
import { Process } from '@/components/sections/Process'
import { Statistics } from '@/components/sections/Statistics'
import { Testimonials } from '@/components/sections/Testimonials'
import { GitHubSection } from '@/components/sections/GitHubSection'
import { Blog } from '@/components/sections/Blog'
import { Contact } from '@/components/sections/Contact'
import { useLenis, useScrollReveal } from '@/hooks/useAnimations'

export default function App() {
  useLenis()
  useScrollReveal()

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <WhatIBuild />
        <Process />
        <Statistics />
        <Testimonials />
        <GitHubSection />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
