// Central schema definitions for AvValley
// Each function returns a specific JSON-LD schema for a page

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://avvalley.com",
    "name": "AvValley",
    "image": "https://avvalley.com/images/AVValley-Logo.png",
    "description": "Professional outdoor stage and AV rentals for events, churches, festivals, conferences, and production companies in Arizona.",
    "url": "https://avvalley.com",
    "telephone": "480-567-4215",
    "email": "info@avvalley.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Phoenix",
      "addressRegion": "AZ",
      "addressCountry": "US"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Phoenix"
      },
      {
        "@type": "City",
        "name": "Mesa"
      },
      {
        "@type": "City",
        "name": "Tempe"
      },
      {
        "@type": "City",
        "name": "Chandler"
      },
      {
        "@type": "City",
        "name": "Gilbert"
      },
      {
        "@type": "City",
        "name": "Scottsdale"
      },
      {
        "@type": "City",
        "name": "San Tan Valley"
      },
      {
        "@type": "City",
        "name": "Litchfield Park"
      }
    ],
    "serviceType": [
      "Stage Rental",
      "AV Equipment Rental",
      "Projector Rental",
      "LED Wall Rental",
      "Silent Disco Rental",
      "Event Equipment Rental"
    ],
    "makesOffer": [
      {
        "@type": "Service",
        "name": "Mobile Stage Rental",
        "url": "https://avvalley.com/mobile-stage-rental"
      },
      {
        "@type": "Service",
        "name": "Projector Rental",
        "url": "https://avvalley.com/rent-projector"
      },
      {
        "@type": "Service",
        "name": "Projector Purchase",
        "url": "https://avvalley.com/purchase-projector"
      },
      {
        "@type": "Service",
        "name": "Projection Mapping",
        "url": "https://avvalley.com/projection-mapping"
      },
      {
        "@type": "Service",
        "name": "Silent Disco Rental",
        "url": "https://avvalley.com/silent-disco-rentals"
      },
      {
        "@type": "Service",
        "name": "Outdoor Movie Rental",
        "url": "https://avvalley.com/outdoor-movie-rentals"
      }
    ]
  };
}

export function getMobileStageRentalSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Mobile Stage Rental",
    "description": "Professional 22' × 20' mobile outdoor stage rental for concerts, festivals, churches, corporate events, and community gatherings in Phoenix, Mesa, and San Tan Valley, Arizona.",
    "url": "https://avvalley.com/mobile-stage-rental",
    "image": "https://media.avvalley.com/media/stage-banner.jpg",
    "provider": {
      "@type": "LocalBusiness",
      "@id": "https://avvalley.com",
      "name": "AvValley",
      "telephone": "480-567-4215",
      "email": "info@avvalley.com"
    },
    "serviceType": "Equipment Rental",
    "areaServed": [
      {
        "@type": "City",
        "name": "Phoenix",
        "addressCountry": "US",
        "addressRegion": "AZ"
      },
      {
        "@type": "City",
        "name": "Mesa",
        "addressCountry": "US",
        "addressRegion": "AZ"
      },
      {
        "@type": "City",
        "name": "San Tan Valley",
        "addressCountry": "US",
        "addressRegion": "AZ"
      },
      {
        "@type": "City",
        "name": "Scottsdale",
        "addressCountry": "US",
        "addressRegion": "AZ"
      },
      {
        "@type": "City",
        "name": "Tempe",
        "addressCountry": "US",
        "addressRegion": "AZ"
      },
      {
        "@type": "City",
        "name": "Chandler",
        "addressCountry": "US",
        "addressRegion": "AZ"
      }
    ],
    "priceRange": "$3000 - $10000+",
    "aggregateOffer": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "3000",
      "highPrice": "10000",
      "offerCount": "4",
      "availability": "https://schema.org/InStock",
      "offers": [
        {
          "@type": "Offer",
          "name": "Stage-Only Rental",
          "description": "Portable outdoor stage delivery, setup, and breakdown. Perfect for customers with their own AV or production team.",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Stage + Sound System Rental",
          "description": "Professional stage with main speakers, mixer, and microphones. Ideal for speaking events, churches, and smaller productions.",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Band-Ready Package",
          "description": "Stage with line-array sound system, subwoofers, stage monitors, mixer, microphones, and stage lighting. Perfect for concerts, festivals, and live bands.",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Full Event AV Package",
          "description": "Complete stage with professional sound, lighting, LED walls or projection screens, podium, and event-specific equipment. For larger productions requiring coordinated staging and AV.",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      ]
    },
    "makesOffer": [
      {
        "@type": "Service",
        "name": "Outdoor Concert Stage Rental",
        "url": "https://avvalley.com/mobile-stage-rental#concert"
      },
      {
        "@type": "Service",
        "name": "Church Outdoor Stage Rental",
        "url": "https://avvalley.com/mobile-stage-rental#church"
      },
      {
        "@type": "Service",
        "name": "Corporate Event Stage Rental",
        "url": "https://avvalley.com/mobile-stage-rental#corporate"
      },
      {
        "@type": "Service",
        "name": "Wedding Ceremony Stage Rental",
        "url": "https://avvalley.com/mobile-stage-rental#wedding"
      },
      {
        "@type": "Service",
        "name": "Nonprofit & Community Event Stage",
        "url": "https://avvalley.com/mobile-stage-rental#nonprofit"
      },
      {
        "@type": "Service",
        "name": "B2B Stage Rental for AV Companies",
        "url": "https://avvalley.com/mobile-stage-rental#b2b"
      }
    ]
  };
}

