export const BUSINESS_INFO = {
  name: 'Real Wood Furnitures',
  shortName: 'REAL WOOD FURNITURES',
  type: 'Furniture Showroom & Furniture Accessories',
  address: 'G3GC+C7R, Gujrat, Punjab, Pakistan',
  locationGuidance:
    'Search Plus Code G3GC+C7R in Google Maps for turn-by-turn directions to our Gujrat showroom, or call +92 333 8407457 for landmark guidance before you arrive.',
  deliveryCoverage: 'Safe, insured delivery across Gujrat and Punjab.',
  city: 'Gujrat',
  region: 'Punjab',
  country: 'Pakistan',
  phoneDisplay: '+92 333 8407457',
  phoneHref: 'tel:+923338407457',
  whatsappNumber: '923338407457',
  googleMapsListingUrl:
    'https://www.google.com/maps/place/Real+Wood+Furnitures/data=!4m2!3m1!1s0x0:0x66702d56387c5c38',
  googleMapsPhotosUrl: 'https://maps.app.goo.gl/pPZkyCPYaAWpkiG37',
  googleMapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Real+Wood+Furnitures+G3GC%2BC7R+Gujrat+Punjab+Pakistan',
  googleMapsEmbedFallbackUrl:
    'https://maps.google.com/maps?q=Real+Wood+Furnitures,+G3GC%2BC7R,+Gujrat,+Punjab,+Pakistan&t=&z=16&ie=UTF8&iwloc=&output=embed',
  defaultWhatsAppMessage:
    'Hello Real Wood Furnitures, I am interested in your furniture collection. Please share prices, photos, and showroom details.',
} as const;

export function buildWhatsAppUrl(customMessage?: string): string {
  const text = encodeURIComponent(customMessage || BUSINESS_INFO.defaultWhatsAppMessage);
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`;
}

export function buildProductWhatsAppUrl(productName: string, category?: string): string {
  const categoryPart = category ? ` (${category})` : '';
  const message = `Assalam-o-Alaikum Real Wood Furnitures, please share the price, dimensions, and polish options for: ${productName}${categoryPart}.`;
  return buildWhatsAppUrl(message);
}

export interface OpeningHourRow {
  day: string;
  hours: string;
}

export const SHOWROOM_OPENING_HOURS: OpeningHourRow[] = [
  {day: 'Monday', hours: '10:00 AM – 9:00 PM'},
  {day: 'Tuesday', hours: '10:00 AM – 9:00 PM'},
  {day: 'Wednesday', hours: '10:00 AM – 9:00 PM'},
  {day: 'Thursday', hours: '10:00 AM – 9:00 PM'},
  {day: 'Friday', hours: '2:30 PM – 9:00 PM'},
  {day: 'Saturday', hours: '10:00 AM – 9:00 PM'},
  {day: 'Sunday', hours: 'By Appointment / Confirm via Call'},
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const SHOWROOM_FAQS: FaqItem[] = [
  {
    question: 'Where is Real Wood Furnitures showroom located in Gujrat?',
    answer:
      'Real Wood Furnitures is located at G3GC+C7R, Gujrat, Punjab, Pakistan. Enter Plus Code G3GC+C7R into Google Maps or tap Get Directions on our site for turn-by-turn navigation.',
  },
  {
    question: 'What types of wood and furniture designs are available?',
    answer:
      'We specialize in seasoned solid Sheesham and walnut furniture, including Chinioti-inspired carved bridal and master bedroom suites, Dewan drawing room sofas, 8-seater dining tables, Almari wardrobes, and custom finishes.',
  },
  {
    question: 'Can I customize sizes, upholstery fabrics, or wood polish finishes?',
    answer:
      'Yes. Custom room dimensions, velvet or linen upholstery fabrics, and walnut or natural wood polish finishes can be arranged. Message us on WhatsApp at +92 333 8407457 for custom quotes.',
  },
  {
    question: 'Do you offer delivery across Gujrat and Punjab?',
    answer:
      'Yes, we arrange careful, safe furniture delivery across Gujrat and cities throughout Punjab. Contact our showroom team on WhatsApp to confirm delivery timelines for your order.',
  },
  {
    question: 'What are your showroom opening hours and how do I book a Sunday visit?',
    answer:
      'We are open Monday through Thursday and Saturday from 10:00 AM to 9:00 PM, and Friday from 2:30 PM to 9:00 PM. Sunday visits are available by appointment—please call +92 333 8407457 ahead.',
  },
];
