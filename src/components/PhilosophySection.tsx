import React from 'react';
import { translations } from '../data/translations';
import type { Language } from '../types';
import { Gauge, ShieldCheck, Binary, Sliders, CheckCircle2 } from 'lucide-react';

interface PhilosophySectionProps {
  lang: Language;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="philosophy" className="py-24 bg-[#0E1012] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-mono tracking-widestPlus text-tense-accent uppercase">
            {t.philosophy.tag}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-light tracking-tight">
            {t.philosophy.title}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            {t.philosophy.subtitle}
          </p>
        </div>

        {/* 3 Storytelling Blocks */}
        <div className="space-y-24">
          
          {/* Block 1: Precision Tension */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-6 relative group">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop"
                  alt="Precision Tension Engineering"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                
                {/* Micro-tensile measurement HUD */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-tense-steel">
                    <Gauge className="w-4 h-4 text-tense-accent" />
                    <span>PRELOAD SENSOR</span>
                  </div>
                  <span className="text-white font-semibold">1,200 N/mm² CALIBRATED</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <div className="inline-block text-xs font-mono px-3 py-1 rounded-full bg-tense-accent/10 text-tense-accent border border-tense-accent/20">
                {t.philosophy.block1.number} — TENSION MATRIX
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-light leading-snug">
                {t.philosophy.block1.title}
              </h3>
              <p className="text-zinc-400 font-light leading-relaxed text-sm sm:text-base">
                {t.philosophy.block1.desc}
              </p>
              
              <div className="pt-2 flex items-center gap-3 text-xs font-mono text-tense-accent">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.philosophy.block1.metric}</span>
              </div>
            </div>
          </div>

          {/* Block 2: Honest Materials */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-5 order-2 lg:order-1">
              <div className="inline-block text-xs font-mono px-3 py-1 rounded-full bg-tense-accent/10 text-tense-accent border border-tense-accent/20">
                {t.philosophy.block2.number} — TIMBER & ALLOYS
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-light leading-snug">
                {t.philosophy.block2.title}
              </h3>
              <p className="text-zinc-400 font-light leading-relaxed text-sm sm:text-base">
                {t.philosophy.block2.desc}
              </p>
              
              <div className="pt-2 flex items-center gap-3 text-xs font-mono text-tense-accent">
                <ShieldCheck className="w-4 h-4 text-tense-accent shrink-0" />
                <span>{t.philosophy.block2.metric}</span>
              </div>
            </div>

            <div className="lg:col-span-6 relative group order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=1200&auto=format&fit=crop"
                  alt="Honest Materials Craftsmanship"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>SOLID TIMBER ORIGIN</span>
                  </div>
                  <span className="text-white font-semibold">FSC CERTIFIED WALNUT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Block 3: Engineered by Physics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-6 relative group">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop"
                  alt="Engineered by Physics"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-tense-steel">
                    <Binary className="w-4 h-4 text-cyan-400" />
                    <span>EQUILIBRIUM FORMULA</span>
                  </div>
                  <span className="text-cyan-300 font-mono font-semibold">∑F = 0 | ∑M = 0</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <div className="inline-block text-xs font-mono px-3 py-1 rounded-full bg-tense-accent/10 text-tense-accent border border-tense-accent/20">
                {t.philosophy.block3.number} — TENSEGRITY THEOREM
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-light leading-snug">
                {t.philosophy.block3.title}
              </h3>
              <p className="text-zinc-400 font-light leading-relaxed text-sm sm:text-base">
                {t.philosophy.block3.desc}
              </p>
              
              <div className="pt-2 flex items-center gap-3 text-xs font-mono text-tense-accent">
                <Sliders className="w-4 h-4 text-tense-steel shrink-0" />
                <span>{t.philosophy.block3.metric}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
