import React, { useState } from 'react';
import { translations } from '../data/translations';
import type { Language, ProductItem } from '../types';
import { productsData } from '../data/products';
import { Check, ArrowUpRight, Cpu } from 'lucide-react';

interface FeaturedSpotlightProps {
  lang: Language;
  onOpenConfigurator: (product: ProductItem, selectedWood: string, selectedHardware: string) => void;
}

export const FeaturedSpotlight: React.FC<FeaturedSpotlightProps> = ({
  lang,
  onOpenConfigurator,
}) => {
  const t = translations[lang];
  const apex = productsData[0]; // Apex-01

  const [selectedWood, setSelectedWood] = useState(apex.woodOptions[0].id);
  const [selectedHardware, setSelectedHardware] = useState(apex.hardwareOptions[0].id);
  const [activeAngle, setActiveAngle] = useState<'main' | 'detail' | 'context'>('main');

  const currentWoodObj = apex.woodOptions.find((w) => w.id === selectedWood) || apex.woodOptions[0];
  const currentHwObj = apex.hardwareOptions.find((h) => h.id === selectedHardware) || apex.hardwareOptions[0];

  // Gallery angles
  const galleryImages = {
    main: currentWoodObj.image,
    detail: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop',
    context: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
  };

  // Price adjustment based on options
  const basePrice = apex.priceUSD;
  const woodPriceAdd = selectedWood === 'smoked-oak' ? 180 : selectedWood === 'white-oak' ? 60 : 0;
  const hwPriceAdd = selectedHardware === 'brushed-brass' ? 120 : selectedHardware === 'matte-obsidian' ? 90 : 0;
  const totalPrice = basePrice + woodPriceAdd + hwPriceAdd;

  return (
    <section id="spotlight" className="py-24 border-t border-white/5 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-tense-accent/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Spotlight Label */}
        <div className="flex items-center gap-2 mb-10">
          <span className="w-2 h-2 rounded-full bg-tense-accent animate-ping" />
          <span className="text-xs font-mono tracking-widestPlus text-tense-accent uppercase font-medium">
            {t.spotlight.tag}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Interactive Product Visual */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-3xl overflow-hidden glass-card p-3 border border-white/10 group shadow-2xl">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/40">
                <img
                  src={galleryImages[activeAngle]}
                  alt={apex.name[lang]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                />

                {/* Subtle vignette & ambient lighting */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

                {/* Floating cable tension indicator */}
                <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-xs font-mono text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>0.8 mm Ti-6Al-4V WIRES</span>
                </div>

                {/* View Angle Switcher Tabs */}
                <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-black/75 backdrop-blur-md border border-white/15 p-1 rounded-xl text-[11px] font-mono">
                  {(['main', 'detail', 'context'] as const).map((angle) => (
                    <button
                      key={angle}
                      type="button"
                      onClick={() => setActiveAngle(angle)}
                      className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                        activeAngle === angle
                          ? 'bg-tense-accent text-tense-bg font-bold'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {angle === 'main' ? 'Front' : angle === 'detail' ? 'Joints' : 'Room'}
                    </button>
                  ))}
                </div>

                {/* Active Wood/Hardware Pill */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs font-mono">
                  <div className="px-3.5 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/15 text-zinc-300">
                    <span className="text-tense-accent font-semibold">{currentWoodObj.name[lang]}</span>
                    <span className="mx-2 text-zinc-500">|</span>
                    <span className="text-zinc-400">{currentHwObj.name[lang]}</span>
                  </div>

                  <div className="px-3.5 py-1.5 rounded-xl bg-tense-accent text-tense-bg font-bold shadow-md shadow-tense-accent/20">
                    ${totalPrice.toLocaleString()} USD
                  </div>
                </div>
              </div>
            </div>

            {/* Micro Indicators - Perfectly Aligned */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono text-zinc-400">
              <div className="p-3.5 rounded-xl bg-tense-surface/60 border border-white/5">
                <span className="text-white font-serif text-lg block">35 mm</span>
                <span>{lang === 'uz' ? 'Yaxlit Yog‘och' : 'Solid Slab'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-tense-surface/60 border border-white/5">
                <span className="text-tense-accent font-serif text-lg block">120 kg</span>
                <span>{lang === 'uz' ? 'Statik Yuk' : 'Static Capacity'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-tense-surface/60 border border-white/5">
                <span className="text-white font-serif text-lg block">15 Yil</span>
                <span>{lang === 'uz' ? 'Kafolat' : 'Warranty'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Customizer, Specs & CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-light mb-3 tracking-tight">
                {apex.name[lang]}
              </h2>
              <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
                {t.spotlight.desc}
              </p>
            </div>

            {/* Timber Selection */}
            <div className="space-y-2.5">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 flex items-center justify-between">
                <span>{t.spotlight.woodChoice}</span>
                <span className="text-tense-accent font-medium">{currentWoodObj.name[lang]}</span>
              </label>

              <div className="grid grid-cols-3 gap-2">
                {apex.woodOptions.map((wood) => (
                  <button
                    key={wood.id}
                    onClick={() => setSelectedWood(wood.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1.5 ${
                      selectedWood === wood.id
                        ? 'border-tense-accent bg-tense-accent/10 shadow-md shadow-tense-accent/10'
                        : 'border-white/10 bg-tense-surface/80 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="w-4 h-4 rounded-full border border-white/30"
                        style={{ backgroundColor: wood.color }}
                      />
                      {selectedWood === wood.id && <Check className="w-3.5 h-3.5 text-tense-accent" />}
                    </div>
                    <span className="text-[11px] font-mono text-zinc-300 truncate">
                      {wood.name[lang]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hardware Selection */}
            <div className="space-y-2.5">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 flex items-center justify-between">
                <span>{t.spotlight.hardwareChoice}</span>
                <span className="text-tense-accent font-medium">{currentHwObj.name[lang]}</span>
              </label>

              <div className="grid grid-cols-3 gap-2">
                {apex.hardwareOptions.map((hw) => (
                  <button
                    key={hw.id}
                    onClick={() => setSelectedHardware(hw.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1.5 ${
                      selectedHardware === hw.id
                        ? 'border-tense-accent bg-tense-accent/10 shadow-md shadow-tense-accent/10'
                        : 'border-white/10 bg-tense-surface/80 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="w-4 h-4 rounded-full border border-white/30"
                        style={{ backgroundColor: hw.color }}
                      />
                      {selectedHardware === hw.id && <Check className="w-3.5 h-3.5 text-tense-accent" />}
                    </div>
                    <span className="text-[11px] font-mono text-zinc-300 truncate">
                      {hw.name[lang]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Technical Specifications List */}
            <div className="p-4 rounded-2xl bg-tense-surface/80 border border-white/10 space-y-2 text-xs font-mono text-zinc-400">
              <div className="text-zinc-200 font-medium pb-2 border-b border-white/10 uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-tense-accent" />
                <span>{t.spotlight.specsTitle}</span>
              </div>
              <div className="leading-relaxed">• {t.spotlight.specs.thickness}</div>
              <div className="leading-relaxed">• {t.spotlight.specs.capacity}</div>
              <div className="leading-relaxed">• {t.spotlight.specs.cables}</div>
              <div className="leading-relaxed">• {t.spotlight.specs.dimensions}</div>
              <div className="leading-relaxed">• {t.spotlight.specs.stabilizer}</div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onOpenConfigurator(apex, selectedWood, selectedHardware)}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-tense-accent text-tense-bg font-mono text-xs font-semibold hover:bg-tense-accentHover transition-all flex items-center justify-center gap-2 shadow-lg shadow-tense-accent/15"
              >
                <span>{t.spotlight.selectConfig}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenConfigurator(apex, selectedWood, selectedHardware)}
                className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-tense-surface border border-white/10 text-zinc-300 font-mono text-xs hover:border-tense-accent/50 hover:text-white transition-all whitespace-nowrap"
              >
                {t.spotlight.requestBespoke}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
