import { motion } from 'framer-motion'
import {
  HiGlobeAlt,
  HiAcademicCap,
  HiCloud,
  HiViewGrid,
  HiCube,
  HiShieldCheck,
  HiCode,
  HiDatabase,
  HiServer,
} from 'react-icons/hi'
import { SectionHeader } from '@/components/ui/Primitives'
import { services } from '@/data/content'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  globe: HiGlobeAlt,
  school: HiAcademicCap,
  saas: HiCloud,
  panel: HiViewGrid,
  inventory: HiCube,
  auth: HiShieldCheck,
  api: HiCode,
  database: HiDatabase,
  deploy: HiServer,
}

export function WhatIBuild() {
  return (
    <section id="services" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="What I Build"
          title="Services & Solutions"
          subtitle="Production software for businesses, schools, and SaaS products."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || HiCode
            return (
              <motion.div
                key={service.title}
                data-reveal
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-8 group hover:glow-blue transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-electric/10 flex items-center justify-center mb-6 group-hover:bg-electric/20 transition-colors">
                  <Icon className="text-electric text-xl" />
                </div>
                <h3 className="text-lg font-display font-semibold text-white mb-3 group-hover:text-electric transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{service.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
