import React, { useState, useEffect } from 'react';
import { translations } from '../data/translations';
import type { Language } from '../types';
import { Menu, X, Box, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onToggleLang?: (lang: Language) => void;
  samplesCount: number;
  onOpenSamples: () => void;
  onOpenBespoke: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  samplesCount,
  onOpenSamples,
  onOpenBespoke,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.rooms, href: '#categories' },
    { label: t.nav.philosophy, href: '#philosophy' },
    { label: t.nav.spotlight, href: '#spotlight' },
    { label: t.nav.science, href: '#simulator' },
    { label: t.nav.materials, href: '#materials' },
    { label: t.nav.architects, href: '#architects' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav shadow-lg shadow-black/50 py-3'
          : 'bg-tense-bg/95 backdrop-blur-md border-b border-white/5 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Brand Logo - Fixed without squishing */}
        <a href="#" className="flex items-center gap-3 group shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-tense-surface to-tense-card border border-tense-accent/30 flex items-center justify-center text-tense-accent group-hover:border-tense-accent transition-all shadow-inner shrink-0">
            <svg
              className="w-5 h-5 text-tense-accent transform group-hover:rotate-45 transition-transform duration-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="9" strokeOpacity="0.3" />
              <path d="M12 4V20M4 12H20" strokeDasharray="2 2" strokeOpacity="0.4" />
              <rect x="7" y="7" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="1.5" fill="#38BDF8" />
            </svg>
          </div>
          <div className="flex flex-col shrink-0">
            <span className="font-serif tracking-widestPlus text-lg md:text-xl font-medium text-white group-hover:text-tense-accent transition-colors whitespace-nowrap">
              AEROTENSE
            </span>
            <span className="text-[9px] font-mono tracking-ultra text-zinc-400 uppercase -mt-1 whitespace-nowrap">
              Physics & Fine Craft
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-7 text-xs font-mono tracking-wider shrink">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-zinc-400 hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-tense-accent hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions - Fixed & Non-wrapping */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {/* Sample Kit Box Button */}
          <button
            onClick={onOpenSamples}
            className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-tense-surface/80 border border-white/10 text-xs font-mono text-zinc-300 hover:border-tense-accent/50 hover:text-white transition-all group whitespace-nowrap shrink-0"
            title={t.nav.orderSamples}
          >
            <Box className="w-4 h-4 text-tense-accent group-hover:rotate-12 transition-transform shrink-0" />
            <span className="whitespace-nowrap">{t.nav.orderSamples}</span>
            {samplesCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-tense-accent text-tense-bg text-[10px] font-bold flex items-center justify-center shrink-0">
                {samplesCount}
              </span>
            )}
          </button>

          {/* Request Bespoke Consultation */}
          <button
            onClick={onOpenBespoke}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-tense-accent text-tense-bg text-xs font-mono font-medium hover:bg-tense-accentHover transition-all shadow-md shadow-tense-accent/10 active:scale-95 whitespace-nowrap shrink-0"
          >
            <span>{t.nav.requestQuote}</span>
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2 shrink-0">
          <button
            onClick={onOpenSamples}
            className="relative p-2 rounded-lg bg-tense-surface border border-white/10 text-zinc-300"
          >
            <Box className="w-4 h-4 text-tense-accent" />
            {samplesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-tense-accent text-tense-bg text-[10px] font-bold flex items-center justify-center">
                {samplesCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-tense-surface border border-white/10 text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-nav border-t border-white/10 mt-3 px-6 py-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3 font-mono text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-300 hover:text-tense-accent py-2 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBespoke();
              }}
              className="w-full py-3 rounded-lg bg-tense-accent text-tense-bg font-mono text-xs font-semibold flex items-center justify-center gap-2"
            >
              <span>{t.nav.requestQuote}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
