/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ArchaicEraView } from './components/ArchaicEraView';
import { NarmerPaletteViewer } from './components/NarmerPaletteViewer';
import { HieroglyphTranslator } from './components/HieroglyphTranslator';
import { MapOfArchaicEgypt } from './components/MapOfArchaicEgypt';
import { GrandTimeline } from './components/GrandTimeline';
import { ArtifactGallery } from './components/ArtifactGallery';
import { ScribeChat } from './components/ScribeChat';
import { ScribeQuiz } from './components/ScribeQuiz';
import { audioService } from './utils/audioSynth';
import { Sparkles, Compass, Feather, Award, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('archaic');
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);

  const handleToggleAudio = () => {
    const isMuted = audioService.toggleMute();
    setIsAudioActive(!isMuted);
  };

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c10] text-[#e0d6c3] selection:bg-[#d4af37]/30 selection:text-[#ffd700]">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        isAudioActive={isAudioActive}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {/* Hero banner shown on main archaic tab or accessible across the experience */}
        {activeTab === 'archaic' && (
          <HeroSection onSelectTab={handleSelectTab} />
        )}

        <div className="pb-16">
          {activeTab === 'archaic' && <ArchaicEraView />}
          {activeTab === 'narmer' && <NarmerPaletteViewer />}
          {activeTab === 'hieroglyphs' && <HieroglyphTranslator />}
          {activeTab === 'map' && <MapOfArchaicEgypt />}
          {activeTab === 'timeline' && <GrandTimeline />}
          {activeTab === 'artifacts' && <ArtifactGallery />}
          {activeTab === 'scribe' && <ScribeChat />}
          {activeTab === 'quiz' && <ScribeQuiz />}
        </div>
      </main>

      {/* Museum-Grade Ancient Footer */}
      <footer className="bg-[#08090d] border-t border-[#d4af37]/20 text-zinc-400 py-10 px-4 sm:px-6 text-right">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Brand & Proverb */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2 justify-end">
                <span className="font-black text-lg text-white">
                  بوابة مصر العتيقة · Ancient Egypt Explorer
                </span>
                <span className="w-8 h-8 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center hieroglyph-font text-[#ffd700] text-sm">
                  𓅃
                </span>
              </div>
              <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
                تطبيق وموسوعة تفاعلية لتوثيق تاريخ العصر العتيق (الأسرتين الأولى والثانية 3100-2686 ق.م)، توحيد القطرين على يد الملك نعرمر، نشأة الهيروغليفية، وتأسيس أول دولة مركزية في العالم.
              </p>
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 font-serif">
                «إن ما يُكتب بالقلم والمداد يدوم أكثر من صروح الحجارة، لأن الحجارة تنهار والكلمة تبقى حية في القلوب»
                <span className="block text-[10px] text-[#ffd700] mt-1 font-sans">— من حكم حكماء مصر القديمة</span>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-white text-sm mb-2 text-[#ffd700]">أقسام البوابة:</h4>
              <ul className="space-y-1.5">
                <li>
                  <button onClick={() => handleSelectTab('archaic')} className="hover:text-white transition-colors cursor-pointer">
                    ملوك الأسرتين الأولى والثانية
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectTab('narmer')} className="hover:text-white transition-colors cursor-pointer">
                    فحص صلاية نعرمر التفاعلية
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectTab('hieroglyphs')} className="hover:text-white transition-colors cursor-pointer">
                    مترجم الهيروغليفية والسَّرَخ
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectTab('map')} className="hover:text-white transition-colors cursor-pointer">
                    خريطة العواصم والجبانات العتيقة
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Research & Intelligence */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-white text-sm mb-2 text-[#ffd700]">الذكاء والاختبارات:</h4>
              <ul className="space-y-1.5">
                <li>
                  <button onClick={() => handleSelectTab('scribe')} className="hover:text-white transition-colors cursor-pointer">
                    حوار مع الكاتب الملكي (Gemini AI)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectTab('quiz')} className="hover:text-white transition-colors cursor-pointer">
                    تحدي الكاتب والشهادة الملكية
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectTab('artifacts')} className="hover:text-white transition-colors cursor-pointer">
                    خزانة الآثار والكنوز
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectTab('timeline')} className="hover:text-white transition-colors cursor-pointer">
                    الخط الزمني (3000 عام)
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-3">
            <span className="font-serif">
              عصر التوحيد · 3100 ق.م · حضارة وادي النيل الخالدة
            </span>
            <div className="flex items-center gap-1">
              <span>صُمم بعناية لخدمة تراث مصر القديمة</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
