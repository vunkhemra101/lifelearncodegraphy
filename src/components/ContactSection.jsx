import { useState } from "react";

export default function ContactSection({ selectedProject }) {
  const [copied, setCopied] = useState(false);
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
            <div className="flex flex-wrap gap-4 text-sm text-muted">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-cream transition-colors">
                GitHub ↗
              </a>
              <a href="https://bsky.app" target="_blank" rel="noreferrer" className="hover:text-cream transition-colors">
                Bluesky ↗
              </a>
              <a href="https://behance.net" target="_blank" rel="noreferrer" className="hover:text-cream transition-colors">
                Behance ↗
              </a>
              <a href="https://dribbble.com" target="_blank" rel="noreferrer" className="hover:text-cream transition-colors">
                Dribbble ↗
              </a>
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
