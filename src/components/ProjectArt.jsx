export default function ProjectArt({ project, className = "" }) {
  const { id, color, title, category } = project;

  // Custom visual compositions per project id
  const renderArt = () => {
    switch (id) {
      case 1: // Dreamscape - Surreal landscape with moons and waves
        return (
          <svg viewBox="0 0 400 260" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.9" />
                <stop offset="100%" stopColor="#06222f" />
              </linearGradient>
            </defs>
            <rect width="400" height="260" fill={`url(#grad-${id})`} />
            <circle cx="280" cy="90" r="55" fill="#f3ecd2" opacity="0.85" />
            <circle cx="295" cy="80" r="48" fill={color} opacity="0.6" />
            <path d="M 0 180 Q 100 130 200 170 T 400 150 L 400 260 L 0 260 Z" fill="#0b4150" opacity="0.8" />
            <path d="M 0 205 Q 120 170 240 210 T 400 190 L 400 260 L 0 260 Z" fill="#06222f" opacity="0.95" />
            <polygon points="120,110 135,140 105,140" fill="#f3ecd2" opacity="0.7" />
            <polygon points="160,130 170,150 150,150" fill="#f3ecd2" opacity="0.5" />
          </svg>
        );

      case 2: // Serif & Soul - Dramatic typographic glyph composition
        return (
          <svg viewBox="0 0 400 260" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="260" fill="#081b24" />
            <text x="30" y="190" fontFamily="Anton, serif" fontSize="160" fill={color} opacity="0.35">
              &amp;
            </text>
            <text x="140" y="130" fontFamily="Anton, sans-serif" fontSize="88" fill="#f3ecd2" opacity="0.9" letterSpacing="4">
              SOUL
            </text>
            <text x="70" y="210" fontFamily="'DM Sans', serif" fontStyle="italic" fontSize="32" fill={color} opacity="0.95">
              typographic harmony
            </text>
            <line x1="70" y1="225" x2="330" y2="225" stroke="#f3ecd2" strokeWidth="2" opacity="0.4" />
          </svg>
        );

      case 3: // The Silent Garden - Botanical silhouettes
        return (
          <svg viewBox="0 0 400 260" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="260" fill="#0a2a24" />
            <circle cx="200" cy="130" r="85" fill={color} opacity="0.45" />
            <path d="M200 40 C 220 90, 260 110, 200 180 C 140 110, 180 90, 200 40 Z" fill="#f3ecd2" opacity="0.85" />
            <path d="M200 70 C 240 110, 270 140, 220 200 C 170 140, 190 110, 200 70 Z" fill={color} opacity="0.75" />
            <path d="M140 130 Q 200 150 200 240" stroke="#f3ecd2" strokeWidth="2.5" fill="none" opacity="0.6" />
            <path d="M260 130 Q 200 150 200 240" stroke="#f3ecd2" strokeWidth="2.5" fill="none" opacity="0.6" />
          </svg>
        );

      case 4: // Neon Portraits - High-tech glow contour
        return (
          <svg viewBox="0 0 400 260" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="260" fill="#0a0a14" />
            <circle cx="160" cy="120" r="70" stroke={color} strokeWidth="3" fill="none" opacity="0.85" />
            <circle cx="230" cy="135" r="75" stroke="#ec4899" strokeWidth="3" fill="none" opacity="0.85" />
            <ellipse cx="195" cy="128" rx="35" ry="50" fill={color} opacity="0.3" />
            <path d="M120 230 C 140 170, 260 170, 280 230" stroke="#f3ecd2" strokeWidth="2.5" fill="none" opacity="0.8" />
            <circle cx="195" cy="115" r="8" fill="#f3ecd2" />
          </svg>
        );

      case 5: // Urban Thread - Geometric street apparel pattern
        return (
          <svg viewBox="0 0 400 260" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="260" fill="#180e0c" />
            <line x1="0" y1="0" x2="400" y2="260" stroke={color} strokeWidth="28" opacity="0.4" />
            <line x1="80" y1="0" x2="400" y2="208" stroke="#f3ecd2" strokeWidth="8" opacity="0.5" />
            <rect x="130" y="60" width="140" height="140" transform="rotate(45 200 130)" stroke={color} strokeWidth="4" fill="none" />
            <rect x="155" y="85" width="90" height="90" transform="rotate(45 200 130)" fill={color} opacity="0.8" />
            <text x="200" y="140" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="24" fill="#f3ecd2" letterSpacing="4">
              URBN
            </text>
          </svg>
        );

      case 6: // Harvest Gold - Organic honey honeycomb
        return (
          <svg viewBox="0 0 400 260" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="260" fill="#1c1608" />
            <polygon points="170,70 200,52 230,70 230,105 200,122 170,105" stroke={color} strokeWidth="3" fill="none" opacity="0.7" />
            <polygon points="235,108 265,90 295,108 295,143 265,160 235,143" stroke={color} strokeWidth="3" fill={color} fillOpacity="0.4" />
            <polygon points="105,108 135,90 165,108 165,143 135,160 105,143" stroke={color} strokeWidth="3" fill="none" opacity="0.5" />
            <polygon points="170,146 200,128 230,146 230,181 200,198 170,181" stroke="#f3ecd2" strokeWidth="3" fill={color} fillOpacity="0.8" />
            <circle cx="200" cy="163" r="10" fill="#f3ecd2" />
          </svg>
        );

      case 7: // Lumina Studio - Minimalist editorial brand grid
        return (
          <svg viewBox="0 0 400 260" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="260" fill="#0b1728" />
            <rect x="50" y="40" width="140" height="180" rx="8" fill="#13233c" stroke="rgba(243,236,210,0.15)" strokeWidth="2" />
            <rect x="210" y="40" width="140" height="85" rx="8" fill={color} opacity="0.85" />
            <rect x="210" y="135" width="140" height="85" rx="8" fill="#082b4a" />
            <circle cx="120" cy="110" r="32" fill={color} opacity="0.9" />
            <line x1="75" y1="170" x2="165" y2="170" stroke="#f3ecd2" strokeWidth="3" opacity="0.7" />
            <line x1="75" y1="185" x2="135" y2="185" stroke="#b9cfd1" strokeWidth="2" opacity="0.5" />
          </svg>
        );

      case 8: // Palette Stories - Stylized social grid layout
        return (
          <svg viewBox="0 0 400 260" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="260" fill="#1f0e19" />
            <rect x="60" y="45" width="80" height="80" rx="10" fill={color} opacity="0.9" />
            <rect x="160" y="45" width="80" height="80" rx="10" fill="#831843" />
            <rect x="260" y="45" width="80" height="80" rx="10" fill="#f472b6" opacity="0.7" />
            <rect x="60" y="140" width="80" height="80" rx="10" fill="#500724" />
            <rect x="160" y="140" width="80" height="80" rx="10" fill={color} opacity="0.6" />
            <circle cx="300" cy="180" r="35" fill="#f3ecd2" opacity="0.85" />
          </svg>
        );

      case 9: // Fauna Series - Geometric polygon animal
        return (
          <svg viewBox="0 0 400 260" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="260" fill="#082223" />
            <polygon points="200,45 250,110 200,165 150,110" fill={color} opacity="0.85" />
            <polygon points="200,165 260,225 140,225" fill="#0d5254" />
            <polygon points="150,110 100,150 140,225" fill={color} opacity="0.5" />
            <polygon points="250,110 300,150 260,225" fill="#115e59" opacity="0.7" />
            <polygon points="200,45 270,40 250,110" fill="#f3ecd2" opacity="0.8" />
            <polygon points="200,45 130,40 150,110" fill="#f3ecd2" opacity="0.8" />
          </svg>
        );

      case 10: // Launch Day - Bold dynamic angles & burst
        return (
          <svg viewBox="0 0 400 260" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="260" fill="#241804" />
            <polygon points="0,260 200,40 400,260" fill={color} opacity="0.8" />
            <polygon points="40,260 200,90 360,260" fill="#b45309" opacity="0.9" />
            <circle cx="200" cy="100" r="28" fill="#f3ecd2" />
            <line x1="200" y1="20" x2="200" y2="55" stroke="#f3ecd2" strokeWidth="4" strokeLinecap="round" />
            <line x1="150" y1="35" x2="175" y2="65" stroke="#f3ecd2" strokeWidth="3" strokeLinecap="round" />
            <line x1="250" y1="35" x2="225" y2="65" stroke="#f3ecd2" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );
      default:
        return (
          <div
            className="w-full h-full flex items-center justify-center font-display text-4xl text-cream"
            style={{ backgroundColor: color || "#0f5a6e" }}
          >
            {title}
          </div>
        );
    }
  };

  return (
    <div className={`relative overflow-hidden w-full aspect-[16/10] bg-navy-deep ${className}`}>
      {renderArt()}
      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent pointer-events-none" />
      <span className="sr-only">{`${title} - ${category}`}</span>
    </div>
  );
}
