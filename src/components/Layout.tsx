import {useState, type ReactNode} from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom';
import {Menu, MessageCircle, Phone, MapPin, X, ExternalLink} from 'lucide-react';
import {BUSINESS_INFO, buildWhatsAppUrl} from '../data/business';

interface LayoutProps {
  children: ReactNode;
  quotaExceeded: boolean;
}

export function Layout({children, quotaExceeded}: LayoutProps) {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinkClass = ({isActive}: {isActive: boolean}) =>
    `relative py-1 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
      isActive
        ? 'text-[#3B281B] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:bg-[#B89352]'
        : 'text-[#6B5E53] hover:text-[#1A1816]'
    }`;

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF8F4] text-[#1A1816]">
      {quotaExceeded && (
        <div className="sticky top-0 z-50 border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-center text-xs text-amber-900 shadow-sm md:text-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-amber-950 underline hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {!bannerDismissed && (
        <div className="relative flex h-9 items-center justify-center bg-[#291B11] px-10 text-center text-xs text-[#FAF8F4]/90">
          <p className="truncate">
            Real Wood Furnitures Showroom · {BUSINESS_INFO.address} ·{' '}
            <a
              href={BUSINESS_INFO.phoneHref}
              className="font-medium text-[#E5C890] underline-offset-4 hover:underline tabular-nums"
            >
              {BUSINESS_INFO.phoneDisplay}
            </a>
          </p>
          <button
            type="button"
            onClick={() => setBannerDismissed(true)}
            aria-label="Dismiss announcement"
            className="absolute right-3 flex h-7 w-7 items-center justify-center text-[#FAF8F4]/70 transition-colors hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-[#1A1816]/10 bg-[#FAF8F4]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-lg font-semibold tracking-wide text-[#1A1816] whitespace-nowrap shrink-0 sm:text-xl"
          >
            {BUSINESS_INFO.shortName}
          </Link>

          <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/collections" className={navLinkClass}>
              Collections
            </NavLink>
            <a
              href={location.pathname === '/' ? '#showroom-gallery' : '/#showroom-gallery'}
              className="relative py-1 text-sm font-medium text-[#6B5E53] transition-colors duration-150 hover:text-[#1A1816] whitespace-nowrap shrink-0"
            >
              Showroom
            </a>
            <NavLink to="/about-contact" className={navLinkClass}>
              About &amp; Contact
            </NavLink>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 bg-[#1E5C3A] px-4 py-2 text-xs font-medium text-white transition-colors duration-150 hover:bg-[#17482D] whitespace-nowrap shrink-0 sm:inline-flex"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp Us
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="flex h-10 w-10 items-center justify-center border border-[#1A1816]/15 text-[#1A1816] md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-[#1A1816]/10 bg-[#FAF8F4] px-4 py-4 md:hidden">
            <nav aria-label="Mobile navigation" className="flex flex-col gap-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-base font-medium text-[#1A1816]"
              >
                Home
              </Link>
              <Link
                to="/collections"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-base font-medium text-[#1A1816]"
              >
                Furniture Collections
              </Link>
              <Link
                to="/about-contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-base font-medium text-[#1A1816]"
              >
                About &amp; Contact
              </Link>
              <div className="mt-2 flex flex-col gap-2.5 border-t border-[#1A1816]/10 pt-3">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#1E5C3A] px-4 py-3 text-sm font-medium text-white"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Inquiry
                </a>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center justify-center gap-2 border border-[#1A1816]/20 bg-white px-4 py-3 text-sm font-medium text-[#1A1816] tabular-nums"
                >
                  <Phone className="h-4 w-4" />
                  Call {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-[#1A1816]/10 bg-[#1A1816] text-[#FAF8F4]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <p className="font-serif text-xl font-medium tracking-wide text-[#FAF8F4]">
                {BUSINESS_INFO.shortName}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#FAF8F4]/70">
                Handcrafted solid wood furniture and interior pieces for homes across Gujrat and
                Punjab. Visit our showroom to inspect finishes and timber craftsmanship in person.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-base font-medium text-[#E5C890]">Showroom Pages</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-[#FAF8F4]/75">
                <li>
                  <Link to="/" className="transition-colors hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/collections" className="transition-colors hover:text-white">
                    Furniture Collections
                  </Link>
                </li>
                <li>
                  <Link to="/about-contact" className="transition-colors hover:text-white">
                    About &amp; Contact
                  </Link>
                </li>
                <li>
                  <a
                    href={BUSINESS_INFO.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                  >
                    Get Directions
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-base font-medium text-[#E5C890]">Collections</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-[#FAF8F4]/75">
                <li>
                  <Link
                    to="/collections?category=Bedroom+Furniture"
                    className="transition-colors hover:text-white"
                  >
                    Bedroom Furniture &amp; Beds
                  </Link>
                </li>
                <li>
                  <Link
                    to="/collections?category=Sofa+Sets"
                    className="transition-colors hover:text-white"
                  >
                    Sofa Sets &amp; Living Room
                  </Link>
                </li>
                <li>
                  <Link
                    to="/collections?category=Dining+Tables"
                    className="transition-colors hover:text-white"
                  >
                    Dining Tables &amp; Chairs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/collections?category=Wardrobes"
                    className="transition-colors hover:text-white"
                  >
                    Wardrobes &amp; Wooden Furniture
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-base font-medium text-[#E5C890]">Visit &amp; Contact</h3>
              <div className="mt-4 space-y-3 text-sm text-[#FAF8F4]/80">
                <p className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#B89352]" />
                  <span>{BUSINESS_INFO.address}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-[#B89352]" />
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="transition-colors hover:text-white tabular-nums"
                  >
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                </p>
                <div className="pt-2">
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#1E5C3A] px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-[#17482D]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Message on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[#FAF8F4]/60 sm:flex-row sm:items-center">
            <p>
              &copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.
            </p>
            <a
              href={BUSINESS_INFO.googleMapsListingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#FAF8F4]/75 transition-colors hover:text-white"
            >
              Google Business Profile: {BUSINESS_INFO.name}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </footer>

      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Real Wood Furnitures on WhatsApp"
        className="fixed right-4 bottom-4 z-40 inline-flex h-12 items-center gap-2 border border-white/15 bg-[#1E5C3A] px-4 text-sm font-medium text-white shadow-lg transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#17482D]"
      >
        <MessageCircle className="h-4 w-4 shrink-0" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
