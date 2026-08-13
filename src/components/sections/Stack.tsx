import { useState } from 'react'
import { SectionIntro } from '@/components/ui/Primitives'
import { stackLayers } from '@/data/content'

export function Stack() {
  const [active, setActive] = useState<{ layer: string; name: string; use: string } | null>(
    null,
  )

  return (
    <section id="stack" className="section bg-surface border-y border-line">
      <div className="container-x">
        <SectionIntro
          label="Tech Stack"
          title="Tools I use to ship."
          lead="Organized by layer — hover a technology to see where I use it."
        />

        <div className="grid lg:grid-cols-[1fr_280px] gap-8">
          <div data-reveal className="space-y-6">
            {stackLayers.map((layer) => (
              <div key={layer.name}>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted mb-3">
                  {layer.name}
                </p>
                <div className="flex flex-wrap gap-2">
                  {layer.items.map((item) => {
                    const isActive =
                      active?.layer === layer.name && active?.name === item.name
                    return (
                      <button
                        key={item.name}
                        onMouseEnter={() =>
                          setActive({ layer: layer.name, name: item.name, use: item.use })
                        }
                        onFocus={() =>
                          setActive({ layer: layer.name, name: item.name, use: item.use })
                        }
                        className={`px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all ${
                          isActive
                            ? 'border-blue bg-blue text-white scale-[1.03]'
                            : 'border-line bg-bg text-ink hover:border-blue/40'
                        }`}
                      >
                        {item.name}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <aside
            data-reveal
            className="rounded-2xl border border-line bg-bg p-6 h-fit sticky top-24"
          >
            <p className="text-[11px] uppercase tracking-wider text-muted mb-2">Selected</p>
            {active ? (
              <>
                <p className="font-display text-xl font-bold text-ink mb-1">{active.name}</p>
                <p className="text-xs text-blue font-semibold mb-3">{active.layer}</p>
                <p className="text-sm text-body leading-relaxed">{active.use}</p>
              </>
            ) : (
              <p className="text-sm text-muted leading-relaxed">
                Hover a technology to see how it fits into the systems I build.
              </p>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}
