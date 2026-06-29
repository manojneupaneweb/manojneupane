import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/Primitives'
import { processSteps } from '@/data/content'

export function Process() {
  return (
    <section id="process" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-charcoal/40" />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          label="Methodology"
          title="How I Build Software"
          subtitle="A disciplined process from discovery to deployment."
          align="center"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.step}
              data-reveal
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative group"
            >
              <div className="glass rounded-2xl p-6 h-full hover:glow-blue transition-all duration-500">
                <span className="text-4xl font-display font-bold text-white/10 group-hover:text-electric/30 transition-colors">
                  {step.step}
                </span>
                <h3 className="text-lg font-display font-semibold text-white mt-4 mb-2">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.description}</p>
              </div>
              {i < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-white/10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
