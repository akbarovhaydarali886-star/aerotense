import type { MaterialSample } from '../types';

export const materialsData: MaterialSample[] = [
  {
    id: 'mat-walnut',
    name: {
      uz: 'Amerika Qora Yong‘og‘i (Black Walnut)',
      en: 'American Black Walnut',
    },
    category: 'timber',
    origin: {
      uz: 'Pensilvaniya, AQSH (FSC sertifikatlangan)',
      en: 'Pennsylvania, USA (FSC Certified)',
    },
    finish: {
      uz: 'Tabiiy matoviy moy bilan ishlangan, silliq ipakdek yuzaga ega',
      en: 'Hand-rubbed organic hardwax oil, satin tactile sheen',
    },
    description: {
      uz: 'Chuqur shokolad tusli tabiiy yog‘och. Har bir kesimda o‘ziga xos to‘lqinli naqsh va vaqt o‘tgani sayin boyib boruvchi tabiiy joziba.',
      en: 'Rich chocolate undertones and rhythmic grain. Sourced from sustainable old-growth forests with individual moisture stabilization.',
    },
    color: '#432E1F',
    accentColor: '#8C6747',
    tag: 'Eng ko‘p tanlangan',
  },
  {
    id: 'mat-oak',
    name: {
      uz: 'Bavariya Oq Emani (White Oak)',
      en: 'Bavarian White Oak',
    },
    category: 'timber',
    origin: {
      uz: 'Germaniya tog‘oldi o‘rmonlari',
      en: 'Bavarian Foothills, Germany',
    },
    finish: {
      uz: 'Och somon rangli, ultrabinafsha nurga chidamli organik mum',
      en: 'Bleached matte finish with UV-protective organic wax',
    },
    description: {
      uz: 'Skandinavcha va yaponcha "Japandi" minimalist interyerlari uchun mukammal moslik. Yuqori qattiqlik va yillar davomida shakl saqlash kafolati.',
      en: 'Crisp architectural warmth. The gold standard for modern contemporary interiors seeking quiet, grounded luxury.',
    },
    color: '#BF9E77',
    accentColor: '#D8C3A5',
    tag: 'Arxitektorlar tanlovi',
  },
  {
    id: 'mat-mulberry',
    name: {
      uz: 'Asriy Tut Yog‘ochi (Heritage Mulberry)',
      en: 'Central Asian Heritage Mulberry',
    },
    category: 'timber',
    origin: {
      uz: 'Markaziy Osiyo qadimiy bog‘lari',
      en: 'Silk Road Ancient Orchards',
    },
    finish: {
      uz: 'Nafis polirovka va shaffof himoya moyi',
      en: 'Micro-polished with transparent botanical sealant',
    },
    description: {
      uz: 'Noyob oltinsimon-jigarrang jilo. Vaqt o‘tishi bilan quyosh nurlari ostida qimmatbaho ambra tusiga kiruvchi qadimiy duradgorlik durdonasi.',
      en: 'An exotic golden-amber hardwood that develops a captivating iridescence under ambient gallery lighting.',
    },
    color: '#A76D38',
    accentColor: '#E6A055',
    tag: 'Cheklangan tiraj (Rare)',
  },
  {
    id: 'mat-titanium',
    name: {
      uz: 'Aerokosmik Titan & 316 Po‘lat Simlar',
      en: 'Aerospace Titanium & Grade 316 Cables',
    },
    category: 'cable',
    origin: {
      uz: 'Syurix aeronavtika ta\'minoti, Shveysariya',
      en: 'Swiss Aviation Engineering Partners',
    },
    finish: {
      uz: 'Matoviy qumlangan yoki yaltiroq titan PVD qoplamasi',
      en: 'Matte bead-blasted or vapor-deposited obsidian PVD',
    },
    description: {
      uz: '0.8 mm diametrli 49 qavatli o‘rilgan sim. 400 kg uzilish kuchiga chidab beradi. Ko‘zga deyarli tashlanmaydigan noziklikda mo‘jizaviy quvvat.',
      en: '0.8 mm 7x7 structural aircraft cables with custom CNC-turned micro-tensioners for sub-millimeter balancing.',
    },
    color: '#71717A',
    accentColor: '#38BDF8',
    tag: 'Fizika tayanchi',
  },
  {
    id: 'mat-carbon',
    name: {
      uz: 'Matoviy Uglerod Tolasi (Carbon Composite)',
      en: 'Matte Structural Carbon Fiber',
    },
    category: 'composite',
    origin: {
      uz: 'Nagoya, Yaponiya (Toray Carbon)',
      en: 'Toray Aerospace Composites, Japan',
    },
    finish: {
      uz: '3K mat to‘qima, porlamaydigan himoya sathi',
      en: 'Dry 3K twill weave with non-reflective matte finish',
    },
    description: {
      uz: 'Po‘latdan 5 barobar yengil, ammo mustahkamlikda tengsiz. Kosmik va poyga texnologiyalari mebel dizaynida.',
      en: 'Zero-expansion composite core delivering surgical rigidity for long cantilevers without sagging.',
    },
    color: '#18181B',
    accentColor: '#52525B',
    tag: 'Ultra-zamonaviy',
  },
  {
    id: 'mat-oils',
    name: {
      uz: 'Biologik Moy & Tabiiy Asal Mumi',
      en: 'Botanical Hardwax & Organic Beeswax',
    },
    category: 'composite',
    origin: {
      uz: 'Gotland oroli, Shvetsiya',
      en: 'Gotland, Sweden',
    },
    finish: {
      uz: '100% zaharli bo‘lmagan, oziq-ovqat xavfsiz qoplama',
      en: 'Zero-VOC organic plant oils & micro-filtered beeswax',
    },
    description: {
      uz: 'Yog‘och tolalari chuqur nafas olishini ta\'minlovchi tabiiy himoya. Teqqanda mayin baxmal hissini beradi va suv dog‘laridan asraydi.',
      en: 'Penetrates deep into the cellular structure of hardwood, leaving a velvety, water-repellent and completely non-toxic matte shield.',
    },
    color: '#D4AF37',
    accentColor: '#F5E6AB',
    tag: 'Organik parvarish',
  },
];
