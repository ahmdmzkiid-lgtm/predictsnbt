import { useState } from 'react';
import { getUniversityLogo, getUniversityInitials } from '../utils/universityLogos';

/**
 * UniversityAvatar - Shows university logo with initial-based fallback.
 * @param {string} name - University name
 * @param {number} size - Size in pixels (default: 40)
 * @param {string} className - Additional CSS classes
 */
export default function UniversityAvatar({ name, size = 40, className = '' }) {
  const logoUrl = getUniversityLogo(name);
  const initials = getUniversityInitials(name);
  const [imgError, setImgError] = useState(false);

  const sizeStyle = { width: size, height: size, minWidth: size };

  if (logoUrl && !imgError) {
    return (
      <div
        className={`rounded-xl bg-white flex items-center justify-center overflow-hidden border-2 border-cyan-glow/20 ${className}`}
        style={sizeStyle}
      >
        <img
          src={logoUrl}
          alt={name}
          className="w-full h-full object-contain p-1.5"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  // Fallback: initials avatar
  return (
    <div
      className={`rounded-xl bg-gradient-to-br from-cyan-glow/20 to-cyan-accent/10 border border-cyan-glow/20 flex items-center justify-center ${className}`}
      style={sizeStyle}
    >
      <span
        className="font-bold text-cyan-glow"
        style={{ fontSize: size * 0.3 }}
      >
        {initials}
      </span>
    </div>
  );
}
