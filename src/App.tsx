import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/ui/Primitives'
import { Hero } from '@/components/sections/Hero'
import { Quote } from '@/components/sections/Quote'
import { About } from '@/components/sections/About'
import { Engineering } from '@/components/sections/Engineering'
import { Stack } from '@/components/sections/Stack'
import { Projects } from '@/components/sections/Projects'
import { BehindInterface } from '@/components/sections/BehindInterface'
import { Journey } from '@/components/sections/Journey'
import { PersonalProject } from '@/components/sections/PersonalProject'
import { Services } from '@/components/sections/Services'
import { Contact } from '@/components/sections/Contact'
import { useLenis, useReveal } from '@/hooks/useAnimations'

export default function App() {
  useLenis()
  useReveal()

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Quote />
        <Journey />
        <About />
        <Engineering />
        <Stack />
        <Projects />
        <BehindInterface />
        <PersonalProject />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
