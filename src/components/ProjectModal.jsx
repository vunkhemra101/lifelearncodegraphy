import { useEffect } from "react";
import ProjectArt from "./ProjectArt";

export default function ProjectModal({ project, onClose, onInquire }) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleInquireClick = () => {
    onClose();
    if (onInquire) {
      onInquire(project);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-navy-deep/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0a2e3d] border border-card-border rounded-2xl shadow-2xl p-6 sm:p-8 text-cream"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-navy-deep/60 hover:bg-navy-deep text-cream/70 hover:text-cream border border-card-border transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Artwork Header */}
        <div className="rounded-xl overflow-hidden mb-6 border border-card-border shadow-inner">
          <ProjectArt project={project} />
        </div>

        {/* Project Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span
            className="text-xs uppercase tracking-widest px-3 py-1 rounded-full font-semibold"
            style={{
              backgroundColor: `${project.color}25`,
              color: project.color,
              border: `1px solid ${project.color}50`,
            }}
          >
            {project.category}
          </span>
          <span className="text-xs text-muted">Project #{project.id.toString().padStart(2, "0")}</span>
        </div>

        <h2 id="modal-project-title" className="font-display text-3xl sm:text-4xl text-cream tracking-wide mb-4">
          {project.title}
        </h2>

        <p className="text-muted text-base sm:text-lg leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Project Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-card-bg border border-card-border mb-6">
          <div>
            <span className="block text-xs uppercase tracking-wider text-muted/70 mb-1">Discipline</span>
            <span className="text-sm font-medium text-cream">{project.category}</span>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wider text-muted/70 mb-1">Color Accent</span>
            <div className="flex items-center gap-2">
              <span
                className="w-3.5 h-3.5 rounded-full border border-cream/20 inline-block"
                style={{ backgroundColor: project.color }}
              />
              <span className="text-sm font-mono text-cream">{project.color}</span>
            </div>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wider text-muted/70 mb-1">Availability</span>
            <span className="text-sm font-medium text-[#4ade80]">Available for licensing</span>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-card-border text-cream/80 hover:text-cream hover:bg-card-bg transition-colors font-medium text-sm cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleInquireClick}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-cream text-navy-deep font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-lg"
          >
            Inquire About Similar Work →
          </button>
        </div>
      </div>
    </div>
  );
}
