import React, { useState } from 'react';
import { translations } from '../data/translations';
import type { Language } from '../types';
import { FileDown, Building2, CheckCircle, Compass, Shield } from 'lucide-react';

interface ArchitectsPortalProps {
  lang: Language;
  onOpenBespoke: () => void;
}

export const ArchitectsPortal: React.FC<ArchitectsPortalProps> = ({ lang, onOpenBespoke }) => {
  const t = translations[lang];
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => {
      alert(
        lang === 'uz'
          ? "AeroTense 3D CAD/BIM to'plami (.STEP, .OBJ, .GLTF, Revit) tayyorlandi va yuklanmoqda!"
          : "AeroTense 3D CAD/BIM library (.STEP, .OBJ, .GLTF, Revit) package initialized!"
      );
      setDownloaded(false);
    }, 400);
  };

  return (
    <section id="architects" className="py-24 bg-[#0D0F11] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-tense-surface via-tense-card to-[#111316] border border-white/10 shadow-2xl relative overflow-hidden">
          
          {/* Subtle architectural grid lines in background */}
          <div className="absolute inset-0 wood-texture-overlay opacity-40 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tense-accent/10 border border-tense-accent/20 text-tense-accent text-xs font-mono">
                <Compass className="w-3.5 h-3.5" />
                <span>{t.architects.tag}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-light">
                {t.architects.title}
              </h2>

              <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
                {t.architects.subtitle}
              </p>

              {/* Bullet points */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                  <CheckCircle className="w-4 h-4 text-tense-accent shrink-0 mt-0.5" />
                  <span>{t.architects.bullet1}</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                  <CheckCircle className="w-4 h-4 text-tense-accent shrink-0 mt-0.5" />
                  <span>{t.architects.bullet2}</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                  <CheckCircle className="w-4 h-4 text-tense-accent shrink-0 mt-0.5" />
                  <span>{t.architects.bullet3}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleDownload}
                  disabled={downloaded}
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-tense-accent text-tense-bg font-mono text-xs font-semibold hover:bg-tense-accentHover transition-all shadow-lg shadow-tense-accent/15"
                >
                  <FileDown className="w-4 h-4" />
                  <span>{downloaded ? 'Preparing...' : t.architects.downloadCad}</span>
                </button>

                <button
                  onClick={onOpenBespoke}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs hover:border-tense-accent hover:bg-white/10 transition-all"
                >
                  <Building2 className="w-4 h-4 text-tense-accent" />
                  <span>{t.architects.consultArch}</span>
                </button>
              </div>
            </div>

            {/* Right Graphic / CAD Spec Box */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl p-6 bg-black/60 backdrop-blur-md border border-white/10 space-y-4 font-mono text-xs text-zinc-400 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-zinc-200 font-semibold flex items-center gap-2">
                    <Shield className="w-4 h-4 text-cyan-400" />
                    BIM & SPECIFICATION PACK
                  </span>
                  <span className="text-tense-accent">REV 2026.4</span>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-zinc-400">File Formats:</span>
                    <span className="text-white">.STEP, .OBJ, .DWG, .RFA (Revit)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-zinc-400">FEA Structural Report:</span>
                    <span className="text-emerald-400">Certified by Eurocode 3</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-zinc-400">Custom Dimensions:</span>
                    <span className="text-white">Up to 4,500 mm span</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-zinc-400">Lead Time (Turnkey):</span>
                    <span className="text-tense-accent">3–4 Weeks Worldwide</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-tense-surface/80 border border-white/5 text-[10px] text-zinc-400 leading-normal">
                  {lang === 'uz'
                    ? "Arxitektor va dizaynerlar uchun maxsus 20% trade-chegirma hamda bepul 3D vizual renderlar taqdim etiladi."
                    : "Architectural trade members receive 20% studio privilege, white-glove mockups, and priority fabrication slots."}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
