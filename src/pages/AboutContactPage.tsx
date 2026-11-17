import {useState, type FormEvent} from 'react';
import {Link} from 'react-router-dom';
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  ZoomIn,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  SHOWROOM_OPENING_HOURS,
  buildWhatsAppUrl,
} from '../data/business';
import {SHOWROOM_MEDIA} from '../data/collections';
import {SeoHead} from '../components/SeoHead';
import {SafeImage} from '../components/SafeImage';
import {ShowroomMap} from '../components/ShowroomMap';
import {ShowroomGooglePhotos} from '../components/ShowroomGooglePhotos';
import {FadeUp} from '../components/Reveal';
import {GalleryLightboxModal, type LightboxSlide} from '../components/GalleryLightboxModal';

const ABOUT_GALLERY_SLIDES: LightboxSlide[] = [
  {
    src: SHOWROOM_MEDIA.bed.src,
    alt: SHOWROOM_MEDIA.bed.alt,
    caption: 'Chinioti Carved King-Size Sheesham Bed',
  },
  {
    src: SHOWROOM_MEDIA.sofa.src,
    alt: SHOWROOM_MEDIA.sofa.alt,
    caption: 'Hand-Carved Sheesham Drawing Room Sofa Set',
  },
];

export function AboutContactPage({quotaExceeded}: {quotaExceeded: boolean}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  // Customer Inquiry Form state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerInterest, setCustomerInterest] = useState('Bedroom Furniture & Beds');
  const [customerMessage, setCustomerMessage] = useState('');
  const [submittedPayload, setSubmittedPayload] = useState<{
    name: string;
    phone: string;
    interest: string;
    message: string;
    whatsappUrl: string;
  } | null>(null);

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = customerName.trim();
    const trimmedPhone = customerPhone.trim();
    const trimmedMessage = customerMessage.trim();
    if (!trimmedName || !trimmedPhone || !trimmedMessage) return;

    const fullText = `Hello Real Wood Furnitures,\nName: ${trimmedName}\nPhone: ${trimmedPhone}\nInterested In: ${customerInterest}\nMessage: ${trimmedMessage}`;
    const whatsappUrl = buildWhatsAppUrl(fullText);

    setSubmittedPayload({
      name: trimmedName,
      phone: trimmedPhone,
      interest: customerInterest,
      message: trimmedMessage,
      whatsappUrl,
    });
  };

  return (
    <>
      <SeoHead
        title="About & Contact Real Wood Furnitures | Gujrat Showroom"
        description="Visit Real Wood Furnitures at G3GC+C7R, Gujrat, Punjab. Seasoned Sheesham & walnut bridal suites, Dewan sofas, dining sets, and Almari wardrobes. Call or WhatsApp +92 333 8407457."
        path="/about-contact"
        breadcrumbs={[
          {name: 'Home', path: '/'},
          {name: 'About & Contact', path: '/about-contact'},
        ]}
      />

      {/* Page Header */}
      <section className="border-b border-[#1A1816]/10 bg-[#F2EDE4]/65 py-12 lg:py-16">
        <FadeUp className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#6B5E53]">
            <Link to="/" className="hover:text-[#1A1816]">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-[#1A1816]">About &amp; Contact</span>
          </nav>

          <div className="mt-5 max-w-3xl">
            <p className="text-xs font-medium tracking-[0.18em] text-[#B89352] uppercase">
              Showroom Story &amp; Location
            </p>
            <h1 className="mt-2 font-serif text-3xl font-medium text-[#1A1816] sm:text-5xl">
              About {BUSINESS_INFO.name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#6B5E53]">
              Seasoned solid Sheesham and walnut furniture in Gujrat—bridal and master bedroom
              suites, Chinioti-inspired carving, Dewan sofas, 8-seater dining tables, Almari
              wardrobes, and safe delivery across Gujrat and Punjab.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* About Showroom + Authentic Gallery */}
      <section className="border-b border-[#1A1816]/10 bg-[#FAF8F4] py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <FadeUp className="flex flex-col justify-center lg:col-span-6">
            <h2 className="font-serif text-3xl font-medium text-[#1A1816]">
              Crafted from Seasoned Sheesham &amp; Walnut
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#6B5E53]">
              At {BUSINESS_INFO.name}, every piece begins with seasoned solid Sheesham and walnut
              timber shaped by skilled Pakistani craftsmen. From Chinioti-inspired carved bridal
              and master bedroom suites to formal Dewan drawing room sofas, 8-seater family dining
              tables, and solid wood Almari wardrobes, we build furniture designed to serve
              generations.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#6B5E53]">
              Need custom room sizes, specific upholstery fabrics, or matching wood polish finishes?
              Visit our Gujrat showroom at{' '}
              <strong className="font-medium text-[#1A1816]">{BUSINESS_INFO.address}</strong> (use
              Plus Code <span className="font-medium text-[#1A1816]">G3GC+C7R</span> in Google
              Maps for effortless navigation), with safe delivery available across Gujrat and
              Punjab.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="flex items-center gap-3 border border-[#1A1816]/15 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3B281B] hover:shadow-md active:translate-y-0 active:scale-[0.98]"
              >
                <Phone className="h-5 w-5 shrink-0 text-[#B89352]" />
                <div>
                  <p className="text-xs text-[#6B5E53]">Call Showroom</p>
                  <p className="text-sm font-medium text-[#1A1816] tabular-nums">
                    {BUSINESS_INFO.phoneDisplay}
                  </p>
                </div>
              </a>

              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#1E5C3A] p-4 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#17482D] hover:shadow-md active:translate-y-0 active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5 shrink-0" />
                <div>
                  <p className="text-xs text-white/80">WhatsApp Direct</p>
                  <p className="text-sm font-medium tabular-nums">{BUSINESS_INFO.phoneDisplay}</p>
                </div>
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={0.1} className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
            <div className="sm:col-span-2">
              <ShowroomGooglePhotos quotaExceeded={quotaExceeded} variant="single" />
            </div>
            <div className="group overflow-hidden border border-[#1A1816]/10 bg-[#EFE9DE] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-14px_rgba(59,40,27,0.2)]">
              <button
                type="button"
                onClick={() => setLightboxIndex(0)}
                aria-label="Zoom in on Chinioti Carved King-Size Sheesham Bed"
                className="relative block aspect-[4/3] w-full overflow-hidden text-left focus:outline-none"
              >
                <SafeImage
                  src={SHOWROOM_MEDIA.bed.src}
                  alt={SHOWROOM_MEDIA.bed.alt}
                  title="Chinioti Carved King-Size Sheesham Bed"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center border border-white/25 bg-[#1A1816]/65 text-white opacity-0 backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                </span>
              </button>
              <p className="border-t border-[#1A1816]/10 bg-white px-3.5 py-2 text-xs font-medium text-[#1A1816]">
                Chinioti Carved King-Size Sheesham Bed
              </p>
            </div>
            <div className="group overflow-hidden border border-[#1A1816]/10 bg-[#EFE9DE] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-14px_rgba(59,40,27,0.2)]">
              <button
                type="button"
                onClick={() => setLightboxIndex(1)}
                aria-label="Zoom in on Hand-Carved Sheesham Drawing Room Sofa Set"
                className="relative block aspect-[4/3] w-full overflow-hidden text-left focus:outline-none"
              >
                <SafeImage
                  src={SHOWROOM_MEDIA.sofa.src}
                  alt={SHOWROOM_MEDIA.sofa.alt}
                  title="Hand-Carved Sheesham Drawing Room Sofa Set"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center border border-white/25 bg-[#1A1816]/65 text-white opacity-0 backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                </span>
              </button>
              <p className="border-t border-[#1A1816]/10 bg-white px-3.5 py-2 text-xs font-medium text-[#1A1816]">
                Hand-Carved Sheesham Drawing Room Sofa Set
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Contact Form + Opening Hours */}
      <section className="border-b border-[#1A1816]/10 bg-white py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          {/* Customer Inquiry Form */}
          <FadeUp className="lg:col-span-7">
            <p className="text-xs font-medium tracking-[0.18em] text-[#B89352] uppercase">
              Direct Showroom Quote
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium text-[#1A1816]">
              Get Prices &amp; Custom Quotes on WhatsApp
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#6B5E53]">
              Share what you are looking for below to receive live showroom photos, exact
              dimensions, polish options, and pricing directly on WhatsApp ({BUSINESS_INFO.phoneDisplay}).
            </p>

            <form onSubmit={handleInquirySubmit} className="mt-7 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="inquiry-name" className="block text-xs font-medium text-[#1A1816]">
                    Your Name
                  </label>
                  <input
                    id="inquiry-name"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g., Ahmad Raza"
                    className="mt-1.5 w-full border border-[#1A1816]/20 bg-[#FAF8F4] px-4 py-3 text-sm text-[#1A1816] transition-colors focus:border-[#3B281B] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="inquiry-phone"
                    className="block text-xs font-medium text-[#1A1816]"
                  >
                    Phone / WhatsApp Number
                  </label>
                  <input
                    id="inquiry-phone"
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+92 3XX XXXXXXX"
                    className="mt-1.5 w-full border border-[#1A1816]/20 bg-[#FAF8F4] px-4 py-3 text-sm text-[#1A1816] tabular-nums transition-colors focus:border-[#3B281B] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="inquiry-interest"
                  className="block text-xs font-medium text-[#1A1816]"
                >
                  Furniture Category
                </label>
                <select
                  id="inquiry-interest"
                  value={customerInterest}
                  onChange={(e) => setCustomerInterest(e.target.value)}
                  className="mt-1.5 w-full border border-[#1A1816]/20 bg-[#FAF8F4] px-4 py-3 text-sm text-[#1A1816] transition-colors focus:border-[#3B281B] focus:bg-white focus:outline-none"
                >
                  <option>Bedroom Furniture &amp; Beds</option>
                  <option>Almari Wardrobes &amp; Singhar Mez</option>
                  <option>Dewan Sofa Sets &amp; Living Room</option>
                  <option>Sheesham Dining Tables &amp; Chairs</option>
                  <option>Custom Size / Polish Order</option>
                  <option>Furniture Accessories</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="inquiry-message"
                  className="block text-xs font-medium text-[#1A1816]"
                >
                  Message
                </label>
                <textarea
                  id="inquiry-message"
                  required
                  rows={4}
                  value={customerMessage}
                  onChange={(e) => setCustomerMessage(e.target.value)}
                  placeholder="Share preferred dimensions, wood polish shade, or your city in Punjab for delivery..."
                  className="mt-1.5 w-full border border-[#1A1816]/20 bg-[#FAF8F4] px-4 py-3 text-sm text-[#1A1816] transition-colors focus:border-[#3B281B] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#3B281B] px-6 py-3.5 text-sm font-medium text-[#FAF8F4] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#291B11] hover:shadow-md active:translate-y-0 active:scale-[0.98]"
                >
                  Prepare Inquiry
                </button>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center gap-2 border border-[#1A1816]/20 bg-white px-5 py-3.5 text-sm font-medium text-[#1A1816] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3B281B] hover:bg-[#F2EDE4] active:translate-y-0 active:scale-[0.98] tabular-nums"
                >
                  <Phone className="h-4 w-4" />
                  Call {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>
            </form>

            {submittedPayload && (
              <div
                role="status"
                className="mt-6 border border-[#1E5C3A]/30 bg-[#1E5C3A]/5 p-5 text-sm text-[#1A1816]"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E5C3A]" />
                  <div>
                    <p className="font-medium text-[#1A1816]">
                      Inquiry ready for {submittedPayload.name}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#6B5E53]">
                      Tap below to send your request on WhatsApp ({BUSINESS_INFO.phoneDisplay}) and
                      receive photos, dimensions, and pricing.
                    </p>
                    <a
                      href={submittedPayload.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 bg-[#1E5C3A] px-4 py-2.5 text-xs font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#17482D] hover:shadow-md active:translate-y-0 active:scale-[0.98]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Send Inquiry on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            )}
          </FadeUp>

          {/* Business Address & Clean Static Opening Hours */}
          <FadeUp delay={0.1} className="space-y-8 lg:col-span-5">
            <div className="border border-[#1A1816]/12 bg-[#FAF8F4] p-6 sm:p-7">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#B89352]" />
                <div>
                  <h2 className="font-serif text-xl font-medium text-[#1A1816]">
                    Showroom Address &amp; Guidance
                  </h2>
                  <p className="mt-1.5 text-sm font-medium text-[#1A1816]">
                    {BUSINESS_INFO.name}
                  </p>
                  <p className="text-sm text-[#6B5E53]">{BUSINESS_INFO.address}</p>
                  <p className="mt-2 text-xs leading-relaxed text-[#6B5E53]">
                    {BUSINESS_INFO.locationGuidance}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    <a
                      href={BUSINESS_INFO.googleMapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#3B281B] px-4 py-2 text-xs font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#291B11] hover:shadow-md active:translate-y-0 active:scale-[0.98]"
                    >
                      <Navigation className="h-3.5 w-3.5" />
                      Get Directions
                    </a>
                    <a
                      href={BUSINESS_INFO.googleMapsListingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border border-[#1A1816]/20 bg-white px-4 py-2 text-xs font-medium text-[#1A1816] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3B281B] hover:bg-[#F2EDE4] active:translate-y-0 active:scale-[0.98]"
                    >
                      Google Listing
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-[#1A1816]/12 bg-[#FAF8F4] p-6 sm:p-7">
              <div className="flex items-center gap-2.5">
                <Clock className="h-5 w-5 text-[#B89352]" />
                <h2 className="font-serif text-xl font-medium text-[#1A1816]">Opening Hours</h2>
              </div>

              <p className="mt-2 text-xs leading-relaxed text-[#6B5E53]">
                Visit our Gujrat showroom during regular hours, or call ahead to book a private
                Sunday appointment.
              </p>

              <dl className="mt-5 divide-y divide-[#1A1816]/10 border-t border-b border-[#1A1816]/10">
                {SHOWROOM_OPENING_HOURS.map((row) => (
                  <div
                    key={row.day}
                    className="flex items-center justify-between gap-4 py-2.5 text-sm"
                  >
                    <dt className="font-medium text-[#1A1816]">{row.day}</dt>
                    <dd className="text-right text-[#6B5E53] tabular-nums">{row.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Google Maps Embedded Location */}
      <section className="bg-[#FAF8F4] py-14 lg:py-20">
        <FadeUp className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-medium tracking-[0.18em] text-[#B89352] uppercase">
              Interactive Showroom Map
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium text-[#1A1816]">
              Directions to {BUSINESS_INFO.name}
            </h2>
          </div>

          <ShowroomMap quotaExceeded={quotaExceeded} />
        </FadeUp>
      </section>

      <GalleryLightboxModal
        slides={ABOUT_GALLERY_SLIDES}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}
