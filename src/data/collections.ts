export type FurnitureCategory =
  | 'All'
  | 'Bedroom Furniture'
  | 'Beds'
  | 'Wardrobes'
  | 'Sofa Sets'
  | 'Living Room Furniture'
  | 'Dining Tables'
  | 'Chairs'
  | 'Wooden Furniture'
  | 'Furniture Accessories';

export const FURNITURE_CATEGORIES: FurnitureCategory[] = [
  'All',
  'Bedroom Furniture',
  'Beds',
  'Wardrobes',
  'Sofa Sets',
  'Living Room Furniture',
  'Dining Tables',
  'Chairs',
  'Wooden Furniture',
  'Furniture Accessories',
];

export interface FurnitureItem {
  id: string;
  name: string;
  category: Exclude<FurnitureCategory, 'All'>;
  secondaryCategories?: Exclude<FurnitureCategory, 'All'>[];
  shortDescription: string;
  craftNotes: string;
  image: string | null;
  imageAlt: string;
  isPlaceholder?: boolean;
  placeholderNote?: string;
  featured?: boolean;
}

export const SHOWROOM_MEDIA = {
  hero: {
    src: '/src/assets/images/pk_showroom_hero_1794908445972.jpg',
    alt: 'Real Wood Furnitures Pakistani showroom interior in Gujrat featuring carved Sheesham sofa sets, brass-accented wooden console, and bedroom displays',
  },
  gallery: {
    src: '/src/assets/images/pk_showroom_display_1794908446612.jpg',
    alt: 'Pakistani wooden furniture showroom gallery at Real Wood Furnitures Gujrat with Sheesham dining tables, carved chairs, and sideboards',
  },
  bed: {
    src: '/src/assets/images/pk_chinioti_bridal_bed_1794908447241.jpg',
    alt: 'Pakistani Chinioti carved solid Sheesham king-size wooden bed with brass inlay and matching side tables',
  },
  sofa: {
    src: '/src/assets/images/pk_dewan_sofa_set_1794908448161.jpg',
    alt: 'Pakistani drawing room hand-carved Sheesham wood sofa set with ivory tufted velvet cushions and carved center table',
  },
  dining: {
    src: '/src/assets/images/pk_sheesham_dining_set_1794908447932.jpg',
    alt: 'Pakistani 8-seater solid Sheesham dining table with fluted legs and high-back upholstered dining chairs',
  },
  wardrobe: {
    src: '/src/assets/images/pk_almari_dressing_set_1794908449101.jpg',
    alt: 'Pakistani solid wood 3-door Almari wardrobe and matching Singhar Mez dressing table with carved mirror frame',
  },
} as const;

