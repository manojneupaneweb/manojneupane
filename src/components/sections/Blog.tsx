import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/Primitives'
import { blogPosts } from '@/data/content'

export function Blog() {
  return (
    <section id="blog" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-charcoal/30" />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          label="Blog"
          title="Writing & Learning"
          subtitle="Articles, tutorials, and development notes — coming soon."
          align="center"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.title}
              data-reveal
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-8 hover:glow-blue transition-all duration-500 group cursor-pointer"
            >
              <span className="text-xs text-cyan font-medium tracking-wider">{post.tag}</span>
              <h3 className="text-lg font-display font-semibold text-white mt-3 mb-3 group-hover:text-electric transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-4">{post.excerpt}</p>
              <span className="text-xs text-muted">{post.date}</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
