import {
  FiGlobe,
  FiLayers,
  FiBriefcase,
  FiLayout,
  FiBookOpen,
  FiServer,
  FiDatabase,
  FiCloud,
} from 'react-icons/fi'
import { SectionIntro } from '@/components/ui/Primitives'
import { services } from '@/data/content'

const icons = [FiGlobe, FiLayers, FiBriefcase, FiLayout, FiBookOpen, FiServer, FiDatabase, FiCloud]

export function Services() {
  return (
    <section id="services" className="section bg-bg">
      <div className="container-x">
        <SectionIntro
          label="Services"
          title="What I can build for you."
          lead="Focused delivery — no fluff, no overdesigned cards."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3" data-reveal>
          {services.map((service, i) => {
            const Icon = icons[i % icons.length]
            return (
              <div
                key={service.title}
                className="group rounded-xl border border-line bg-surface p-5 hover:border-blue/35 transition-colors"
              >
                <Icon className="text-blue mb-3 text-xl" />
                <h3 className="font-display font-semibold text-ink mb-1">{service.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
