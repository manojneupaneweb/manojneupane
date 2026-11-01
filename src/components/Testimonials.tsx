import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="section" aria-labelledby="testimonials-heading">
      <div className="container">
        <h2 id="testimonials-heading" className="section-title mb-8">
          What people say
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((item) => (
            <figure key={item.name} className="card">
              <blockquote className="text-sm text-[#4e5563] leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold text-[#16181c]">{item.name}</span>
                <span className="block text-[#4e5563]">{item.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
