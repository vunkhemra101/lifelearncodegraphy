import ToolIcon from "./ToolIcon";

export default function AboutSection() {
  const tools = [
    // "Adobe Illustrator",
    "Adobe Photoshop",
    "Capcut",
    "Visual Studio Code",
    "Figma",
    "DaVinci Resolve",
    // "Color Theory",
    // "Art Direction",
  ];

  return (
    <section id="about" className="py-20 md:py-28 px-6 md:px-10 max-w-7xl mx-auto border-t border-card-border/60">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Heading & Philosophy */}
        <div className="lg:col-span-5">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted block mb-3">
            01 / Background
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-cream uppercase tracking-tight mb-6 leading-none">
            Coding With Real &amp; Editing
          </h2>
          <div className="w-16 h-1 bg-cream/30 rounded-full mb-8" />

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-card-bg border border-card-border">
              <span className="font-display text-3xl text-cream block">5+</span>
              <span className="text-xs uppercase tracking-wider text-muted">Featured Works</span>
            </div>
            <div className="p-4 rounded-xl bg-card-bg border border-card-border">
              <span className="font-display text-3xl text-cream block">4+</span>
              <span className="text-xs uppercase tracking-wider text-muted">Core Disciplines</span>
            </div>
          </div>
        </div>

        {/* Right Column: Bio & Toolkit */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <p className="text-cream/90 text-lg sm:text-xl font-light leading-relaxed">
            Hello! I'm Vun Khemra, a passionate web developer, content creator, and lifelong learner. I enjoy coding, exploring new technologies, and sharing knowledge through digital media.
          </p>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            Currently, I'm a 2st-year student at the Royal University of Phnom Penh (RUPP), majoring in Computer Science and Engineering. I'm passionate about building modern web applications, developing my programming skills, and creating meaningful digital experiences.
          </p>

          {/* Toolkit */}
          <div className="mt-4 pt-6 border-t border-card-border">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cream mb-4">
              Disciplines &amp; Tools
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card-bg border border-card-border text-xs tracking-wider uppercase text-muted hover:text-cream hover:border-cream/40 transition-all duration-200 group cursor-default"
                >
                  <ToolIcon name={tool} className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                  <span>{tool}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
