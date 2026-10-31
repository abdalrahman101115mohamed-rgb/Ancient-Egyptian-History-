import React, { useState } from 'react';
import { GRAND_TIMELINE, TimelinePeriod } from '../data/archaicData';
import { Compass, Sparkles, CheckCircle2, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { audioService } from '../utils/audioSynth';

export const GrandTimeline: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimelinePeriod>(
    GRAND_TIMELINE.find((p) => p.isArchaicHighlight) || GRAND_TIMELINE[1]
  );

  const handleSelectPeriod = (p: TimelinePeriod) => {
    audioService.playChime();
    setSelectedPeriod(p);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-right space-y-2 border-b border-[#d4af37]/25 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#ffd700] bg-[#d4af37]/10 border border-[#d4af37]/30 px-3 py-1 rounded-full">
          <Clock className="w-3.5 h-3.5" />
          <span>الخط الزمني الشامل لحضارة مصر القديمة (5500 - 30 ق.م)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          رحلة <span className="gold-gradient-text">الآلاف الثلاثة</span> عبر العصور
        </h2>
        <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
          تعرف على موقع <strong>«العصر العتيق»</strong> كحجر الزاوية الذي شُيّدت عليه صروح الدولة القديمة وعصر بناة الأهرام، ثم رخاء الدولة الوسطى، وصولاً إلى إمبراطورية الدولة الحديثة العظمى.
        </p>
      </div>

      {/* Horizontal Interactive Timeline Bar */}
      <div className="relative">
        <div className="flex items-center gap-3 overflow-x-auto pb-4 pt-2 no-scrollbar">
          {GRAND_TIMELINE.map((period, index) => {
            const isSelected = selectedPeriod.id === period.id;
            const isArchaic = period.isArchaicHighlight;

            return (
              <button
                key={period.id}
                onClick={() => handleSelectPeriod(period)}
                className={`flex-shrink-0 w-56 p-4 rounded-2xl border text-right transition-all cursor-pointer relative group ${
                  isSelected
                    ? isArchaic
                      ? 'bg-gradient-to-b from-[#d4af37]/25 to-[#996515]/20 border-[#ffd700] shadow-[0_0_20px_rgba(212,175,55,0.3)] ring-2 ring-[#ffd700]'
                      : 'bg-[#1b253b] border-cyan-400 shadow-lg ring-2 ring-cyan-400'
                    : isArchaic
                    ? 'bg-[#181a24] border-[#d4af37]/50 hover:border-[#ffd700]'
                    : 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60'
                }`}
              >
                {/* Archaic badge */}
                {isArchaic && (
                  <span className="absolute -top-2.5 right-3 text-[9px] font-bold bg-[#ffd700] text-black px-2 py-0.2 rounded-full shadow">
                    محور التطبيق ✦
                  </span>
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-zinc-400 font-mono">
                    {index + 1} / {GRAND_TIMELINE.length}
                  </span>
                  <span className="text-xs font-bold text-zinc-300 font-serif">
                    {period.dates}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-[#ffd700] transition-colors line-clamp-1">
                  {period.nameAr.split(' (')[0]}
                </h4>
                <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                  {period.dynasties}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Period Spotlight Card */}
      <div className="bg-gradient-to-br from-[#151824] via-[#10121a] to-[#0c0d12] rounded-2xl border border-[#d4af37]/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden text-right space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1 justify-end">
              {selectedPeriod.isArchaicHighlight && (
                <span className="text-xs font-bold text-[#ffd700] bg-[#d4af37]/20 border border-[#d4af37]/40 px-2 py-0.5 rounded">
                  عصر التأسيس والتوحيد
                </span>
              )}
              <span className="text-xs font-serif text-zinc-400">
                {selectedPeriod.dates}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {selectedPeriod.nameAr}
            </h3>
            <p className="text-xs text-zinc-400 font-serif">
              {selectedPeriod.nameEn} · {selectedPeriod.dynasties}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-center sm:text-right shrink-0">
            <span className="text-[11px] text-zinc-400 block">العاصمة السياسية:</span>
            <span className="text-sm font-bold text-[#ffd700]">{selectedPeriod.capitalAr}</span>
          </div>
        </div>

        {/* Summary */}
        <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal bg-zinc-900/40 p-4 rounded-xl border border-zinc-800">
          {selectedPeriod.summary}
        </p>

        {/* Milestones and Pharaohs in 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Major Milestones */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#ffd700] flex items-center justify-end gap-1.5">
              <span>أبرز المحطات والمنجزات الحضارية:</span>
              <Sparkles className="w-4 h-4" />
            </h4>
            <ul className="space-y-2 text-xs text-zinc-300">
              {selectedPeriod.majorMilestones.map((m, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ffd700] shrink-0 mt-0.5" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Pharaohs */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-cyan-400 flex items-center justify-end gap-1.5">
              <span>أشهر الفراعنة والقادة في هذا العصر:</span>
              <Compass className="w-4 h-4" />
            </h4>
            <div className="flex flex-wrap gap-2 justify-end">
              {selectedPeriod.keyPharaohs.map((ph, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs font-medium"
                >
                  {ph}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
