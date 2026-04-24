import { useState } from 'react';

/**
 * Smart image with a stylized fallback.
 *
 * If the source fails (offline, 404, etc.), renders a professional blue
 * gradient with a subtle grid pattern and the image label. This keeps the UI
 * looking polished in dev even before real photos are added to public/images/.
 */
export default function SmartImage({ src, alt, className = '', fallbackLabel }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="grid-fallback" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid-fallback)" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <span className="text-white/80 text-sm font-medium text-center">
            {fallbackLabel || alt}
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setError(true)}
    />
  );
}
