import { motion } from 'framer-motion'
import { HiArrowUp } from 'react-icons/hi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { navLinks, siteConfig } from '@/data/content'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/5">
      <div className="section-padding pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h3 className="font-display text-3xl font-bold text-white mb-4">
                {siteConfig.name}<span className="text-electric">.</span>
              </h3>
              <p className="text-muted leading-relaxed max-w-sm">
                Building production software that solves real business problems.
                SaaS, business systems, and full-stack engineering.
              </p>
            </div>

            <div>
              <h4 className="text-sm text-muted uppercase tracking-wider mb-6">Quick Links</h4>
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-muted hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm text-muted uppercase tracking-wider mb-6">Connect</h4>
              <div className="flex gap-4 mb-6">
                <a
                  href={`https://github.com/${siteConfig.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted hover:text-white transition-all"
                >
                  <FaGithub />
                </a>
                <a
                  href={`https://linkedin.com/in/${siteConfig.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted hover:text-white transition-all"
                >
                  <FaLinkedin />
                </a>
              </div>
              <p className="text-sm text-muted">{siteConfig.email}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
            <p className="text-sm text-muted">
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3 }}
              className="flex items-center gap-2 text-sm text-muted hover:text-white transition-colors"
            >
              Back to top <HiArrowUp />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}
