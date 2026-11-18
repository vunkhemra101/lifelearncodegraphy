import ProjectArt from "./ProjectArt";

export default function ProjectCard({ project, onSelect }) {
  const { title, category, description, color } = project;

  return (
    <article
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(project);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${title}, category ${category}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-card-bg border border-card-border hover:border-cream/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer text-left focus-visible:ring-2 focus-visible:ring-cream select-none"
    >
      {/* Artwork container */}
      <div className="relative overflow-hidden w-full aspect-[16/10]">
        <ProjectArt project={project} className="group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md"
            style={{
              backgroundColor: `${color}30`,
              color: "#f3ecd2",
              border: `1px solid ${color}60`,
            }}
          >
            {category}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="font-display text-2xl text-cream tracking-wide group-hover:text-cream/90 transition-colors">
              {title}
            </h3>
            {project.date && (
              <span className="text-[11px] font-mono text-muted/70 whitespace-nowrap bg-card-bg px-2 py-0.5 rounded border border-card-border/50">
                {project.date}
              </span>
            )}
          </div>
          {project.caption && (
            <div className="mb-2.5">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-cyan-300 bg-cyan-950/60 border border-cyan-400/30 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                {project.caption}
              </span>
            </div>
          )}
          <p className="text-muted text-sm line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-card-border/60 flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-muted group-hover:text-cream transition-colors">
          <span>View Project</span>
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 hover:underline cursor-pointer"
              title="Open live website in new tab"
            >
              <span>Live Site</span>
              <span className="text-sm">↗</span>
            </a>
          ) : (
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          )}
        </div>
      </div>
    </article>
  );
}
