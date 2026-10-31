import React, { useState } from 'react';
import { ARCHAIC_QUIZ, QuizQuestion, transliterateArabicToHieroglyphs } from '../data/archaicData';
import { Award, CheckCircle2, XCircle, RotateCcw, Sparkles, Crown, Share2, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioService } from '../utils/audioSynth';

export const ScribeQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [userName, setUserName] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);

  const currentQ: QuizQuestion = ARCHAIC_QUIZ[currentIdx];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    audioService.playChime();
    setSelectedOption(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    if (selectedOption === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
      audioService.playChime();
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < ARCHAIC_QUIZ.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
      audioService.playCeremony();
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffd700', '#d4af37', '#ffffff', '#1b4d7e'],
        });
      } catch (e) {
        console.warn('Confetti error:', e);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsFinished(false);
    setShowCertificate(false);
  };

  const getRank = () => {
    const ratio = score / ARCHAIC_QUIZ.length;
    if (ratio >= 0.85) return { title: 'حكيم البلاط الملكي ومؤرخ المملكة الأعظم', hieroglyph: '𓏞', level: 'درجة شرف ملكية أولى' };
    if (ratio >= 0.65) return { title: 'كاهن معبد حورس بنخن والعرابة المدفونة', hieroglyph: '𓊹', level: 'درجة امتياز كبرى' };
    if (ratio >= 0.45) return { title: 'كاتب ملكي معتمد في ديوان الجدار الأبيض (منف)', hieroglyph: '𓊁', level: 'درجة جيد جداً' };
    return { title: 'باحث مبتدئ في مكتبة المعبد العتيق', hieroglyph: '𓏤', level: 'مرحلة التعلم والاطلاع' };
  };

  const rank = getRank();
  const nameHieroglyphs = userName.trim()
    ? transliterateArabicToHieroglyphs(userName).glyphs
    : '𓈖𓂝𓂋𓌸';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-right space-y-2 border-b border-[#d4af37]/25 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#ffd700] bg-[#d4af37]/10 border border-[#d4af37]/30 px-3 py-1 rounded-full">
          <Award className="w-3.5 h-3.5" />
          <span>اختبار الكاتب المصري · أسئلة موثقة في تاريخ العصر العتيق</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          تحدي <span className="gold-gradient-text">الكاتب والمؤرخ الملكي</span>
        </h2>
        <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
          اختبر معلوماتك حول توحيد القطرين، رموز صلاية نعرمر، ملوك الأسرتين الأولى والثانية، واحصل على شهادة شرف ملكية معتمدة باسمك بالهيروغليفية!
        </p>
      </div>

      {!isFinished ? (
        /* Active Question Card */
        <div className="bg-gradient-to-br from-[#151824] via-[#10121a] to-[#0c0d12] rounded-2xl border border-[#d4af37]/40 p-6 sm:p-8 shadow-2xl text-right space-y-6">
          {/* Progress Bar & Counter */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3 text-xs text-zinc-400">
            <span className="text-[#ffd700] font-bold">
              النتيجة الحالية: {score} نقاط
            </span>
            <div className="flex items-center gap-2">
              <span className="font-serif">السؤال {currentIdx + 1} من {ARCHAIC_QUIZ.length}</span>
              <span className="text-zinc-500 font-normal">({currentQ.dynastyContext})</span>
            </div>
          </div>

          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#d4af37] to-[#ffd700] h-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / ARCHAIC_QUIZ.length) * 100}%` }}
            />
          </div>

          {/* Question Title */}
          <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let btnStyle = 'bg-zinc-900/70 border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-850';

              if (isAnswerSubmitted) {
                if (idx === currentQ.correctAnswer) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                }
              } else if (isSelected) {
                btnStyle = 'bg-[#d4af37]/20 border-[#ffd700] text-white font-semibold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full p-4 rounded-xl border text-right transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span className="text-xs sm:text-sm leading-relaxed">{opt}</span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 border ${
                      isSelected || (isAnswerSubmitted && idx === currentQ.correctAnswer)
                        ? 'border-current font-bold'
                        : 'border-zinc-700 text-zinc-500'
                    }`}
                  >
                    {idx + 1}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation if answered */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-xl bg-[#d4af37]/10 border-r-4 border-[#d4af37] text-xs text-zinc-200 leading-relaxed animate-in fade-in duration-200">
              <strong className="text-[#ffd700] block mb-1">الشرح والتوثيق التاريخي:</strong>
              {currentQ.explanation}
            </div>
          )}

          {/* Bottom Action Button */}
          <div className="pt-2 flex justify-end">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleConfirmAnswer}
                disabled={selectedOption === null}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-[#0a0c10] font-bold text-xs hover:brightness-110 shadow-md cursor-pointer disabled:opacity-40 transition-all"
              >
                تأكيد الإجابة
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#d4af37] text-[#0a0c10] font-bold text-xs hover:brightness-110 shadow-md cursor-pointer transition-all flex items-center gap-1.5"
              >
                <span>{currentIdx + 1 < ARCHAIC_QUIZ.length ? 'السؤال التالي' : 'عرض النتيجة النهائية والشهادة'}</span>
                <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Finished View & Papyrus Certificate Generator */
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
          {/* Result Summary Card */}
          <div className="bg-gradient-to-br from-[#161a26] to-[#0c0d12] rounded-2xl border border-[#d4af37]/40 p-6 sm:p-8 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#d4af37]/20 border-2 border-[#ffd700] flex items-center justify-center text-3xl hieroglyph-font text-[#ffd700] shadow-lg">
              {rank.hieroglyph}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white">
              أحسنت يا باحث الحضارة المصرية!
            </h3>

            <div className="inline-block px-4 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#ffd700] text-sm font-bold">
              لقبك المستحق: {rank.title}
            </div>

            <p className="text-zinc-300 text-sm">
              أجبت بشكل صحيح على <strong>{score}</strong> من أصل <strong>{ARCHAIC_QUIZ.length}</strong> أسئلة ({rank.level}).
            </p>

            {/* User name input for certificate */}
            <div className="max-w-md mx-auto pt-4 space-y-3">
              <label className="block text-xs font-bold text-zinc-300 text-right">
                اكتب اسمك ليُنقش بالهيروغليفية على شهادة البردية الملكية:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="اسمك الكريم (مثال: أحمد، سارة)..."
                  className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#ffd700] text-right font-medium"
                />
                <button
                  onClick={() => setShowCertificate(true)}
                  className="px-4 py-2 rounded-xl bg-[#d4af37] text-black font-bold text-xs hover:brightness-110 cursor-pointer shadow"
                >
                  إصدار الشهادة
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة الاختبار من البداية</span>
              </button>
            </div>
          </div>

          {/* Royal Papyrus Diploma Certificate */}
          {showCertificate && (
            <div className="relative rounded-3xl bg-[#f5ecd7] text-[#2c1d11] p-8 sm:p-12 border-8 border-[#996515] shadow-2xl font-serif text-center space-y-6 overflow-hidden">
              {/* Papyrus texture overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#c29b68_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />
              <div className="absolute top-2 left-2 right-2 bottom-2 border border-[#996515]/30 rounded-2xl pointer-events-none" />

              {/* Certificate Top Seal */}
              <div className="flex items-center justify-between border-b-2 border-[#996515]/40 pb-4">
                <span className="text-xs font-bold tracking-widest text-[#603a11]">
                  مملكة القطرين الموحدة
                </span>
                <span className="text-3xl hieroglyph-font text-[#996515]">𓅃 𓋹 𓊹</span>
                <span className="text-xs font-bold tracking-widest text-[#603a11]">
                  ديوان كاتب البلاط
                </span>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <h4 className="text-2xl sm:text-3xl font-black text-[#522f0c]">
                  شهادة شرف ملكية في علوم فجر التاريخ المصري
                </h4>
                <p className="text-xs text-[#704618] uppercase tracking-wider">
                  Royal Scribe Certificate of Ancient Egyptian Antiquity
                </p>
              </div>

              {/* Recipient Name in Serekh */}
              <div className="py-2">
                <p className="text-xs text-[#704618] mb-2 font-bold">يشهد ديوان العصر العتيق بأن الباحث الجليل:</p>
                <div className="inline-block border-2 border-[#996515] rounded-xl px-8 py-3 bg-[#ede0c2] shadow-inner">
                  <h5 className="text-xl sm:text-2xl font-black text-[#3f2208]">
                    {userName.trim() || 'باحث الحضارة المصرية'}
                  </h5>
                  <span className="text-2xl hieroglyph-font text-[#996515] block mt-1">
                    {nameHieroglyphs}
                  </span>
                </div>
              </div>

              {/* Description & Rank */}
              <p className="text-xs sm:text-sm text-[#4f2f12] max-w-xl mx-auto leading-relaxed">
                قد أتم بنجاح اختبار معارف <strong>«العصر العتيق وتوحيد القطرين»</strong> وأظهر إدراكاً رفيعاً لرموز صلاية نعرمر، وشارات السَّرَخ الملكية، ومآثر ملوك الأسرتين الأولى والثانية، واستحق بذلك رتبة:
              </p>

              <div className="text-base sm:text-lg font-black text-[#854d0e] bg-[#e3d1ac] py-2 px-6 rounded-lg inline-block border border-[#996515]/50 shadow-sm">
                ✦ {rank.title} ✦
              </div>

              {/* Bottom Signatures and Stamp */}
              <div className="pt-6 border-t-2 border-[#996515]/40 flex items-center justify-between text-xs text-[#603a11]">
                <div className="text-right">
                  <span className="block font-bold">تاريخ التوثيق:</span>
                  <span className="font-mono text-[11px]">3100 ق.م · منف</span>
                </div>

                <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#996515] flex flex-col items-center justify-center text-[10px] text-[#996515] font-black uppercase tracking-tighter">
                  <span className="hieroglyph-font text-base">𓊁</span>
                  <span>ختم العرش</span>
                </div>

                <div className="text-left">
                  <span className="block font-bold">توقيع كاتب الملك:</span>
                  <span className="hieroglyph-font text-base text-[#996515]">𓏞 حور-نب</span>
                </div>
              </div>

              {/* Print Button */}
              <div className="pt-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#996515] text-[#fff7e6] text-xs font-bold hover:bg-[#7a5010] cursor-pointer shadow-md transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>طباعة الشهادة الملكية</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
