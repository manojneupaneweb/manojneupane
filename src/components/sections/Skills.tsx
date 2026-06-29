import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader } from '@/components/ui/Primitives'
import { skillCategories, softSkills } from '@/data/content'

const positions = [
  { top: '8%', left: '50%' },
  { top: '30%', left: '85%' },
  { top: '70%', left: '78%' },
  { top: '82%', left: '50%' },
]

export function Skills() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-charcoal/50" />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          label="Expertise"
          title="Technology Orbit"
          subtitle="Interactive skill visualization — not boring progress bars."
          align="center"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative w-full aspect-square max-w-md mx-auto" data-reveal>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full glass flex items-center justify-center glow-blue z-10">
                <span className="font-display font-bold text-white text-sm text-center leading-tight">
                  Manoj<br />Neupane
                </span>
              </div>
            </div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
              <circle cx="200" cy="200" r="130" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="6 6" />
            </svg>

            {skillCategories.map((cat, i) => {
              const pos = positions[i] || positions[0]
              return (
                <motion.button
                  key={cat.name}
                  onClick={() => setActiveCategory(i)}
                  whileHover={{ scale: 1.1 }}
                  animate={{ scale: activeCategory === i ? 1.12 : 1 }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${
                    activeCategory === i ? 'glass glow-blue z-20' : 'bg-surface border border-white/5 z-10'
                  }`}
                  style={{ top: pos.top, left: pos.left }}
                >
                  <span className="w-3 h-3 rounded-full mb-1" style={{ backgroundColor: cat.color }} />
                  <span className="text-[10px] font-medium text-white">{cat.name}</span>
                </motion.button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
              data-reveal
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: skillCategories[activeCategory].color }}
                />
                <h3 className="text-2xl font-display font-bold text-white">
                  {skillCategories[activeCategory].name}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {skillCategories[activeCategory].skills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass rounded-xl px-5 py-4 hover:glow-blue transition-all duration-300 group cursor-default"
                  >
                    <span className="text-white font-medium group-hover:text-electric transition-colors">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-8">
                <h4 className="text-sm text-muted uppercase tracking-wider mb-4">Soft Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-full text-xs text-muted border border-white/10 hover:border-electric/30 hover:text-white transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