export const FURNITURE_CATALOGUE: FurnitureItem[] = [
  {
    id: 'chinioti-carved-bridal-bed',
    name: 'Chinioti Carved Sheesham Bridal Bed Set',
    category: 'Beds',
    secondaryCategories: ['Bedroom Furniture', 'Wooden Furniture'],
    shortDescription:
      'Grand Pakistani king-size bed crafted in dark Sheesham wood with intricate floral Chinioti carving, fine brass inlay, and matching side tables.',
    craftNotes:
      'Built in classic Pakistani heirloom style with deep hand-carved headboard motifs, sturdy solid-timber framing, and matching bedside cabinets. Ideal for bridal and master bedrooms.',
    image: SHOWROOM_MEDIA.bed.src,
    imageAlt: SHOWROOM_MEDIA.bed.alt,
    featured: true,
  },
  {
    id: 'dewan-carved-sofa-set',
    name: 'Dewan Hand-Carved Drawing Room Sofa Set',
    category: 'Sofa Sets',
    secondaryCategories: ['Living Room Furniture', 'Wooden Furniture'],
    shortDescription:
      'Formal Pakistani drawing room seating set in solid Sheesham wood with sculpted floral trim, tufted champagne velvet, and matching lounge chairs.',
    craftNotes:
      'Tailored for Pakistani mehman-khana and drawing room interiors—combining deep cushioned seating, carved crown rails, and durable hardwood legs.',
    image: SHOWROOM_MEDIA.sofa.src,
    imageAlt: SHOWROOM_MEDIA.sofa.alt,
    featured: true,
  },
  {
    id: 'shahi-sheesham-8-seater-dining',
    name: 'Shahi 8-Seater Sheesham Dining Ensemble',
    category: 'Dining Tables',
    secondaryCategories: ['Chairs', 'Wooden Furniture'],
    shortDescription:
      'Generous Pakistani family dining table in rich solid Sheesham with turned fluted legs and eight high-back upholstered chairs.',
    craftNotes:
      'Proportioned for large family gatherings and formal dinners, featuring bevel-edged solid timber planking and comfortable linen-upholstered chair backs.',
    image: SHOWROOM_MEDIA.dining.src,
    imageAlt: SHOWROOM_MEDIA.dining.alt,
    featured: true,
  },
  {
    id: 'solid-wood-almari-dressing-suite',
    name: '3-Door Solid Wood Almari & Singhar Mez',
    category: 'Wardrobes',
    secondaryCategories: ['Bedroom Furniture', 'Wooden Furniture'],
    shortDescription:
      'Full-height Pakistani 3-door wooden Almari wardrobe with lower storage drawers paired with a carved Singhar Mez dressing table.',
    craftNotes:
      'Crafted with raised timber paneling, subtle floral frieze carving, antique brass pulls, and a full-length framed mirror dressing unit.',
    image: SHOWROOM_MEDIA.wardrobe.src,
    imageAlt: SHOWROOM_MEDIA.wardrobe.alt,
    featured: false,
  },
  {
    id: 'brass-accent-console-mirror',
    name: 'Carved Walnut Console & Mirror Set',
    category: 'Living Room Furniture',
    secondaryCategories: ['Wooden Furniture'],
    shortDescription:
      'Showroom statement sideboard console with brass-inlaid doors and an ornate hand-carved wooden wall mirror.',
    craftNotes:
      'Ideal for Pakistani foyer entrances, dining halls, and formal living lounges.',
    image: SHOWROOM_MEDIA.hero.src,
    imageAlt: SHOWROOM_MEDIA.hero.alt,
    featured: false,
  },
  {
    id: 'carved-sheesham-teapoy-center-table',
    name: 'Carved Sheesham Center Table (Teapoy)',
    category: 'Living Room Furniture',
    secondaryCategories: ['Wooden Furniture'],
    shortDescription:
      'Traditional curved-leg Pakistani solid wood coffee table with carved apron detailing for drawing rooms.',
    craftNotes:
      'Sized to pair effortlessly with 5-seater and 7-seater carved sofa sets. Available with matching corner side tables on inquiry.',
    image: SHOWROOM_MEDIA.sofa.src,
    imageAlt: 'Pakistani hand-carved wooden center table in drawing room setting',
    featured: false,
  },
  {
    id: 'carved-high-back-dining-chairs',
    name: 'Upholstered Carved Wood Dining & Accent Chairs',
    category: 'Chairs',
    secondaryCategories: ['Dining Tables', 'Living Room Furniture', 'Wooden Furniture'],
    shortDescription:
      'Solid Sheesham high-back chairs with subtle top-rail carving and tailored neutral fabric upholstery.',
    craftNotes:
      'Available in sets of 6 or 8 for dining tables, or as pair seating for bedroom corners and lounges.',
    image: SHOWROOM_MEDIA.gallery.src,
    imageAlt: SHOWROOM_MEDIA.gallery.alt,
    featured: false,
  },
  {
    id: 'gujrat-complete-jahez-bedroom-suite',
    name: 'Gujrat Heritage Complete Bedroom Suite',
    category: 'Bedroom Furniture',
    secondaryCategories: ['Beds', 'Wardrobes', 'Wooden Furniture'],
    shortDescription:
      'Coordinated Pakistani bedroom package uniting carved king bed, side tables, 3-door Almari, and Singhar Mez dressing table.',
    craftNotes:
      'Finish-matched across all bedroom pieces in walnut or dark Sheesham polish. Speak with our Gujrat showroom team for custom suite configurations.',
    image: SHOWROOM_MEDIA.bed.src,
    imageAlt: 'Complete Pakistani wooden bedroom furniture suite at Real Wood Furnitures Gujrat',
    featured: false,
  },
  {
    id: 'showroom-furniture-accessories-placeholder',
    name: 'Furniture Accessories, Lamps & Brass Hardware',
    category: 'Furniture Accessories',
    secondaryCategories: ['Wooden Furniture'],
    shortDescription:
      'Side stools, wooden jaali panels, mirror frames, cushions, and furniture care accessories stocked in the showroom.',
    craftNotes:
      'Individual accessory showroom photos are pending upload. Tap WhatsApp Inquiry to request live showroom photos and current stock.',
    image: null,
    imageAlt: 'Furniture accessories placeholder — request live showroom photographs on WhatsApp',
    isPlaceholder: true,
    placeholderNote: 'Authentic Showroom Photo Pending · Request Live Photos via WhatsApp',
    featured: false,
  },
];

export const FEATURED_CATEGORIES_HOME = [
  {
    title: 'Bridal & Master Beds',
    category: 'Bedroom Furniture' as const,
    description: 'Chinioti carved Sheesham beds, side tables, and complete bedroom suites.',
    image: SHOWROOM_MEDIA.bed.src,
    alt: SHOWROOM_MEDIA.bed.alt,
  },
  {
    title: 'Drawing Room Sofa Sets',
    category: 'Sofa Sets' as const,
    description: 'Hand-carved wooden sofa sets, Dewan seating, and carved center tables.',
    image: SHOWROOM_MEDIA.sofa.src,
    alt: SHOWROOM_MEDIA.sofa.alt,
  },
  {
    title: 'Sheesham Dining Sets',
    category: 'Dining Tables' as const,
    description: '6-seater and 8-seater solid wood dining tables with upholstered chairs.',
    image: SHOWROOM_MEDIA.dining.src,
    alt: SHOWROOM_MEDIA.dining.alt,
  },
  {
    title: 'Almari & Dressing Tables',
    category: 'Wardrobes' as const,
    description: 'Solid wood 3-door wardrobes, Singhar Mez dressers, and brass consoles.',
    image: SHOWROOM_MEDIA.wardrobe.src,
    alt: SHOWROOM_MEDIA.wardrobe.alt,
  },
];
