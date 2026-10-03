import type { ProductItem } from '../types';

export const productsData: ProductItem[] = [
  {
    id: 'apex-01',
    name: {
      uz: 'The Apex-01 Levitating Console',
      en: 'The Apex-01 Levitating Console',
    },
    subtitle: {
      uz: 'Muallaq konsol stoli — aerokosmik titan va Amerika yong‘og‘i',
      en: 'Floating architectural console in aerospace titanium & American walnut',
    },
    category: 'living',
    priceUSD: 1450,
    featured: true,
    woodOptions: [
      {
        id: 'walnut',
        name: { uz: 'Amerika Qora Yong‘og‘i', en: 'American Black Walnut' },
        color: '#4A3525',
        image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'white-oak',
        name: { uz: 'Yevropa Oq Emani', en: 'Bavarian White Oak' },
        color: '#C29B73',
        image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'smoked-oak',
        name: { uz: 'Dudlangan Qora Eman', en: 'Smoked Bog Oak' },
        color: '#262422',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
      },
    ],
    hardwareOptions: [
      {
        id: 'titanium-silver',
        name: { uz: 'Yaltiroq Aviatsiya Titani', en: 'Aviation Titanium Polish' },
        color: '#CBD5E1',
      },
      {
        id: 'matte-obsidian',
        name: { uz: 'Matoviy Qora Obsidian', en: 'Matte Obsidian PVD' },
        color: '#1E293B',
      },
      {
        id: 'brushed-brass',
        name: { uz: 'Sillangan Jez (Brass)', en: 'Brushed Satin Brass' },
        color: '#D4AF37',
      },
    ],
    specs: {
      dimensions: '1400 x 420 x 850 mm',
      weightCapacity: '120 kg (xavfsizlik koeffitsienti 2.5x)',
      cableSpec: '0.8 mm 7x7 Strand Aerospace Grade 316 Stainless Wire',
      woodThickness: '35 mm monolit qattiq yog‘och',
      alloy: '7075-T6 Alyuminiy & Ti-6Al-4V Titan',
    },
    description: {
      uz: 'Apex-01 — tensegrity falsafasining cho‘qqisi. Uyingiz kirish qismi yoki mehmonxona uchun markaziy diqqat obyekti. 4 ta burchak simi va markaziy tayanch orqali havoda qalqib turadi.',
      en: 'The Apex-01 represents the zenith of architectural tensegrity. Suspended on ultra-fine braided cables, it creates an unforgettable illusion of absolute antigravity.',
    },
  },
  {
    id: 'orbit-coffee',
    name: {
      uz: 'Orbit-04 Tensegrity Kofe Stoli',
      en: 'Orbit-04 Floating Coffee Table',
    },
    subtitle: {
      uz: 'Yashash xonasi uchun oval shakldagi antigravitatsion stol',
      en: 'Elliptical suspended lounge table with concealed tension joints',
    },
    category: 'living',
    priceUSD: 1890,
    woodOptions: [
      {
        id: 'walnut',
        name: { uz: 'Amerika Yong‘og‘i', en: 'American Walnut' },
        color: '#4A3525',
        image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200&auto=format&fit=crop',
      },
      {
        id: 'white-oak',
        name: { uz: 'Oq Eman', en: 'White Oak' },
        color: '#C29B73',
        image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=1200&auto=format&fit=crop',
      },
    ],
    hardwareOptions: [
      { id: 'titanium', name: { uz: 'Titan', en: 'Titanium' }, color: '#94A3B8' },
      { id: 'matte-black', name: { uz: 'Qora', en: 'Black' }, color: '#1E293B' },
    ],
    specs: {
      dimensions: '1200 x 700 x 420 mm',
      weightCapacity: '150 kg',
      cableSpec: '1.0 mm yuqori taranglikdagi po‘lat sim',
      woodThickness: '40 mm yaxlit taxta',
      alloy: 'Frezerlangan aviatsiya qotishmasi',
    },
    description: {
      uz: 'Yashash xonangiz markazida og‘irlik qonunlarini chetlab o‘tuvchi organik shakl. Yengil, ammo toshdek mustahkam.',
      en: 'A harmonious blend of organic timber contours suspended in mid-air by balanced structural tension vectors.',
    },
  },
  {
    id: 'zenith-desk',
    name: {
      uz: 'Zenith Zero-Gravity Ish Stoli',
      en: 'Zenith Zero-Gravity Executive Desk',
    },
    subtitle: {
      uz: 'Ijodkorlar va rahbarlar uchun minimalist antigravitatsion ish maydoni',
      en: 'Monolithic floating workspace designed for deep focus and spatial clarity',
    },
    category: 'workspace',
    priceUSD: 3200,
    woodOptions: [
      {
        id: 'walnut',
        name: { uz: 'Qora Yong‘oq', en: 'Black Walnut' },
        color: '#4A3525',
        image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1200&auto=format&fit=crop',
      },
    ],
    hardwareOptions: [
      { id: 'titanium', name: { uz: 'Titan', en: 'Titanium' }, color: '#94A3B8' },
    ],
    specs: {
      dimensions: '1800 x 850 x 760 mm',
      weightCapacity: '200 kg',
      cableSpec: '1.2 mm mikron-sozlangan simlar',
      woodThickness: '45 mm',
      alloy: 'Titanium Grade 5',
    },
    description: {
      uz: 'Oyoqlarsizdek taassurot uyg‘otuvchi, lekin monitorlar va og‘ir jihozlarni osonlikcha ko‘taruvchi professional stol.',
      en: 'An uncompromising statement of clarity: seamless wireless integration, zero visual clutter, and pure tensional levitation.',
    },
  },
  {
    id: 'strata-shelf',
    name: {
      uz: 'Strata Levitating Javon & Postament',
      en: 'Strata Floating Architectural Plinth',
    },
    subtitle: {
      uz: 'San\'at asarlari, kitoblar va eksklyuziv buyumlar uchun havoda turuvchi javon',
      en: 'Sculptural display plinth engineered to showcase art pieces in mid-air',
    },
    category: 'sculpture',
    priceUSD: 980,
    woodOptions: [
      {
        id: 'smoked-oak',
        name: { uz: 'Dudlangan Eman', en: 'Smoked Oak' },
        color: '#262422',
        image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1200&auto=format&fit=crop',
      },
    ],
    hardwareOptions: [
      { id: 'brass', name: { uz: 'Satin Brass', en: 'Satin Brass' }, color: '#D4AF37' },
    ],
    specs: {
      dimensions: '900 x 300 x 1100 mm',
      weightCapacity: '80 kg',
      cableSpec: '0.6 mm nano-qoplangan po‘lat sim',
      woodThickness: '30 mm',
      alloy: '7075 alyuminiy',
    },
    description: {
      uz: 'Galereyalar va nafis xonadonlar uchun havoda uchib yuruvchi geometrik javon.',
      en: 'A gallery-grade display platform that lets your most prized sculptures float serenely in three-dimensional space.',
    },
  },
];
