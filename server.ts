import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini AI Client on the server side
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function generateFallbackTadabbur(
  surahName?: string,
  ayahNumber?: number,
  ayahText?: string,
  classicalTafsir?: string
) {
  return {
    tadabbur: `تأمل في قوله تعالى: "${ayahText || ''}". تفيض هذه الآية العظيمة من سورة ${surahName || ''} بأنوار التوحيد والهداية، وتبين للمؤمن سبيل الاستقامة والاعتصام برحمة الله وفضله في كل حال، وتستحث الفؤاد على تدبر عظمة الخالق سبحانه وحكمته البالغة.${classicalTafsir ? ` ومما يزيدها جلاءً ما قرره المفسرون: ${classicalTafsir}` : ''}`,
    keyTakeaway: 'الاعتصام بكتاب الله واستشعار معيته ولطفه في السر والعلن.',
    practicalSteps: [
      'ترديد الآية الكريمة بتدبر وخشوع في الصلوات وأوراد اليوم والليلة.',
      'تطبيق ما دلت عليه من مقتضيات الإيمان والأخلاق الفاضلة في التعامل مع الخلق.',
      'مذاكرة معاني الآية وهداياتها مع الأهل وتثبيتها بالعمل الصالح والتسبيح.'
    ],
    linguisticGems: 'فصاحة النظم القرآني وإيجازه المعجز الذي يجمع المعاني الغزيرة بأوجز وأبدع عبارة.'
  };
}

function generateFallbackSemanticSearch(query: string) {
  return {
    summary: `البحث الموضوعي عن: "${query}". القرآن الكريم حافل بالتوجيهات والآيات البينات حول هذا المحور العظيم، داعياً المؤمنين إلى العمل بمقتضى التنزيل والاستبصار بأنوار الوحي.`,
    relatedThemes: ['التقوى والصبر', 'التوكل على الله وحسن الظن به', 'الاستغفار والعمل الصالح'],
    recommendedSurahs: ['الفاتحة', 'البقرة', 'آل عمران', 'الكهف', 'الملك']
  };
}

/**
 * Endpoint for Quranic Tadabbur (Reflections & spiritual/practical guidance)
 */
app.post('/api/gemini/tadabbur', async (req, res) => {
  const { surahName, ayahNumber, ayahText, classicalTafsir } = req.body;

  if (!ayahText) {
    return res.status(400).json({ error: 'Ayah text is required' });
  }

  if (!aiClient) {
    return res.json(generateFallbackTadabbur(surahName, ayahNumber, ayahText, classicalTafsir));
  }

  try {
    const prompt = `أنت عالم ومفسر قرآني جليل يجمع بين الأصالة العلمية والتجديد التربوي.
المطلوب تقديم "تدبر قرآني" رفيع وموجز للآية الكريمة التالية:
- السورة: سورة ${surahName} (الآية: ${ayahNumber})
- نص الآية: "${ayahText}"
- التفسير الميسر المعتمد: "${classicalTafsir || ''}"

قدم تحليلك باللغة العربية الفصيحة بصيغة JSON حصراً بالشكل التالي:
{
  "tadabbur": "فقرة تدبرية بليغة تستخرج درر الآية وحكمتها وجمال ألفاظها في 3 إلى 5 أسطر",
  "keyTakeaway": "خلاصة إيمانية مركزة في جملة واحدة",
  "practicalSteps": [
    "تطبيق عملي وسلوكي أول في واقع الحياة اليومية",
    "تطبيق عملي وسلوكي ثان",
    "تطبيق عملي وسلوكي ثالث"
  ],
  "linguisticGems": "لطيفة بلاغية أو لغوية من نظم الآية"
}`;

    const apiCall = aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const timeoutPromise = new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), 3500);
    });

    const result = await Promise.race([apiCall, timeoutPromise]);

    if (result && 'text' in result && result.text) {
      const parsed = JSON.parse(result.text);
      return res.json(parsed);
    }

    return res.json(generateFallbackTadabbur(surahName, ayahNumber, ayahText, classicalTafsir));
  } catch (error) {
    console.warn('Gemini Tadabbur temporary API error, returning rich contextual fallback:', error);
    return res.json(generateFallbackTadabbur(surahName, ayahNumber, ayahText, classicalTafsir));
  }
});

/**
 * Endpoint for Semantic Quranic Search & Thematic guidance
 */
app.post('/api/gemini/semantic-search', async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  if (!aiClient) {
    return res.json(generateFallbackSemanticSearch(query));
  }

  try {
    const prompt = `المستخدم يبحث في القرآن الكريم عن موضوع: "${query}".
استخرج خلاصة هداية القرآن في هذا الموضوع وأبرز السور والآيات التي عالجته.
أجب بصيغة JSON حصراً:
{
  "summary": "ملخص توجيهات القرآن الكريم في هذا الموضوع في حدود فقرة مركزة",
  "relatedThemes": ["محور 1", "محور 2", "محور 3"],
  "recommendedSurahs": ["سورة 1", "سورة 2", "سورة 3"]
}`;

    const apiCall = aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const timeoutPromise = new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), 3500);
    });

    const result = await Promise.race([apiCall, timeoutPromise]);

    if (result && 'text' in result && result.text) {
      const parsed = JSON.parse(result.text);
      return res.json(parsed);
    }

    return res.json(generateFallbackSemanticSearch(query));
  } catch (error) {
    console.warn('Gemini semantic search temporary API error, returning fallback:', error);
    return res.json(generateFallbackSemanticSearch(query));
  }
});

// Configure Vite integration for dev and production
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Quran app server running at http://localhost:${PORT} in ${isDev ? 'development' : 'production'} mode`);
  });
}

startServer();
