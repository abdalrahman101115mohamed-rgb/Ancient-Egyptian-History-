import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, RefreshCw, Volume2, Copy, Check, MessageSquare, Feather } from 'lucide-react';
import { audioService } from '../utils/audioSynth';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const ScribeChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `أهلاً بك يا باحث المجد في قاعة البرديات الملكية.\nأنا "حور-نب"، كاتب ومؤرخ البلاط الملكي في عهد توحيد القطرين. تحت تصرفك كل علوم العصر العتيق، أسرار صلاية نعرمر، ملوك الأسرتين الأولى والثانية، طقوس معبد حورس بنخن، ومعاني الهيروغليفية القديمة.\n\nما الذي ترغب في استكشافه اليوم عن فجر التاريخ المصري؟`,
      timestamp: 'الآن',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const quickQuestions = [
    'هل الملك مينا هو نفسه نعرمر أم حور عحا؟',
    'ما سر الرموز المنحوتة على صلاية نعرمر؟',
    'ما الفرق الجوهري بين السَّرَخ والخرطوشة الملكية؟',
    'من هي الملكة مريت نيت ولماذا تعد سابقة تاريخية؟',
    'لماذا اتخذ الملك بر إيب سن الإله ست على سرخه؟',
    'كيف ساهم نعرمر في تأسيس مدينة منف وما معنى الجدار الأبيض؟',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    audioService.playChime();

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
        }),
      });

      const data = await res.json();
      const reply = data.reply || data.fallback || 'أهلاً بك يا باحث التاريخ. العصر العتيق هو حجر الزاوية لكل مجد حضاري مصري لاحق.';

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.warn('Scribe chat request failed:', err);
      const fallbackMsg: ChatMessage = {
        id: `a-err-${Date.now()}`,
        role: 'assistant',
        content: `يا باحث التاريخ، إن العصر العتيق (3100-2686 ق.م) شهد ولادة أركان الدولة المصرية: توحيد القطرين، بناء العاصمة منف، صلاية نعرمر، واستخدام السَّرَخ الملكي كأول شارة رسمية. يسعدني دائماً إجابتك عن أسرار ملوك الأسرتين الأولى والثانية.`,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (id: string, text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_~]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="text-right space-y-2 border-b border-[#d4af37]/25 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#ffd700] bg-[#d4af37]/10 border border-[#d4af37]/30 px-3 py-1 rounded-full">
          <Feather className="w-3.5 h-3.5" />
          <span>المستشار التاريخي الذكي · كاتب البلاط الفرعوني</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          حوار مع <span className="gold-gradient-text">الكاتب الملكي حور-نب</span>
        </h2>
        <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
          اطرح أي سؤال تاريخي أو أثري حول عصر توحيد القطرين، صلايات الشست، ملوك الأسرتين الأولى والثانية، وعقائد فجر التاريخ المصري.
        </p>
      </div>

      {/* Suggested Quick Questions */}
      <div className="space-y-1.5 text-right">
        <span className="text-[11px] text-zinc-400 font-bold block">
          أسئلة تاريخية مقترحة للنقاش:
        </span>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="text-xs px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-zinc-700/80 hover:border-[#ffd700] hover:text-[#ffd700] text-zinc-300 transition-all cursor-pointer text-right"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="bg-gradient-to-b from-[#141620] to-[#0c0d12] rounded-2xl border border-[#d4af37]/30 p-4 sm:p-6 shadow-2xl min-h-[440px] max-h-[560px] overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div className="flex items-center gap-2 text-[10px] text-zinc-500 px-1">
                <span>{msg.timestamp}</span>
                <span className="font-bold text-zinc-400">
                  {isUser ? 'السائل' : 'الكاتب الملكي حور-نب 𓏞'}
                </span>
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed text-right relative group ${
                  isUser
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-[#0a0c10] font-medium shadow-md rounded-tr-none'
                    : 'bg-[#181b24] border border-[#d4af37]/25 text-zinc-200 rounded-tl-none shadow-lg'
                }`}
              >
                <div className="whitespace-pre-line">{msg.content}</div>

                {/* Assistant message action controls */}
                {!isUser && (
                  <div className="mt-3 pt-2 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSpeak(msg.id, msg.content)}
                        className={`p-1 rounded hover:bg-zinc-700 transition-colors ${
                          speakingId === msg.id ? 'text-[#ffd700] animate-pulse' : ''
                        }`}
                        title="استماع صوتي"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleCopyMessage(msg.id, msg.content)}
                        className="p-1 rounded hover:bg-zinc-700 transition-colors"
                        title="نسخ الرد"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <span className="text-[10px] text-zinc-500 font-serif">
                      بردية البلاط الملكي
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-[#ffd700] p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 w-fit">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>الكاتب الملكي يراجع البرديات والسجلات العتيقة...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2"
      >
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#c49a2c] to-[#996515] text-[#0a0c10] font-bold text-xs hover:brightness-110 shadow-md cursor-pointer disabled:opacity-40 transition-all shrink-0 flex items-center gap-1.5"
        >
          <span>إرسال</span>
          <Send className="w-4 h-4 rotate-180" />
        </button>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="اطرح سؤالك على المؤرخ الفرعوني (مثال: ما هو عيد الحب سد عند الملك دن؟)..."
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ffd700] text-right font-medium placeholder-zinc-500"
        />
      </form>
    </div>
  );
};
