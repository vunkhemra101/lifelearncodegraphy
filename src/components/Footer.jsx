const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-card-border/80 bg-navy-deep/80 py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <span className="font-display text-cream text-lg tracking-wider uppercase">
            YOUR NAME
          </span>
          <span className="hidden sm:inline text-card-border">•</span>
          <span className="text-xs text-muted">
            Graphic Designer &amp; Illustrator Portfolio
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs uppercase tracking-wider text-muted">
          <a href="#about" className="hover:text-cream transition-colors">
            About
          </a>
          <a href="#work" className="hover:text-cream transition-colors">
            Work
          </a>
          <a href="#contact" className="hover:text-cream transition-colors">
            Contact
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            className="hover:text-cream transition-colors cursor-pointer flex items-center gap-1"
            aria-label="Back to top"
          >
            <span>Top</span>
            <span>↑</span>
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-card-border/40 text-center text-xs text-muted/60">
        © {CURRENT_YEAR} All Rights Reserved. Crafted with React &amp; Tailwind CSS.
      </div>
    </footer>
  );
}
