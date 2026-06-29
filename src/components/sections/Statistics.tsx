import { motion } from 'framer-motion'
import { AnimatedCounter, SectionHeader } from '@/components/ui/Primitives'
import { stats } from '@/data/content'

export function Statistics() {
  return (
    <section id="stats" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="By The Numbers"
          title="Impact & Growth"
          subtitle="Measurable progress in building real software."
          align="center"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              data-reveal
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glass rounded-2xl p-8 text-center hover:glow-blue transition-all duration-500"
            >
              <p className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
