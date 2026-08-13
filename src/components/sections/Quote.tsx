export function Quote() {
  return (
    <section className="relative px-5 sm:px-8 lg:px-12 py-16 md:py-20 bg-surface border-y border-line">
      <div className="max-w-3xl mx-auto text-center" data-reveal>
        <span className="font-display text-5xl md:text-6xl text-blue/20 leading-none select-none" aria-hidden>
          “
        </span>
        <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-ink leading-snug -mt-4">
          A project isn’t about showcasing complex code; it’s about solving
          real-world problems.
        </blockquote>
        <p className="mt-6 text-sm font-medium text-muted tracking-wide">
          — Manoj Neupane
        </p>
      </div>
    </section>
  )
}
