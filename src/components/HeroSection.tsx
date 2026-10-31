import React from 'react';
import { Sparkles, ArrowLeft, Shield, Crown } from 'lucide-react';
import { ActiveTab } from './Navbar';
import { audioService } from '../utils/audioSynth';

interface HeroSectionProps {
  onSelectTab: (tab: ActiveTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectTab }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#10131e] via-[#0d0f17] to-[#0a0c10] border-b border-[#d4af37]/20 pt-8 pb-10">
      {/* Background hieroglyphic decorative watermark */}
      <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none flex justify-between items-center text-8xl hieroglyph-font overflow-hidden text-[#ffd700]">
        <span>𓅃 𓈖 𓂝 𓂋 𓌸 𓋹 𓏤</span>
        <span>𓊹 𓊹 𓊹 𓋴 𓍋 𓐍 𓏏</span>
        <span>𓂧 𓈖 𓆓 𓏏 𓅃</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Title & Story */}
          <div className="lg:col-span-7 space-y-4 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#ffd700] text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>فجر التاريخ الإنساني · الأسرتان الأولى والثانية (3100 - 2686 ق.م)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
              تاريخ <span className="gold-gradient-text">مصر العتيق</span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#dcd2be] font-bold">
                ميلاد الحضارة وتوحيد القطرين
              </span>
            </h1>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              من هنا بدأت ملحمة الحضارة المصرية؛ حين انطلق الملك <strong>نعرمر (مينا)</strong> من الجنوب ليوحد أرض الصعيد والدلتا، جامعاً بين التاج الأبيض <span className="text-zinc-100 font-semibold">«حدجت»</span> والتاج الأحمر <span className="text-rose-400 font-semibold">«دشرت»</span>، ليؤسس العاصمة العريقة <span className="text-[#ffd700] font-semibold">«إنب-حج / منف»</span>، ويكتب أولى كلمات الهيروغليفية في التاريخ البشري.
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  audioService.playChime();
                  onSelectTab('narmer');
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#c49a2c] to-[#996515] text-[#0a0c10] font-bold text-sm hover:brightness-110 shadow-lg shadow-[#d4af37]/20 transition-all cursor-pointer"
              >
                <span>فحص صلاية نعرمر التفاعلية</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  audioService.playChime();
                  onSelectTab('hieroglyphs');
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900/90 border border-[#d4af37]/40 text-[#ffd700] font-medium text-sm hover:bg-[#d4af37]/15 transition-all cursor-pointer"
              >
                <span className="hieroglyph-font">𓏞</span>
                <span>اكتب اسمك بالهيروغليفية داخل سَرخ ملكي</span>
              </button>

              <button
                onClick={() => {
                  audioService.playChime();
                  onSelectTab('archaic');
                }}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-zinc-900/60 border border-zinc-700 text-zinc-300 font-medium text-sm hover:text-white hover:border-zinc-500 transition-all cursor-pointer"
              >
                <span>سير ملوك الأسرتين 1 و 2</span>
              </button>
            </div>
          </div>

          {/* Interactive Visual: The Unification of the Two Crowns (Sema-Tawy) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-br from-[#161a26] via-[#12141e] to-[#0c0d12] border border-[#d4af37]/30 p-5 shadow-2xl shadow-black/80">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5 font-bold text-[#ffd700]">
                  <Crown className="w-4 h-4 text-[#d4af37]" />
                  سر توحيد التاجين (سما-تاوي)
                </span>
                <span className="text-zinc-500 font-serif">Sema-Tawy</span>
              </div>

              {/* Crowns visual breakdown */}
              <div className="grid grid-cols-3 gap-3 my-4 text-center">
                {/* Upper Egypt White Crown */}
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-600 transition-all">
                  <div className="w-12 h-14 mx-auto mb-2 rounded-t-full bg-gradient-to-t from-zinc-300 to-white flex items-center justify-center shadow-md">
                    <span className="text-zinc-900 text-xs font-bold font-serif">حدجت</span>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-200">التاج الأبيض</h4>
                  <p className="text-[10px] text-zinc-400 mt-0.5">مصر العليا (الجنوب)</p>
                  <span className="text-[10px] text-zinc-500 block">نخبت النسر</span>
                </div>

                {/* Combined Double Crown */}
                <div className="p-3 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/50 shadow-inner shadow-[#d4af37]/10 relative">
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] bg-[#d4af37] text-black font-extrabold px-1.5 py-0.2 rounded-full">
                    الموحد
                  </span>
                  <div className="w-12 h-14 mx-auto mb-2 rounded-t-full bg-gradient-to-t from-rose-600 via-zinc-200 to-white flex items-center justify-center shadow-lg border border-[#ffd700]/40">
                    <span className="text-black text-xs font-black">بشنت</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#ffd700]">التاج المزدوج</h4>
                  <p className="text-[10px] text-zinc-300 mt-0.5">الملك الموحد للقطرين</p>
                  <span className="text-[10px] text-[#e0b943] block">سما-تاوي 𓋴𓌳𓏏𓅱𓇋</span>
                </div>

                {/* Lower Egypt Red Crown */}
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-600 transition-all">
                  <div className="w-12 h-14 mx-auto mb-2 rounded-tl-2xl bg-gradient-to-t from-red-700 to-rose-500 flex items-center justify-center shadow-md">
                    <span className="text-white text-xs font-bold font-serif">دشرت</span>
                  </div>
                  <h4 className="text-xs font-bold text-rose-300">التاج الأحمر</h4>
                  <p className="text-[10px] text-zinc-400 mt-0.5">مصر السفلى (الشمال)</p>
                  <span className="text-[10px] text-zinc-500 block">واجيت الكوبرا</span>
                </div>
              </div>

              {/* Core Archaic pillars */}
              <div className="space-y-2 pt-2 border-t border-zinc-800 text-xs">
                <div className="flex items-center justify-between text-zinc-300 py-1">
                  <span className="text-zinc-400">العاصمة المؤسسة الأولى:</span>
                  <span className="font-semibold text-white">منف (إنب-حج "الجدار الأبيض")</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300 py-1">
                  <span className="text-zinc-400">الشارة الملكية الأولى:</span>
                  <span className="font-semibold text-[#ffd700] flex items-center gap-1">
                    <span className="hieroglyph-font">𓊁</span> السَّرَخ الملكي بحماية حورس
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-300 py-1">
                  <span className="text-zinc-400">المقبرة القومية الأولى:</span>
                  <span className="font-semibold text-white">أم الجعاب بأبيدوس وسقارة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
