// GeoCircle Schema - Hizmet alanı yarıçapı tanımlama

interface GeoCircleProps {
  latitude: number;
  longitude: number;
  radiusKm: number;
  addressLocality: string;
  addressRegion: string;
  addressCountry?: string;
}

export function generateGeoCircleSchema(props: GeoCircleProps) {
  return {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: props.latitude,
      longitude: props.longitude,
    },
    geoRadius: `${props.radiusKm * 1000}`, // meters
    address: {
      "@type": "PostalAddress",
      addressLocality: props.addressLocality,
      addressRegion: props.addressRegion,
      addressCountry: props.addressCountry || "TR",
    },
  };
}

// İstanbul için hizmet alanı tanımları
export const ISTANBUL_SERVICE_AREAS = [
  {
    name: "Anadolu Yakası",
    latitude: 40.9887,
    longitude: 29.0258,
    radiusKm: 25,
    addressLocality: "İstanbul",
    addressRegion: "İstanbul",
  },
  {
    name: "Avrupa Yakası",
    latitude: 41.0082,
    longitude: 28.9784,
    radiusKm: 25,
    addressLocality: "İstanbul",
    addressRegion: "İstanbul",
  },
];

// MovingCompany schema için serviceArea ekle
export function addServiceAreaToSchema(baseSchema: any) {
  return {
    ...baseSchema,
    serviceArea: ISTANBUL_SERVICE_AREAS.map(area => generateGeoCircleSchema(area)),
  };
}
