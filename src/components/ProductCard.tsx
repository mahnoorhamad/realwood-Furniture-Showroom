import {MessageCircle, Eye} from 'lucide-react';
import {FurnitureItem} from '../data/collections';
import {buildProductWhatsAppUrl} from '../data/business';
import {SafeImage} from './SafeImage';

interface ProductCardProps {
  item: FurnitureItem;
  onViewDetails: (item: FurnitureItem) => void;
}

export function ProductCard({item, onViewDetails}: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col border border-[#1A1816]/12 bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_36px_-14px_rgba(59,40,27,0.22)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EFE9DE]">
        <SafeImage
          src={item.image}
          alt={item.imageAlt}
          title={item.name}
          isPlaceholder={item.isPlaceholder}
          placeholderNote={item.placeholderNote}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#6B5E53]">
            <span>{item.category}</span>
            <span aria-hidden="true">·</span>
            <span>{item.isPlaceholder ? 'Photo Pending' : 'Gujrat Showroom'}</span>
          </div>

          <h3 className="mt-2 font-serif text-xl font-medium leading-snug text-[#1A1816]">
            {item.name}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#6B5E53]">
            {item.shortDescription}
          </p>
        </div>

        <div className="mt-5 border-t border-[#1A1816]/10 pt-4">
          <p className="text-xs font-medium tracking-wide text-[#3B281B]">
            Price on Inquiry
          </p>

          <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={() => onViewDetails(item)}
              className="inline-flex items-center justify-center gap-1.5 border border-[#1A1816]/20 bg-[#FAF8F4] px-4 py-2.5 text-xs font-medium text-[#1A1816] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3B281B] hover:bg-[#F2EDE4] active:translate-y-0 active:scale-[0.98] whitespace-nowrap"
            >
              <Eye className="h-3.5 w-3.5" />
              View Details
            </button>
            <a
              href={buildProductWhatsAppUrl(item.name, item.category)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-1.5 bg-[#1E5C3A] px-4 py-2.5 text-xs font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#17482D] hover:shadow-md active:translate-y-0 active:scale-[0.98] whitespace-nowrap"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp Inquiry
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
