import { FiExternalLink, FiMapPin, FiSearch, FiShield } from 'react-icons/fi'
import { SectionIntro } from '@/components/ui/Primitives'

const highlights = [
  { icon: FiSearch, label: '1338+ official portals indexed' },
  { icon: FiMapPin, label: '77 districts · 7 provinces · 753 local units' },
  { icon: FiShield, label: 'Verified government links only' },
]

export function PersonalProject() {
  return (
    <section id="personal-project" className="section bg-bg">
      <div className="container-x">
        <SectionIntro
          label="Personal Project"
          title="LinkToGovernment"
          lead="A live product I built to help people find official Nepal government websites instantly."
        />

        <div
          data-reveal
          className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-center rounded-2xl border border-line bg-surface p-6 md:p-10"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue mb-3">
              Live · Nepal
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-ink mb-3">
              Search official Nepal government links in one place.
            </h3>
            <p className="text-body leading-relaxed mb-6 max-w-xl">
              LinkToGovernment is a directory for ministries, municipalities, citizen
              services, notices, and emergency hotlines — built so people can reach
              verified government portals without digging through scattered sources.
            </p>

            <ul className="space-y-3 mb-8">
              {highlights.map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-sm text-ink">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue/10 text-blue">
                    <item.icon />
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>

            <a
              href="https://linktogovernment.com/en"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Visit linktogovernment.com <FiExternalLink />
            </a>
          </div>

          <a
            href="https://linktogovernment.com/en"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border border-line bg-bg p-5 hover:border-blue/35 transition-colors"
          >
            <div className="rounded-lg bg-navy text-white p-5 mb-4">
              <p className="text-[11px] uppercase tracking-wider text-white/50 mb-2">
                Official Government Directory
              </p>
              <p className="font-display text-xl font-bold leading-snug">
                Find Official Nepal Government Links Instantly
              </p>
              <p className="text-sm text-white/55 mt-3">
                Ministries · Municipalities · Services · Notices
              </p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-ink">linktogovernment.com</span>
              <span className="text-blue font-semibold inline-flex items-center gap-1">
                Open <FiExternalLink />
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
