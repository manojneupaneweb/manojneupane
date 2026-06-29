import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { MagneticButton, SectionHeader } from '@/components/ui/Primitives'
import { siteConfig } from '@/data/content'

export function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  const contactCards = [
    { icon: HiMail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: HiPhone, label: 'Phone', value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
    { icon: HiLocationMarker, label: 'Location', value: siteConfig.location, href: '#' },
  ]

  return (
    <section id="contact" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Contact"
          title="Let's Build Something"
          subtitle="Have a project in mind? I'm available for freelance work and SaaS collaborations."
        />

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-6" data-reveal>
            {contactCards.map((card) => (
              <motion.a
                key={card.label}
                href={card.href}
                whileHover={{ x: 5 }}
                className="flex items-center gap-5 glass rounded-2xl p-6 hover:glow-blue transition-all duration-500 group"
              >
                <div className="w-14 h-14 rounded-xl bg-electric/10 flex items-center justify-center group-hover:bg-electric/20 transition-colors">
                  <card.icon className="text-electric text-xl" />
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider">{card.label}</p>
                  <p className="text-white font-medium">{card.value}</p>
                </div>
              </motion.a>
            ))}

            <div className="flex items-center gap-2 glass rounded-full px-5 py-3 w-fit">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-muted">{siteConfig.availability}</span>
            </div>

            <div className="flex gap-4 pt-4">
              <a
                href={`https://github.com/${siteConfig.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-muted hover:text-white hover:glow-blue transition-all"
              >
                <FaGithub className="text-xl" />
              </a>
              <a
                href={`https://linkedin.com/in/${siteConfig.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-muted hover:text-white hover:glow-blue transition-all"
              >
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            data-reveal
            className="glass rounded-3xl p-8 md:p-10 space-y-6"
          >
            <h3 className="text-xl font-display font-semibold text-white">Send a Message</h3>

            <div>
              <label htmlFor="name" className="block text-xs text-muted uppercase tracking-wider mb-2">Name</label>
              <input
                id="name"
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-muted/50 focus:outline-none focus:border-electric/50 transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs text-muted uppercase tracking-wider mb-2">Email</label>
              <input
                id="email"
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-muted/50 focus:outline-none focus:border-electric/50 transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs text-muted uppercase tracking-wider mb-2">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-muted/50 focus:outline-none focus:border-electric/50 transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <MagneticButton type="submit" variant="primary" className="w-full">
              {submitted ? 'Message Sent!' : 'Send Message'}
            </MagneticButton>

            {submitted && (
              <p className="text-sm text-cyan text-center">
                Thanks! I'll get back to you soon. For faster response, email me directly.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
