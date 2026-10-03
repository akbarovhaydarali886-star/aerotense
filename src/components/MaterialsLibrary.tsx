import React from 'react';
import { translations } from '../data/translations';
import type { Language } from '../types';
import { materialsData } from '../data/materials';
import { Plus, Check, Box, MapPin, Feather } from 'lucide-react';

interface MaterialsLibraryProps {
  lang: Language;
  selectedSampleIds: string[];
  onToggleSample: (id: string) => void;
  onOpenOrderModal: () => void;
}

export const MaterialsLibrary: React.FC<MaterialsLibraryProps> = ({
  lang,
  selectedSampleIds,
  onToggleSample,
  onOpenOrderModal,
}) => {
  const t = translations[lang];

  return (
    <section id="materials" className="py-24 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-widestPlus text-tense-accent uppercase">
              {t.materials.tag}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-light tracking-tight">
              {t.materials.title}
            </h2>
          </div>
          <p className="text-zinc-400 font-light text-sm sm:text-base max-w-md leading-relaxed">
            {t.materials.subtitle}
          </p>
        </div>

        {/* Master Swatch Box Hero Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-tense-surface via-tense-card to-tense-surface border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-3 max-w-xl z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tense-accent/10 border border-tense-accent/20 text-tense-accent text-xs font-mono">
              <Box className="w-3.5 h-3.5" />
              <span>WOODWRIGHTS ATELIER SWATCH BOX</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              {t.materials.boxTitle}
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
              {t.materials.boxDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5 z-10 w-full md:w-auto">
            <div className="text-center sm:text-right">
              <span className="text-xs font-mono text-zinc-400 block">{t.materials.selectedCount}</span>
              <span className="font-serif text-2xl text-tense-accent font-semibold">
                {selectedSampleIds.length} / {materialsData.length}
              </span>
            </div>

            <button
              onClick={onOpenOrderModal}
              className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-tense-accent text-tense-bg font-mono text-xs font-semibold tracking-wider hover:bg-tense-accentHover transition-all flex items-center justify-center gap-2 shadow-lg shadow-tense-accent/20"
            >
              <Box className="w-4 h-4" />
              <span>{t.materials.orderKit}</span>
            </button>
          </div>
        </div>

        {/* Material Swatches Grid - Perfect 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materialsData.map((item) => {
            const isSelected = selectedSampleIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`group rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'border-tense-accent bg-tense-accent/5 shadow-lg shadow-tense-accent/5'
                    : 'border-white/10 bg-tense-surface/70 hover:border-white/20'
                }`}
              >
                <div className="space-y-4">
                  {/* Top: Swatch Color Disc & Category Tag */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl border border-white/20 shadow-inner flex items-center justify-center"
                        style={{ backgroundColor: item.color }}
                      >
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.accentColor }}
                        />
                      </div>
                      <span className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider">
                        {item.tag}
                      </span>
                    </div>

                    <button
                      onClick={() => onToggleSample(item.id)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-tense-accent text-tense-bg'
                          : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-tense-accent'
                      }`}
                      title={isSelected ? 'Remove sample' : 'Add sample'}
                    >
                      {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Title & Origin */}
                  <div>
                    <h4 className="font-serif text-xl sm:text-2xl text-white group-hover:text-tense-accent transition-colors leading-tight">
                      {item.name[lang]}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 mt-1.5">
                      <MapPin className="w-3 h-3 text-tense-accent shrink-0" />
                      <span>{item.origin[lang]}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                    {item.description[lang]}
                  </p>
                </div>

                {/* Bottom Tactile Finish Spec */}
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <Feather className="w-3.5 h-3.5 text-tense-accent shrink-0" />
                    <span>{item.finish[lang]}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
