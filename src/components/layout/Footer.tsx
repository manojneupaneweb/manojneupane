import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { navLinks, siteConfig } from '@/data/content'

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-x px-5 sm:px-8 lg:px-12 py-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <p className="font-display text-lg font-bold text-ink">
            {siteConfig.name}
            <span className="text-blue">.</span>
          </p>
          <p className="text-sm text-muted mt-1">
            Full Stack Web Developer · {siteConfig.location}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-body">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-blue transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 text-ink">
          <a
            href={`mailto:${siteConfig.email}`}
            aria-label="Email"
            className="hover:text-blue transition-colors"
          >
            <FiMail size={18} />
          </a>
          <a
            href={`https://github.com/${siteConfig.github}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-blue transition-colors"
          >
            <FiGithub size={18} />
          </a>
          <a
            href={`https://linkedin.com/in/${siteConfig.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue transition-colors"
          >
            <FiLinkedin size={18} />
          </a>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  )
}
