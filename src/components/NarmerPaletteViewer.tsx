import React, { useState } from 'react';
import { Sparkles, Eye, Volume2, Info, Compass, Shield, Award, CheckCircle2 } from 'lucide-react';
import { audioService } from '../utils/audioSynth';

interface Hotspot {
  id: string;
  face: 'reverse' | 'obverse'; // reverse = back (white crown striking), obverse = front (red crown & serpopards)
  titleAr: string;
  titleEn: string;
  xPct: number; // percentage from left
  yPct: number; // percentage from top
  symbolism: string;
  glyph?: string;
  description: string;
  historicalDossier: string;
}

const PALETTE_HOTSPOTS: Hotspot[] = [
  {
    id: 'narmer-serekh-top',
    face: 'reverse',
    titleAr: 'السَّرَخ الملكي ورأسا الإلهة بات / حتحور',
    titleEn: 'Royal Serekh & Goddess Bat/Hathor',
    xPct: 50,
    yPct: 9,
    symbolism: 'الحماية الإلهية المطلقة والشرعية السماوية لحكم نعرمر.',
    glyph: '𓈖𓂝𓂋𓌸',
    description: 'يتوسط قمة الصلاية على الوجهين "السَّرَخ الملكي" بداخله رمزا اسم نعرمر: سمكة القرموط (نعر) والإزميل الحاد (مر). ويحيط به رأسان مبجلان للبقرة السماوية الإلهة بات (أو حتحور) بقرنيها وأذنيها البقريتين.',
    historicalDossier: 'هذا السَّرَخ يمثل أقدم توثيق رسمي مكتوب لاسم فرعون مصري على حجر الشست، مؤكداً أن الملك يحكم بتفويض إلهي مباشر من السماء.',
  },
  {
    id: 'narmer-striking',
    face: 'reverse',
    titleAr: 'الملك نعرمر يرتدي التاج الأبيض ويقمع العدو',
    titleEn: 'Narmer in White Crown Smiting the Enemy',
    xPct: 45,
    yPct: 45,
    symbolism: 'النصر التاريخي الأبدي وإخضاع قوى الفوضى (الإسفت) وإرساء النظام والعدالة (الماعت).',
    glyph: '𓋑',
    description: 'يظهر نعرمر بحجم أسطوري ضخم (مبدأ النسبة والتناسب التمييزي) يرتدي التاج الأبيض لمصر العليا "حدجت" ومئزراً ملكياً يتدلى منه ذيل الثور رمز القوة الجسدية، رافعاً مقمعته الحربية الكمثرية ليضرب زعيم الدلتا المتمرد.',
    historicalDossier: 'هذا المشهد أسس "الموتيف" الملكي الأشهر في الفن المصري، والذي قلده كل فراعنة مصر على مدى 3000 سنة حتى العصر الروماني.',
  },
  {
    id: 'horus-falcon',
    face: 'reverse',
    titleAr: 'الصقر حورس يسلم 6000 أسير للملك',
    titleEn: 'Horus Delivering 6,000 Delta Captives',
    xPct: 75,
    yPct: 35,
    symbolism: 'مباركة الإله حورس للفتح وتأكيد انتصار الجنوب على دلتا النيل.',
    glyph: '𓅃',
    description: 'يقف الصقر حورس على باقة من نبات البردي (رمز الدلتا والمستنقعات الشمالية)، ممسكاً بحبل يخترق أنف أسير مجهول. وتخرج من البردي ست زهور لوتس/بردي، ترمز كل زهرة منها إلى الرقم 1000 بالهيروغليفية، أي ما يعادل 6000 أسير.',
    historicalDossier: 'أول معادلة بصرية تجمع بين الرمز الهيروغليفي الرقمي والرسم التعبيري المجازي لانتصار الجنوب.',
  },
  {
    id: 'sandal-bearer',
    face: 'reverse',
    titleAr: 'حامل النعلين الملكي (خادم الصندل)',
    titleEn: 'The Royal Sandal-Bearer',
    xPct: 20,
    yPct: 55,
    symbolism: 'قداسة الأرض التي يطأها الملك الإلهي وطهارة الطقوس الملكية.',
    glyph: '𓋴',
    description: 'شخصية أصغر حجماً تتبع الملك، تحمل نعليه بيده اليسرى وإبريق ماء للتطهير باليد اليمنى، معلق في رقبته ختم اسطواني رسمي يدل على منصبه الرفيع كأمين أسرار الملك.',
    historicalDossier: 'يدل وجوده على أن الملك يمارس طقساً دينياً مقدساً على أرض طاهرة يستلزم خلع النعلين، كما يبرز عمق البروتوكول البلاطي المبكر.',
  },
  {
    id: 'fallen-enemies-bottom',
    face: 'reverse',
    titleAr: 'الأعداء المنهزمون في القاع',
    titleEn: 'Fallen Foes at the Base',
    xPct: 50,
    yPct: 88,
    symbolism: 'السحق التام لخصوم الوحدة وتأمين الحدود.',
    glyph: '𓏶',
    description: 'في السجل السفلي يظهر رجلان عاريان من الأعداء ممددين على الأرض في وضعية الهروب أو الموت، وبجوار كل منهما رمز هيروغليفي يدل على مدينته أو حصنه المهدوم.',
    historicalDossier: 'يعكس تمثيل المدن المحصوقة في الشمال كدليل على توحيد الأقاليم المتباعدة تحت سلطة مركزية واحدة.',
  },
  // Obverse (Front) Hotspots
  {
    id: 'red-crown-parade',
    face: 'obverse',
    titleAr: 'الملك نعرمر بالتاج الأحمر في موكب النصر',
    titleEn: 'Narmer in Red Crown Victory Procession',
    xPct: 35,
    yPct: 25,
    symbolism: 'إعلان نفسه ملكاً شرعياً على مصر السفلى (الشمال) بعد النصر.',
    glyph: '𓋔',
    description: 'يظهر الملك نعرمر هنا مرتدياً التاج الأحمر "دشرت" رمز مصر السفلى، ممسكاً بالصولجان والمقمعة، يتقدمه وزيره ذو الشعر الطويل وأربعة من حملة الرايات الإقليمية (الجاكورا، الصقرين، ومستودع المشيمة الملكية).',
    historicalDossier: 'هذا السجل هو أقدم دليل أثري مؤكد على ارتداء ملك صعيدي للتاج الأحمر الشمالي معترفاً بوحدة القطرين.',
  },
  {
    id: 'beheaded-foes',
    face: 'obverse',
    titleAr: 'صفوف الأسرى مقطوعي الرؤوس',
    titleEn: 'Decapitated Prisoners of War',
    xPct: 80,
    yPct: 28,
    symbolism: 'القضاء المبرم على العصيان والمتمردين في الدلتا.',
    glyph: '𓀐',
    description: 'عشر جثث لأعداء مقيدي الأيدي ومقطوعي الرؤوس، وُضعت رؤوسهم المقطوعة بين أقدامهم بدقة طقسية، وفوقهم سفينة عتيقة ورمز القرموط والنسر.',
    historicalDossier: 'يمثل مشهد التوثيق العسكري الصارم الذي اتبعه الجيش المصري لتوثيق الخسائر الحربية بعد المعارك الكبرى.',
  },
  {
    id: 'serpopards-entwined',
    face: 'obverse',
    titleAr: 'الحيوانان الخرافيان (السيربوبارد) متعانقا الأعناق',
    titleEn: 'Entwined Serpopards (Union of Two Lands)',
    xPct: 50,
    yPct: 58,
    symbolism: 'جوهر توحيد القطرين: ترويض القوتين المتنازعتين والسيطرة عليهما في وفاق تام.',
    glyph: '𓄛',
    description: 'حيوانان أسطوريان بجسدي لبؤة ورقبتين ثعبانيتين طويلتين تلتفان في تعانق دائري يشكل تجويف الصلاية المستخدم لسحق كحل العيون الطقسي. يمسك رجلان قويان بحبال مربوطة حول عنقيهما لترويضهما.',
    historicalDossier: 'الرمز الأيقوني الأعمق لصلاية نعرمر؛ يعبر عن فكرة أن مصر العليا ومصر السفلى كانتا وحشين ضاريين، قيدهما نعرمر في انسجام تام تحت مظلة الدولة الواحدة.',
  },
  {
    id: 'sacred-bull',
    face: 'obverse',
    titleAr: 'الثور الملكي يدك أسوار المدينة المحصنة',
    titleEn: 'The Royal Bull Breaching Fortified City',
    xPct: 50,
    yPct: 88,
    symbolism: 'قوة الملك الفرعوني كـ "الثور القوي" (كا نخنت) الذي لا يقف أمامه أي حصن.',
    glyph: '𓃒',
    description: 'في السجل السفلي للوجه الأمامي، يظهر ثور ضخم قوي بقرنين فتاكين يقتحم سور مدينة دائرية محصنة، ويدوس بحوافره جسد زعيم من الشمال.',
    historicalDossier: 'لقب "الثور القوي" (Ka-Nekht) استمر طوال التاريخ الفرعوني كأول ألقاب الملكية الدالة على البأس العسكري والحيوية.',
  },
];

