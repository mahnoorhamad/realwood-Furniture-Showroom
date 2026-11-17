import {useEffect, useState, type FormEvent} from 'react';
import {Link} from 'react-router-dom';
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  Edit3,
  ExternalLink,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  RotateCcw,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  DEFAULT_OPENING_HOURS,
  OPENING_HOURS_STORAGE_KEY,
  OpeningHourRow,
  buildWhatsAppUrl,
} from '../data/business';
import {SHOWROOM_MEDIA} from '../data/collections';
import {SeoHead} from '../components/SeoHead';
import {SafeImage} from '../components/SafeImage';
import {ShowroomMap} from '../components/ShowroomMap';
import {ShowroomGooglePhotos} from '../components/ShowroomGooglePhotos';

export function AboutContactPage({quotaExceeded}: {quotaExceeded: boolean}) {
  // Editable opening hours state (persisted locally for showroom verification)
  const [hours, setHours] = useState<OpeningHourRow[]>(DEFAULT_OPENING_HOURS);
  const [isEditingHours, setIsEditingHours] = useState(false);

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

  useEffect(() => {
    try {
      const saved = localStorage.getItem(OPENING_HOURS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as OpeningHourRow[];
        if (Array.isArray(parsed) && parsed.length === DEFAULT_OPENING_HOURS.length) {
          setHours(parsed);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleHourChange = (index: number, newHours: string) => {
    setHours((prev) => prev.map((row, idx) => (idx === index ? {...row, hours: newHours} : row)));
  };

  const handleSaveHours = () => {
    try {
      localStorage.setItem(OPENING_HOURS_STORAGE_KEY, JSON.stringify(hours));
    } catch {
      // Ignore storage errors
    }
    setIsEditingHours(false);
  };

  const handleResetHours = () => {
    setHours(DEFAULT_OPENING_HOURS);
    try {
      localStorage.removeItem(OPENING_HOURS_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

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
        description="Contact Real Wood Furnitures in Gujrat, Punjab (G3GC+C7R). Call or WhatsApp +92 333 8407457, get directions on Google Maps, check showroom hours, or send an inquiry."
        path="/about-contact"
        breadcrumbs={[
          {name: 'Home', path: '/'},
          {name: 'About & Contact', path: '/about-contact'},
        ]}
      />

      {/* Page Header */}
      <section className="border-b border-[#1A1816]/10 bg-[#F2EDE4]/65 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              Serving Gujrat and surrounding Punjab communities with Pakistani solid wood
              furniture, Chinioti-inspired bedroom suites, drawing room sofa sets, dining tables,
              Almari wardrobes, and furniture accessories.
            </p>
          </div>
        </div>
      </section>

      {/* About Showroom + Authentic Gallery */}
      <section className="border-b border-[#1A1816]/10 bg-[#FAF8F4] py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="flex flex-col justify-center lg:col-span-6">
            <h2 className="font-serif text-3xl font-medium text-[#1A1816]">
              Your Furniture Showroom in Gujrat
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#6B5E53]">
              At {BUSINESS_INFO.name}, we craft and curate solid Sheesham and walnut furniture
              designed for Pakistani households. From carved bridal and master bedroom sets to
              drawing room Dewan sofas, 8-seater dining tables, and Almari dressers, our showroom
              combines enduring joinery with warm finishes.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#6B5E53]">
              Visit our showroom at <strong className="font-medium text-[#1A1816]">{BUSINESS_INFO.address}</strong>{' '}
              to experience timber finishes firsthand, or connect with our team directly via phone
              and WhatsApp for instant guidance.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="flex items-center gap-3 border border-[#1A1816]/15 bg-white p-4 transition-colors hover:border-[#3B281B]"
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
                className="flex items-center gap-3 bg-[#1E5C3A] p-4 text-white transition-colors hover:bg-[#17482D]"
              >
                <MessageCircle className="h-5 w-5 shrink-0" />
                <div>
                  <p className="text-xs text-white/80">WhatsApp Direct</p>
                  <p className="text-sm font-medium tabular-nums">{BUSINESS_INFO.phoneDisplay}</p>
                </div>
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
            <div className="sm:col-span-2">
              <ShowroomGooglePhotos quotaExceeded={quotaExceeded} variant="single" />
            </div>
            <div className="overflow-hidden border border-[#1A1816]/10 bg-[#EFE9DE] aspect-[4/3]">
              <SafeImage
                src={SHOWROOM_MEDIA.bed.src}
                alt={SHOWROOM_MEDIA.bed.alt}
                title="Pakistani Carved Bed Display"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="overflow-hidden border border-[#1A1816]/10 bg-[#EFE9DE] aspect-[4/3]">
              <SafeImage
                src={SHOWROOM_MEDIA.sofa.src}
                alt={SHOWROOM_MEDIA.sofa.alt}
                title="Pakistani Drawing Room Sofa Set"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form + Opening Hours */}
      <section className="border-b border-[#1A1816]/10 bg-white py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          {/* Customer Inquiry Form */}
          <div className="lg:col-span-7">
            <p className="text-xs font-medium tracking-[0.18em] text-[#B89352] uppercase">
              Customer Inquiry Form
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium text-[#1A1816]">
              Send an Inquiry to the Showroom
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#6B5E53]">
              Share your name, phone number, and what you are looking for. Submitting prepares a
              direct WhatsApp message for our team at {BUSINESS_INFO.phoneDisplay}.
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
                    className="mt-1.5 w-full border border-[#1A1816]/20 bg-[#FAF8F4] px-4 py-3 text-sm text-[#1A1816] focus:border-[#3B281B] focus:bg-white focus:outline-none"
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
                    className="mt-1.5 w-full border border-[#1A1816]/20 bg-[#FAF8F4] px-4 py-3 text-sm text-[#1A1816] tabular-nums focus:border-[#3B281B] focus:bg-white focus:outline-none"
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
                  className="mt-1.5 w-full border border-[#1A1816]/20 bg-[#FAF8F4] px-4 py-3 text-sm text-[#1A1816] focus:border-[#3B281B] focus:bg-white focus:outline-none"
                >
                  <option>Bedroom Furniture &amp; Beds</option>
                  <option>Wardrobes</option>
                  <option>Sofa Sets &amp; Living Room</option>
                  <option>Dining Tables &amp; Chairs</option>
                  <option>Wooden Furniture (Custom Order)</option>
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
                  placeholder="Share preferred dimensions, wood finish, or when you plan to visit our Gujrat showroom..."
                  className="mt-1.5 w-full border border-[#1A1816]/20 bg-[#FAF8F4] px-4 py-3 text-sm text-[#1A1816] focus:border-[#3B281B] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#3B281B] px-6 py-3.5 text-sm font-medium text-[#FAF8F4] transition-colors hover:bg-[#291B11]"
                >
                  Prepare Inquiry
                </button>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center gap-2 border border-[#1A1816]/20 bg-white px-5 py-3.5 text-sm font-medium text-[#1A1816] hover:bg-[#F2EDE4]"
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
                      Tap the button below to send your message directly to Real Wood Furnitures on
                      WhatsApp ({BUSINESS_INFO.phoneDisplay}).
                    </p>
                    <a
                      href={submittedPayload.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 bg-[#1E5C3A] px-4 py-2.5 text-xs font-medium text-white hover:bg-[#17482D]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Send Inquiry on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Business Address & Editable Opening Hours */}
          <div className="space-y-8 lg:col-span-5">
            <div className="border border-[#1A1816]/12 bg-[#FAF8F4] p-6 sm:p-7">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#B89352]" />
                <div>
                  <h2 className="font-serif text-xl font-medium text-[#1A1816]">
                    Showroom Address
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#6B5E53]">
                    {BUSINESS_INFO.name}
                    <br />
                    {BUSINESS_INFO.address}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    <a
                      href={BUSINESS_INFO.googleMapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#3B281B] px-4 py-2 text-xs font-medium text-white hover:bg-[#291B11]"
                    >
                      <Navigation className="h-3.5 w-3.5" />
                      Get Directions
                    </a>
                    <a
                      href={BUSINESS_INFO.googleMapsListingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border border-[#1A1816]/20 bg-white px-4 py-2 text-xs font-medium text-[#1A1816] hover:bg-[#F2EDE4]"
                    >
                      Google Listing
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-[#1A1816]/12 bg-[#FAF8F4] p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <Clock className="h-5 w-5 text-[#B89352]" />
                  <h2 className="font-serif text-xl font-medium text-[#1A1816]">Opening Hours</h2>
                </div>
                <button
                  type="button"
                  onClick={() => (isEditingHours ? handleSaveHours() : setIsEditingHours(true))}
                  className="inline-flex items-center gap-1.5 border border-[#1A1816]/20 bg-white px-3 py-1.5 text-xs font-medium text-[#1A1816] hover:bg-[#F2EDE4]"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  {isEditingHours ? 'Save Hours' : 'Edit Hours'}
                </button>
              </div>

              <p className="mt-2 text-xs text-[#6B5E53]">
                Editable showroom schedule — please verify exact hours before publishing or call{' '}
                <a href={BUSINESS_INFO.phoneHref} className="underline tabular-nums">
                  {BUSINESS_INFO.phoneDisplay}
                </a>{' '}
                ahead of your visit.
              </p>

              <dl className="mt-5 divide-y divide-[#1A1816]/10 border-t border-b border-[#1A1816]/10">
                {hours.map((row, idx) => (
                  <div
                    key={row.day}
                    className="flex items-center justify-between gap-4 py-2.5 text-sm"
                  >
                    <dt className="font-medium text-[#1A1816]">{row.day}</dt>
                    <dd className="text-right text-[#6B5E53] tabular-nums">
                      {isEditingHours ? (
                        <input
                          type="text"
                          value={row.hours}
                          aria-label={`${row.day} opening hours`}
                          onChange={(e) => handleHourChange(idx, e.target.value)}
                          className="w-48 border border-[#1A1816]/25 bg-white px-2.5 py-1 text-right text-xs text-[#1A1816] focus:border-[#3B281B] focus:outline-none"
                        />
                      ) : (
                        row.hours
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              {isEditingHours && (
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={handleResetHours}
                    className="inline-flex items-center gap-1.5 text-xs text-[#6B5E53] hover:text-[#1A1816]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset to Default
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Embedded Location */}
      <section className="bg-[#FAF8F4] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-medium tracking-[0.18em] text-[#B89352] uppercase">
              Interactive Showroom Map
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium text-[#1A1816]">
              Directions to {BUSINESS_INFO.name}
            </h2>
          </div>

          <ShowroomMap quotaExceeded={quotaExceeded} />
        </div>
      </section>
    </>
  );
}
