import React, { useState } from 'react';
import { ARCHAIC_SITES, MapSite } from '../data/archaicData';
import { MapPin, Sparkles, Compass, CheckCircle2, Crown, ExternalLink } from 'lucide-react';
import { audioService } from '../utils/audioSynth';

export const MapOfArchaicEgypt: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState<MapSite>(ARCHAIC_SITES[1]); // Abydos default
  const [regionFilter, setRegionFilter] = useState<'all' | 'Upper Egypt' | 'Lower Egypt' | 'Delta'>('all');

  const filteredSites = ARCHAIC_SITES.filter(
    (s) => regionFilter === 'all' || s.region === regionFilter
  );

  const handleSelectSite = (site: MapSite) => {
    audioService.playChime();
    setSelectedSite(site);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-right space-y-2 border-b border-[#d4af37]/25 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#ffd700] bg-[#d4af37]/10 border border-[#d4af37]/30 px-3 py-1 rounded-full">
            <Compass className="w-3.5 h-3.5" />
            <span>الجغرافيا السياسية والمراكز العتيقة على ضفاف النيل</span>
          </div>

          {/* Region Filters */}
          <div className="inline-flex rounded-lg p-1 bg-zinc-900 border border-zinc-700 text-xs">
            <button
              onClick={() => setRegionFilter('all')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                regionFilter === 'all' ? 'bg-[#d4af37] text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              كل المواقع ({ARCHAIC_SITES.length})
            </button>
            <button
              onClick={() => setRegionFilter('Upper Egypt')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                regionFilter === 'Upper Egypt' ? 'bg-[#d4af37] text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              مصر العليا (الجنوب)
            </button>
            <button
              onClick={() => setRegionFilter('Lower Egypt')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                regionFilter === 'Lower Egypt' ? 'bg-[#d4af37] text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              منف وسقارة
            </button>
            <button
              onClick={() => setRegionFilter('Delta')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                regionFilter === 'Delta' ? 'bg-[#d4af37] text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              مصر السفلى (الدلتا)
            </button>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          خريطة <span className="gold-gradient-text">مصر العتيقة</span> التفاعلية
        </h2>
        <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
          استكشف العواصم والجبانات المقدسة التي شهدت انطلاق جيوش التوحيد ومقابر ملوك الأسرتين الأولى والثانية، من نخن في أقصى الجنوب إلى بوتو في أحراش الدلتا.
        </p>
      </div>

      {/* Main Map View and Information Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Visual Stylized Map of Ancient Nile */}
        <div className="lg:col-span-6 bg-gradient-to-b from-[#141620] via-[#0f1118] to-[#0a0b0e] rounded-2xl border border-[#d4af37]/30 p-6 flex flex-col items-center justify-center relative shadow-2xl overflow-hidden min-h-[580px]">
          {/* Subtle parchment grid & Nile stream */}
          <div className="absolute inset-0 bg-papyrus-pattern opacity-40 pointer-events-none" />

          {/* North and South Labels */}
          <div className="absolute top-4 right-4 z-20 text-right">
            <span className="text-[10px] text-cyan-400 font-bold block">مصر السفلى (تا-محو) 𓋔</span>
            <span className="text-[9px] text-zinc-500">البحر المتوسط والدلتا</span>
          </div>
          <div className="absolute bottom-4 right-4 z-20 text-right">
            <span className="text-[10px] text-[#ffd700] font-bold block">مصر العليا (تا-شمعو) 𓋑</span>
            <span className="text-[9px] text-zinc-500">الصعيد والشلال الأول</span>
          </div>

          {/* Stylized SVG Nile Path */}
          <svg
            className="w-full h-[520px] max-w-[360px] pointer-events-none z-10"
            viewBox="0 0 200 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Delta Branches */}
            <path
              d="M 100 130 C 95 100 60 70 40 40 M 100 130 C 100 90 100 60 100 35 M 100 130 C 115 95 140 70 160 40"
              stroke="#1b4d7e"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Main Nile River Course */}
            <path
              d="M 100 130 C 95 170 105 210 98 260 C 90 310 115 360 108 410 C 102 450 110 480 110 500"
              stroke="#1b4d7e"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.85"
            />
            {/* Glow over the river */}
            <path
              d="M 100 130 C 95 170 105 210 98 260 C 90 310 115 360 108 410 C 102 450 110 480 110 500"
              stroke="#4ba3e3"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>

          {/* Interactive Site Pins */}
          {filteredSites.map((site) => {
            const isSelected = selectedSite.id === site.id;
            return (
              <button
                key={site.id}
                onClick={() => handleSelectSite(site)}
                style={{ top: `${site.latitudePct}%`, left: `${site.longitudePct}%` }}
                className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-transform duration-200 ${
                  isSelected ? 'scale-125 z-40' : 'hover:scale-110'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all shadow-lg ${
                      isSelected
                        ? 'bg-[#ffd700] text-black border-white ring-4 ring-[#ffd700]/30'
                        : 'bg-[#12141c] text-[#ffd700] border-[#d4af37] hover:border-white'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span
                    className={`mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#ffd700] text-black'
                        : 'bg-black/80 text-zinc-200 border border-zinc-700'
                    }`}
                  >
                    {site.nameAr.split(' ')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Site Details Dossier */}
        <div className="lg:col-span-6 space-y-5 text-right">
          <div className="bg-gradient-to-br from-[#151822] via-[#10121a] to-[#0c0d12] rounded-2xl border border-[#d4af37]/40 p-6 shadow-xl relative overflow-hidden space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-xs font-serif text-[#ffd700] bg-[#d4af37]/15 px-2.5 py-1 rounded border border-[#d4af37]/30">
                {selectedSite.regionAr}
              </span>
              <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                <span>الاسم القديم:</span>
                <strong className="text-white font-mono">{selectedSite.ancientName}</strong>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-black text-white">
                {selectedSite.nameAr}
              </h3>
              <p className="text-xs text-zinc-400 font-serif">
                {selectedSite.nameEn}
              </p>
            </div>

            {/* Role & Political Importance */}
            <div className="p-3.5 rounded-xl bg-[#d4af37]/10 border-r-4 border-[#d4af37] text-xs text-zinc-200 leading-relaxed">
              <strong className="text-[#ffd700] block mb-1">المكانة والدور السياسي:</strong>
              {selectedSite.role}
            </div>

            {/* Historical Narrative */}
            <div className="space-y-2 text-sm text-zinc-300 leading-relaxed">
              <h4 className="font-bold text-white text-xs uppercase tracking-wide">
                الأهمية في فجر التاريخ المصري:
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300">
                {selectedSite.historicalImportance}
              </p>
            </div>

            {/* Key Discoveries */}
            <div className="space-y-2 pt-2 border-t border-zinc-800 text-xs">
              <h4 className="font-bold text-cyan-400">أهم المكتشفات والآثار من هذا الموقع:</h4>
              <ul className="space-y-1 text-zinc-300">
                {selectedSite.keyDiscoveries.map((disc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{disc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Associated Kings */}
            <div className="space-y-2 pt-2 border-t border-zinc-800 text-xs">
              <h4 className="font-bold text-[#ffd700] flex items-center justify-end gap-1">
                <span>الملوك والحكام المرتبطون بالموقع:</span>
                <Crown className="w-3.5 h-3.5" />
              </h4>
              <div className="flex flex-wrap gap-1.5 justify-end">
                {selectedSite.associatedKings.map((king, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs"
                  >
                    {king}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick List of Sites */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ARCHAIC_SITES.map((site) => (
              <button
                key={site.id}
                onClick={() => handleSelectSite(site)}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  selectedSite.id === site.id
                    ? 'bg-[#d4af37]/20 border-[#ffd700] text-white font-bold'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <span className="text-xs block truncate">{site.nameAr.split(' ')[0]}</span>
                <span className="text-[9px] text-zinc-500 block truncate">{site.ancientName}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