export function getProjectorRentalSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Projector Rental",
    "description": "Professional Christie and Barco projector rentals for outdoor events, churches, conferences, and production companies in Arizona.",
    "url": "https://avvalley.com/rent-projector",
    "provider": {
      "@type": "LocalBusiness",
      "@id": "https://avvalley.com"
    },
    "serviceType": "Equipment Rental",
    "areaServed": {
      "@type": "GeoShape",
      "addressCountry": "US",
      "addressRegion": "AZ"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "USD"
    }
  };
}

export function getProjectorPurchaseSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Projector Purchase",
    "description": "Buy Christie and Barco professional projectors for outdoor events, churches, venues, and production companies.",
    "url": "https://avvalley.com/purchase-projector",
    "provider": {
      "@type": "LocalBusiness",
      "@id": "https://avvalley.com"
    },
    "serviceType": "Equipment Sales",
    "areaServed": {
      "@type": "GeoShape",
      "addressCountry": "US",
      "addressRegion": "AZ"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Christie Roadster HD20K-J",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "USD",
        "price": "Contact for Pricing"
      },
      {
        "@type": "Offer",
        "name": "Christie HD14K-M",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "USD",
        "price": "Contact for Pricing"
      },
      {
        "@type": "Offer",
        "name": "Barco HDX-W20 FLEX",
        "availability": "https://schema.org/PreOrder",
        "priceCurrency": "USD",
        "price": "Contact for Pricing"
      }
    ]
  };
}

export function getProjectionMappingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Projection Mapping Services",
    "description": "Professional projection mapping services for events, installations, and architectural projection in Arizona.",
    "url": "https://avvalley.com/projection-mapping",
    "provider": {
      "@type": "LocalBusiness",
      "@id": "https://avvalley.com"
    },
    "serviceType": "Audio Visual Service",
    "areaServed": {
      "@type": "GeoShape",
      "addressCountry": "US",
      "addressRegion": "AZ"
    }
  };
}

export function getSilentDiscoRentalSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Silent Disco Rental",
    "description": "Wireless silent disco headphone rentals for parties, weddings, schools, churches, festivals, corporate events, and outdoor experiences in Arizona.",
    "url": "https://avvalley.com/silent-disco-rentals",
    "provider": {
      "@type": "LocalBusiness",
      "@id": "https://avvalley.com"
    },
    "serviceType": "Equipment Rental",
    "areaServed": {
      "@type": "GeoShape",
      "addressCountry": "US",
      "addressRegion": "AZ"
    },
    "priceRange": "$5/headphone per day",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "USD",
      "price": "5"
    }
  };
}

export function getOutdoorMovieRentalSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Outdoor Movie Screen Rental",
    "description": "Professional air screen and projection rentals for outdoor movie nights, backyard events, and community gatherings in Arizona.",
    "url": "https://avvalley.com/outdoor-movie-rentals",
    "provider": {
      "@type": "LocalBusiness",
      "@id": "https://avvalley.com"
    },
    "serviceType": "Equipment Rental",
    "areaServed": {
      "@type": "GeoShape",
      "addressCountry": "US",
      "addressRegion": "AZ"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Backyard Screen (Small) - 24' x 14'",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "name": "Giant Screen (Large) - 40' x 22'",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "USD"
      }
    ]
  };
}

export function getHomepageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AvValley",
    "url": "https://avvalley.com",
    "description": "Professional outdoor stage and AV rentals for events, churches, festivals, conferences, and production companies.",
    "publisher": {
      "@type": "LocalBusiness",
      "@id": "https://avvalley.com",
      "name": "AvValley"
    }
  };
}

// FAQ Schema - Generic function that accepts Q&A pairs
export function getFAQSchema(faqItems: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}
