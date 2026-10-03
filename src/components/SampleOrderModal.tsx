import React, { useState } from 'react';
import { translations } from '../data/translations';
import type { Language } from '../types';
import { materialsData } from '../data/materials';
import { X, Box, Check, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SampleOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  selectedSampleIds: string[];
  onRemoveSample: (id: string) => void;
}

export const SampleOrderModal: React.FC<SampleOrderModalProps> = ({
  isOpen,
  onClose,
  lang,
  selectedSampleIds,
  onRemoveSample,
}) => {
  const t = translations[lang];
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const selectedItems = materialsData.filter((m) => selectedSampleIds.includes(m.id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C5A880', '#38BDF8', '#FFFFFF'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-tense-surface border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tense-accent/10 border border-tense-accent/20 text-tense-accent text-xs font-mono">
                <Box className="w-3.5 h-3.5" />
                <span>COMPLIMENTARY SWATCH SERVICE</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                {t.materials.boxTitle}
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm font-light">
                {t.materials.subtitle}
              </p>
            </div>

            {/* Selected Swatches Chips */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                {lang === 'uz' ? 'Qutidagi namunalar' : 'Included Samples'} ({selectedItems.length}):
              </label>

              {selectedItems.length === 0 ? (
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs font-mono text-zinc-500">
                  {lang === 'uz'
                    ? "Barcha 5 ta standart namuna qutiga avtomatik kiritiladi."
                    : "All standard 5 studio samples will be included by default."}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-2 px-3 py-1 rounded-lg bg-black/50 border border-white/10 text-xs font-mono text-zinc-300"
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.name[lang]}</span>
                      <button
                        type="button"
                        onClick={() => onRemoveSample(item.id)}
                        className="hover:text-red-400 text-zinc-500 ml-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                  {t.modal.name} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Shoxrux Alimov"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-tense-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                  {t.modal.phone} *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-tense-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                  {t.modal.address} *
                </label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Toshkent sh., Mirobod t., Nukus ko'chasi 24-uy"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-tense-accent resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>{lang === 'uz' ? 'Yetkazib berish $0 (Bepul)' : 'Free Express Delivery ($0)'}</span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-tense-accent text-tense-bg font-mono text-xs font-semibold hover:bg-tense-accentHover transition-all flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.modal.submit}</span>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-tense-accent/20 border border-tense-accent flex items-center justify-center mx-auto text-tense-accent">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              {t.modal.orderSuccess}
            </h3>
            <p className="text-zinc-400 text-sm font-light max-w-sm mx-auto leading-relaxed">
              {t.modal.orderSub}
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors"
              >
                {t.modal.close}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
