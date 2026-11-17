import {useEffect, useState, useCallback} from 'react';
import {
  Map as GoogleMap,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMapsLibrary,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  APILoadingStatus,
} from '@vis.gl/react-google-maps';
import {ExternalLink, MapPin, Navigation} from 'lucide-react';
import {BUSINESS_INFO} from '../data/business';

interface ResolvedPlace {
  name: string;
  address: string;
  location: {lat: number; lng: number};
  googleMapsUrl: string;
}

function ShowroomMapCanvas({
  onFallbackNeeded,
}: {
  onFallbackNeeded: () => void;
}) {
  const placesLib = useMapsLibrary('places');
  const loadingStatus = useApiLoadingStatus();
  const [resolvedPlace, setResolvedPlace] = useState<ResolvedPlace | null>(null);
  const [isSearching, setIsSearching] = useState(true);
  const [infoOpen, setInfoOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  const handleCloseInfo = useCallback(() => setInfoOpen(false), []);

  useEffect(() => {
    if (
      loadingStatus === APILoadingStatus.FAILED ||
      loadingStatus === APILoadingStatus.AUTH_FAILURE
    ) {
      onFallbackNeeded();
    }
  }, [loadingStatus, onFallbackNeeded]);

  useEffect(() => {
    if (!placesLib) return;

    let cancelled = false;

    async function lookupShowroom() {
      try {
        setIsSearching(true);
        const {places} = await placesLib!.Place.searchByText({
          textQuery: `${BUSINESS_INFO.name}, ${BUSINESS_INFO.address}`,
          fields: ['id', 'displayName', 'formattedAddress', 'location', 'googleMapsURI'],
          maxResultCount: 1,
        });

        if (cancelled) return;

        const first = places?.[0];
        if (first && first.location) {
          setResolvedPlace({
            name: first.displayName || BUSINESS_INFO.name,
            address: first.formattedAddress || BUSINESS_INFO.address,
            location: {
              lat: first.location.lat(),
              lng: first.location.lng(),
            },
            googleMapsUrl: first.googleMapsURI || BUSINESS_INFO.googleMapsListingUrl,
          });
        } else {
          onFallbackNeeded();
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
        if (!cancelled) {
          onFallbackNeeded();
        }
      } finally {
        if (!cancelled) {
          setIsSearching(false);
        }
      }
    }

    void lookupShowroom();

    return () => {
      cancelled = true;
    };
  }, [placesLib, onFallbackNeeded]);

  if (isSearching || !resolvedPlace) {
    return (
      <div className="flex h-[380px] sm:h-[440px] w-full flex-col items-center justify-center bg-[#EFE9DE] px-6 text-center">
        <MapPin className="mb-3 h-6 w-6 text-[#3B281B]" strokeWidth={1.5} />
        <p className="font-serif text-lg text-[#1A1816]">Locating Gujrat Showroom</p>
        <p className="mt-1 text-sm text-[#6B5E53]">{BUSINESS_INFO.address}</p>
      </div>
    );
  }

  return (
    <div className="h-[380px] sm:h-[440px] w-full">
      <GoogleMap
        defaultCenter={resolvedPlace.location}
        defaultZoom={16}
        mapId="DEMO_MAP_ID"
        gestureHandling="cooperative"
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        style={{width: '100%', height: '100%'}}
      >
        <AdvancedMarker
          ref={markerRef}
          position={resolvedPlace.location}
          title={resolvedPlace.name}
          onClick={() => setInfoOpen(true)}
        >
          <Pin background="#3B281B" borderColor="#B89352" glyphColor="#FAF8F4" scale={1.15} />
        </AdvancedMarker>

        {infoOpen && marker && (
          <InfoWindow anchor={marker} maxWidth={260} onCloseClick={handleCloseInfo}>
            <div className="p-1 text-[#1A1816]">
              <p className="font-serif text-sm font-semibold text-[#1A1816]">
                {resolvedPlace.name}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#6B5E53]">
                {resolvedPlace.address}
              </p>
              <a
                href={resolvedPlace.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#3B281B] underline underline-offset-4 hover:text-[#B89352]"
              >
                Open in Google Maps
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export function ShowroomMap({quotaExceeded = false}: {quotaExceeded?: boolean}) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const [useEmbedFallback, setUseEmbedFallback] = useState(!apiKey);

  useEffect(() => {
    if (quotaExceeded) {
      setUseEmbedFallback(true);
    }
  }, [quotaExceeded]);

  const handleFallback = useCallback(() => {
    setUseEmbedFallback(true);
  }, []);

  return (
    <div className="overflow-hidden border border-[#1A1816]/12 bg-white">
      <div className="relative w-full">
        {!useEmbedFallback && apiKey ? (
          <ShowroomMapCanvas onFallbackNeeded={handleFallback} />
        ) : (
          <div className="h-[380px] sm:h-[440px] w-full bg-[#EFE9DE]">
            <iframe
              title="Real Wood Furnitures Gujrat Showroom Location on Google Maps"
              src={BUSINESS_INFO.googleMapsEmbedFallbackUrl}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 border-t border-[#1A1816]/10 bg-[#FAF8F4] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-medium tracking-wider text-[#6B5E53] uppercase">
            Showroom Plus Code &amp; Directions
          </p>
          <p className="mt-1 font-serif text-lg font-medium text-[#1A1816]">
            {BUSINESS_INFO.name} — {BUSINESS_INFO.address}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[#6B5E53]">
            {BUSINESS_INFO.locationGuidance}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href={BUSINESS_INFO.googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#3B281B] px-5 py-2.5 text-sm font-medium text-[#FAF8F4] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#291B11] hover:shadow-md active:translate-y-0 active:scale-[0.98] whitespace-nowrap shrink-0"
          >
            <Navigation className="h-4 w-4" />
            Get Directions
          </a>
          <a
            href={BUSINESS_INFO.googleMapsListingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#1A1816]/20 bg-white px-5 py-2.5 text-sm font-medium text-[#1A1816] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3B281B] hover:bg-[#F2EDE4] active:translate-y-0 active:scale-[0.98] whitespace-nowrap shrink-0"
          >
            Google Maps Listing
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
