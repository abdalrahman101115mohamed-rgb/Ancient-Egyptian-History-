import React, { useState } from 'react';
import { ARCHAIC_PHARAOHS, Pharaoh } from '../data/archaicData';
import { Crown, Sparkles, MapPin, Award, BookOpen, Search, X, CheckCircle } from 'lucide-react';
import { audioService } from '../utils/audioSynth';

export const ArchaicEraView: React.FC = () => {
  const [selectedDynasty, setSelectedDynasty] = useState<'all' | 1 | 2>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePharaohModal, setActivePharaohModal] = useState<Pharaoh | null>(null);

  const filteredPharaohs = ARCHAIC_PHARAOHS.filter((p) => {
    const matchesDynasty = selectedDynasty === 'all' || p.dynasty === selectedDynasty;
    const matchesQuery =
      p.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDynasty && matchesQuery;
  });

  const handleOpenModal = (p: Pharaoh) => {
    audioService.playChime();
    setActivePharaohModal(p);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Intro section: What is the Archaic Era? */}
      <div className="bg-gradient-to-br from-[#151822] via-[#10121a] to-[#0c0d12] rounded-2xl border border-[#d4af37]/30 p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#ffd700] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ما هو العصر العتيق؟ (The Early Dynastic / Archaic Period)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            فجر السلالات: <span className="gold-gradient-text">الأسرتان الأولى والثانية</span>
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            يمتد العصر العتيق (المعروف أيضاً بالعصر الثيني) من حوالي <strong>3100 إلى 2686 ق.م</strong>، وهو الفترة التأسيسية الحاسمة التي وُضعت فيها كل أسس الحضارة الفرعونية: توحيد القطرين، إنشاء الإدارة المركزية، ابتكار الكتابة الهيروغليفية، وتأسيس أول عاصمة موحدة في العالم (منف).
          </p>
        </div>

        {/* Foundations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-zinc-800/80 text-right">
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl hieroglyph-font text-[#ffd700]">𓊁</span>
              <span className="text-xs font-bold text-[#ffd700]">شارة السَّرَخ</span>
            </div>
            <h4 className="text-sm font-bold text-white mb-1">واجهة القصر وحورس</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              سلف الخرطوشة الملكية؛ رسم لواجهة القصر بالطوب اللبن يحمل اسم الملك الحورسي، معلناً حماية الصقر حورس الأبدية للعرش.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl hieroglyph-font text-[#ffd700]">𓋴𓌳𓏏𓅱𓇋</span>
              <span className="text-xs font-bold text-rose-400">توحيد الأرضين</span>
            </div>
            <h4 className="text-sm font-bold text-white mb-1">سما-تاوي (Sema-Tawy)</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              ربط نباتي البردي واللوتس معاً في عقدة القصبة الهوائية، لترسيخ أن الشمال والجنوب جسد واحد لا يمكن فصل أحدهما عن الآخر.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl hieroglyph-font text-[#ffd700]">𓊖</span>
              <span className="text-xs font-bold text-cyan-400">العاصمة المؤسسة</span>
            </div>
            <h4 className="text-sm font-bold text-white mb-1">منف (الجدار الأبيض)</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              اختيار عبقري عند رأس الدلتا، بناها نعرمر بعد تحويل مجرى النيل لتكون مركز ثقل الدولة ومقر محكمة العدالة المركزية.
            </p>
          </div>
        </div>
      </div>

      {/* Pharaohs Catalog Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#d4af37]/25 pb-4">
        <div className="text-right w-full sm:w-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 justify-end">
            <span>ملوك وفراعنة العصر العتيق</span>
            <Crown className="w-5 h-5 text-[#ffd700]" />
          </h3>
          <p className="text-xs text-zinc-400">
            سجل ملوك الأسرتين الأولى والثانية وألقابهم الحوروسية الخالدة
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن ملك أو حدث..."
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg pl-3 pr-9 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ffd700] text-right"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute right-3 top-2 pointer-events-none" />
          </div>

          {/* Dynasty Filter */}
          <div className="inline-flex rounded-lg p-1 bg-zinc-900 border border-zinc-700 text-xs">
            <button
              onClick={() => setSelectedDynasty('all')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                selectedDynasty === 'all'
                  ? 'bg-[#d4af37] text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              الكل ({ARCHAIC_PHARAOHS.length})
            </button>
            <button
              onClick={() => setSelectedDynasty(1)}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                selectedDynasty === 1
                  ? 'bg-[#d4af37] text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              الأسرة الأولى
            </button>
            <button
              onClick={() => setSelectedDynasty(2)}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                selectedDynasty === 2
                  ? 'bg-[#d4af37] text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              الأسرة الثانية
            </button>
          </div>
        </div>
      </div>

      {/* Pharaohs Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPharaohs.map((pharaoh) => (
          <div
            key={pharaoh.id}
            className="group rounded-2xl bg-gradient-to-b from-[#141720] to-[#0d0f14] border border-zinc-800 hover:border-[#d4af37]/60 p-5 shadow-lg hover:shadow-2xl hover:shadow-[#d4af37]/10 transition-all duration-300 flex flex-col justify-between text-right"
          >
            <div>
              {/* Card top banner: Serekh Glyph & Dynasty */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="text-[11px] font-medium text-zinc-400">
                  {pharaoh.reignDates}
                </span>
                <span className="text-xs font-bold text-[#ffd700] bg-[#d4af37]/10 border border-[#d4af37]/30 px-2 py-0.5 rounded">
                  {pharaoh.period}
                </span>
              </div>

              {/* Serekh Frame with Name */}
              <div className="my-4 p-3 rounded-xl bg-zinc-900/80 border border-zinc-700/80 text-center relative group-hover:border-[#ffd700]/50 transition-colors">
                <div className="w-16 h-20 mx-auto border-2 border-[#d4af37] rounded-t-md p-1 relative flex flex-col justify-between bg-black/60 shadow-md">
                  <span className="text-xs hieroglyph-font text-[#ffd700] absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0c0d12] px-1">
                    𓅃
                  </span>
                  <div className="flex-1 flex items-center justify-center pt-2">
                    <span className="text-base hieroglyph-font text-white tracking-widest">
                      {pharaoh.nameHieroglyphs}
                    </span>
                  </div>
                  {/* Palace facade niche lines */}
                  <div className="border-t-2 border-[#d4af37] flex justify-around text-[6px] text-[#ffd700] pt-0.5">
                    <span>|||</span>
                    <span>|||</span>
                  </div>
                </div>
                <h4 className="text-lg font-black text-white mt-2 group-hover:text-[#ffd700] transition-colors">
                  {pharaoh.nameAr}
                </h4>
                <p className="text-xs text-zinc-400 font-serif">
                  {pharaoh.nameEn}
                </p>
              </div>

              {/* Serekh Meaning */}
              <div className="text-xs text-zinc-300 bg-[#d4af37]/5 p-2.5 rounded-lg border-r-2 border-[#d4af37] mb-3">
                <span className="font-bold text-[#ffd700] block mb-0.5">معنى السَّرَخ الملكي:</span>
                {pharaoh.serekhMeaning}
              </div>

              {/* Short Bio snippet */}
              <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                {pharaoh.bio}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
              <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#d4af37]" />
                {pharaoh.tombLocation.split(' - ')[0]}
              </span>

              <button
                onClick={() => handleOpenModal(pharaoh)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-[#d4af37] text-zinc-200 hover:text-black font-semibold transition-all cursor-pointer"
              >
                <span>الملف الكامل</span>
                <BookOpen className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pharaoh Full Dossier Modal */}
      {activePharaohModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12141c] border border-[#d4af37]/60 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 text-right shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              onClick={() => setActivePharaohModal(null)}
              className="absolute top-4 left-4 p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="border-b border-zinc-800 pb-4">
              <div className="inline-block px-2.5 py-0.5 rounded text-xs font-bold text-[#ffd700] bg-[#d4af37]/15 mb-2">
                {activePharaohModal.period} · {activePharaohModal.reignDates}
              </div>
              <h3 className="text-2xl font-black text-white">
                {activePharaohModal.nameAr}
              </h3>
              <p className="text-sm text-zinc-400 font-serif">
                {activePharaohModal.nameEn} · <span className="hieroglyph-font text-[#ffd700]">{activePharaohModal.nameHieroglyphs}</span>
              </p>
            </div>

            {/* Serekh Meaning */}
            <div className="p-3.5 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs text-zinc-200">
              <strong className="text-[#ffd700] block mb-1">دلالة السَّرَخ والألقاب:</strong>
              {activePharaohModal.serekhMeaning}
            </div>

            {/* Detailed Bio */}
            <div className="space-y-2 text-sm text-zinc-300 leading-relaxed">
              <h4 className="font-bold text-white text-base">السيرة التاريخية:</h4>
              <p>{activePharaohModal.bio}</p>
            </div>

            {/* Key Achievements */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-[#ffd700] text-sm">أهم الإنجازات والتحولات:</h4>
              <ul className="space-y-1.5 text-zinc-300">
                {activePharaohModal.achievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#ffd700] shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Artifacts & Discoveries */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-cyan-400 text-sm">أبرز الآثار والاكتشافات:</h4>
              <div className="flex flex-wrap gap-2">
                {activePharaohModal.keyArtifacts.map((art, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs"
                  >
                    {art}
                  </span>
                ))}
              </div>
            </div>

            {/* Tomb & Necropolis */}
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
              <span className="font-bold text-white block mb-0.5">الموقع الجنائزي والمقبرة:</span>
              <p>{activePharaohModal.tombLocation}</p>
            </div>

            {/* Historical Significance */}
            <div className="p-3.5 rounded-xl bg-[#0b0c10] border-r-4 border-[#ffd700] text-xs text-zinc-200">
              <strong className="text-[#ffd700] block mb-1">الأثر التاريخي الخالد:</strong>
              {activePharaohModal.historicalSignificance}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
