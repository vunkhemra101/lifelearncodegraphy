import { useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import NetworkBackground from "./components/NetworkBackground";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { projects } from "./data/projects";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [inquiryProject, setInquiryProject] = useState(null);

  // Extract categories dynamically
  const categories = useMemo(() => {
    const list = ["All"];
    projects.forEach((p) => {
      if (!list.includes(p.category)) {
        list.push(p.category);
      }
    });
    return list;
  }, []);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleInquire = (project) => {
    setInquiryProject(project);
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen text-cream font-body selection:bg-cream selection:text-navy-deep relative pt-16 sm:pt-20 overflow-x-clip">
      <NetworkBackground />
      <Navbar />

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Selected Works / Portfolio Section */}
        <section id="work" className="py-20 md:py-28 px-6 md:px-10 max-w-7xl mx-auto border-t border-card-border/60">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-muted block mb-3">
                02 / Portfolio
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-cream uppercase tracking-tight leading-none">
                Selected Works
              </h2>
            </div>
            <p className="text-muted text-sm sm:text-base max-w-md">
              A curated catalog of visual identity, experimental lettering, book covers, and digital artwork created for diverse mediums.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
            {categories.map((cat) => {
              const count = cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-cream text-navy-deep font-semibold shadow-md"
                      : "bg-card-bg text-muted border border-card-border hover:border-cream/40 hover:text-cream"
                  }`}
                >
                  {cat} <span className="opacity-70 text-[10px]">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(proj) => setActiveModalProject(proj)}
              />
            ))}
          </div>

          {/* Empty state fallback */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16 bg-card-bg rounded-2xl border border-card-border">
              <p className="text-muted text-base mb-4">No projects found in this category.</p>
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className="px-5 py-2 rounded-full bg-cream text-navy-deep text-xs uppercase tracking-wider font-semibold cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          )}
        </section>

        {/* Contact Section */}
        <ContactSection selectedProject={inquiryProject} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Detail Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        onInquire={handleInquire}
      />
    </div>
  );
}
