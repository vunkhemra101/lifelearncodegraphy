import { useEffect, useState } from "react";
import ProjectArt from "./ProjectArt";

export default function ProjectModal({ project, onClose, onInquire }) {
  const [activeImage, setActiveImage] = useState(project?.image || null);

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

  const displayedImage = activeImage || project.image;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-navy-deep/85 backdrop-blur-md animate-fade-in"
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
        <div className="relative rounded-xl overflow-hidden mb-4 border border-card-border shadow-inner group">
          <ProjectArt project={{ ...project, image: displayedImage }} />
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-navy-deep font-semibold text-xs border border-cyan-300 backdrop-blur-md transition-all flex items-center gap-1.5 shadow-lg cursor-pointer"
                onClick={(e) => e.stopPropagation()}
                title="Open live website in new tab"
              >
                <span>Live Website</span>
                <span>↗</span>
              </a>
            )}
            {displayedImage && (
              <a
                href={displayedImage}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-navy-deep/85 hover:bg-navy-deep text-cream text-xs font-medium border border-card-border/80 backdrop-blur-md transition-all flex items-center gap-1.5 shadow-lg hover:border-cream/50 cursor-pointer"
                onClick={(e) => e.stopPropagation()}
                title="Open full resolution photo in new tab"
              >
                <span>View Full Photo</span>
                <span>↗</span>
              </a>
            )}
          </div>
        </div>

        {/* Gallery Thumbnails (if available) */}
        {project.gallery && project.gallery.length > 1 && (
          <div className="flex items-center gap-2.5 mb-6 overflow-x-auto pb-2">
            {project.gallery.map((imgSrc, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(imgSrc)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                  (activeImage || project.image) === imgSrc
                    ? "border-cream scale-105 shadow-md"
                    : "border-card-border/60 opacity-60 hover:opacity-100 hover:border-cream/50"
                }`}
                title={`Photo ${idx + 1}`}
              >
                <img src={imgSrc} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

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
          {project.date && (
            <span className="text-xs font-mono text-cream/90 bg-card-bg px-3 py-1 rounded-full border border-card-border flex items-center gap-1.5">
              <span>📅</span>
              {project.date}
            </span>
          )}
          {project.caption && (
            <span className="text-xs font-medium text-cyan-300 bg-cyan-950/60 border border-cyan-400/30 px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              {project.caption}
            </span>
          )}
        </div>

        <h2 id="modal-project-title" className="font-display text-3xl sm:text-4xl text-cream tracking-wide mb-2">
          {project.title}
        </h2>

        {project.caption && (
          <p className="text-sm text-cyan-300 font-medium mb-4 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>{project.caption}</span>
          </p>
        )}

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
            <span className="block text-xs uppercase tracking-wider text-muted/70 mb-1">
              {project.caption ? "Team Work" : "Color Accent"}
            </span>
            {project.caption ? (
              <span className="text-sm font-medium text-cyan-300">{project.caption}</span>
            ) : (
              <div className="flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-cream/20 inline-block"
                  style={{ backgroundColor: project.color }}
                />
                <span className="text-sm font-mono text-cream">{project.color}</span>
              </div>
            )}
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wider text-muted/70 mb-1">
              {project.link ? "Live Platform" : "Availability"}
            </span>
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-cyan-400 hover:text-cyan-300 hover:underline inline-flex items-center gap-1"
              >
                <span>Live Website</span>
                <span>↗</span>
              </a>
            ) : (
              <span className="text-sm font-medium text-[#4ade80]">Available for licensing</span>
            )}
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
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-navy-deep font-semibold text-sm transition-all cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2"
            >
              <span>Visit Live Website</span>
              <span>↗</span>
            </a>
          )}
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
