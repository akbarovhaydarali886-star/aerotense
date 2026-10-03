import React, { useState } from 'react';
import { translations } from '../data/translations';
import type { Language, ProductItem } from '../types';
import { productsData } from '../data/products';
import { X, Send, CheckCircle2, Sliders } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CustomQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialProduct?: ProductItem;
  initialWood?: string;
  initialHardware?: string;
}

export const CustomQuoteModal: React.FC<CustomQuoteModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialProduct,
  initialWood,
  initialHardware,
}) => {
  const t = translations[lang];

  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialProduct?.id || productsData[0].id
  );
  const [selectedWood, setSelectedWood] = useState<string>(initialWood || 'walnut');
  const [selectedHardware, setSelectedHardware] = useState<string>(
    initialHardware || 'titanium-silver'
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [roomType, setRoomType] = useState('residential');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const currentProduct =
    productsData.find((p) => p.id === selectedProductId) || productsData[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#C5A880', '#38BDF8', '#FFFFFF'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 rounded-3xl bg-tense-surface border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6">
        
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
                <Sliders className="w-3.5 h-3.5" />
                <span>BESPOKE ARCHITECTURAL CONFIGURATOR</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                {t.modal.bespokeTitle}
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm font-light">
                {t.modal.bespokeSub}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Product Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  {lang === 'uz' ? 'Modelni tanlang' : 'Base Model'}
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-tense-accent"
                >
                  {productsData.map((p) => (
                    <option key={p.id} value={p.id} className="bg-tense-surface text-white">
                      {p.name[lang]} — starting ${p.priceUSD.toLocaleString()} USD
                    </option>
                  ))}
                </select>
              </div>

              {/* Timber finish */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  {t.spotlight.woodChoice}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {currentProduct.woodOptions.map((wood) => (
                    <button
                      key={wood.id}
                      type="button"
                      onClick={() => setSelectedWood(wood.id)}
                      className={`p-2.5 rounded-xl border text-xs font-mono transition-all text-center ${
                        selectedWood === wood.id
                          ? 'border-tense-accent bg-tense-accent/10 text-white'
                          : 'border-white/10 bg-black/40 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {wood.name[lang]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hardware finish */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  {t.spotlight.hardwareChoice}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {currentProduct.hardwareOptions.map((hw) => (
                    <button
                      key={hw.id}
                      type="button"
                      onClick={() => setSelectedHardware(hw.id)}
                      className={`p-2.5 rounded-xl border text-xs font-mono transition-all text-center ${
                        selectedHardware === hw.id
                          ? 'border-tense-accent bg-tense-accent/10 text-white'
                          : 'border-white/10 bg-black/40 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {hw.name[lang]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Room Context */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  {t.modal.roomType}
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  {[
                    { id: 'residential', label: lang === 'uz' ? 'Xususiy Rezidensiya' : 'Private Residence' },
                    { id: 'commercial', label: lang === 'uz' ? 'Ofis / Kabinet' : 'Executive Office' },
                    { id: 'hospitality', label: lang === 'uz' ? 'Mehmonxona / Lobby' : 'Hospitality / Lobby' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRoomType(r.id)}
                      className={`p-2.5 rounded-xl border transition-all text-center ${
                        roomType === r.id
                          ? 'border-tense-accent bg-tense-accent/10 text-white'
                          : 'border-white/10 bg-black/40 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                    {t.modal.name} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alisher Zokirov"
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
                    placeholder="+998 90 999 88 77"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-tense-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="architect@studio.design"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-tense-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                  {t.modal.message}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={lang === 'uz' ? "Masalan: 1600 x 450 mm maxsus o'lchamda..." : "e.g. 1600 x 450 mm custom slab..."}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-tense-accent resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-tense-accent text-tense-bg font-mono text-xs font-semibold hover:bg-tense-accentHover transition-all flex items-center justify-center gap-2 shadow-lg shadow-tense-accent/15"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.modal.sendInquiry}</span>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-tense-accent/20 border border-tense-accent flex items-center justify-center mx-auto text-tense-accent">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              {lang === 'uz' ? "Maxsus loyiha so'rovingiz qabul qilindi!" : "Custom Commission Brief Received!"}
            </h3>
            <p className="text-zinc-400 text-sm font-light max-w-md mx-auto leading-relaxed">
              {lang === 'uz'
                ? "Muhandislik guruhi 24 soat ichida siz bilan bog'lanib, 3D modellar va konstruktiv hisobotni taqdim etadi."
                : "Our structural engineering team will review your specifications and provide CAD mockups within 24 hours."}
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
