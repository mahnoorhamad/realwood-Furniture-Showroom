import {useEffect, useState} from 'react';
import {useMapsLibrary} from '@vis.gl/react-google-maps';
import {Camera, ExternalLink, ZoomIn} from 'lucide-react';
import {BUSINESS_INFO} from '../data/business';
import {SHOWROOM_MEDIA} from '../data/collections';
import {SafeImage} from './SafeImage';
import {GalleryLightboxModal, type LightboxSlide} from './GalleryLightboxModal';

interface PlacePhotoItem {
  uri: string;
  authorName?: string;
  authorUri?: string;
}

interface GooglePlacePhotoLike {
  getURI: (options?: {maxWidth?: number; maxHeight?: number}) => string;
  authorAttributions?: Array<{
    displayName?: string | null;
    uri?: string | null;
  }>;
}

function GoogleShowroomPhotosLoader({
  onPhotosLoaded,
}: {
  onPhotosLoaded: (photos: PlacePhotoItem[]) => void;
}) {
  const placesLib = useMapsLibrary('places');

  useEffect(() => {
    if (!placesLib) return;
    let cancelled = false;

    async function fetchPlacePhotos() {
      try {
        const {places} = await placesLib!.Place.searchByText({
          textQuery: `${BUSINESS_INFO.name}, ${BUSINESS_INFO.address}`,
          fields: ['id', 'displayName', 'photos'],
          maxResultCount: 1,
        });

        if (cancelled) return;

        const first = places?.[0];
        const rawPhotos = (first?.photos ?? []) as unknown as GooglePlacePhotoLike[];
        if (rawPhotos.length > 0) {
          const mapped: PlacePhotoItem[] = rawPhotos.slice(0, 4).map((photo) => {
            const firstAuthor = photo.authorAttributions?.[0];
            return {
              uri: photo.getURI({maxWidth: 1200}),
              authorName: firstAuthor?.displayName || undefined,
              authorUri: firstAuthor?.uri || undefined,
            };
          });
          onPhotosLoaded(mapped);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        if (
          msg.includes('RESOURCE_EXHAUSTED') ||
          msg.includes('OVER_QUERY_LIMIT') ||
          msg.includes('429')
        ) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
      }
    }

    void fetchPlacePhotos();
    return () => {
      cancelled = true;
    };
  }, [placesLib, onPhotosLoaded]);

  return null;
}

interface ShowroomGooglePhotosProps {
  quotaExceeded?: boolean;
  variant?: 'single' | 'strip';
}

export function ShowroomGooglePhotos({
  quotaExceeded = false,
  variant = 'single',
}: ShowroomGooglePhotosProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const [googlePhotos, setGooglePhotos] = useState<PlacePhotoItem[]>([]);
  const [failedIndices, setFailedIndices] = useState<Record<number, boolean>>({});
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const validGooglePhotos = googlePhotos.filter((_, idx) => !failedIndices[idx]);
  const primaryPhoto = validGooglePhotos[0] || null;

  const singleSlides: LightboxSlide[] = primaryPhoto
    ? [
        {
          src: primaryPhoto.uri,
          alt: `${BUSINESS_INFO.name} showroom in Gujrat, Punjab displaying solid Sheesham and walnut furniture`,
          caption: 'Gujrat Showroom · G3GC+C7R',
          authorName: primaryPhoto.authorName,
          authorUri: primaryPhoto.authorUri,
        },
      ]
    : [
        {
          src: SHOWROOM_MEDIA.gallery.src,
          alt: SHOWROOM_MEDIA.gallery.alt,
          caption: 'Gujrat Showroom · G3GC+C7R',
        },
      ];

  const stripSlides: LightboxSlide[] =
    validGooglePhotos.length > 0
      ? validGooglePhotos.slice(0, 2).map((photo, idx) => ({
          src: photo.uri,
          alt: `${BUSINESS_INFO.name} Gujrat showroom gallery photograph ${idx + 1}`,
          caption: `Showroom Floor · Gujrat`,
          authorName: photo.authorName,
          authorUri: photo.authorUri,
        }))
      : [
          {
            src: SHOWROOM_MEDIA.dining.src,
            alt: SHOWROOM_MEDIA.dining.alt,
            caption: 'Solid Sheesham Dining & Sideboard Display',
          },
          {
            src: SHOWROOM_MEDIA.wardrobe.src,
            alt: SHOWROOM_MEDIA.wardrobe.alt,
            caption: '3-Door Solid Wood Almari & Singhar Mez',
          },
        ];

  const activeSlides = variant === 'single' ? singleSlides : stripSlides;

  return (
    <div className="h-full w-full">
      {apiKey && !quotaExceeded && (
        <GoogleShowroomPhotosLoader onPhotosLoaded={setGooglePhotos} />
      )}

      {variant === 'single' ? (
        <div className="group flex h-full flex-col overflow-hidden border border-[#1A1816]/10 bg-[#EFE9DE] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-14px_rgba(59,40,27,0.2)]">
          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            aria-label="Zoom in on Gujrat Showroom photograph"
            className="relative block aspect-[4/3] w-full flex-1 overflow-hidden text-left focus:outline-none"
          >
            {primaryPhoto ? (
              <img
                src={primaryPhoto.uri}
                alt={`${BUSINESS_INFO.name} showroom in Gujrat, Punjab displaying solid Sheesham and walnut furniture`}
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={() => {
                  const idx = googlePhotos.indexOf(primaryPhoto);
                  if (idx !== -1) {
                    setFailedIndices((prev) => ({...prev, [idx]: true}));
                  }
                }}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            ) : (
              <SafeImage
                src={SHOWROOM_MEDIA.gallery.src}
                alt={SHOWROOM_MEDIA.gallery.alt}
                title="Gujrat Showroom"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            )}
            <span
              aria-hidden="true"
              className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center border border-white/25 bg-[#1A1816]/65 text-white opacity-0 backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100"
            >
              <ZoomIn className="h-4 w-4" />
            </span>
          </button>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#1A1816]/10 bg-[#FAF8F4] px-4 py-2.5 text-xs text-[#6B5E53]">
            <span className="inline-flex items-center gap-1.5">
              <Camera className="h-3.5 w-3.5 text-[#B89352]" />
              {primaryPhoto ? (
                <>
                  Gujrat Showroom · Google Maps
                  {primaryPhoto.authorName && (
                    <>
                      <span aria-hidden="true">·</span>
                      {primaryPhoto.authorUri ? (
                        <a
                          href={primaryPhoto.authorUri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-[#1A1816]"
                        >
                          {primaryPhoto.authorName}
                        </a>
                      ) : (
                        <span>{primaryPhoto.authorName}</span>
                      )}
                    </>
                  )}
                </>
              ) : (
                <span>Gujrat Showroom · G3GC+C7R</span>
              )}
            </span>
            <a
              href={BUSINESS_INFO.googleMapsPhotosUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-[#3B281B] hover:underline whitespace-nowrap"
            >
              Showroom Photos on Maps
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {validGooglePhotos.length > 0 ? (
            validGooglePhotos.slice(0, 2).map((photo, idx) => (
              <div
                key={photo.uri}
                className="group overflow-hidden border border-[#1A1816]/10 bg-[#EFE9DE] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-14px_rgba(59,40,27,0.2)]"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  aria-label={`Zoom in on showroom view ${idx + 1}`}
                  className="relative block aspect-[4/3] w-full overflow-hidden text-left focus:outline-none"
                >
                  <img
                    src={photo.uri}
                    alt={`${BUSINESS_INFO.name} Gujrat showroom gallery photograph ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={() => {
                      const origIdx = googlePhotos.indexOf(photo);
                      if (origIdx !== -1) {
                        setFailedIndices((prev) => ({...prev, [origIdx]: true}));
                      }
                    }}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center border border-white/25 bg-[#1A1816]/65 text-white opacity-0 backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100"
                  >
                    <ZoomIn className="h-3.5 w-3.5" />
                  </span>
                </button>
                <div className="flex items-center justify-between gap-2 border-t border-[#1A1816]/10 bg-[#FAF8F4] px-3.5 py-2 text-[11px] text-[#6B5E53]">
                  <span className="truncate font-medium text-[#1A1816]">
                    Showroom Floor · Gujrat{photo.authorName ? ` (${photo.authorName})` : ''}
                  </span>
                  <a
                    href={BUSINESS_INFO.googleMapsPhotosUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 font-medium text-[#3B281B] hover:underline"
                  >
                    Maps Listing
                  </a>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="group overflow-hidden border border-[#1A1816]/10 bg-[#EFE9DE] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-14px_rgba(59,40,27,0.2)]">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(0)}
                  aria-label="Zoom in on Solid Sheesham Dining & Sideboard Display"
                  className="relative block aspect-[4/3] w-full overflow-hidden text-left focus:outline-none"
                >
                  <SafeImage
                    src={SHOWROOM_MEDIA.dining.src}
                    alt={SHOWROOM_MEDIA.dining.alt}
                    title="Solid Sheesham Dining & Sideboard Display"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center border border-white/25 bg-[#1A1816]/65 text-white opacity-0 backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100"
                  >
                    <ZoomIn className="h-3.5 w-3.5" />
                  </span>
                </button>
                <p className="border-t border-[#1A1816]/10 bg-[#FAF8F4] px-3.5 py-2 text-xs font-medium text-[#1A1816]">
                  Solid Sheesham Dining &amp; Sideboard Display
                </p>
              </div>
              <div className="group overflow-hidden border border-[#1A1816]/10 bg-[#EFE9DE] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-14px_rgba(59,40,27,0.2)]">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(1)}
                  aria-label="Zoom in on 3-Door Solid Wood Almari & Singhar Mez"
                  className="relative block aspect-[4/3] w-full overflow-hidden text-left focus:outline-none"
                >
                  <SafeImage
                    src={SHOWROOM_MEDIA.wardrobe.src}
                    alt={SHOWROOM_MEDIA.wardrobe.alt}
                    title="3-Door Solid Wood Almari & Singhar Mez"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center border border-white/25 bg-[#1A1816]/65 text-white opacity-0 backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100"
                  >
                    <ZoomIn className="h-3.5 w-3.5" />
                  </span>
                </button>
                <p className="border-t border-[#1A1816]/10 bg-[#FAF8F4] px-3.5 py-2 text-xs font-medium text-[#1A1816]">
                  3-Door Solid Wood Almari &amp; Singhar Mez
                </p>
              </div>
            </>
          )}
        </div>
      )}

      <GalleryLightboxModal
        slides={activeSlides}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
