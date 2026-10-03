import React, { useState } from 'react';
import type { Language, ProductItem } from './types';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RoomCategories } from './components/RoomCategories';
import { PhilosophySection } from './components/PhilosophySection';
import { FeaturedSpotlight } from './components/FeaturedSpotlight';
import { TensegritySimulator } from './components/TensegritySimulator';
import { MaterialsLibrary } from './components/MaterialsLibrary';
import { ArchitectsPortal } from './components/ArchitectsPortal';
import { Footer } from './components/Footer';
import { SampleOrderModal } from './components/SampleOrderModal';
import { CustomQuoteModal } from './components/CustomQuoteModal';
import { productsData } from './data/products';

export const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('uz');
  const [selectedSampleIds, setSelectedSampleIds] = useState<string[]>([
    'mat-walnut',
    'mat-titanium',
  ]);

  // Modal states
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [isBespokeModalOpen, setIsBespokeModalOpen] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<ProductItem>(
    productsData[0]
  );
  const [quoteWood, setQuoteWood] = useState<string>('walnut');
  const [quoteHardware, setQuoteHardware] = useState<string>('titanium-silver');

  const handleToggleLang = (newLang: Language) => {
    setLang(newLang);
    document.documentElement.lang = newLang;
  };

  const handleToggleSample = (id: string) => {
    setSelectedSampleIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenConfigurator = (
    product: ProductItem,
    selectedWood: string,
    selectedHardware: string
  ) => {
    setSelectedProductForQuote(product);
    setQuoteWood(selectedWood);
    setQuoteHardware(selectedHardware);
    setIsBespokeModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-tense-bg text-[#E2E8F0] flex flex-col font-sans selection:bg-tense-accent/30 selection:text-white">
      {/* Top Announcement Bar */}
      <AnnouncementBar lang={lang} onToggleLang={handleToggleLang} />

      {/* Sticky Minimal Floating Header */}
      <Navbar
        lang={lang}
        samplesCount={selectedSampleIds.length}
        onOpenSamples={() => setIsSampleModalOpen(true)}
        onOpenBespoke={() => setIsBespokeModalOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 1. Hero Section (Kirish qismi & 3D Visual) */}
        <HeroSection lang={lang} />

        {/* 2. Xonalar & Toifalar (Room / Type Grid) */}
        <RoomCategories
          lang={lang}
          onSelectCategory={() => {
            const el = document.getElementById('spotlight');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3. Falsafa va Muhandislik (Woodwrights Craft analogi) */}
        <PhilosophySection lang={lang} />

        {/* 4. Featured Spotlight (The Apex-01 Levitating Console) */}
        <FeaturedSpotlight
          lang={lang}
          onOpenConfigurator={handleOpenConfigurator}
        />

        {/* 5. Interaktiv Tensegrity Simulyatori (3D WebGL Physics) */}
        <TensegritySimulator lang={lang} />

        {/* 6. Materiallar Kutubxonasi (Woodwrights Samples Teaser) */}
        <MaterialsLibrary
          lang={lang}
          selectedSampleIds={selectedSampleIds}
          onToggleSample={handleToggleSample}
          onOpenOrderModal={() => setIsSampleModalOpen(true)}
        />

        {/* 7. Arxitektorlar & CAD Portali */}
        <ArchitectsPortal
          lang={lang}
          onOpenBespoke={() => setIsBespokeModalOpen(true)}
        />
      </main>

      {/* 8. Minimalist Footer */}
      <Footer lang={lang} />

      {/* Modals */}
      <SampleOrderModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
        lang={lang}
        selectedSampleIds={selectedSampleIds}
        onRemoveSample={handleToggleSample}
      />

      <CustomQuoteModal
        isOpen={isBespokeModalOpen}
        onClose={() => setIsBespokeModalOpen(false)}
        lang={lang}
        initialProduct={selectedProductForQuote}
        initialWood={quoteWood}
        initialHardware={quoteHardware}
      />
    </div>
  );
};

export default App;
