import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Equal 14-degree radial spacing inside the fan, comfortably below the top line
  const links = [
    { label: "Home", href: "#home", angle: -12 },
    { label: "About", href: "#about", angle: -26 },
    { label: "Work", href: "#work", angle: -40 },
    { label: "Contact", href: "#contact", angle: -54 },
  ];

  const handleClick = (e, href) => {
    setMenuOpen(false);
    if (href === "#home") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <>
      {/* ── Fixed & Sticky Navbar Bar on Mobile & Desktop ── */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#040e1c]/85 border-b border-card-border/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3.5 sm:px-8 sm:py-4 relative">
          {/* Logo / Brand Name */}
          <a
            href="#"
            className="text-cream text-base sm:text-xl md:text-2xl tracking-wide hover:text-cyan-300 transition-colors duration-200 select-none font-audiowide"
            style={{ fontFamily: '"Audiowide", sans-serif' }}
            aria-label="lifelearncodegraphy Home"
          >
            lifelearncodegraphy
            
          </a>

          {/* Right Hamburger / Fan Menu Trigger */}
          <div ref={menuRef} className="relative">
            <div className="flex items-center gap-3">
              <span
                className="text-xs uppercase tracking-widest text-muted font-medium hidden sm:inline select-none transition-colors"
                aria-hidden="true"
              >
                {menuOpen ? "Close" : "Menu"}
              </span>

              {/* Circular Toggle Button */}
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close navigation fan menu" : "Open navigation fan menu"}
                aria-expanded={menuOpen}
                className="relative w-11 h-11 rounded-full flex items-center justify-center bg-[#071C2C]/85 border border-cyan-400/40 hover:border-cyan-400 hover:bg-[#09253b] text-cream transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.18)] hover:shadow-[0_0_24px_rgba(0,240,255,0.38)] focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <div className="relative w-5 h-5 flex items-center justify-center pointer-events-none">
                  {/* Hamburger Icon */}
                  <Menu
                    className={`absolute w-5 h-5 text-cream transition-all duration-300 transform ${
                      menuOpen ? "rotate-90 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"
                    }`}
                    aria-hidden={menuOpen}
                  />
                  {/* Close (X) Icon */}
                  <X
                    className={`absolute w-5 h-5 text-cream transition-all duration-300 transform ${
                      menuOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-90 opacity-0 scale-50"
                    }`}
                    aria-hidden={!menuOpen}
                  />
                </div>
              </button>
            </div>

            {/* ── Circular Fan-Shaped Dropdown Menu Container ── */}
            <div
              className={`absolute right-0 top-full mt-2 w-[290px] sm:w-[350px] aspect-[400/420] pointer-events-none z-50 transition-all ${
                menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
              }`}
              style={{
                transformOrigin: "top right",
                transform: menuOpen
                  ? "scale(1) rotate(0deg)"
                  : "scale(0.3) rotate(-25deg) translateY(-20px)",
                transition:
                  "transform 380ms cubic-bezier(0.16, 1, 0.3, 1), opacity 260ms ease",
                filter: "drop-shadow(0 20px 45px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 25px rgba(0, 240, 255, 0.16))",
              }}
              aria-hidden={!menuOpen}
            >
              {/* 1. SVG Fan Background with Frosted Glass Blur */}
              <svg
                viewBox="0 0 400 420"
                className="absolute inset-0 w-full h-full select-none pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Fan Sector Clip Path */}
                  <clipPath id="fanBlurClip">
                    <path d="M 400 0 L 25 0 A 375 375 0 0 0 275 352 L 400 0 Z" />
                  </clipPath>
                </defs>

                {/* Frosted Glass Blur layer clipped directly to the fan shape */}
                <foreignObject width="400" height="420" clipPath="url(#fanBlurClip)">
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backdropFilter: "blur(24px)",
                      WebkitBackdropFilter: "blur(24px)",
                      backgroundColor: "rgba(4, 18, 30, 0.65)",
                    }}
                  />
                </foreignObject>

                {/* Glass Outline & Ambient Rim Tint */}
                <path
                  d="M 400 0 L 25 0 A 375 375 0 0 0 275 352 L 400 0 Z"
                  fill="rgba(6, 26, 44, 0.15)"
                  stroke="#38bdf8"
                  strokeWidth="1.25"
                  strokeOpacity="0.5"
                />

                {/* Concentric Cyber Rings at Pivot Corner */}
                <circle cx="400" cy="0" r="45" stroke="#38bdf8" strokeWidth="2" fill="none" opacity="0.75" />
                <circle cx="400" cy="0" r="80" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.4" />
                <circle cx="400" cy="0" r="120" stroke="#38bdf8" strokeWidth="0.75" strokeDasharray="6 4" fill="none" opacity="0.2" />

                {/* Radial Guide Lines */}
                <line x1="400" y1="0" x2="25" y2="0" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="0.75" />
                <line x1="400" y1="0" x2="275" y2="352" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="0.75" />
              </svg>

              {/* 2. Radially Angled Navigation Links: "Home", "About", "Work", "Contact" (Below top line, equally spaced) */}
              <nav
                className="absolute inset-0 w-full h-full pointer-events-none select-none"
                aria-label="Fan navigation"
              >
                {links.map((link) => (
                  <div
                    key={link.href}
                    className="absolute top-0 right-0 pointer-events-none flex items-center justify-start"
                    style={{
                      width: "100%",
                      height: "44px",
                      transformOrigin: "top right",
                      transform: `rotate(${link.angle}deg)`,
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleClick(e, link.href)}
                      tabIndex={menuOpen ? 0 : -1}
                      className="pointer-events-auto pl-10 sm:pl-12 font-body font-bold text-lg sm:text-xl md:text-2xl text-cream hover:text-cyan-300 uppercase tracking-widest transition-all duration-200 hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(0,240,255,0.7)] cursor-pointer drop-shadow-md inline-block py-1"
                    >
                      {link.label}
                    </a>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* ── Subtle Dim Backdrop to close on mobile when clicking outside ── */}
      <div
        className={`fixed inset-0 z-40 bg-black/35 backdrop-blur-xs transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
    </>
  );
}
