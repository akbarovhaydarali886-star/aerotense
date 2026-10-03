import React from 'react';
import { translations } from '../data/translations';
import type { Language } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface RoomCategoriesProps {
  lang: Language;
  onSelectCategory?: (category: string) => void;
}

export const RoomCategories: React.FC<RoomCategoriesProps> = ({ lang, onSelectCategory }) => {
  const t = translations[lang];

  const categories = [
    {
      id: 'living',
      room: t.categories.living.title,
      name: t.categories.living.name,
      desc: t.categories.living.desc,
      count: t.categories.living.items,
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop',
      colSpan: 'lg:col-span-7',
    },
    {
      id: 'workspace',
      room: t.categories.workspace.title,
      name: t.categories.workspace.name,
      desc: t.categories.workspace.desc,
      count: t.categories.workspace.items,
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1200&auto=format&fit=crop',
      colSpan: 'lg:col-span-5',
    },
    {
      id: 'sculptures',
      room: t.categories.sculptures.title,
      name: t.categories.sculptures.name,
      desc: t.categories.sculptures.desc,
      count: t.categories.sculptures.items,
      image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1200&auto=format&fit=crop',
      colSpan: 'lg:col-span-5',
    },
    {
      id: 'dining',
      room: t.categories.dining.title,
      name: t.categories.dining.name,
      desc: t.categories.dining.desc,
      count: t.categories.dining.items,
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1400&auto=format&fit=crop',
      colSpan: 'lg:col-span-7',
    },
  ];

  return (
    <section id="categories" className="py-24 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-widestPlus text-tense-accent uppercase">
              {t.categories.tag}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-light tracking-tight">
              {t.categories.title}
            </h2>
          </div>
          <p className="text-zinc-400 font-light text-sm sm:text-base max-w-md leading-relaxed">
            {t.categories.subtitle}
          </p>
        </div>

        {/* Categories Grid - Symmetrically Balanced 7/5 & 5/7 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-tense-accent/50 transition-all duration-500 h-[400px] sm:h-[440px] ${cat.colSpan}`}
              onClick={() => onSelectCategory && onSelectCategory(cat.id)}
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.72] group-hover:brightness-[0.8]"
              />

              {/* Gradient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10" />

              {/* Top Tag & Item Count */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs font-mono">
                <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-tense-accent font-medium">
                  {cat.room}
                </span>
                <span className="text-zinc-300 font-light hidden sm:inline px-3 py-1 rounded-full bg-black/40 border border-white/10">
                  {cat.count}
                </span>
              </div>

              {/* Bottom Information */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2.5">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-serif text-2xl sm:text-3xl text-white group-hover:text-tense-accent transition-colors leading-tight">
                    {cat.name}
                  </h3>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-tense-accent group-hover:text-tense-bg transition-all transform group-hover:rotate-45 shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-zinc-300 text-xs sm:text-sm font-light max-w-lg line-clamp-2 leading-relaxed">
                  {cat.desc}
                </p>

                <div className="pt-1 flex items-center gap-2 text-xs font-mono text-tense-accent">
                  <span>{t.categories.exploreCategory}</span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
