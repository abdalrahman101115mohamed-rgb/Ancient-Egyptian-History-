import React, { useState } from 'react';
import { ARCHAIC_ARTIFACTS, Artifact } from '../data/archaicData';
import { Scroll, Sparkles, MapPin, Eye, CheckCircle2, Landmark, Filter } from 'lucide-react';
import { audioService } from '../utils/audioSynth';

export const ArtifactGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArtifact, setActiveArtifact] = useState<Artifact>(ARCHAIC_ARTIFACTS[0]);

  const filteredArtifacts = ARCHAIC_ARTIFACTS.filter(
    (a) => selectedCategory === 'all' || a.category === selectedCategory
  );

  const handleSelect = (art: Artifact) => {
    audioService.playChime();
    setActiveArtifact(art);
  };

  const categories = [
    { id: 'all', label: 'كافة الكنوز' },
    { id: 'palette', label: 'الصلايات النذرية' },
    { id: 'ivory', label: 'العاجيات والطقوس' },
    { id: 'statue', label: 'التماثيل الملكية' },
    { id: 'stele', label: 'اللوحات الجنائزية' },
    { id: 'macehead', label: 'رؤوس المقامع' },
    { id: 'vessel', label: 'الصروح المعمارية' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-right space-y-2 border-b border-[#d4af37]/25 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#ffd700] bg-[#d4af37]/10 border border-[#d4af37]/30 px-3 py-1 rounded-full">
            <Scroll className="w-3.5 h-3.5" />
            <span>خزانة الآثار والكنوز العتيقة المحفوظة في كبرى متاحف العالم</span>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === c.id
                    ? 'bg-[#d4af37] text-black font-bold'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          روائع <span className="gold-gradient-text">الفن والآثار العتيقة</span>
        </h2>
        <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
          شواهد فجر التاريخ التي صمدت أكثر من خمسة آلاف عام: من دقة نحت العاج وعقود الذهب الخالص إلى صلايات الشست والتماثيل الصخرية التي أرست قواعد النحت المصري الكلاسيكي.
        </p>
      </div>

      {/* Featured Masterpiece Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Spotlight Details */}
        <div className="lg:col-span-7 bg-gradient-to-br from-[#151824] via-[#10121a] to-[#0c0d12] rounded-2xl border border-[#d4af37]/40 p-6 sm:p-8 shadow-2xl text-right space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#ffd700] bg-[#d4af37]/15 px-2.5 py-1 rounded border border-[#d4af37]/30 font-bold">
                {activeArtifact.period} · {activeArtifact.dynasty}
              </span>
              <span className="text-xs text-zinc-400 font-serif">{activeArtifact.date}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <Landmark className="w-3.5 h-3.5 text-[#ffd700]" />
              <span className="text-zinc-200">{activeArtifact.currentMuseum}</span>
            </div>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {activeArtifact.titleAr}
            </h3>
            <p className="text-xs text-zinc-400 font-serif">
              {activeArtifact.titleEn}
            </p>
          </div>

          {/* Material & Discovery Site Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-zinc-400 block mb-0.5">مادة الصنع:</span>
              <strong className="text-[#ffd700]">{activeArtifact.material}</strong>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-zinc-400 block mb-0.5">موقع الاكتشاف الأثري:</span>
              <strong className="text-white">{activeArtifact.discoverySite}</strong>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 text-sm text-zinc-200 leading-relaxed">
            <p>{activeArtifact.description}</p>
          </div>

          {/* Details list */}
          <div className="space-y-2 pt-2 border-t border-zinc-800 text-xs">
            <h4 className="font-bold text-[#ffd700]">التفاصيل والرموز المنحوتة:</h4>
            <ul className="space-y-2 text-zinc-300">
              {activeArtifact.details.map((dt, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ffd700] shrink-0 mt-0.5" />
                  <span>{dt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Symbolism Quote */}
          <div className="p-3.5 rounded-xl bg-[#d4af37]/10 border-r-4 border-[#d4af37] text-xs text-zinc-200">
            <strong className="text-[#ffd700] block mb-1">المغزى الرمزي والحضاري:</strong>
            {activeArtifact.symbolism}
          </div>
        </div>

        {/* Artifacts Catalog Selector */}
        <div className="lg:col-span-5 space-y-3">
          <h4 className="text-xs font-bold text-zinc-400 text-right uppercase tracking-wider mb-2">
            اختر أثراً لاستعراض أسراره ({filteredArtifacts.length}):
          </h4>

          <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
            {filteredArtifacts.map((art) => {
              const isSelected = activeArtifact.id === art.id;
              return (
                <button
                  key={art.id}
                  onClick={() => handleSelect(art)}
                  className={`w-full p-4 rounded-xl border text-right transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#d4af37]/20 border-[#ffd700] shadow-lg shadow-[#d4af37]/10'
                      : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 justify-end mb-1">
                      <span className="text-[10px] text-zinc-400 font-serif">{art.date}</span>
                      <span className="text-[10px] font-bold text-[#ffd700] bg-[#d4af37]/15 px-1.5 py-0.2 rounded">
                        {art.dynasty}
                      </span>
                    </div>
                    <h5 className="text-sm font-bold text-white line-clamp-1">
                      {art.titleAr}
                    </h5>
                    <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                      {art.material}
                    </p>
                  </div>

                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
                      isSelected
                        ? 'bg-[#ffd700] text-black border-white'
                        : 'bg-zinc-800 text-[#ffd700] border-zinc-700'
                    }`}
                  >
                    <span className="hieroglyph-font text-lg">
                      {art.glyphRepresentation || '𓏤'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
