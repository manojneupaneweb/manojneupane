import { useEffect, useState } from 'react'
import { FiEye, FiExternalLink, FiGitBranch, FiGithub, FiStar } from 'react-icons/fi'
import { SectionIntro } from '@/components/ui/Primitives'
import { siteConfig } from '@/data/content'

interface GitHubUser {
  login: string
  avatar_url: string
  bio: string | null
  html_url: string
  public_repos: number
  followers: number
  following: number
}

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  language: string | null
}

const languageColor: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  PHP: '#4f5d95',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572a5',
  Blade: '#f7523f',
}

function isAllowedUrl(url: string, hosts: string[]) {
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'https:') return false
    return hosts.some(
      (host) => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`),
    )
  } catch {
    return false
  }
}

export function GitHubSection() {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const username = encodeURIComponent(siteConfig.github)
    let cancelled = false

    Promise.all([
      fetch(`https://api.github.com/users/${username}`).then(async (r) => {
        if (!r.ok) throw new Error('user')
        return r.json()
      }),
      fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
      ).then(async (r) => {
        if (!r.ok) throw new Error('repos')
        return r.json()
      }),
    ])
      .then(([userData, repoData]) => {
        if (cancelled) return
        if (
          userData?.login &&
          isAllowedUrl(userData.html_url, ['github.com']) &&
          isAllowedUrl(userData.avatar_url, ['githubusercontent.com', 'github.com'])
        ) {
          setUser(userData)
        }
        if (Array.isArray(repoData)) {
          setRepos(
            repoData.filter(
              (repo: GitHubRepo) =>
                repo?.html_url && isAllowedUrl(repo.html_url, ['github.com']),
            ),
          )
        }
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="github" className="section bg-navy text-white">
      <div className="container-x">
        <SectionIntro
          label="Open Source"
          title="GitHub Activity"
          lead="Live data from my development workflow."
          light
        />

        {loading ? (
          <div className="space-y-4" data-reveal>
            <div className="h-36 rounded-2xl bg-white/5 animate-pulse" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-40 rounded-2xl bg-white/5 animate-pulse" />
              ))}
            </div>
          </div>
        ) : error ? (
          <div data-reveal className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
            <p className="text-white/60 text-sm mb-4">
              GitHub data is temporarily unavailable.
            </p>
            <a
              href={`https://github.com/${siteConfig.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue"
            >
              <FiGithub /> View GitHub profile
            </a>
          </div>
        ) : (
          <>
            {user && (
              <div
                data-reveal
                className="mb-6 flex flex-col md:flex-row md:items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6"
              >
                <img
                  src={user.avatar_url}
                  alt={`${user.login} GitHub avatar`}
                  width={80}
                  height={80}
                  className="h-16 w-16 md:h-20 md:w-20 rounded-full border border-white/15 object-cover shrink-0"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0">
                  <p className="font-display text-xl font-bold text-white">@{user.login}</p>
                  <p className="text-sm text-white/55 mt-1 leading-relaxed max-w-2xl">
                    {user.bio ||
                      `Building production software. Reach me at ${siteConfig.email}`}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-6 text-sm">
                    <div>
                      <p className="font-bold text-white">{user.public_repos}</p>
                      <p className="text-xs text-white/40">Repositories</p>
                    </div>
                    <div>
                      <p className="font-bold text-white">{user.followers}</p>
                      <p className="text-xs text-white/40">Followers</p>
                    </div>
                    <div>
                      <p className="font-bold text-white">{user.following}</p>
                      <p className="text-xs text-white/40">Following</p>
                    </div>
                  </div>
                </div>

                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 self-start md:self-center px-5 py-2.5 rounded-full bg-white/10 border border-white/10 text-sm font-semibold text-white hover:bg-white hover:text-navy transition-colors"
                >
                  <FiGithub /> View Profile
                </a>
              </div>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" data-reveal>
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 hover:border-blue/40 hover:bg-white/[0.07] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <FiGithub className="text-white/40 group-hover:text-blue transition-colors" />
                    <h3 className="font-display font-semibold text-white truncate">
                      {repo.name}
                    </h3>
                    <FiExternalLink className="ml-auto text-white/25 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-white/45 line-clamp-2 mb-5 flex-1 min-h-[2.5rem]">
                    {repo.description || 'No description available'}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-white/45">
                    {repo.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            background: languageColor[repo.language] || '#94a3b8',
                          }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <FiStar /> {repo.stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <FiGitBranch /> {repo.forks_count}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <FiEye /> {repo.watchers_count}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
