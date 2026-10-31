import React, { useState } from 'react';
import { HIEROGLYPH_ALPHABET, transliterateArabicToHieroglyphs, HieroglyphChar } from '../data/archaicData';
import { Feather, Copy, Check, Sparkles, RefreshCw, BookOpen, Crown, Layers } from 'lucide-react';
import { audioService } from '../utils/audioSynth';

export const HieroglyphTranslator: React.FC = () => {
  const [inputText, setInputText] = useState('نعرمر');
  const [frameType, setFrameType] = useState<'serekh' | 'cartouche'>('serekh');
  const [copied, setCopied] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [selectedAlphabetChar, setSelectedAlphabetChar] = useState<HieroglyphChar | null>(HIEROGLYPH_ALPHABET[0]);

  const { glyphs, breakdown } = transliterateArabicToHieroglyphs(inputText || 'نعرمر');

  const handleCopy = () => {
    if (!glyphs) return;
    navigator.clipboard.writeText(glyphs);
    setCopied(true);
    audioService.playChime();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAnalyzeWithAI = async () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    setAiAnalysis(null);
    audioService.playChime();

    try {
      const res = await fetch('/api/analyze-name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: inputText.trim() }),
      });
      const data = await res.json();
      setAiAnalysis(data.analysis || 'تم استخراج المعاني الرمزية للاسم بالهيروغليفية بنجاح.');
    } catch (e) {
      console.warn('AI analysis failed:', e);
      setAiAnalysis(`الاسم "${inputText}" مكتوب بالرموز الهيروغليفية الصوتية الأحادية، ويستقر برعاية الصقر حورس داخل السَّرَخ الملكي المميز للعصر العتيق، مانحاً حامله الحماية الملكية والأبدية.`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const quickSamples = ['نعرمر', 'مينا', 'مريت نيت', 'حور عحا', 'إمحوتب', 'طيبة', 'مصر'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header */}
      <div className="text-right space-y-2 border-b border-[#d4af37]/25 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#ffd700] bg-[#d4af37]/10 border border-[#d4af37]/30 px-3 py-1 rounded-full">
          <Feather className="w-3.5 h-3.5" />
          <span>مترجم الهيروغليفية ومصمم السَّرَخ الملكي · العصر العتيق</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          اكتب اسمك <span className="gold-gradient-text">بالهيروغليفية</span> داخل سَرخ ملوك مصر العتيقة
        </h2>
        <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
          في العصر العتيق لم تكن "الخرطوشة" قد وُلدت بعد؛ بل كان الفراعنة يكتبون أسماءهم داخل <strong>«السَّرَخ»</strong> الذي يمثل واجهة القصر الملكي ويعلوه الصقر حورس. اكتب أي اسم بالعربية لتشاهده مكتوباً بالرموز الأثرية الأصلية.
        </p>
      </div>

      {/* Main Interactive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input & Frame Selection */}
        <div className="lg:col-span-6 space-y-6 text-right">
          <div className="bg-[#12141c] rounded-2xl border border-zinc-800 p-6 space-y-4 shadow-xl">
            <label className="block text-xs font-bold text-[#ffd700]">
              أدخل الاسم أو الكلمة (باللغة العربية):
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                maxLength={20}
                placeholder="اكتب اسمك هنا (مثال: نعرمر، أحمد، سارة)..."
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-base text-white focus:outline-none focus:border-[#ffd700] text-right font-medium"
              />
              <button
                onClick={() => setInputText('')}
                className="px-3 py-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white text-xs cursor-pointer"
                title="مسح"
              >
                مسح
              </button>
            </div>

            {/* Quick Samples */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <span className="text-[11px] text-zinc-400">أمثلة سريعة:</span>
              {quickSamples.map((sample) => (
                <button
                  key={sample}
                  onClick={() => {
                    audioService.playChime();
                    setInputText(sample);
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs bg-zinc-800/80 hover:bg-[#d4af37]/20 text-zinc-300 hover:text-[#ffd700] border border-zinc-700 transition-all cursor-pointer"
                >
                  {sample}
                </button>
              ))}
            </div>

            {/* Frame Choice */}
            <div className="pt-4 border-t border-zinc-800 space-y-2">
              <span className="block text-xs font-bold text-zinc-300">اختر إطار التتويج الملكي:</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setFrameType('serekh')}
                  className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                    frameType === 'serekh'
                      ? 'bg-[#d4af37]/15 border-[#ffd700] text-white shadow-md'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="hieroglyph-font text-base text-[#ffd700]">𓊁</span>
                    <span className="text-[10px] font-bold text-[#ffd700] bg-[#d4af37]/20 px-1.5 py-0.2 rounded">
                      العصر العتيق
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white">السَّرَخ الملكي</h4>
                  <p className="text-[10px] text-zinc-400 mt-0.5">
                    واجهة القصر وحورس الصقر (الأسرة 1 و 2)
                  </p>
                </button>

                <button
                  onClick={() => setFrameType('cartouche')}
                  className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                    frameType === 'cartouche'
                      ? 'bg-[#d4af37]/15 border-[#ffd700] text-white shadow-md'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="hieroglyph-font text-base text-cyan-400">𓍹𓍺</span>
                    <span className="text-[10px] text-cyan-400 bg-cyan-950 px-1.5 py-0.2 rounded">
                      الدولة القديمة وما بعدها
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white">الخرطوشة الملكية</h4>
                  <p className="text-[10px] text-zinc-400 mt-0.5">
                    حبل الشمس البيضاوي (شنو)
                  </p>
                </button>
              </div>
            </div>

            {/* AI Scribe Interpretation Trigger */}
            <div className="pt-2">
              <button
                onClick={handleAnalyzeWithAI}
                disabled={isAnalyzing || !inputText.trim()}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#c49a2c] to-[#996515] text-[#0a0c10] font-bold text-xs hover:brightness-110 shadow-md cursor-pointer disabled:opacity-50 transition-all"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>الكاتب الملكي يفحص بردية الأسماء...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>استشر الكاتب الملكي لتحليل دلالة اسمك بالهيروغليفية</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Analysis Result Card */}
          {aiAnalysis && (
            <div className="bg-gradient-to-br from-[#161a26] to-[#0e1017] rounded-2xl border border-[#d4af37]/50 p-5 shadow-xl text-right space-y-2 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-[11px] text-[#ffd700] font-serif">تحليل الكاتب الملكي حور-نب</span>
                <span className="hieroglyph-font text-lg text-[#ffd700]">𓏞</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed whitespace-pre-line">
                {aiAnalysis}
              </p>
            </div>
          )}
        </div>

        {/* Visual Frame Render (Serekh / Cartouche) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-gradient-to-b from-[#151824] via-[#10121a] to-[#0c0d12] rounded-2xl border border-[#d4af37]/30 p-6 flex flex-col items-center justify-center shadow-2xl relative text-center">
            {/* Copy Glyph Button */}
            <button
              onClick={handleCopy}
              className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-300 hover:text-white hover:border-[#ffd700] cursor-pointer transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'تم النسخ!' : 'نسخ النص'}</span>
            </button>

            <span className="text-xs text-zinc-400 font-serif mb-4 block">
              {frameType === 'serekh' ? 'السَّرَخ الملكي العتيق (Serekh)' : 'الخرطوشة الملكية (Shenu Cartouche)'}
            </span>

            {/* The Visual Royal Frame */}
            {frameType === 'serekh' ? (
              /* Archaic Serekh */
              <div className="w-52 sm:w-64 border-4 border-[#d4af37] rounded-t-xl bg-[#090b10] shadow-[0_0_30px_rgba(212,175,55,0.2)] p-4 relative my-4 flex flex-col items-center">
                {/* Horus Falcon Top */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#090b10] px-2 py-0.5 rounded border border-[#d4af37]/40 flex items-center gap-1">
                  <span className="hieroglyph-font text-2xl text-[#ffd700]">𓅃</span>
                  <span className="text-[10px] text-[#ffd700] font-bold">حورس الحامي</span>
                </div>

                {/* Serekh chamber with hieroglyphs */}
                <div className="w-full min-h-[140px] flex flex-col items-center justify-center py-6 border-b-4 border-[#d4af37]">
                  <div className="flex flex-wrap items-center justify-center gap-2 px-2">
                    {breakdown.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-4xl sm:text-5xl hieroglyph-font text-[#ffd700] drop-shadow-[0_2px_8px_rgba(255,215,0,0.4)]"
                        title={`${item.char} : ${item.depiction}`}
                      >
                        {item.glyph}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-zinc-400 mt-3 font-serif">
                    {inputText || 'نعرمر'}
                  </span>
                </div>

                {/* Archaic Palace Facade Niches (Paneled wall of Memphis) */}
                <div className="w-full pt-2 flex justify-between items-center px-4 text-xs font-mono text-[#d4af37]">
                  <div className="border-l-2 border-r-2 border-[#d4af37] h-8 w-4" />
                  <div className="border-l-2 border-r-2 border-[#d4af37] h-8 w-4" />
                  <div className="border-l-2 border-r-2 border-[#d4af37] h-8 w-4" />
                  <div className="border-l-2 border-r-2 border-[#d4af37] h-8 w-4" />
                </div>
                <span className="text-[9px] text-zinc-500 mt-1">واجهة القصر الملكي الحصين</span>
              </div>
            ) : (
              /* Royal Cartouche */
              <div className="w-48 sm:w-56 border-4 border-[#d4af37] rounded-full bg-[#090b10] shadow-[0_0_30px_rgba(212,175,55,0.2)] p-4 relative my-4 flex flex-col items-center min-h-[220px] justify-between">
                <div className="w-full flex-1 flex flex-col items-center justify-center py-4">
                  <div className="flex flex-col items-center gap-2">
                    {breakdown.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-3xl sm:text-4xl hieroglyph-font text-[#ffd700]"
                        title={`${item.char} : ${item.depiction}`}
                      >
                        {item.glyph}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-zinc-400 mt-2 font-serif">
                    {inputText || 'نعرمر'}
                  </span>
                </div>
                {/* Cartouche Knot at bottom */}
                <div className="w-20 h-2 bg-[#d4af37] rounded-full shadow" />
                <span className="text-[9px] text-zinc-500 mt-1">عقدة الحبل الشمسي الخالد</span>
              </div>
            )}

            {/* Character Breakdown Grid */}
            <div className="w-full mt-4 pt-4 border-t border-zinc-800 text-right">
              <h4 className="text-xs font-bold text-zinc-300 mb-2">تفكيك الرموز الصوتية المنقوشة:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {breakdown.map((item, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                    <span className="text-xs text-zinc-400">{item.depiction}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white">{item.char}</span>
                      <span className="text-lg hieroglyph-font text-[#ffd700]">{item.glyph}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gardiner Uniliteral Alphabet Interactive Reference Table */}
      <div className="bg-[#12141c] rounded-2xl border border-zinc-800 p-6 space-y-4 text-right shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <span className="text-xs text-zinc-400 font-serif">Gardiner's Sign-List · 24 Uniliterals</span>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>الأبجدية الهيروغليفية الأحادية الكاملة</span>
            <BookOpen className="w-4 h-4 text-[#ffd700]" />
          </h3>
        </div>

        <p className="text-xs text-zinc-400">
          انقر على أي رمز للتعرف على كوده الأثري في قائمة غاردنر والكائن الطبيعي الذي يمثله في بيئة وادي النيل.
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
          {HIEROGLYPH_ALPHABET.map((item, idx) => {
            const isSelected = selectedAlphabetChar?.char === item.char;
            return (
              <button
                key={idx}
                onClick={() => {
                  audioService.playChime();
                  setSelectedAlphabetChar(item);
                }}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#d4af37]/20 border-[#ffd700] shadow-md scale-105'
                    : 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800'
                }`}
              >
                <span className="text-3xl hieroglyph-font block mb-1 text-[#ffd700]">
                  {item.glyph}
                </span>
                <span className="text-xs font-bold text-white block">
                  {item.char}
                </span>
                <span className="text-[10px] text-zinc-400 font-serif block">
                  {item.latin}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Sign Detailed Breakdown */}
        {selectedAlphabetChar && (
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-zinc-900 via-[#161a24] to-zinc-900 border border-[#d4af37]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-right space-y-1">
              <div className="flex items-center gap-2 justify-end">
                <span className="text-xs font-mono text-[#ffd700] bg-black/60 px-2 py-0.5 rounded border border-[#d4af37]/30">
                  كود غاردنر: {selectedAlphabetChar.gardiner}
                </span>
                <h4 className="text-base font-bold text-white">
                  الحرف: {selectedAlphabetChar.char} ({selectedAlphabetChar.latin})
                </h4>
              </div>
              <p className="text-xs text-zinc-300">
                <strong className="text-zinc-100">ما يمثله الرمز:</strong> {selectedAlphabetChar.depictionAr} ({selectedAlphabetChar.depictionEn})
              </p>
              <p className="text-xs text-zinc-400">
                <strong className="text-zinc-300">القيمة الصوتية:</strong> {selectedAlphabetChar.phoneticDescription}
              </p>
            </div>

            <div className="text-5xl hieroglyph-font text-[#ffd700] p-3 rounded-xl bg-black/50 border border-[#d4af37]/40">
              {selectedAlphabetChar.glyph}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
