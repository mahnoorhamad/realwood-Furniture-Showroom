import {useState} from 'react';
import {Link} from 'react-router-dom';
import {
  ArrowRight,
  ChevronDown,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from 'lucide-react';
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

export function HomePage({quotaExceeded}: {quotaExceeded: boolean}) {
  const [selectedProduct, setSelectedProduct] = useState<FurnitureItem | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const featuredProducts = FURNITURE_CATALOGUE.filter((item) => item.featured).slice(0, 3);

  return (
    <>
      <SeoHead
        title="Real Wood Furnitures – Furniture Showroom in Gujrat"
        description="Visit Real Wood Furnitures in Gujrat, Punjab for handcrafted wooden beds, sofa sets, wardrobes, dining tables, and living room furniture. Call +92 333 8407457."
        path="/"
        breadcrumbs={[{name: 'Home', path: '/'}]}
        includeFaqSchema
      />

      {/* 1. Full-Screen Hero Section */}
      <section className="relative flex min-h-[82vh] w-full items-end overflow-hidden bg-[#1A1816] sm:items-center">
        <SafeImage
          src={SHOWROOM_MEDIA.hero.src}
          alt={SHOWROOM_MEDIA.hero.alt}
          title={BUSINESS_INFO.name}
          priority
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#1A1816]/90 via-[#1A1816]/50 to-[#1A1816]/25 md:bg-gradient-to-r md:from-[#1A1816]/85 md:via-[#1A1816]/45 md:to-transparent"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl text-[#FAF8F4]">
            <p className="text-xs font-medium tracking-[0.2em] text-[#E5C890] uppercase">
              Furniture Showroom · Gujrat, Punjab
            </p>
            <h1 className="mt-4 font-serif text-4xl font-medium leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Crafted for Comfort. Designed for Life.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#FAF8F4]/85 sm:text-lg">
              Timeless wooden furniture built for everyday living. Explore solid wood beds,
              tailored sofa sets, wardrobes, and dining tables at {BUSINESS_INFO.name} in Gujrat.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/collections"
                className="inline-flex items-center gap-2.5 bg-[#FAF8F4] px-6 py-3.5 text-sm font-medium text-[#1A1816] transition-colors duration-150 hover:bg-[#E5C890] whitespace-nowrap"
              >
                Explore Collections
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-[#FAF8F4]/35 bg-[#1E5C3A]/95 px-6 py-3.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#17482D] whitespace-nowrap"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Inquiry
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. About the Showroom */}
      <section className="border-b border-[#1A1816]/10 bg-[#FAF8F4] py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <div className="lg:col-span-6">
            <ShowroomGooglePhotos quotaExceeded={quotaExceeded} variant="single" />
          </div>

          <div className="flex flex-col justify-center lg:col-span-6 lg:py-4">
            <p className="text-xs font-medium tracking-[0.18em] text-[#B89352] uppercase">
              About Our Showroom
            </p>
            <h2 className="mt-3 font-serif text-3xl font-medium leading-tight text-[#1A1816] sm:text-4xl">
              Authentic Pakistani Wooden Furniture in Gujrat
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#6B5E53]">
              Located at {BUSINESS_INFO.address}, {BUSINESS_INFO.name} welcomes families, brides,
              and homeowners seeking enduring Pakistani furniture—from Chinioti carved Sheesham
              beds and bridal suites to drawing room sofa sets, 8-seater dining ensembles, and
              solid wood Almari wardrobes.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#6B5E53]">
              Every inquiry is handled directly by our showroom team—whether you want to confirm
              dimensions, inspect wood finishes in person, or request details on WhatsApp before
              visiting.
            </p>

            <div className="mt-8 grid gap-4 border-t border-[#1A1816]/10 pt-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium tracking-wider text-[#6B5E53] uppercase">
                  Showroom Address
                </p>
                <p className="mt-1 text-sm font-medium text-[#1A1816]">{BUSINESS_INFO.address}</p>
              </div>
              <div>
                <p className="text-xs font-medium tracking-wider text-[#6B5E53] uppercase">
                  Direct Showroom Line
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
                className="inline-flex items-center gap-2 bg-[#3B281B] px-5 py-3 text-sm font-medium text-[#FAF8F4] transition-colors duration-150 hover:bg-[#291B11] whitespace-nowrap"
              >
                About &amp; Showroom Hours
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center gap-2 border border-[#1A1816]/20 bg-white px-5 py-3 text-sm font-medium text-[#1A1816] transition-colors duration-150 hover:border-[#3B281B] hover:bg-[#F2EDE4] whitespace-nowrap"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Furniture Categories */}
      <section className="border-b border-[#1A1816]/10 bg-[#F2EDE4]/65 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
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
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_CATEGORIES_HOME.map((cat) => (
              <Link
                key={cat.title}
                to={`/collections?category=${encodeURIComponent(cat.category)}`}
                className="group flex flex-col border border-[#1A1816]/12 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-15px_rgba(26,24,22,0.18)]"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#EFE9DE]">
                  <SafeImage
                    src={cat.image}
                    alt={cat.alt}
                    title={cat.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-[#1A1816]">{cat.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#6B5E53]">
                      {cat.description}
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#3B281B]">
                    Browse Category
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Furniture Pieces */}
      <section className="border-b border-[#1A1816]/10 bg-[#FAF8F4] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <p className="text-xs font-medium tracking-[0.18em] text-[#B89352] uppercase">
                Showroom Highlights
              </p>
              <h2 className="mt-2 font-serif text-3xl font-medium text-[#1A1816] sm:text-4xl">
                Featured Wooden Furniture
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#6B5E53]">
                Inspect signature bedroom, living room, and dining ensembles. Send a direct
                WhatsApp inquiry for sizing, timber finish options, and showroom availability.
              </p>
            </div>
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 bg-[#3B281B] px-5 py-3 text-sm font-medium text-[#FAF8F4] transition-colors duration-150 hover:bg-[#291B11] whitespace-nowrap"
            >
              Explore All Pieces
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((item) => (
              <ProductCard key={item.id} item={item} onViewDetails={setSelectedProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Showroom Photography Gallery & Why Choose Real Wood Furnitures */}
      <section id="showroom-gallery" className="border-b border-[#1A1816]/10 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium tracking-[0.18em] text-[#B89352] uppercase">
                Why Choose Real Wood Furnitures
              </p>
              <h2 className="mt-2 font-serif text-3xl font-medium text-[#1A1816] sm:text-4xl">
                Honest Joinery &amp; Personal Showroom Guidance
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#6B5E53]">
                Choosing furniture for a home is tactile—seeing the wood grain, testing seating
                comfort, and matching proportions to your rooms.
              </p>

              <div className="mt-8 divide-y divide-[#1A1816]/10 border-t border-b border-[#1A1816]/10">
                <div className="py-5">
                  <h3 className="font-serif text-lg font-medium text-[#1A1816]">
                    01. Solid Timber Aesthetics &amp; Finishes
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#6B5E53]">
                    Rich walnut and warm natural wood tones finished to highlight natural grain
                    character across beds, wardrobes, and tables.
                  </p>
                </div>
                <div className="py-5">
                  <h3 className="font-serif text-lg font-medium text-[#1A1816]">
                    02. Complete Room Coordination
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#6B5E53]">
                    From bedroom sets and wardrobes to sofa sets, dining tables, and chairs, find
                    harmonious pieces under one roof in Gujrat.
                  </p>
                </div>
                <div className="py-5">
                  <h3 className="font-serif text-lg font-medium text-[#1A1816]">
                    03. Direct Call &amp; WhatsApp Assistance
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#6B5E53]">
                    Speak directly with our showroom on {BUSINESS_INFO.phoneDisplay} for inquiries,
                    directions, and live availability before you visit.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              <div className="overflow-hidden border border-[#1A1816]/10 bg-[#EFE9DE] sm:col-span-2 aspect-[16/9]">
                <SafeImage
                  src={SHOWROOM_MEDIA.gallery.src}
                  alt="Showroom interior floor at Real Wood Furnitures in Gujrat"
                  title="Showroom Gallery View"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="sm:col-span-2">
                <ShowroomGooglePhotos quotaExceeded={quotaExceeded} variant="strip" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Customer Inquiry CTA Band */}
      <section className="bg-[#291B11] py-14 text-[#FAF8F4] lg:py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.18em] text-[#E5C890] uppercase">
              Visit or Message the Showroom
            </p>
            <h2 className="mt-2 font-serif text-2xl font-medium text-white sm:text-3xl">
              Looking for Wooden Beds, Sofa Sets, or Dining Furniture in Gujrat?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#FAF8F4]/75">
              Reach us directly on WhatsApp or call {BUSINESS_INFO.phoneDisplay} for pricing and
              current showroom pieces.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1E5C3A] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#17482D] whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Inquiry
            </a>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex items-center gap-2 border border-white/25 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 whitespace-nowrap"
            >
              <Phone className="h-4 w-4" />
              Call Showroom
            </a>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section (GEO / AEO Optimized) & Google Maps Location */}
      <section className="bg-[#FAF8F4] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium tracking-[0.18em] text-[#B89352] uppercase">
                Frequently Asked Questions
              </p>
              <h2 className="mt-2 font-serif text-3xl font-medium text-[#1A1816]">
                Showroom &amp; Inquiry Guide
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#6B5E53]">
                Clear answers about our Gujrat furniture showroom location, collections, and
                inquiry process.
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
                          className={`mt-0.5 h-4 w-4 shrink-0 text-[#6B5E53] transition-transform duration-150 ${
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
            </div>

            <div className="lg:col-span-7">
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
            </div>
          </div>
        </div>
      </section>

      <ProductDetailModal item={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
