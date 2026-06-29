import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaStar, FaCodeBranch, FaEye } from 'react-icons/fa'
import { SectionHeader } from '@/components/ui/Primitives'
import { siteConfig } from '@/data/content'

interface GitHubRepo {
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  watchers_count: number
}

interface GitHubUser {
  public_repos: number
  followers: number
  following: number
  avatar_url: string
  bio: string | null
}

export function GitHubSection() {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${siteConfig.github}`),
          fetch(`https://api.github.com/users/${siteConfig.github}/repos?sort=updated&per_page=6`),
        ])
        if (userRes.ok) setUser(await userRes.json())
        if (reposRes.ok) setRepos(await reposRes.json())
      } catch {
        // Graceful fallback
      } finally {
        setLoading(false)
      }
    }
    fetchGitHub()
  }, [])

  return (
    <section id="github" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Open Source"
          title="GitHub Activity"
          subtitle="Live data from my development workflow."
        />

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="glass rounded-2xl p-8 h-40 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {user && (
              <motion.div
                data-reveal
                className="glass rounded-2xl p-8 mb-10 flex flex-col md:flex-row items-center gap-8"
              >
                <img
                  src={user.avatar_url}
                  alt="GitHub avatar"
                  className="w-24 h-24 rounded-full border-2 border-electric/30"
                  loading="lazy"
                />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    @{siteConfig.github}
                  </h3>
                  <p className="text-muted text-sm mb-4">{user.bio || 'Full Stack Developer building production software.'}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-6">
                    <div>
                      <p className="text-2xl font-bold text-white">{user.public_repos}</p>
                      <p className="text-xs text-muted">Repositories</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{user.followers}</p>
                      <p className="text-xs text-muted">Followers</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{user.following}</p>
                      <p className="text-xs text-muted">Following</p>
                    </div>
                  </div>
                </div>
                <a
                  href={`https://github.com/${siteConfig.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full glass text-white hover:glow-blue transition-all"
                >
                  <FaGithub /> View Profile
                </a>
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo, i) => (
                <motion.a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-reveal
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="glass rounded-2xl p-6 hover:glow-blue transition-all duration-500 block"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <FaGithub className="text-muted" />
                    <h4 className="font-display font-semibold text-white">{repo.name}</h4>
                  </div>
                  <p className="text-sm text-muted mb-4 line-clamp-2">
                    {repo.description || 'No description available.'}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-electric" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1"><FaStar /> {repo.stargazers_count}</span>
                    <span className="flex items-center gap-1"><FaCodeBranch /> {repo.forks_count}</span>
                    <span className="flex items-center gap-1"><FaEye /> {repo.watchers_count}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
