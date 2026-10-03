import React, { useState } from 'react';
import { translations } from '../data/translations';
import type { Language } from '../types';
import { Tensegrity3DCanvas } from './Tensegrity3DCanvas';
import { Sliders, RotateCcw, Info, CheckCircle2, Zap, Layers, Activity } from 'lucide-react';

interface TensegritySimulatorProps {
  lang: Language;
}

export const TensegritySimulator: React.FC<TensegritySimulatorProps> = ({ lang }) => {
  const t = translations[lang];

  const [loadKg, setLoadKg] = useState<number>(45);
  const [showVectors, setShowVectors] = useState<boolean>(true);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [activeMaterial, setActiveMaterial] = useState<'walnut' | 'oak' | 'ebony'>('walnut');

  // Physics calculation formulas based on tensegrity statics
  const tableSelfWeightKg = 16.5; // Upper slab + upper mast weight
  const totalMass = tableSelfWeightKg + loadKg;
  const gravity = 9.80665;
  const preloadNewtons = 280; // Baseline cable tension to eliminate slack

  // Central cable carries total downward gravitational weight + preload
  const centralTensionN = Math.round(totalMass * gravity + preloadNewtons);

  // 4 Corner cables resist overturning moments & maintain preload equilibrium
  const cornerTensionN = Math.round((preloadNewtons + (loadKg * 0.15) * gravity) / 4);

  // Microscopic deflection in millimeters (elastic modulus of steel cables = 210 GPa)
  const deflectionMm = (loadKg * 0.0022).toFixed(2);

  const colors = {
    walnut: '#4A3525',
    oak: '#C29B73',
    ebony: '#1F1E1D',
  };

  return (
    <section id="simulator" className="py-24 bg-[#0A0B0C] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-tense-steel/10 border border-tense-steel/20 text-tense-steel text-xs font-mono">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.simulator.tag}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-light tracking-tight">
            {t.simulator.title}
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            {t.simulator.subtitle}
          </p>
        </div>

        {/* Unified Simulator Grid - Balanced Heights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: 3D Viewport with Orbiting Notice */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between gap-4">
            <div className="relative flex-1 min-h-[480px] lg:min-h-[580px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-b from-[#0F1114] to-[#0A0B0D]">
              <Tensegrity3DCanvas
                loadKg={loadKg}
                showVectors={showVectors}
                wireframe={wireframe}
                woodColor={colors[activeMaterial]}
              />
            </div>

            {/* Instruction footnote & Material Switcher */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-400 px-2 gap-3 py-1">
              <span className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-tense-accent" />
                {t.simulator.rotatableNotice}
              </span>

              {/* Timber Material Switcher inside 3D Canvas */}
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">{lang === 'uz' ? 'Yog‘och turi:' : 'Timber species:'}</span>
                {(['walnut', 'oak', 'ebony'] as const).map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setActiveMaterial(mat)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono capitalize transition-all border ${
                      activeMaterial === mat
                        ? 'bg-tense-accent text-tense-bg font-bold border-tense-accent'
                        : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Unified Control Deck */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between gap-5">
            
            {/* 1. Live Telemetry Card */}
            <div className="p-5 rounded-2xl bg-tense-surface/90 border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono tracking-wider text-zinc-300 uppercase flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-tense-accent" />
                  {lang === 'uz' ? 'TELEMETRIYA' : 'LIVE TELEMETRY'}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  {t.simulator.stable}
                </span>
              </div>

              {/* Metric 1: Central Cable Force */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">{t.simulator.centralTension} (Fc)</span>
                  <span className="text-cyan-400 font-bold">{centralTensionN.toLocaleString()} N</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-amber-500 transition-all duration-300"
                    style={{ width: `${Math.min(100, (centralTensionN / 1800) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Metric 2: Corner Cables */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">{t.simulator.cornerTension} (Ti × 4)</span>
                  <span className="text-zinc-200 font-bold">{cornerTensionN} N / sim</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-sky-400 transition-all duration-300"
                    style={{ width: `${Math.min(100, (cornerTensionN / 160) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Metric 3: Micro-deflection */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">{lang === 'uz' ? 'Elastik egilish' : 'Elastic Deflection'}</span>
                <span className="text-tense-accent font-semibold">{deflectionMm} mm</span>
              </div>
            </div>

            {/* 2. Mass Slider & Controls */}
            <div className="p-5 rounded-2xl bg-tense-surface/90 border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-tense-accent" />
                  <span>{t.simulator.sliderLabel}</span>
                </label>
                <span className="font-serif text-2xl text-white font-normal">
                  {loadKg} <span className="text-xs font-mono text-tense-accent">kg</span>
                </span>
              </div>

              {/* Slider Input */}
              <input
                type="range"
                min="0"
                max="150"
                step="5"
                value={loadKg}
                onChange={(e) => setLoadKg(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-tense-accent"
              />

              {/* Quick preset buttons */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {[0, 25, 75, 120].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setLoadKg(preset)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-mono transition-all border ${
                      loadKg === preset
                        ? 'bg-tense-accent text-tense-bg font-bold border-tense-accent'
                        : 'bg-zinc-800/80 text-zinc-400 border-white/5 hover:text-white'
                    }`}
                  >
                    {preset}kg
                  </button>
                ))}
              </div>

              {/* View & Vector Toggles Row */}
              <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setShowVectors(!showVectors)}
                  className={`p-2 rounded-lg border text-center transition-all flex items-center justify-center gap-1.5 ${
                    showVectors
                      ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300'
                      : 'border-white/10 bg-black/40 text-zinc-400'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Vektorlar</span>
                </button>

                <button
                  type="button"
                  onClick={() => setWireframe(!wireframe)}
                  className={`p-2 rounded-lg border text-center transition-all flex items-center justify-center gap-1.5 ${
                    wireframe
                      ? 'border-tense-accent/50 bg-tense-accent/10 text-tense-accent'
                      : 'border-white/10 bg-black/40 text-zinc-400'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Rentgen</span>
                </button>
              </div>

              <button
                onClick={() => setLoadKg(0)}
                className="w-full py-1 text-xs font-mono text-zinc-400 hover:text-tense-accent flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t.simulator.reset}</span>
              </button>
            </div>

            {/* 3. Scientific Callout */}
            <div className="p-4 rounded-2xl bg-tense-surface/50 border border-white/5 text-xs text-zinc-400 font-light leading-relaxed flex items-start gap-3">
              <Info className="w-4 h-4 text-tense-accent shrink-0 mt-0.5" />
              <p>{t.simulator.physicsExplanation}</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
