import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/Primitives'
import { experience } from '@/data/content'

export function Experience() {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-charcoal/30" />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          label="Journey"
          title="Interactive Timeline"
          subtitle="From student to production software engineer."
          align="center"
        />

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-electric via-purple to-cyan opacity-30 hidden md:block" />

          <div className="space-y-12">
            {experience.map((item, i) => (
              <motion.div
                key={item.phase}
                data-reveal
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <span className="text-xs text-cyan font-medium tracking-wider">{item.period}</span>
                  <h3 className="text-xl font-display font-bold text-white mt-1 mb-2">{item.title}</h3>
                  <p className="text-muted leading-relaxed">{item.description}</p>
                </div>

                <div className="relative z-10 w-16 h-16 rounded-2xl glass flex items-center justify-center glow-blue shrink-0">
                  <span className="text-xs font-bold text-electric uppercase">{item.phase}</span>
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
