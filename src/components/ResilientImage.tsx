import { useState } from 'react';
import { Package } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
}

export function ResilientImage({ src, alt, title, className = '' }: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#2B211B] via-[#3A2B22] to-[#1C1613] p-6 text-center text-[#FAF8F5] ${className}`}
      >
        <Package className="h-8 w-8 text-[#D97706]" aria-hidden="true" />
        <span className="font-display text-base font-medium tracking-tight">
          {title || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
