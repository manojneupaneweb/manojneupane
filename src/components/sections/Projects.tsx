import {
  FiLayers,
  FiShield,
  FiDatabase,
  FiServer,
  FiGitBranch,
  FiUsers,
  FiFileText,
  FiBookOpen,
  FiLayout,
  FiCloud,
} from 'react-icons/fi'
import { SectionIntro } from '@/components/ui/Primitives'
import { complexWork } from '@/data/content'

const icons = [
  FiUsers,
  FiLayers,
  FiShield,
  FiLayout,
  FiDatabase,
  FiServer,
  FiFileText,
  FiBookOpen,
  FiGitBranch,
  FiCloud,
]

export function Projects() {
  return (
    <section id="projects" className="section bg-navy text-white">
      <div className="container-x">
        <SectionIntro
          label="Work"
          title="Complex systems I work on."
          lead="Not basic landing pages — architecture-heavy software that most developers avoid."
          light
        />

        <div className="grid sm:grid-cols-2 gap-3 md:gap-4" data-reveal>
          {complexWork.map((item, i) => {
            const Icon = icons[i % icons.length]
            return (
              <article
                key={item.title}
                className="group flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-blue/40 hover:bg-white/[0.06] transition-colors"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue/15 text-[#bfdbfe] group-hover:bg-blue group-hover:text-white transition-colors">
                  <Icon className="text-lg" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/55 leading-relaxed">{item.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
