import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiExternalLink, HiCode } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'
import { SectionHeader } from '@/components/ui/Primitives'
import { projects, type Project } from '@/data/content'

function ProjectCard({ project, isActive }: { project: Project; isActive: boolean }) {
  return (
    <motion.div
      layout
      className={`glass rounded-3xl overflow-hidden transition-all duration-500 ${
        isActive ? 'glow-blue' : 'opacity-60 hover:opacity-100'
      }`}
      style={{ borderColor: isActive ? project.accent : undefined }}
    >
      <div className="h-48 relative overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ background: `linear-gradient(135deg, ${project.accent}22, ${project.accent}08)` }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-4xl font-bold" style={{ color: `${project.accent}44` }}>
                {project.title.split(' ').map((w) => w[0]).join('').slice(0, 3)}
              </span>
            </div>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span
            className="text-xs px-3 py-1 rounded-full font-medium"
            style={{ backgroundColor: `${project.accent}22`, color: project.accent }}
          >
            {project.status === 'upcoming' ? 'Upcoming' : project.status === 'live' ? 'Live' : 'Completed'}
          </span>
        </div>
      </div>

      <div className="p-8">
        <p className="text-xs text-muted uppercase tracking-wider mb-2">{project.category}</p>
        <h3 className="text-2xl font-display font-bold text-white mb-2">{project.title}</h3>
        <p className="text-sm text-cyan mb-4">{project.tagline}</p>

        <div className="space-y-4 mb-6">
          <div>
            <h4 className="text-xs text-muted uppercase tracking-wider mb-1">Problem</h4>
            <p className="text-sm text-muted leading-relaxed">{project.problem}</p>
          </div>
          <div>
            <h4 className="text-xs text-muted uppercase tracking-wider mb-1">Solution</h4>
            <p className="text-sm text-muted leading-relaxed">{project.solution}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span key={t} className="text-xs px-3 py-1 rounded-full bg-white/5 text-muted">
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted hover:text-white transition-colors">
              <FaGithub /> GitHub
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-electric hover:text-white transition-colors">
              <HiExternalLink /> Live Demo
            </a>
          )}
          {!project.github && !project.live && (
            <span className="flex items-center gap-2 text-sm text-muted">
              <HiCode /> Production Project
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Featured Work"
          title="Production Projects"
          subtitle="Real software built for real businesses — not tutorial clones."
        />

        <div className="flex gap-3 mb-10 overflow-x-auto pb-4" data-reveal>
          {projects.map((project, i) => (
            <button
              key={project.id}
              onClick={() => setActiveIndex(i)}
              className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeIndex === i
                  ? 'bg-electric text-white'
                  : 'glass text-muted hover:text-white'
              }`}
            >
              {project.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <ProjectCard project={projects[activeIndex]} isActive />
          </motion.div>
        </AnimatePresence>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12" data-reveal>
          {projects.slice(0, 4).map((project) => (
            <div
              key={project.id}
              className="glass rounded-2xl p-6 hover:glow-blue transition-all duration-300 cursor-pointer group"
              onClick={() => setActiveIndex(projects.indexOf(project))}
            >
              <div
                className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: `${project.accent}22`, color: project.accent }}
              >
                {project.title[0]}
              </div>
              <h4 className="font-display font-semibold text-white group-hover:text-electric transition-colors">
                {project.title}
              </h4>
              <p className="text-xs text-muted mt-1">{project.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
