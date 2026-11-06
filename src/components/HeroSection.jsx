export default function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Availability Pill */}
      <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-card-bg border border-card-border mb-8 backdrop-blur-sm animate-fade-in">
        {/* <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" /> */}
        <span className="text-xs uppercase tracking-widest text-cream font-medium">
          welcome to lifelearncodegraphy.
        </span>
      </div>

      {/* Main Headline */}
      <div className="max-w-4xl">
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] uppercase text-cream mb-6">
          Programmer &amp; videography.
          
        </h1>
        <p className="text-muted text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-2xl mb-10">
          Transforming concepts into striking visual identities, expressive typography, and evocative digital artwork that resonates across print and screen.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="px-8 py-3.5 rounded-full bg-cream text-navy-deep font-semibold text-sm uppercase tracking-wider hover:bg-cream/90 transition-all hover:scale-105 active:scale-95 shadow-lg inline-flex items-center gap-2"
          >
            Explore Work
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full bg-card-bg hover:bg-card-bg/80 text-cream border border-card-border font-semibold text-sm uppercase tracking-wider hover:border-cream/50 transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2"
          >
            Get In Touch
            <span className="text-muted">→</span>
          </a>
        </div>
      </div>

      {/* Key Specializations Row */}
      <div className="mt-16 pt-8 border-t border-card-border grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
        <div>
          <span className="block text-2xl sm:text-3xl font-display text-cream">01</span>
          <span className="text-xs uppercase tracking-wider text-muted font-medium mt-1 block">Digital Illustration</span>
        </div>
        <div>
          <span className="block text-2xl sm:text-3xl font-display text-cream">02</span>
          <span className="text-xs uppercase tracking-wider text-muted font-medium mt-1 block">Custom Typography</span>
        </div>
        <div>
          <span className="block text-2xl sm:text-3xl font-display text-cream">03</span>
          <span className="text-xs uppercase tracking-wider text-muted font-medium mt-1 block">Branding &amp; Identity</span>
        </div>
        <div>
          <span className="block text-2xl sm:text-3xl font-display text-cream">04</span>
          <span className="text-xs uppercase tracking-wider text-muted font-medium mt-1 block">Editorial &amp; Packaging</span>
        </div>
      </div>
    </section>
  );
}
