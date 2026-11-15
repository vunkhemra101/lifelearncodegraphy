import { useState, useEffect } from "react";
import foldedImg from "../assets/image.png";
import normalImg from "../assets/image-normal.png";
import HalftoneHeroImage from "./HalftoneHeroImage";

export default function HeroSection() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Progress from 0 (normal pose) to 1 (folded arms) over 140px of scroll
          const scrollY = window.scrollY;
          const threshold = 140;
          const p = Math.min(Math.max(scrollY / threshold, 0), 1);
          setScrollProgress(p);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative pt-6 sm:pt-10 md:pt-14 pb-16 md:pb-24 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Hero Top: 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-end">
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Availability Pill */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-card-bg border border-card-border mb-6 sm:mb-8 backdrop-blur-sm animate-fade-in">
            <span className="text-xs uppercase tracking-widest text-cream font-medium">
              welcome to lifelearncodegraphy.
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.92] uppercase text-cream mb-6">
            Programmer &amp;
            <span className="block">photography.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-muted text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-xl mb-8 sm:mb-10">
            Welcome to my website. Everything here reflects my personal experiences, as well as various projects I have developed through self-study, research, and personal interests. Currently, I am a university student.
          </p>
    
          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="px-8 py-3.5 rounded-full bg-cream text-navy-deep font-semibold text-sm uppercase tracking-wider hover:bg-cream/90 transition-all hover:scale-105 active:scale-95 shadow-lg inline-flex items-center gap-2 cursor-pointer"
            >
              Explore Work
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-full bg-card-bg hover:bg-card-bg/80 text-cream border border-card-border font-semibold text-sm uppercase tracking-wider hover:border-cream/50 transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
            >
              Get In Touch
              <span className="text-muted">→</span>
            </a>
          </div>
        </div>

        {/* Right Column: Person Image with Interactive WebGL Halftone Matrix Hover & Scroll-Driven Pose */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end items-end relative mt-8 lg:mt-0">
          <HalftoneHeroImage
            normalSrc={normalImg}
            foldedSrc={foldedImg}
            scrollProgress={scrollProgress}
            alt="Programmer"
          />
        </div>
      </div>

      {/* Key Specializations Row */}
      <div className="mt-16 sm:mt-20 pt-8 border-t border-card-border grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
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
