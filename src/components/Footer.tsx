import React, { useState } from 'react';
import { translations } from '../data/translations';
import type { Language } from '../types';
import { Check, ArrowRight, Globe } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang];
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <footer className="bg-[#08090A] text-zinc-400 border-t border-white/5 pt-20 pb-12 font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Journal Invitation (Woodwrights style) */}
        <div className="pb-16 mb-16 border-b border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-xs font-mono tracking-widestPlus text-tense-accent uppercase">
              {lang === 'uz' ? 'AEROTENSE JURNALI' : 'THE AEROTENSE JOURNAL'}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
              {t.footer.newsletterTitle}
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm font-light max-w-md">
              {t.footer.newsletterSub}
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.footer.emailPlaceholder}
                required
                className="flex-1 px-4 py-3.5 rounded-xl bg-tense-surface/80 border border-white/10 text-white placeholder-zinc-500 font-mono text-xs focus:outline-none focus:border-tense-accent transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-tense-accent text-tense-bg font-mono text-xs font-semibold hover:bg-tense-accentHover transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-950" />
                    <span>{t.footer.subscribed}</span>
                  </>
                ) : (
                  <>
                    <span>{t.footer.subscribe}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* 4 Column Editorial Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif tracking-widestPlus text-xl text-white font-medium">
                AEROTENSE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>
            <div className="text-xs font-mono text-zinc-500">
              {t.footer.philosophyLink}
            </div>
          </div>

          {/* Column 1: Collections */}
          <div className="lg:col-span-2 space-y-3 font-mono text-xs">
            <h4 className="text-white font-medium uppercase tracking-wider">
              {t.footer.shopTitle}
            </h4>
            <ul className="space-y-2.5 text-zinc-400">
              <li><a href="#categories" className="hover:text-tense-accent transition-colors">{t.footer.links.coffee}</a></li>
              <li><a href="#categories" className="hover:text-tense-accent transition-colors">{t.footer.links.desks}</a></li>
              <li><a href="#spotlight" className="hover:text-tense-accent transition-colors">{t.footer.links.consoles}</a></li>
              <li><a href="#categories" className="hover:text-tense-accent transition-colors">{t.footer.links.dining}</a></li>
              <li><a href="#categories" className="hover:text-tense-accent transition-colors">{t.footer.links.accessories}</a></li>
            </ul>
          </div>

          {/* Column 2: Resources & Technology */}
          <div className="lg:col-span-3 space-y-3 font-mono text-xs">
            <h4 className="text-white font-medium uppercase tracking-wider">
              {t.footer.resourcesTitle}
            </h4>
            <ul className="space-y-2.5 text-zinc-400">
              <li><a href="#simulator" className="hover:text-tense-accent transition-colors">{t.footer.resLinks.science}</a></li>
              <li><a href="#materials" className="hover:text-tense-accent transition-colors">{t.footer.resLinks.samples}</a></li>
              <li><a href="#architects" className="hover:text-tense-accent transition-colors">{t.footer.resLinks.cad}</a></li>
              <li><a href="#philosophy" className="hover:text-tense-accent transition-colors">{t.footer.resLinks.warranty}</a></li>
              <li><a href="#philosophy" className="hover:text-tense-accent transition-colors">{t.footer.resLinks.care}</a></li>
            </ul>
          </div>

          {/* Column 3: Studio & Concierge */}
          <div className="lg:col-span-3 space-y-3 font-mono text-xs">
            <h4 className="text-white font-medium uppercase tracking-wider">
              {t.footer.studioTitle}
            </h4>
            <div className="space-y-2 text-zinc-400">
              <p>{t.footer.address}</p>
              <p className="text-white">{t.footer.phone}</p>
              <p className="text-tense-accent">{t.footer.email}</p>
            </div>

            <div className="pt-3 flex items-center gap-3">
              {/* Instagram SVG */}
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-tense-accent transition-colors" title="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* LinkedIn SVG */}
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-tense-accent transition-colors" title="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-tense-accent transition-colors" title="Global Atelier">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Fine Print */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
          <p>{t.footer.rights}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Terms of Craft</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Structural Safety Notice</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
