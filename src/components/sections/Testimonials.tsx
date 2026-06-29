import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/Primitives'
import { testimonials } from '@/data/content'

export function Testimonials() {
  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-charcoal/30" />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          label="Testimonials"
          title="What People Say"
          subtitle="Feedback from clients and collaborators."
          align="center"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              data-reveal
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-8 hover:glow-blue transition-all duration-500"
            >
              <p className="text-muted leading-relaxed mb-8 text-sm italic">
                "{item.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric to-purple flex items-center justify-center text-white font-bold">
                  {item.avatar}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
