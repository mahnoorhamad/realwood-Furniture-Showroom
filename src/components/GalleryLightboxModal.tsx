import {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {ChevronLeft, ChevronRight, MessageCircle, X, ZoomIn, ZoomOut} from 'lucide-react';
import {buildProductWhatsAppUrl} from '../data/business';

export interface LightboxSlide {
  src: string;
  alt: string;
  caption: string;
  authorName?: string;
  authorUri?: string;
}

interface GalleryLightboxModalProps {
  slides: LightboxSlide[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate?: (nextIndex: number) => void;
}

const LUXURY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function GalleryLightboxModal({
  slides,
  activeIndex,
  onClose,
  onNavigate,
}: GalleryLightboxModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  const isOpen = activeIndex !== null && slides[activeIndex] !== undefined;
  const activeSlide = isOpen ? slides[activeIndex] : null;
  const hasMultiple = slides.length > 1 && onNavigate !== undefined;

  useEffect(() => {
    setIsZoomed(false);
  }, [activeIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (hasMultiple && activeIndex !== null && e.key === 'ArrowRight') {
        onNavigate((activeIndex + 1) % slides.length);
      } else if (hasMultiple && activeIndex !== null && e.key === 'ArrowLeft') {
        onNavigate((activeIndex - 1 + slides.length) % slides.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hasMultiple, activeIndex, slides.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen && activeSlide && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.22}}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1816]/88 p-3 backdrop-blur-xs sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={activeSlide.caption}
          onClick={onClose}
        >
          <motion.div
            initial={{opacity: 0, scale: 0.97, y: 10}}
            animate={{opacity: 1, scale: 1, y: 0}}
            exit={{opacity: 0, scale: 0.97, y: 10}}
            transition={{duration: 0.28, ease: LUXURY_EASE}}
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden border border-white/15 bg-[#1A1816] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-[#291B11] px-4 py-3 text-[#FAF8F4] sm:px-6">
              <div className="min-w-0">
                <p className="truncate font-serif text-base font-medium text-white sm:text-lg">
                  {activeSlide.caption}
                </p>
                {activeSlide.authorName && (
                  <p className="mt-0.5 truncate text-[11px] text-[#FAF8F4]/70">
                    Photo credit:{' '}
                    {activeSlide.authorUri ? (
                      <a
                        href={activeSlide.authorUri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white"
                      >
                        {activeSlide.authorName}
                      </a>
                    ) : (
                      activeSlide.authorName
                    )}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsZoomed((z) => !z)}
                  aria-label={isZoomed ? 'Zoom out image' : 'Zoom in on wood grain and carving'}
                  className="inline-flex h-9 items-center gap-1.5 border border-white/20 bg-white/10 px-3 text-xs font-medium text-white transition-colors hover:bg-white/20"
                >
                  {isZoomed ? (
                    <>
                      <ZoomOut className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Reset Zoom</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Zoom Details</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close gallery lightbox"
                  className="flex h-9 w-9 items-center justify-center border border-white/20 bg-white/10 text-white transition-colors hover:bg-white hover:text-[#1A1816]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Zoomable Image Frame */}
            <div className="relative flex-1 overflow-auto bg-[#12100E]">
              <div className="flex min-h-[300px] items-center justify-center p-2 sm:min-h-[460px] sm:p-4">
                <button
                  type="button"
                  onClick={() => setIsZoomed((z) => !z)}
                  aria-label={isZoomed ? 'Click to reset zoom' : 'Click to zoom in on details'}
                  className={`block focus:outline-none ${
                    isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                  }`}
                >
                  <img
                    src={activeSlide.src}
                    alt={activeSlide.alt}
                    referrerPolicy="no-referrer"
                    className={`max-h-[68vh] w-auto object-contain transition-transform duration-300 ease-out ${
                      isZoomed ? 'scale-150 sm:scale-175' : 'scale-100'
                    }`}
                  />
                </button>
              </div>

              {hasMultiple && activeIndex !== null && (
                <>
                  <button
                    type="button"
                    onClick={() => onNavigate((activeIndex - 1 + slides.length) % slides.length)}
                    aria-label="Previous showroom photo"
                    className="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/20 bg-[#1A1816]/80 text-white transition-colors hover:bg-[#3B281B]"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate((activeIndex + 1) % slides.length)}
                    aria-label="Next showroom photo"
                    className="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/20 bg-[#1A1816]/80 text-white transition-colors hover:bg-[#3B281B]"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#291B11] px-4 py-3 text-xs text-[#FAF8F4]/75 sm:px-6">
              <span>
                {isZoomed
                  ? 'Scroll or drag to inspect carving and wood grain · Click image to reset'
                  : 'Click image or Zoom Details to inspect wood grain and carving'}
              </span>
              <a
                href={buildProductWhatsAppUrl(activeSlide.caption)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1E5C3A] px-4 py-2 text-xs font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#17482D] active:translate-y-0 active:scale-[0.98]"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp About This Piece
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
