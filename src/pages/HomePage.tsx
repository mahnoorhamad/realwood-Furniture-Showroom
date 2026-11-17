import {useState} from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'motion/react';
import {ArrowRight, ChevronDown, MapPin, MessageCircle, Phone} from 'lucide-react';
import {BUSINESS_INFO, SHOWROOM_FAQS, buildWhatsAppUrl} from '../data/business';
import {
  FEATURED_CATEGORIES_HOME,
  FURNITURE_CATALOGUE,
  FurnitureItem,
  SHOWROOM_MEDIA,
} from '../data/collections';
import {SeoHead} from '../components/SeoHead';
import {SafeImage} from '../components/SafeImage';
import {ProductCard} from '../components/ProductCard';
import {ProductDetailModal} from '../components/ProductDetailModal';
import {ShowroomMap} from '../components/ShowroomMap';
import {ShowroomGooglePhotos} from '../components/ShowroomGooglePhotos';
import {FadeUp, StaggerGrid, StaggerItem} from '../components/Reveal';
import {GalleryLightboxModal} from '../components/GalleryLightboxModal';
import {ZoomIn} from 'lucide-react';

const LUXURY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HomePage({quotaExceeded}: {quotaExceeded: boolean}) {
  const [selectedProduct, setSelectedProduct] = useState<FurnitureItem | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [galleryLightboxIndex, setGalleryLightboxIndex] = useState<number | null>(null);

  const featuredProducts = FURNITURE_CATALOGUE.filter((item) => item.featured).slice(0, 3);

  return (
    <>
      <SeoHead
        title="Real Wood Furnitures – Furniture Showroom in Gujrat"
        description="Visit Real Wood Furnitures in Gujrat, Punjab for seasoned solid Sheesham and walnut beds, Dewan sofa sets, Almari wardrobes, and dining tables. Call +92 333 8407457."
        path="/"
        breadcrumbs={[{name: 'Home', path: '/'}]}
        includeFaqSchema
      />

      {/* 1. Full-Screen Hero Section with Ken Burns & Smooth Load Entrance */}
      <section className="relative flex min-h-[82vh] w-full items-end overflow-hidden bg-[#1A1816] sm:items-center">
        <div className="animate-ken-burns absolute inset-0 h-full w-full">
          <SafeImage
            src={SHOWROOM_MEDIA.hero.src}
            alt={SHOWROOM_MEDIA.hero.alt}
            title={BUSINESS_INFO.name}
            priority
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#1A1816]/90 via-[#1A1816]/50 to-[#1A1816]/25 md:bg-gradient-to-r md:from-[#1A1816]/85 md:via-[#1A1816]/45 md:to-transparent"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl text-[#FAF8F4]">
            <motion.p
              initial={{opacity: 0, y: 14}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.55, ease: LUXURY_EASE}}
              className="text-xs font-medium tracking-[0.2em] text-[#E5C890] uppercase"
            >
              Furniture Showroom · Gujrat, Punjab
            </motion.p>
            <motion.h1
              initial={{opacity: 0, y: 18}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.65, delay: 0.08, ease: LUXURY_EASE}}
              className="mt-4 font-serif text-4xl font-medium leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Crafted for Comfort. Designed for Life.
            </motion.h1>
            <motion.p
              initial={{opacity: 0, y: 18}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.65, delay: 0.16, ease: LUXURY_EASE}}
              className="mt-5 max-w-xl text-base leading-relaxed text-[#FAF8F4]/85 sm:text-lg"
            >
              Seasoned solid Sheesham and walnut furniture crafted for Pakistani homes. Explore
              Chinioti-inspired bedroom suites, Dewan sofa sets, 8-seater dining tables, and Almari
              wardrobes at {BUSINESS_INFO.name} in Gujrat.
            </motion.p>

            <motion.div
              initial={{opacity: 0, y: 18}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.65, delay: 0.24, ease: LUXURY_EASE}}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <Link
                to="/collections"
                className="inline-flex items-center gap-2.5 bg-[#FAF8F4] px-6 py-3.5 text-sm font-medium text-[#1A1816] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E5C890] hover:shadow-lg active:translate-y-0 active:scale-[0.98] whitespace-nowrap"
              >
                Explore Collections
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-[#FAF8F4]/35 bg-[#1E5C3A]/95 px-6 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#17482D] hover:shadow-lg active:translate-y-0 active:scale-[0.98] whitespace-nowrap"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Inquiry
              </a>
              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center gap-2 border border-white/30 bg-white/10 px-5 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 active:translate-y-0 active:scale-[0.98] whitespace-nowrap tabular-nums"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. About the Showroom */}
      <section className="border-b border-[#1A1816]/10 bg-[#FAF8F4] py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <FadeUp className="lg:col-span-6">
            <ShowroomGooglePhotos quotaExceeded={quotaExceeded} variant="single" />
          </FadeUp>

          <FadeUp delay={0.1} className="flex flex-col justify-center lg:col-span-6 lg:py-4">
            <p className="text-xs font-medium tracking-[0.18em] text-[#B89352] uppercase">
              About Our Showroom
            </p>
            <h2 className="mt-3 font-serif text-3xl font-medium leading-tight text-[#1A1816] sm:text-4xl">
              Seasoned Solid Sheesham &amp; Walnut Craftsmanship
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#6B5E53]">
              At {BUSINESS_INFO.name} in Gujrat, we craft furniture built around seasoned solid
              Sheesham and walnut wood, Chinioti-inspired carving, and lasting joinery. From bridal
              and master bedroom suites to formal Dewan sofas, 8-seater dining tables, and solid
              wood Almari wardrobes, every piece can be tailored with custom sizes and polish
              finishes.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#6B5E53]">
              Visit our showroom at <strong className="font-medium text-[#1A1816]">{BUSINESS_INFO.address}</strong>{' '}
              (enter Plus Code <span className="font-medium text-[#1A1816]">G3GC+C7R</span> in
              Google Maps for direct navigation) or message us on WhatsApp for photos, dimensions,
              and safe delivery arrangements across Gujrat and Punjab.
            </p>

            <div className="mt-8 grid gap-4 border-t border-[#1A1816]/10 pt-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium tracking-wider text-[#6B5E53] uppercase">
                  Showroom Location
                </p>
                <p className="mt-1 text-sm font-medium text-[#1A1816]">{BUSINESS_INFO.address}</p>
              </div>
              <div>
                <p className="text-xs font-medium tracking-wider text-[#6B5E53] uppercase">
                  Call or WhatsApp
                </p>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="mt-1 inline-block text-sm font-medium text-[#3B281B] hover:underline tabular-nums"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                to="/about-contact"
                className="inline-flex items-center gap-2 bg-[#3B281B] px-5 py-3 text-sm font-medium text-[#FAF8F4] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#291B11] hover:shadow-md active:translate-y-0 active:scale-[0.98] whitespace-nowrap"
              >
                About &amp; Showroom Hours
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center gap-2 border border-[#1A1816]/20 bg-white px-5 py-3 text-sm font-medium text-[#1A1816] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3B281B] hover:bg-[#F2EDE4] active:translate-y-0 active:scale-[0.98] whitespace-nowrap"
              >
                <Phone className="h-4 w-4" />
                Call Showroom
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 3. Featured Furniture Categories */}
      <section className="border-b border-[#1A1816]/10 bg-[#F2EDE4]/65 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-medium tracking-[0.18em] text-[#B89352] uppercase">
                Curated Categories
              </p>
              <h2 className="mt-2 font-serif text-3xl font-medium text-[#1A1816] sm:text-4xl">
                Furniture Collections by Room
              </h2>
            </div>
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#3B281B] underline underline-offset-4 hover:text-[#1A1816] whitespace-nowrap"
            >
              View Full Catalogue
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeUp>

          <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_CATEGORIES_HOME.map((cat) => (
              <StaggerItem key={cat.title}>
                <Link
                  to={`/collections?category=${encodeURIComponent(cat.category)}`}
                  className="group flex h-full flex-col border border-[#1A1816]/12 bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_36px_-14px_rgba(59,40,27,0.22)]"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#EFE9DE]">
                    <SafeImage
                      src={cat.image}
                      alt={cat.alt}
                      title={cat.title}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <h3 className="font-serif text-xl font-medium text-[#1A1816]">
                        {cat.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#6B5E53]">
                        {cat.description}
                      </p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#3B281B]">
                      Browse Category
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* 4. Featured Furniture Pieces */}
      <section className="border-b border-[#1A1816]/10 bg-[#FAF8F4] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <p className="text-xs font-medium tracking-[0.18em] text-[#B89352] uppercase">
                Showroom Highlights
              </p>
              <h2 className="mt-2 font-serif text-3xl font-medium text-[#1A1816] sm:text-4xl">
                Featured Wooden Furniture
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#6B5E53]">
                Inspect signature bridal beds, Dewan drawing room sofa sets, and 8-seater Sheesham
                dining ensembles. Request prices, polish finishes, and dimensions on WhatsApp.
              </p>
            </div>
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 bg-[#3B281B] px-5 py-3 text-sm font-medium text-[#FAF8F4] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#291B11] hover:shadow-md active:translate-y-0 active:scale-[0.98] whitespace-nowrap"
            >
              Explore All Pieces
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeUp>

          <StaggerGrid className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((item) => (
              <StaggerItem key={item.id}>
                <ProductCard item={item} onViewDetails={setSelectedProduct} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* 5. Showroom Photography Gallery & Why Choose Real Wood Furnitures */}
      <section id="showroom-gallery" className="border-b border-[#1A1816]/10 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <FadeUp className="lg:col-span-5">
              <p className="text-xs font-medium tracking-[0.18em] text-[#B89352] uppercase">
                Why Choose Real Wood Furnitures
              </p>
              <h2 className="mt-2 font-serif text-3xl font-medium text-[#1A1816] sm:text-4xl">
                Crafted in Solid Wood, Tailored to Your Home
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#6B5E53]">
                Choosing furniture for a Pakistani home means inspecting real wood grain, testing
                seating comfort, and customizing finishes that age gracefully.
              </p>

              <div className="mt-8 divide-y divide-[#1A1816]/10 border-t border-b border-[#1A1816]/10">
                <div className="py-5">
                  <h3 className="font-serif text-lg font-medium text-[#1A1816]">
                    01. Seasoned Solid Sheesham &amp; Walnut
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#6B5E53]">
                    Built with seasoned hardwood timber, Chinioti-inspired hand carving, and warm
                    walnut or natural lacquer finishes.
                  </p>
                </div>
                <div className="py-5">
                  <h3 className="font-serif text-lg font-medium text-[#1A1816]">
                    02. Custom Sizes &amp; Polish Finishes
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#6B5E53]">
                    Match bridal bedroom suites, Almari wardrobes, Dewan sofas, and dining tables
                    to your exact room dimensions and upholstery taste.
                  </p>
                </div>
                <div className="py-5">
                  <h3 className="font-serif text-lg font-medium text-[#1A1816]">
                    03. Safe Delivery Across Gujrat &amp; Punjab
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#6B5E53]">
                    Direct showroom guidance on {BUSINESS_INFO.phoneDisplay} with careful home
                    delivery coordinated across Gujrat and cities across Punjab.
                  </p>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.1} className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              <div className="group overflow-hidden border border-[#1A1816]/10 bg-[#EFE9DE] sm:col-span-2 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-14px_rgba(59,40,27,0.2)]">
                <button
                  type="button"
                  onClick={() => setGalleryLightboxIndex(0)}
                  aria-label="Zoom in on Real Wood Furnitures Showroom Floor"
                  className="relative block aspect-[16/9] w-full overflow-hidden text-left focus:outline-none"
                >
                  <SafeImage
                    src={SHOWROOM_MEDIA.gallery.src}
                    alt={SHOWROOM_MEDIA.gallery.alt}
                    title="Real Wood Furnitures Gujrat Showroom Gallery"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center border border-white/25 bg-[#1A1816]/65 text-white opacity-0 backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </span>
                </button>
                <p className="border-t border-[#1A1816]/10 bg-[#FAF8F4] px-4 py-2.5 text-xs font-medium text-[#1A1816]">
                  Real Wood Furnitures Showroom Floor · Gujrat
                </p>
              </div>
              <div className="sm:col-span-2">
                <ShowroomGooglePhotos quotaExceeded={quotaExceeded} variant="strip" />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 6. Customer Inquiry CTA Band */}
      <section className="bg-[#291B11] py-14 text-[#FAF8F4] lg:py-16">
        <FadeUp className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.18em] text-[#E5C890] uppercase">
              Visit or Message the Showroom
            </p>
            <h2 className="mt-2 font-serif text-2xl font-medium text-white sm:text-3xl">
              Get Live Showroom Photos, Dimensions &amp; Prices on WhatsApp
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#FAF8F4]/75">
              Message us on WhatsApp or call {BUSINESS_INFO.phoneDisplay} for bridal bedroom
              packages, Dewan sofas, dining sets, and Punjab delivery details.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1E5C3A] px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#17482D] hover:shadow-lg active:translate-y-0 active:scale-[0.98] whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Inquiry
            </a>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex items-center gap-2 border border-white/25 px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 active:translate-y-0 active:scale-[0.98] whitespace-nowrap"
            >
              <Phone className="h-4 w-4" />
              Call Showroom
            </a>
          </div>
        </FadeUp>
      </section>

      {/* 7. FAQ Section (GEO / AEO Optimized) & Google Maps Location */}
      <section className="bg-[#FAF8F4] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <FadeUp className="lg:col-span-5">
              <p className="text-xs font-medium tracking-[0.18em] text-[#B89352] uppercase">
                Frequently Asked Questions
              </p>
              <h2 className="mt-2 font-serif text-3xl font-medium text-[#1A1816]">
                Showroom &amp; Inquiry Guide
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#6B5E53]">
                Clear answers about our Gujrat furniture showroom location, seasoned Sheesham
                craftsmanship, custom finishes, and Punjab delivery.
              </p>

              <div className="mt-6 divide-y divide-[#1A1816]/12 border-t border-b border-[#1A1816]/12">
                {SHOWROOM_FAQS.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={faq.question} className="py-4">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="flex w-full items-start justify-between gap-4 text-left"
                      >
                        <span className="text-sm font-medium leading-snug text-[#1A1816]">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`mt-0.5 h-4 w-4 shrink-0 text-[#6B5E53] transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <p className="mt-2.5 text-sm leading-relaxed text-[#6B5E53]">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </FadeUp>

            <FadeUp delay={0.1} className="lg:col-span-7">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-medium tracking-[0.18em] text-[#B89352] uppercase">
                    Find Us on Google Maps
                  </p>
                  <h2 className="mt-2 font-serif text-3xl font-medium text-[#1A1816]">
                    Visit Our Showroom in Gujrat
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#6B5E53]">
                  <MapPin className="h-4 w-4 text-[#B89352]" />
                  <span>{BUSINESS_INFO.address}</span>
                </div>
              </div>

              <ShowroomMap quotaExceeded={quotaExceeded} />
            </FadeUp>
          </div>
        </div>
      </section>

      <ProductDetailModal item={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <GalleryLightboxModal
        slides={[
          {
            src: SHOWROOM_MEDIA.gallery.src,
            alt: SHOWROOM_MEDIA.gallery.alt,
            caption: 'Real Wood Furnitures Showroom Floor · Gujrat',
          },
        ]}
        activeIndex={galleryLightboxIndex}
        onClose={() => setGalleryLightboxIndex(null)}
      />
    </>
  );
}
