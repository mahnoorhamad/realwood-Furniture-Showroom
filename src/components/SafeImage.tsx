import {useState} from 'react';
import {Camera, Armchair} from 'lucide-react';

interface SafeImageProps {
  src: string | null;
  alt: string;
  title: string;
  className?: string;
  priority?: boolean;
  isPlaceholder?: boolean;
  placeholderNote?: string;
}

export function SafeImage({
  src,
  alt,
  title,
  className = '',
  priority = false,
  isPlaceholder = false,
  placeholderNote,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError || isPlaceholder) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-[#EFE9DE] text-[#3B281B] px-6 py-8 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="mb-3 flex h-12 w-12 items-center justify-center border border-[#3B281B]/20 bg-[#FAF8F4]">
          {isPlaceholder ? (
            <Camera className="h-5 w-5 text-[#B89352]" strokeWidth={1.5} />
          ) : (
            <Armchair className="h-5 w-5 text-[#3B281B]" strokeWidth={1.5} />
          )}
        </div>
        <p className="font-serif text-base font-medium text-[#1A1816]">{title}</p>
        <p className="mt-1 max-w-xs text-xs leading-relaxed text-[#6B5E53]">
          {placeholderNote || 'Showroom photograph available on inquiry via WhatsApp.'}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
