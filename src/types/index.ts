export type Language = 'uz' | 'en';

export interface ProductItem {
  id: string;
  name: {
    uz: string;
    en: string;
  };
  subtitle: {
    uz: string;
    en: string;
  };
  category: 'living' | 'workspace' | 'sculpture' | 'dining';
  priceUSD: number;
  woodOptions: Array<{
    id: string;
    name: { uz: string; en: string };
    color: string;
    image: string;
  }>;
  hardwareOptions: Array<{
    id: string;
    name: { uz: string; en: string };
    color: string;
  }>;
  specs: {
    dimensions: string;
    weightCapacity: string;
    cableSpec: string;
    woodThickness: string;
    alloy: string;
  };
  description: {
    uz: string;
    en: string;
  };
  featured?: boolean;
}

export interface MaterialSample {
  id: string;
  name: { uz: string; en: string };
  category: 'timber' | 'cable' | 'composite';
  origin: { uz: string; en: string };
  finish: { uz: string; en: string };
  description: { uz: string; en: string };
  color: string;
  accentColor: string;
  tag: string;
}
