import { useEffect, useState } from 'react'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { navLinks, siteConfig } from '@/data/content'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-md border-b border-line py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container-x flex items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#home" className="font-display text-lg font-bold tracking-tight text-ink">
            {siteConfig.name.split(' ')[0]}
            <span className="text-blue">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-[13px] font-medium text-body hover:text-ink transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="ml-3 btn-primary py-2 px-4 text-xs">
              Let's Talk
            </a>
          </nav>

          <button
            className="md:hidden text-ink text-2xl"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-md md:hidden flex flex-col items-center justify-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display text-2xl font-bold text-ink"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-primary mt-4"
          >
            Let's Talk
          </a>
        </div>
      )}
    </>
  )
}
