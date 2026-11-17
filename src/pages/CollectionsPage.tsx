import {useEffect, useMemo, useState} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import {MessageCircle, Phone, Search, ChevronRight} from 'lucide-react';
import {
  FURNITURE_CATALOGUE,
  FURNITURE_CATEGORIES,
  FurnitureCategory,
  FurnitureItem,
} from '../data/collections';
import {BUSINESS_INFO, buildWhatsAppUrl} from '../data/business';
import {SeoHead} from '../components/SeoHead';
import {ProductCard} from '../components/ProductCard';
import {ProductDetailModal} from '../components/ProductDetailModal';
import {FadeUp, StaggerGrid, StaggerItem} from '../components/Reveal';

export function CollectionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('category') as FurnitureCategory | null;
  const validInitialCat =
    initialCat && FURNITURE_CATEGORIES.includes(initialCat) ? initialCat : 'All';

  const [activeCategory, setActiveCategory] = useState<FurnitureCategory>(validInitialCat);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<FurnitureItem | null>(null);

  useEffect(() => {
    const paramCat = searchParams.get('category') as FurnitureCategory | null;
    if (paramCat && FURNITURE_CATEGORIES.includes(paramCat)) {
      setActiveCategory(paramCat);
    } else if (!paramCat) {
      setActiveCategory('All');
    }
  }, [searchParams]);

  const handleCategoryChange = (category: FurnitureCategory) => {
    setActiveCategory(category);
    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({category});
    }
  };

  const filteredItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return FURNITURE_CATALOGUE.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' ||
        item.category === activeCategory ||
        item.secondaryCategories?.includes(activeCategory);

      const matchesSearch =
        !normalizedQuery ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.shortDescription.toLowerCase().includes(normalizedQuery) ||
        item.category.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <>
      <SeoHead
        title="Furniture Collections in Gujrat | Real Wood Furnitures"
        description="Browse seasoned Sheesham beds, bridal bedroom suites, Dewan sofa sets, Almari wardrobes, and dining tables at Real Wood Furnitures Gujrat. Inquire on WhatsApp +92 333 8407457."
        path="/collections"
        breadcrumbs={[
          {name: 'Home', path: '/'},
          {name: 'Furniture Collections', path: '/collections'},
        ]}
      />

      {/* Header & Breadcrumbs */}
      <section className="border-b border-[#1A1816]/10 bg-[#F2EDE4]/65 py-12 lg:py-16">
        <FadeUp className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#6B5E53]">
            <Link to="/" className="hover:text-[#1A1816]">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-[#1A1816]">Furniture Collections</span>
          </nav>

          <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-[0.18em] text-[#B89352] uppercase">
                Gujrat Showroom Catalogue
              </p>
              <h1 className="mt-2 font-serif text-3xl font-medium text-[#1A1816] sm:text-5xl">
                Furniture Collections
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-[#6B5E53] sm:text-base">
                Explore seasoned solid Sheesham and walnut furniture—bridal and master bedroom
                suites, Dewan sofa sets, 8-seater dining tables, and Almari wardrobes—with custom
                sizes, polish finishes, and safe delivery across Gujrat and Punjab.
              </p>
            </div>

            <div className="relative w-full max-w-sm">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#6B5E53]" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search beds, Dewan sofas, dining..."
                aria-label="Search furniture collections"
                className="w-full border border-[#1A1816]/15 bg-white py-2.5 pr-4 pl-10 text-sm text-[#1A1816] placeholder:text-[#6B5E53]/70 focus:border-[#3B281B] focus:outline-none"
              />
            </div>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter furniture by category"
            className="mt-8 flex flex-wrap items-center gap-2"
          >
            {FURNITURE_CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-3.5 py-2 text-xs font-medium transition-all duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#3B281B] text-[#FAF8F4] shadow-sm'
                      : 'border border-[#1A1816]/15 bg-white text-[#6B5E53] hover:border-[#3B281B] hover:text-[#1A1816]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </FadeUp>
      </section>

      {/* Catalogue Grid */}
      <section className="bg-[#FAF8F4] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#1A1816]/10 pb-4">
            <p className="text-sm text-[#6B5E53]">
              Showing{' '}
              <span className="font-medium text-[#1A1816] tabular-nums">
                {filteredItems.length}
              </span>{' '}
              {filteredItems.length === 1 ? 'item' : 'items'} in{' '}
              <span className="font-medium text-[#1A1816]">{activeCategory}</span>
            </p>
            <p className="text-xs text-[#6B5E53]">
              Tap WhatsApp Inquiry on any piece for photos, dimensions, and pricing
            </p>
          </div>

          {filteredItems.length === 0 ? (
            <div className="border border-[#1A1816]/12 bg-white p-12 text-center">
              <h2 className="font-serif text-2xl font-medium text-[#1A1816]">
                No matching pieces in this filter
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-[#6B5E53]">
                Try clearing your search or contact our Gujrat showroom directly on WhatsApp for
                additional designs and custom wood finishes.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    handleCategoryChange('All');
                  }}
                  className="border border-[#1A1816]/20 bg-[#FAF8F4] px-5 py-2.5 text-sm font-medium text-[#1A1816] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F2EDE4] active:translate-y-0 active:scale-[0.98]"
                >
                  Reset Filters
                </button>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#1E5C3A] px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#17482D] hover:shadow-md active:translate-y-0 active:scale-[0.98]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <StaggerGrid className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <StaggerItem key={item.id}>
                  <ProductCard item={item} onViewDetails={setSelectedProduct} />
                </StaggerItem>
              ))}
            </StaggerGrid>
          )}

          {/* Direct Showroom Conversion Box */}
          <FadeUp className="mt-16 border border-[#1A1816]/12 bg-white p-8 sm:p-10">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <p className="text-xs font-medium tracking-[0.18em] text-[#B89352] uppercase">
                  Custom Orders &amp; Punjab Delivery
                </p>
                <h2 className="mt-2 font-serif text-2xl font-medium text-[#1A1816] sm:text-3xl">
                  Get Live Showroom Photos, Custom Sizes &amp; Polish Options
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#6B5E53]">
                  Need bespoke measurements, custom walnut or Sheesham polish shades, or safe
                  delivery across Gujrat and Punjab? Message us on WhatsApp or call{' '}
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="font-medium text-[#1A1816] underline-offset-4 hover:underline tabular-nums"
                  >
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                  .
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href={buildWhatsAppUrl(
                    'Hello Real Wood Furnitures, please share live showroom photos, custom polish options, and pricing.',
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#1E5C3A] px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#17482D] hover:shadow-md active:translate-y-0 active:scale-[0.98] whitespace-nowrap"
                >
                  <MessageCircle className="h-4 w-4" />
                  Request Live Photos
                </a>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center gap-2 border border-[#1A1816]/20 bg-[#FAF8F4] px-5 py-3 text-sm font-medium text-[#1A1816] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F2EDE4] active:translate-y-0 active:scale-[0.98] whitespace-nowrap"
                >
                  <Phone className="h-4 w-4" />
                  Call Showroom
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <ProductDetailModal item={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
