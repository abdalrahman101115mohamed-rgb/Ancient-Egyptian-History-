import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

// Royal Historian / Scribe AI Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      return res.json({
        reply: `أهلاً بك يا باحث التاريخ. بصفتي كاتب البلاط الملكي في عهد توحيد القطرين، يسعدني إخبارك أن العصر العتيق (الأسرتان الأولى والثانية 3100-2686 ق.م) هو حجر الأساس للحضارة المصرية القديمة، حيث وحّد الملك نعرمر/مينا التاجين وأسس مدينة منف (الجدار الأبيض) وبدأ تدوين الهيروغليفية على الصلايات والألواح العاجية.\n\n(ملاحظة: يمكنك إضافة مفتاح GEMINI_API_KEY في لوحة الإعدادات للتحدث الحر مع الكاتب الملكي الذكي).`,
        context: 'offline_fallback',
      });
    }

    const systemInstruction = `
أنت "الكاتب الملكي حور-نب" (مؤرخ وباحث متخصص في علم المصريات، وتحديداً "العصر العتيق" - The Early Dynastic Period of Egypt: الأسرتان الأولى والثانية، وعصور ما قبل الأسرات ونقادة، وامتدادها إلى الدولة القديمة وباقي الحضارة الفرعونية).
أسلوبك:
1. فصيح، وقور، جذاب، ومفعم بالحكمة والروح المصرية الأصيلة.
2. تستخدم مصطلحات تاريخية وأثرية دقيقة (مثل: التاج الأبيض "حدجت"، التاج الأحمر "دشرت"، التاج المزدوج "بشنت"، السَّرَخ، الخرطوش، صلاية نعرمر، صان الحجر، أبيدوس، نقادة، هييراكونبوليس، الجدار الأبيض "إنب-حج").
3. إذا سألك المستخدم باللغة العربية، أجب بلغة عربية مشوقة وموثقة تاريخياً مع تقسيم الفقرات واستخدام نقاط واضحة.
4. اربط دائماً بين آثار العصر العتيق وأهميتها في ولادة أول دولة مركزية منظمة في التاريخ البشري.
5. يمكنك ذكر الرموز الهيروغليفية المناسبة عند شرح الأسماء والألقاب.
`;

    // Construct conversation prompt
    let conversationContext = '';
    if (Array.isArray(history) && history.length > 0) {
      conversationContext = history
        .slice(-6)
        .map((h: { role: string; content: string }) => `${h.role === 'user' ? 'السائل' : 'الكاتب الملكي'}: ${h.content}`)
        .join('\n');
    }

    const prompt = conversationContext
      ? `${conversationContext}\nالسائل: ${message}\nالكاتب الملكي:`
      : message;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'عذراً، لم أستطع العثور على البردية المناسبة في مكتبة المعبد.';
    return res.json({ reply });
  } catch (err: unknown) {
    console.error('Gemini chat error:', err);
    return res.status(500).json({
      error: 'حدث خطأ أثناء التواصل مع الكاتب الملكي',
      fallback: 'العصر العتيق شهد إرساء أولى القوانين والطقوس الملكية كعيد السد (حب سد) وتقاليد دفن الملوك في مصاطب أبيدوس وسقارة.',
    });
  }
});

// Name Hieroglyphics & Serekh Analysis Endpoint
app.post('/api/analyze-name', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    if (!ai) {
      return res.json({
        analysis: `الاسم "${name}" يتم تمثيله بالرموز الصوتية الأحادية والثنائية، ويُحاط بالسَّرَخ الملكي الذي يعلوه حورس الصقر حامي الملكية في العصر العتيق.`,
      });
    }

    const prompt = `
حلل هذا الاسم "${name}" باللغة العربية بأسلوب عالم مصريات وكاتب هيروغليفي:
1. النطق الصوتي المقابل بالهيروغليفية القديمة (Transliteration).
2. الرموز الهيروغليفية المقترحة (مثل: 𓄿𓃀𓅱𓂧... إلخ إن أمكن أو بالوصف الدقيق).
3. المعنى الدلالي والروحي لو وُضع داخل "سَرخ" ملكي (Serekh) أو خرطوشة فرعونية، ونوع التاج أو الحماية الإلهية المناسبة (حورس، نيت، بتاح).
قدم إجابة ممتعة، مركزة وأنيقة في 3-4 فقرات قصيرة.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'أنت خبير في فك رموز اللغة المصرية القديمة والهيروغليفية وألقاب الملوك في العصر العتيق والدولة القديمة.',
      },
    });

    return res.json({ analysis: response.text });
  } catch (err) {
    console.error('Name analysis error:', err);
    return res.status(500).json({ error: 'خطأ في تحليل الاسم' });
  }
});

// Setup Vite in Dev or Static files in Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Ancient Egyptian Antiquity Server running on http://0.0.0.0:${PORT}`);
});