export const NarmerPaletteViewer: React.FC = () => {
  const [currentFace, setCurrentFace] = useState<'reverse' | 'obverse'>('reverse');
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot>(PALETTE_HOTSPOTS[1]); // default to striking king
  const [isSpeaking, setIsSpeaking] = useState(false);

  const activeHotspots = PALETTE_HOTSPOTS.filter(h => h.face === currentFace);

  const handleSelectHotspot = (h: Hotspot) => {
    audioService.playChime();
    setSelectedHotspot(h);
  };

  const handleSpeakText = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header and Context */}
      <div className="text-right space-y-2 border-b border-[#d4af37]/25 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#ffd700] bg-[#d4af37]/10 border border-[#d4af37]/30 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>وثيقة التوحيد الأولى · 3100 ق.م · معبد نخن (الكوم الأحمر)</span>
          </div>

          {/* Face Switcher Buttons */}
          <div className="inline-flex rounded-lg p-1 bg-zinc-900 border border-zinc-700">
            <button
              onClick={() => {
                audioService.playChime();
                setCurrentFace('reverse');
                const first = PALETTE_HOTSPOTS.find(h => h.face === 'reverse');
                if (first) setSelectedHotspot(first);
              }}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                currentFace === 'reverse'
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-[#0b0c10] shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              الوجه الخلفي (التاج الأبيض ومقمعة الحرب)
            </button>
            <button
              onClick={() => {
                audioService.playChime();
                setCurrentFace('obverse');
                const first = PALETTE_HOTSPOTS.find(h => h.face === 'obverse');
                if (first) setSelectedHotspot(first);
              }}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                currentFace === 'obverse'
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-[#0b0c10] shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              الوجه الأمامي (التاج الأحمر والسيربوبارد)
            </button>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          فاحص <span className="gold-gradient-text">صلاية نعرمر</span> التفاعلي
        </h2>
        <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
          انقر على أي نقطة مضيئة في الصلاية لاستكشاف المعاني الخفية والرموز الهيروغليفية التي دشن بها الملك نعرمر تاريخ الحضارة المصرية الموحدة لأول مرة في التاريخ.
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive Palette Canvas / Representation */}
        <div className="lg:col-span-6 bg-gradient-to-b from-[#14161f] to-[#0c0d12] rounded-2xl border border-[#d4af37]/30 p-6 flex flex-col items-center justify-center relative shadow-2xl">
          {/* Palette Shield Contour SVG */}
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[1/1.8] bg-[#22272e] rounded-t-[50px] rounded-b-[70px] border-4 border-[#333a46] shadow-[0_10px_35px_rgba(0,0,0,0.8)] overflow-hidden p-4 flex flex-col justify-between">
            {/* Stone texture effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#2a303c]/90 via-[#1e232c] to-[#151920] opacity-95 pointer-events-none" />
            <div className="absolute inset-0 border border-[#d4af37]/20 rounded-t-[46px] rounded-b-[66px] pointer-events-none" />

            {/* Visual Scene Elements based on Face */}
            {currentFace === 'reverse' ? (
              <div className="relative z-10 w-full h-full flex flex-col justify-between py-2 text-center select-none">
                {/* Top register */}
                <div className="border-b border-[#444d5c] pb-2 flex items-center justify-between px-4">
                  <div className="text-zinc-400 text-lg">𓃾</div>
                  <div className="p-1 border border-[#ffd700]/60 rounded bg-black/40 text-xs font-mono text-[#ffd700]">
                    𓈖𓂝𓂋𓌸 [نعرمر]
                  </div>
                  <div className="text-zinc-400 text-lg">𓃾</div>
                </div>

                {/* Central register: Narmer striking */}
                <div className="flex-1 flex flex-col justify-center items-center py-4 relative">
                  <div className="w-32 h-44 rounded-lg border border-dashed border-[#556172] flex flex-col items-center justify-center p-2 bg-[#171b22]/70 text-center">
                    <span className="text-3xl hieroglyph-font text-white drop-shadow">𓋑</span>
                    <span className="text-xs font-bold text-zinc-200 mt-1">نعرمر بالتاج الأبيض</span>
                    <span className="text-[10px] text-zinc-400">يضرب زعيم الشمال بالمقمعة</span>
                  </div>

                  {/* Falcon representation */}
                  <div className="absolute top-4 right-2 p-1.5 rounded bg-[#1f2530] border border-zinc-600 text-[11px] text-[#ffd700] text-center">
                    <span className="hieroglyph-font text-xl block">𓅃</span>
                    <span>حورس + البردي</span>
                  </div>

                  {/* Sandal bearer */}
                  <div className="absolute bottom-4 left-2 p-1.5 rounded bg-[#1f2530] border border-zinc-600 text-[10px] text-zinc-300 text-center">
                    <span className="hieroglyph-font text-base block">𓋴</span>
                    <span>خادم الصندل</span>
                  </div>
                </div>

                {/* Bottom register */}
                <div className="border-t border-[#444d5c] pt-2 flex items-center justify-around px-4 text-xs text-zinc-400">
                  <div className="flex items-center gap-1">
                    <span className="hieroglyph-font">𓀐</span>
                    <span className="text-[10px]">العدو المهزوم</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="hieroglyph-font">𓊖</span>
                    <span className="text-[10px]">الحصن المفتوح</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative z-10 w-full h-full flex flex-col justify-between py-2 text-center select-none">
                {/* Top register */}
                <div className="border-b border-[#444d5c] pb-2 flex items-center justify-between px-4">
                  <div className="text-zinc-400 text-lg">𓃾</div>
                  <div className="p-1 border border-[#ffd700]/60 rounded bg-black/40 text-xs font-mono text-[#ffd700]">
                    𓈖𓂝𓂋𓌸 [نعرمر]
                  </div>
                  <div className="text-zinc-400 text-lg">𓃾</div>
                </div>

                {/* Upper Middle: Red crown procession */}
                <div className="py-2 border-b border-[#444d5c] flex items-center justify-around px-2 bg-[#171b22]/50 rounded">
                  <div className="text-center">
                    <span className="text-xl hieroglyph-font text-rose-400">𓋔</span>
                    <span className="text-[10px] block font-bold text-zinc-200">التاج الأحمر</span>
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    موكب النصر والرايات الأربعة
                  </div>
                  <div className="text-center text-[10px] text-zinc-400">
                    <span className="hieroglyph-font text-sm">𓀐𓀐</span>
                    <span>10 أسرى</span>
                  </div>
                </div>

                {/* Central: Entwined serpopards */}
                <div className="flex-1 flex flex-col items-center justify-center my-3 relative">
                  <div className="w-24 h-24 rounded-full border-2 border-amber-500/50 bg-black/60 flex flex-col items-center justify-center shadow-inner">
                    <span className="text-2xl hieroglyph-font text-amber-400">𓄛</span>
                    <span className="text-[9px] text-[#ffd700] font-bold">تجويف الكحل</span>
                  </div>
                  <p className="text-[10px] text-zinc-300 mt-2 font-medium">
                    السيربوبارد متعانقا الرقاب (رمز اتحاد القطرين)
                  </p>
                </div>

                {/* Bottom: The Royal Bull */}
                <div className="border-t border-[#444d5c] pt-2 flex items-center justify-center gap-3 px-2 text-xs text-zinc-300 bg-[#171b22]/70 rounded p-1">
                  <span className="text-2xl hieroglyph-font text-amber-300">𓃒</span>
                  <div className="text-right">
                    <span className="text-[11px] font-bold block text-white">الثور الملكي</span>
                    <span className="text-[9px] text-zinc-400">يدمر أسوار الحصن المعادي</span>
                  </div>
                </div>
              </div>
            )}

            {/* Clickable Hotspots overlayed at exact percentages */}
            {activeHotspots.map((hotspot) => {
              const isSelected = selectedHotspot.id === hotspot.id;
              return (
                <button
                  key={hotspot.id}
                  onClick={() => handleSelectHotspot(hotspot)}
                  style={{ left: `${hotspot.xPct}%`, top: `${hotspot.yPct}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer`}
                  title={hotspot.titleAr}
                >
                  <span
                    className={`relative flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#ffd700] text-black ring-4 ring-[#ffd700]/40 scale-125'
                        : 'bg-[#0f1118] text-[#ffd700] border-2 border-[#ffd700] hover:scale-110 shadow-lg'
                    }`}
                  >
                    <span className="text-xs font-black">{hotspot.glyph || '✦'}</span>
                    {!isSelected && (
                      <span className="absolute -inset-1 rounded-full animate-ping bg-[#ffd700]/30 pointer-events-none" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-zinc-400 mt-4 text-center">
            انقر على الأيقونات الذهبية فوق الصلاية لتفصيل دلالاتها الأثرية والتاريخية.
          </p>
        </div>

        {/* Detailed Information & Analysis Panel */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-gradient-to-br from-[#151822] via-[#10121a] to-[#0c0d12] rounded-2xl border border-[#d4af37]/40 p-6 shadow-xl relative overflow-hidden text-right">
            {/* Top decorative header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <button
                onClick={() => handleSpeakText(`${selectedHotspot.titleAr}. ${selectedHotspot.description}. ${selectedHotspot.historicalDossier}`)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  isSpeaking
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
                    : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white hover:border-[#ffd700]'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isSpeaking ? 'إيقاف القراءة' : 'استمع للشرح الصوتي'}</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400 font-serif">{selectedHotspot.titleEn}</span>
                <span className="text-sm font-black hieroglyph-font text-[#ffd700] bg-[#d4af37]/15 px-2 py-0.5 rounded border border-[#d4af37]/30">
                  {selectedHotspot.glyph || '𓏤'}
                </span>
              </div>
            </div>

            {/* Hotspot Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center justify-end gap-2">
              <span>{selectedHotspot.titleAr}</span>
              <CheckCircle2 className="w-5 h-5 text-[#ffd700]" />
            </h3>

            {/* Symbolism Quote */}
            <div className="my-3 p-3 rounded-xl bg-[#d4af37]/10 border-r-4 border-[#d4af37] text-zinc-200 text-xs sm:text-sm font-medium leading-relaxed">
              <strong className="text-[#ffd700] block mb-1">المغزى الرمزي والسياسي:</strong>
              {selectedHotspot.symbolism}
            </div>

            {/* Description */}
            <div className="space-y-3 text-sm text-zinc-300 leading-relaxed pt-2">
              <p>{selectedHotspot.description}</p>
            </div>

            {/* Archaeological Insight */}
            <div className="mt-4 pt-4 border-t border-zinc-800/80 bg-zinc-900/40 -mx-6 -mb-6 p-6 rounded-b-2xl">
              <h4 className="text-xs font-bold text-[#ffd700] uppercase tracking-wider mb-1 flex items-center justify-end gap-1.5">
                <span>القيمة التاريخية والتوثيقية</span>
                <Info className="w-4 h-4" />
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {selectedHotspot.historicalDossier}
              </p>
            </div>
          </div>

          {/* Quick Facts Card on Narmer Palette */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center text-xs">
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-zinc-400 block text-[10px] mb-0.5">سنة الاكتشاف</span>
              <strong className="text-white text-sm">1898 م</strong>
              <span className="text-[10px] text-zinc-500 block">كويبل وغرين</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-zinc-400 block text-[10px] mb-0.5">مادة الصنع</span>
              <strong className="text-[#ffd700] text-sm">حجر الشست الرمادي</strong>
              <span className="text-[10px] text-zinc-500 block">صخور وادي الحمامات</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 col-span-2 sm:col-span-1">
              <span className="text-zinc-400 block text-[10px] mb-0.5">المقر الدائم</span>
              <strong className="text-white text-sm">المتحف المصري</strong>
              <span className="text-[10px] text-zinc-500 block">ميدان التحرير، القاهرة</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
