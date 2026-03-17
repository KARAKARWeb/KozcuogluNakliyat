// Gelişmiş Fiyatlandırma Sistemi Tipleri

export type PriceType = 'percentage' | 'fixed';

export interface PriceConfig {
  type: PriceType;
  value: number;
}

export interface ServiceTypePricing {
  ev: PriceConfig;
  ofis: PriceConfig;
  villa: PriceConfig;
  parcaEsya: PriceConfig;
  esyaDepolama: PriceConfig;
  sehirlerArasi: PriceConfig;
}

export interface RoomPricing {
  '1-0': PriceConfig;
  '1+1': PriceConfig;
  '2+1': PriceConfig;
  '3+1': PriceConfig;
  '4+1': PriceConfig;
  '5+1': PriceConfig;
  'villa': PriceConfig;
}

export interface FloorPricing {
  perFloor: PriceConfig;
  withElevator: PriceConfig;
  withoutElevator: PriceConfig;
}

export interface AdvancedPricingConfig {
  // Hizmet Tipi Toleransları
  serviceTolerance: ServiceTypePricing;
  
  // KM Başı Fiyat
  pricePerKm: number;
  
  // Oda Sayısı Fiyatlandırması
  roomPricing: RoomPricing;
  
  // Kat Fiyatlandırması
  floorPricing: {
    departure: FloorPricing;
    arrival: FloorPricing;
  };
  
  // Ekstra Asansörlü Taşıma
  extraElevatorService: PriceConfig;
  
  // Temel Ayarlar
  basePrices: {
    [key: string]: number;
  };
  
  // Güncelleme Tarihi
  updatedAt: string;
}

export const DEFAULT_ADVANCED_PRICING: AdvancedPricingConfig = {
  serviceTolerance: {
    ev: { type: 'percentage', value: 0 },
    ofis: { type: 'percentage', value: 0 },
    villa: { type: 'percentage', value: 0 },
    parcaEsya: { type: 'percentage', value: 0 },
    esyaDepolama: { type: 'percentage', value: 0 },
    sehirlerArasi: { type: 'percentage', value: 0 },
  },
  pricePerKm: 15,
  roomPricing: {
    '1-0': { type: 'fixed', value: 3000 },
    '1+1': { type: 'fixed', value: 4500 },
    '2+1': { type: 'fixed', value: 6500 },
    '3+1': { type: 'fixed', value: 9000 },
    '4+1': { type: 'fixed', value: 12000 },
    '5+1': { type: 'fixed', value: 15000 },
    'villa': { type: 'fixed', value: 25000 },
  },
  floorPricing: {
    departure: {
      perFloor: { type: 'fixed', value: 200 },
      withElevator: { type: 'percentage', value: 0 },
      withoutElevator: { type: 'percentage', value: 15 },
    },
    arrival: {
      perFloor: { type: 'fixed', value: 200 },
      withElevator: { type: 'percentage', value: 0 },
      withoutElevator: { type: 'percentage', value: 15 },
    },
  },
  extraElevatorService: { type: 'fixed', value: 1500 },
  basePrices: {},
  updatedAt: new Date().toISOString(),
};
