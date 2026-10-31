import React from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Compass, Scroll, Award, MapPin, Feather } from 'lucide-react';
import { audioService } from '../utils/audioSynth';

export type ActiveTab = 'archaic' | 'narmer' | 'hieroglyphs' | 'map' | 'timeline' | 'artifacts' | 'scribe' | 'quiz';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  isAudioActive: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  isAudioActive,
  onToggleAudio,
}) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'archaic', label: 'العصر العتيق', icon: <BookOpen className="w-4 h-4" />, badge: 'الأسرتان 1-2' },
    { id: 'narmer', label: 'صلاية نعرمر', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'hieroglyphs', label: 'الهيروغليفية والسَّرَخ', icon: <Feather className="w-4 h-4" /> },
    { id: 'map', label: 'خريطة فجر التاريخ', icon: <MapPin className="w-4 h-4" /> },
    { id: 'timeline', label: 'الخط الزمني', icon: <Compass className="w-4 h-4" /> },
    { id: 'artifacts', label: 'خزانة الآثار', icon: <Scroll className="w-4 h-4" /> },
    { id: 'scribe', label: 'الكاتب الملكي الذكي', icon: <span className="hieroglyph-font text-base leading-none">𓏤</span>, badge: 'ذكاء اصطناعي' },
    { id: 'quiz', label: 'تحدي الكاتب', icon: <Award className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0f1118]/95 backdrop-blur-md border-b border-[#d4af37]/25 shadow-lg shadow-black/50">
      {/* Upper bar with royal motif */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectTab('archaic')}
            className="flex items-center gap-2.5 text-right cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37] via-[#aa7c11] to-[#604207] p-[1.5px] shadow-md shadow-[#d4af37]/15">
              <div className="w-full h-full bg-[#12141c] rounded-[7px] flex items-center justify-center text-lg hieroglyph-font text-[#ffd700] group-hover:scale-105 transition-transform">
                𓅃
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-[#ffd700] transition-colors">
                  بوابة مصر العتيقة
                </span>
                <span className="text-[10px] text-[#d4af37] font-serif border border-[#d4af37]/40 px-1.5 py-0.5 rounded">
                  3100 ق.م
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden sm:block">
                موسوعة فجر الحضارة وتوحيد القطرين في أرض النيل
              </p>
            </div>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Ambient Sound Button */}
          <button
            onClick={onToggleAudio}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
              isAudioActive
                ? 'bg-[#d4af37]/15 border-[#d4af37] text-[#ffd700] shadow-[0_0_12px_rgba(212,175,55,0.25)]'
                : 'bg-zinc-900/80 border-zinc-700/60 text-zinc-400 hover:text-zinc-200 hover:border-zinc-500'
            }`}
            title={isAudioActive ? 'كتم الأجواء النيلية' : 'تشغيل النغمات النيلية العتيقة'}
          >
            {isAudioActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{isAudioActive ? 'نغمات المعبد مفعّلة' : 'صوت الأجواء'}</span>
          </button>

          {/* Scribe Quick Access */}
          <button
            onClick={() => {
              audioService.playChime();
              onSelectTab('scribe');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-[#0d0f14] hover:brightness-110 shadow-sm cursor-pointer transition-all"
          >
            <span className="hieroglyph-font font-bold">𓏞</span>
            <span>اسأل المؤرخ</span>
          </button>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1 text-xs border-t border-zinc-800/80">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  audioService.playChime();
                  onSelectTab(item.id);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-md whitespace-nowrap font-medium transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#d4af37]/20 text-[#ffd700] font-bold border-b-2 border-[#ffd700]'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-normal ${
                      isActive ? 'bg-[#d4af37]/30 text-[#fff4b8]' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
