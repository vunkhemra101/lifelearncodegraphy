import { useState, useRef, useEffect } from "react";

const FB_LINKS = [
  { label: "Personal Account", url: "https://www.facebook.com/share/1G1JiuaxgG/?mibextid=wwXIfr" },
  { label: "Facebook Page", url: "https://www.facebook.com/share/1H4wZfUs36/?mibextid=wwXIfr" },
  { label: "Facebook Page", url: "https://www.facebook.com/share/18vSavh6Xe/?mibextid=wwXIfr" },
];

const OTHER_SOCIAL_LINKS = [
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@vunkhemra?_r=1&_t=ZS-9BNNGbgepne",
    icon: (
      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/the_realvunkhemra?srtk=MWF3cjhlaTFuNGduNw%3D%3D&utm_source=qr",
    icon: (
      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "Telegram",
    url: "https://t.me/vunkhemra",
    icon: (
      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
];

export default function ContactSection({ selectedProject }) {
  const [copied, setCopied] = useState(false);
  const [fbOpen, setFbOpen] = useState(false);
  const fbRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fbRef.current && !fbRef.current.contains(event.target)) {
        setFbOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setFbOpen(false);
      }
    };
    if (fbOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [fbOpen]);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: selectedProject ? `Inquiry regarding: ${selectedProject.title}` : "Brand Identity",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const email = "hello@designerportfolio.art";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-6 md:px-10 max-w-7xl mx-auto border-t border-card-border/60">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Info Column */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted block mb-3">
              03 / Connect
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-cream uppercase tracking-tight mb-6 leading-none">
              Let's Build Something Remarkable
            </h2>
            <p className="text-muted text-base sm:text-lg leading-relaxed mb-8">
              Whether you need a custom brand identity, editorial illustration, packaging design, or want to collaborate on a creative venture, I'd love to discuss your vision.
            </p>

            {/* Email quick copy */}
            <div className="p-4 rounded-xl bg-card-bg border border-card-border flex items-center justify-between gap-4 mb-6">
              <div>
                <span className="block text-xs uppercase tracking-wider text-muted">Direct Email</span>
                <span className="text-cream font-mono text-sm sm:text-base font-medium">{email}</span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="px-3.5 py-2 rounded-lg bg-navy-deep border border-card-border hover:border-cream/50 text-xs uppercase tracking-wider text-cream font-medium transition-colors cursor-pointer"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-6 border-t border-card-border">
            <span className="block text-xs uppercase tracking-wider text-muted mb-3 font-medium">Follow &amp; Connect</span>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
              {/* Facebook Dropdown */}
              <div
                ref={fbRef}
                className="relative"
                onMouseEnter={() => setFbOpen(true)}
                onMouseLeave={() => setFbOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setFbOpen((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                    fbOpen ? "text-cream" : "hover:text-cream"
                  }`}
                  aria-expanded={fbOpen}
                  aria-haspopup="true"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  <span>Facebook</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${fbOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {fbOpen && (
                  <div className="absolute left-0 top-full pt-1.5 z-30 min-w-[170px]">
                    <div className="py-1.5 rounded-xl bg-navy-deep/95 border border-card-border shadow-2xl backdrop-blur-md flex flex-col divide-y divide-card-border/30">
                      {FB_LINKS.map((item) => (
                        <a
                          key={item.url}
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => setFbOpen(false)}
                          className="px-3.5 py-2 text-xs text-muted hover:text-cream hover:bg-card-bg/70 transition-colors flex items-center justify-between group"
                        >
                          <span className="font-medium">{item.label}</span>
                          <span className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Other Social Links */}
              {OTHER_SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-cream transition-colors"
                >
                  {link.icon}
                  <span>{link.name} ↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-card-bg border border-card-border">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-cream uppercase mb-2">Message Received!</h3>
                <p className="text-muted text-sm max-w-md mx-auto mb-6">
                  Thank you for reaching out. I'll review your project details and get back to you within 24–48 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: "", email: "", projectType: "Brand Identity", message: "" });
                  }}
                  className="px-6 py-2.5 rounded-full border border-card-border text-xs uppercase tracking-wider text-cream hover:bg-card-bg transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs uppercase tracking-wider text-muted mb-2 font-medium">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-navy-deep/80 border border-card-border text-cream placeholder-muted/40 focus:border-cream focus:outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-wider text-muted mb-2 font-medium">
                      Your Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-navy-deep/80 border border-card-border text-cream placeholder-muted/40 focus:border-cream focus:outline-none transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-xs uppercase tracking-wider text-muted mb-2 font-medium">
                    Project Focus
                  </label>
                  <select
                    id="projectType"
                    value={formState.projectType}
                    onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-navy-deep/80 border border-card-border text-cream focus:border-cream focus:outline-none transition-colors text-sm"
                  >
                    <option value="Illustration">Digital Illustration</option>
                    <option value="Brand Identity">Brand Identity &amp; Guidelines</option>
                    <option value="Typography">Custom Typography / Lettering</option>
                    <option value="Packaging">Packaging &amp; Label Design</option>
                    <option value="Art Direction">Art Direction &amp; General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider text-muted mb-2 font-medium">
                    Project Details &amp; Timeline
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    required
                    placeholder="Tell me about your project, goals, deliverables, and estimated timeline..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-navy-deep/80 border border-card-border text-cream placeholder-muted/40 focus:border-cream focus:outline-none transition-colors text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-cream text-navy-deep font-semibold text-sm uppercase tracking-wider hover:opacity-95 transition-opacity cursor-pointer shadow-lg mt-2"
                >
                  Send Inquiry →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
