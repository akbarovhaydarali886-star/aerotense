import React, { useState } from 'react';
import { translations } from '../data/translations';
import type { Language } from '../types';
import { Globe, X, Sparkles } from 'lucide-react';

interface AnnouncementBarProps {
  lang: Language;
  onToggleLang: (lang: Language) => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ lang, onToggleLang }) => {
  const [visible, setVisible] = useState(true);
  const t = translations[lang];

  if (!visible) return null;

  return (
    <aside aria-label="Announcement" className="relative z-50 bg-[#121417] text-zinc-300 border-b border-white/5 py-2 px-4 text-xs font-mono tracking-wider transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Free delivery & Lead time */}
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-tense-accent animate-pulse" />
          <span className="hidden sm:inline text-zinc-400 font-normal">AEROTENSE ATELIER:</span>
          <span className="text-zinc-200 font-medium">{t.announcement}</span>
        </div>

        {/* Right: Language switch & Dismiss */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
            <Globe className="w-3 h-3 text-tense-accent" />
            <button
              onClick={() => onToggleLang('uz')}
              className={`transition-colors ${
                lang === 'uz' ? 'text-tense-accent font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              UZ
            </button>
            <span className="text-zinc-600">/</span>
            <button
              onClick={() => onToggleLang('en')}
              className={`transition-colors ${
                lang === 'en' ? 'text-tense-accent font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          <button
            onClick={() => setVisible(false)}
            className="text-zinc-500 hover:text-zinc-200 transition-colors p-0.5"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
