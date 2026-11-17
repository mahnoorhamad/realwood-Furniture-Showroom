export const BUSINESS_INFO = {
  name: 'Real Wood Furnitures',
  shortName: 'REAL WOOD FURNITURES',
  type: 'Furniture Showroom & Furniture Accessories',
  address: 'G3GC+C7R, Gujrat, Punjab, Pakistan',
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
    'Hello Real Wood Furnitures, I am interested in your furniture collection. Please share more details.',
} as const;

export function buildWhatsAppUrl(customMessage?: string): string {
  const text = encodeURIComponent(customMessage || BUSINESS_INFO.defaultWhatsAppMessage);
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`;
}

export function buildProductWhatsAppUrl(productName: string, category?: string): string {
  const categoryPart = category ? ` (${category})` : '';
  const message = `Hello Real Wood Furnitures, I am interested in "${productName}"${categoryPart}. Please share availability, dimensions, and pricing details.`;
  return buildWhatsAppUrl(message);
}

export interface OpeningHourRow {
  day: string;
  hours: string;
}

export const OPENING_HOURS_STORAGE_KEY = 'rwf_opening_hours_v1';

export const DEFAULT_OPENING_HOURS: OpeningHourRow[] = [
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
      'Real Wood Furnitures is located at G3GC+C7R, Gujrat, Punjab, Pakistan. You can view our exact pin on Google Maps or tap Get Directions on our website before visiting.',
  },
  {
    question: 'How can I contact Real Wood Furnitures or inquire about a piece on WhatsApp?',
    answer:
      'You can call or message us directly on +92 333 8407457, or click any WhatsApp Inquiry button on our catalogue cards to send a message pre-filled with the piece you are interested in.',
  },
  {
    question: 'What types of furniture are available at the showroom?',
    answer:
      'Our showroom focuses on solid wooden furniture, including bedroom furniture, wooden beds, wardrobes, sofa sets, living room furniture, dining tables, chairs, and furniture accessories.',
  },
  {
    question: 'Can I confirm pricing, wood finish options, and showroom availability before visiting?',
    answer:
      'Yes. Because timber grades, upholstery fabrics, and dimensions can vary by order, pricing is shared directly on inquiry. Message us on WhatsApp at +92 333 8407457 for current showroom availability and pricing.',
  },
  {
    question: 'Should I confirm opening hours before travelling to the Gujrat showroom?',
    answer:
      'We recommend calling or messaging +92 333 8407457 ahead of your visit—especially on Fridays, Sundays, or public holidays—to confirm showroom hours.',
  },
];
