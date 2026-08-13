import { FiGithub, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi'
import { SectionIntro } from '@/components/ui/Primitives'
import { siteConfig } from '@/data/content'

export function Contact() {
  return (
    <section id="contact" className="section bg-surface border-t border-line">
      <div className="container-x">
        <div className="max-w-3xl mx-auto text-center">
          <SectionIntro
            label="Contact"
            title="Have an idea? Let's build it."
            lead="Tell me about the product or system you need. I'll respond clearly."
          />

          <div className="flex flex-wrap justify-center gap-3 mb-10" data-reveal>
            <a href={`mailto:${siteConfig.email}`} className="btn-primary">
              Start a Conversation
            </a>
            <a
              href={`https://github.com/${siteConfig.github}`}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              <FiGithub /> GitHub
            </a>
            <a
              href={`https://linkedin.com/in/${siteConfig.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              <FiLinkedin /> LinkedIn
            </a>
            <a href={`mailto:${siteConfig.email}`} className="btn-ghost">
              <FiMail /> Email Me
            </a>
          </div>

          <div
            data-reveal
            className="grid sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto"
          >
            <div className="rounded-xl border border-line bg-bg p-4">
              <p className="text-[11px] uppercase tracking-wider text-muted mb-1">Email</p>
              <a href={`mailto:${siteConfig.email}`} className="text-sm font-semibold text-ink break-all">
                {siteConfig.email}
              </a>
            </div>
            <div className="rounded-xl border border-line bg-bg p-4">
              <p className="text-[11px] uppercase tracking-wider text-muted mb-1">Location</p>
              <p className="text-sm font-semibold text-ink flex items-center gap-2">
                <FiMapPin className="text-blue" /> {siteConfig.location}
              </p>
            </div>
            <div className="rounded-xl border border-line bg-bg p-4">
              <p className="text-[11px] uppercase tracking-wider text-muted mb-1">Availability</p>
              <p className="text-sm font-semibold text-ink flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Open to work
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
