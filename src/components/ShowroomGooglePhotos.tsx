import {useEffect, useState} from 'react';
import {useMapsLibrary} from '@vis.gl/react-google-maps';
import {Camera, ExternalLink} from 'lucide-react';
import {BUSINESS_INFO} from '../data/business';
import {SHOWROOM_MEDIA} from '../data/collections';
import {SafeImage} from './SafeImage';

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

  const primaryPhoto = googlePhotos.find((_, idx) => !failedIndices[idx]) || null;

  return (
    <div className="h-full w-full">
      {apiKey && !quotaExceeded && (
        <GoogleShowroomPhotosLoader onPhotosLoaded={setGooglePhotos} />
      )}

      {variant === 'single' ? (
        <div className="flex h-full flex-col overflow-hidden border border-[#1A1816]/10 bg-[#EFE9DE]">
          <div className="aspect-[4/3] w-full flex-1 overflow-hidden">
            {primaryPhoto ? (
              <img
                src={primaryPhoto.uri}
                alt={`${BUSINESS_INFO.name} showroom in Gujrat on Google Maps`}
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={() => {
                  const idx = googlePhotos.indexOf(primaryPhoto);
                  if (idx !== -1) {
                    setFailedIndices((prev) => ({...prev, [idx]: true}));
                  }
                }}
                className="h-full w-full object-cover"
              />
            ) : (
              <SafeImage
                src={SHOWROOM_MEDIA.gallery.src}
                alt={SHOWROOM_MEDIA.gallery.alt}
                title="Real Wood Furnitures Gujrat Showroom"
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#1A1816]/10 bg-[#FAF8F4] px-4 py-2.5 text-xs text-[#6B5E53]">
            <span className="inline-flex items-center gap-1.5">
              <Camera className="h-3.5 w-3.5 text-[#B89352]" />
              {primaryPhoto ? (
                <>
                  Showroom photo via Google Maps
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
                <span>Gujrat Showroom Display · {BUSINESS_INFO.address}</span>
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
          {googlePhotos.length > 0 && googlePhotos.some((_, idx) => !failedIndices[idx]) ? (
            googlePhotos.slice(0, 2).map((photo, idx) =>
              failedIndices[idx] ? null : (
                <div
                  key={photo.uri}
                  className="overflow-hidden border border-[#1A1816]/10 bg-[#EFE9DE]"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={photo.uri}
                      alt={`${BUSINESS_INFO.name} Gujrat showroom view ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={() => setFailedIndices((prev) => ({...prev, [idx]: true}))}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 border-t border-[#1A1816]/10 bg-[#FAF8F4] px-3.5 py-2 text-[11px] text-[#6B5E53]">
                    <span className="truncate">
                      Google Maps Photo{photo.authorName ? ` · ${photo.authorName}` : ''}
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
              ),
            )
          ) : (
            <>
              <div className="overflow-hidden border border-[#1A1816]/10 bg-[#EFE9DE] aspect-[4/3]">
                <SafeImage
                  src={SHOWROOM_MEDIA.dining.src}
                  alt={SHOWROOM_MEDIA.dining.alt}
                  title="Sheesham Dining Showcase"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="overflow-hidden border border-[#1A1816]/10 bg-[#EFE9DE] aspect-[4/3]">
                <SafeImage
                  src={SHOWROOM_MEDIA.wardrobe.src}
                  alt={SHOWROOM_MEDIA.wardrobe.alt}
                  title="Almari & Dressing Showcase"
                  className="h-full w-full object-cover"
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
