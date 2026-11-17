import {useEffect} from 'react';
import {BUSINESS_INFO, SHOWROOM_FAQS} from '../data/business';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface SeoHeadProps {
  title: string;
  description: string;
  path: string;
  breadcrumbs: BreadcrumbItem[];
  includeFaqSchema?: boolean;
}

function upsertMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonicalLink(href: string) {
  let el = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function SeoHead({
  title,
  description,
  path,
  breadcrumbs,
  includeFaqSchema = false,
}: SeoHeadProps) {
  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const canonicalUrl = `${origin}${path}`;

    document.title = title;
    upsertCanonicalLink(canonicalUrl);
    upsertMetaTag('name', 'description', description);
    upsertMetaTag('property', 'og:title', title);
    upsertMetaTag('property', 'og:description', description);
    upsertMetaTag('property', 'og:url', canonicalUrl);
    upsertMetaTag('property', 'og:type', 'website');
    upsertMetaTag('property', 'og:site_name', BUSINESS_INFO.name);
    upsertMetaTag('name', 'twitter:card', 'summary_large_image');
    upsertMetaTag('name', 'twitter:title', title);
    upsertMetaTag('name', 'twitter:description', description);

    const graph: Record<string, unknown>[] = [
      {
        '@type': 'Organization',
        '@id': `${origin}/#organization`,
        name: BUSINESS_INFO.name,
        url: origin || '/',
        telephone: BUSINESS_INFO.phoneDisplay,
        sameAs: [BUSINESS_INFO.googleMapsListingUrl],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'G3GC+C7R',
          addressLocality: BUSINESS_INFO.city,
          addressRegion: BUSINESS_INFO.region,
          addressCountry: 'PK',
        },
      },
      {
        '@type': 'FurnitureStore',
        '@id': `${origin}/#furniturestore`,
        name: BUSINESS_INFO.name,
        description:
          'Furniture showroom and wooden furniture retailer in Gujrat, Punjab, Pakistan offering beds, sofa sets, wardrobes, dining tables, chairs, and furniture accessories.',
        url: origin || '/',
        telephone: BUSINESS_INFO.phoneDisplay,
        hasMap: BUSINESS_INFO.googleMapsListingUrl,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'G3GC+C7R',
          addressLocality: BUSINESS_INFO.city,
          addressRegion: BUSINESS_INFO.region,
          addressCountry: 'PK',
        },
        areaServed: {
          '@type': 'City',
          name: 'Gujrat',
        },
        parentOrganization: {
          '@id': `${origin}/#organization`,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        name: BUSINESS_INFO.name,
        url: origin || '/',
        publisher: {
          '@id': `${origin}/#organization`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: `${origin}${crumb.path}`,
        })),
      },
    ];

    if (includeFaqSchema) {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: SHOWROOM_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    }

    const schemaPayload = {
      '@context': 'https://schema.org',
      '@graph': graph,
    };

    const scriptId = 'rwf-structured-data';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(schemaPayload);
  }, [title, description, path, breadcrumbs, includeFaqSchema]);

  return null;
}
