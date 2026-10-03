import React from 'react';
import { translations } from '../data/translations';
import type { Language } from '../types';
import { Hero3DCanvas } from './Hero3DCanvas';
import { ArrowDown, MoveRight, Activity } from 'lucide-react';

interface HeroSectionProps {
  lang: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-10 pb-20">
      {/* Subtle background ambient gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-tense-accent/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-tense-steel/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Headline & Storytelling */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
            
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-tense-surface/90 border border-tense-accent/25 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-tense-accent animate-pulse"></span>
              <span className="text-[11px] font-mono tracking-widest text-tense-accent uppercase font-medium">
                {t.hero.tag}
              </span>
            </div>

            {/* H1 Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-white leading-[1.08]">
              {t.hero.h1}
            </h1>

            {/* Subheading */}
            <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed max-w-xl">
              {t.hero.subhead}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#categories"
                className="group flex items-center gap-3 px-6 py-3.5 rounded-xl bg-tense-accent text-tense-bg font-mono text-xs font-semibold tracking-wider hover:bg-tense-accentHover transition-all shadow-lg shadow-tense-accent/15"
              >
                <span>{t.hero.ctaExplore}</span>
                <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#simulator"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-tense-surface/80 border border-white/10 text-white font-mono text-xs tracking-wider hover:border-tense-accent/40 hover:bg-tense-surface transition-all"
              >
                <Activity className="w-4 h-4 text-tense-steel animate-pulse" />
                <span>{t.hero.ctaPhysics}</span>
              </a>
            </div>

            {/* Micro-spec Badges - Perfectly Symmetrical */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 w-full max-w-lg">
              <div className="flex flex-col space-y-0.5">
                <span className="font-serif text-2xl sm:text-3xl text-white font-normal">150 kg</span>
                <span className="text-[11px] font-mono text-zinc-400 leading-tight">
                  {lang === 'uz' ? 'Maksimal yuk' : 'Load Rating'}
                </span>
              </div>
              <div className="flex flex-col space-y-0.5">
                <span className="font-serif text-2xl sm:text-3xl text-tense-accent font-normal">0.8 mm</span>
                <span className="text-[11px] font-mono text-zinc-400 leading-tight">
                  {lang === 'uz' ? 'Titan kabellar' : 'Aerospace Wires'}
                </span>
              </div>
              <div className="flex flex-col space-y-0.5">
                <span className="font-serif text-2xl sm:text-3xl text-white font-normal">100%</span>
                <span className="text-[11px] font-mono text-zinc-400 leading-tight">
                  {lang === 'uz' ? 'Tabiiy yog‘och' : 'Solid Timber'}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive Tensegrity Sculpture */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="w-full relative rounded-3xl overflow-hidden glass-card p-2 sm:p-3 shadow-2xl border border-white/10">
              <Hero3DCanvas />

              {/* Floating specs pill */}
              <div className="absolute top-5 right-5 hidden sm:flex flex-col items-end gap-1 pointer-events-none">
                <span className="text-[10px] font-mono tracking-widest text-zinc-400">TENSION EQUILIBRIUM</span>
                <div className="flex items-center gap-2 text-xs font-mono text-tense-steel">
                  <span className="w-2 h-2 rounded-full bg-tense-steel animate-ping" />
                  <span>PRELOAD 1,200 N</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
          {t.hero.scrollDown}
        </span>
        <ArrowDown className="w-3.5 h-3.5 text-zinc-400 animate-bounce" />
      </div>
    </section>
  );
};
