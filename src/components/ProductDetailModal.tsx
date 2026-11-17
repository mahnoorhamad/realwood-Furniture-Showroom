import {useEffect} from 'react';
import {MessageCircle, Phone, X, MapPin} from 'lucide-react';
import {FurnitureItem} from '../data/collections';
import {BUSINESS_INFO, buildProductWhatsAppUrl} from '../data/business';
import {SafeImage} from './SafeImage';

interface ProductDetailModalProps {
  item: FurnitureItem | null;
  onClose: () => void;
}

export function ProductDetailModal({item, onClose}: ProductDetailModalProps) {
  useEffect(() => {
    if (!item) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1816]/70 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={onClose}
    >
      <div
        className="relative grid w-full max-w-4xl overflow-hidden border border-[#1A1816]/15 bg-[#FAF8F4] shadow-2xl md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center border border-[#1A1816]/15 bg-white/95 text-[#1A1816] transition-colors hover:bg-[#1A1816] hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="aspect-[4/3] w-full bg-[#EFE9DE] md:aspect-auto md:h-full">
          <SafeImage
            src={item.image}
            alt={item.imageAlt}
            title={item.name}
            isPlaceholder={item.isPlaceholder}
            placeholderNote={item.placeholderNote}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B5E53]">
              <span>{item.category}</span>
              <span aria-hidden="true">·</span>
              <span>Gujrat Showroom</span>
            </div>

            <h2
              id="product-modal-title"
              className="mt-2 font-serif text-2xl font-medium text-[#1A1816] sm:text-3xl"
            >
              {item.name}
            </h2>

            <p className="mt-3 text-sm font-medium text-[#3B281B]">
              Price on Inquiry · Confirm timber &amp; upholstery options directly
            </p>

            <div className="my-5 h-px bg-[#1A1816]/10" />

            <p className="text-sm leading-relaxed text-[#1A1816]/85">{item.shortDescription}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#6B5E53]">{item.craftNotes}</p>

            <div className="mt-5 flex items-start gap-2.5 border border-[#1A1816]/10 bg-[#F2EDE4]/70 p-3.5 text-xs leading-relaxed text-[#3B281B]">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#B89352]" />
              <span>
                Available to view or discuss at {BUSINESS_INFO.name}, {BUSINESS_INFO.address}.
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={buildProductWhatsAppUrl(item.name, item.category)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 bg-[#1E5C3A] px-5 py-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#17482D] whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Inquiry
            </a>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex items-center justify-center gap-2 border border-[#1A1816]/20 bg-white px-5 py-3 text-sm font-medium text-[#1A1816] transition-colors duration-150 hover:border-[#3B281B] hover:bg-[#F2EDE4] whitespace-nowrap"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
