import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/Primitives'
import { aboutTimeline } from '@/data/content'

export function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="About"
          title="Engineer. Problem Solver. Builder."
          subtitle="I don't just write code — I build systems that businesses run on."
        />

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div data-reveal className="space-y-6">
            <p className="text-lg text-muted leading-relaxed">
              I'm <span className="text-white font-medium">Manoj Neupane</span>, a Full Stack Developer
              and IT student from Nepal. I specialize in building production software — from SaaS platforms
              and business management systems to school portals and authentication infrastructure.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              My approach is simple: understand the business problem first, architect a clean solution,
              and ship software that performs reliably in production. I work primarily with{' '}
              <span className="text-electric">Laravel</span>,{' '}
              <span className="text-purple">React</span>,{' '}
              <span className="text-cyan">Tailwind CSS</span>, and{' '}
              <span className="text-white">MySQL</span> — but I choose tools based on what the project needs.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              From inventory management and student result portals to upcoming medical SaaS products,
              every project I build is designed with clean architecture, performance, and real-world usability in mind.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-6">
              {['Laravel', 'React', 'SaaS', 'REST APIs', 'MySQL', 'Deployment'].map((tag) => (
                <div key={tag} className="glass rounded-xl px-4 py-3 text-sm text-muted hover:text-white transition-colors">
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />
            <div className="space-y-8">
              {aboutTimeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  data-reveal
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="relative pl-16"
                >
                  <div className="absolute left-4 top-2 w-4 h-4 rounded-full border-2 border-electric bg-void" />
                  <span className="text-xs text-cyan font-medium tracking-wider">{item.year}</span>
                  <h3 className="text-xl font-display font-semibold text-white mt-1 mb-2">{item.title}</h3>
                  <p className="text-muted leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
