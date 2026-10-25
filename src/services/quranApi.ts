import { Ayah, Reciter } from '../types/quran';
import { EMBEDDED_SURAHS } from '../data/sampleVerses';
import { getSurahMeta, getSurahByPage } from '../data/surahList';
import { removeTashkeel } from '../utils/quranSearch';

export const RECITERS: Reciter[] = [
  {
    id: 'alafasy',
    name: 'مشاري راشد العفاسي',
    style: 'مرتل ومتقن',
    cdnPrefix: 'https://everyayah.com/data/Alafasy_128kbps/'
  },
  {
    id: 'husary',
    name: 'محمود خليل الحصري',
    style: 'شيخ عموم المقارئ المصرية (معلم)',
    cdnPrefix: 'https://everyayah.com/data/Husary_128kbps/'
  },
  {
    id: 'abdulbasit',
    name: 'عبد الباسط عبد الصمد',
    style: 'مرتل بالرواية المعتمدة',
    cdnPrefix: 'https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/'
  },
  {
    id: 'ghamadi',
    name: 'سعد الغامدي',
    style: 'تلاوة ندية خاشعة',
    cdnPrefix: 'https://everyayah.com/data/Ghamadi_40kbps/'
  }
];

export function getAyahAudioUrl(reciterId: string, surahNumber: number, ayahNumber: number): string {
  const reciter = RECITERS.find(r => r.id === reciterId) || RECITERS[0];
  const sStr = String(surahNumber).padStart(3, '0');
  const aStr = String(ayahNumber).padStart(3, '0');
  return `${reciter.cdnPrefix}${sStr}${aStr}.mp3`;
}

// In-memory cache for loaded surahs and pages with composite keys
const surahCache = new Map<string, Ayah[]>();
const pageCache = new Map<number, Ayah[]>();
const tafsirTextCache = new Map<string, Record<number, string>>();

// Seed cache with embedded surahs
Object.entries(EMBEDDED_SURAHS).forEach(([sNum, ayahs]) => {
  surahCache.set(`${sNum}-ar.muyassar-`, ayahs);
});

/**
 * Fetch surah verses with Tanzil Uthmanic text, designated tafsir, and optional language translation
 */
export async function fetchSurahVerses(
  surahNumber: number,
  tafsirEdition: string = 'ar.muyassar',
  translationEdition?: string
): Promise<Ayah[]> {
  const cacheKey = `${surahNumber}-${tafsirEdition}-${translationEdition || ''}`;
  if (surahCache.has(cacheKey)) {
    return surahCache.get(cacheKey)!;
  }

  const meta = getSurahMeta(surahNumber);
  if (!meta) return [];

  // Compose editions query
  const editions = ['quran-uthmani', tafsirEdition];
  if (translationEdition && translationEdition !== tafsirEdition && translationEdition !== 'ar.muyassar') {
    editions.push(translationEdition);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/${editions.join(',')}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const uthmaniEdition = data.data?.[0]?.ayahs || [];
      const tafsirList = data.data?.[1]?.ayahs || [];
      const transList = editions.length > 2 ? (data.data?.[2]?.ayahs || []) : [];

      const ayahs: Ayah[] = uthmaniEdition.map((item: any, idx: number) => {
        const text = item.text;
        const tafsir = tafsirList[idx]?.text || '';
        const translation = transList[idx]?.text || '';
        return {
          numberInSurah: item.numberInSurah,
          number: item.number,
          text: text,
          simpleText: removeTashkeel(text),
          page: item.page || meta.page,
          juz: item.juz || meta.juz,
          hizb: item.hizbQuarter,
          sajda: Boolean(item.sajda),
          tafsir: tafsir,
          translation: translation || undefined,
          tafsirs: {
            [tafsirEdition]: tafsir
          }
        };
      });

      if (ayahs.length > 0) {
        surahCache.set(cacheKey, ayahs);
        return ayahs;
      }
    }
  } catch (err) {
    console.warn('Network fetch error for Surah, falling back to local fallback data:', err);
  }

  // Fallback: check if we have base embedded surah
  const baseEmbedded = EMBEDDED_SURAHS[surahNumber];
  if (baseEmbedded) {
    surahCache.set(cacheKey, baseEmbedded);
    return baseEmbedded;
  }

  // General Fallback
  const fallbackAyahs: Ayah[] = Array.from({ length: meta.numberOfAyahs }, (_, i) => {
    const num = i + 1;
    return {
      numberInSurah: num,
      number: meta.page * 10 + num,
      text: num === 1 && surahNumber !== 1 && surahNumber !== 9 
        ? "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" 
        : `آية ${num} من سورة ${meta.name} المباركة بالرسم العثماني المعتمد`,
      simpleText: `اية ${num} من سورة ${meta.name}`,
      page: meta.page,
      juz: meta.juz,
      tafsir: `تفسير الآية الكريمة ${num} من سورة ${meta.name} (${tafsirEdition})`
    };
  });

  surahCache.set(cacheKey, fallbackAyahs);
  return fallbackAyahs;
}

/**
 * Fetch a specific Tafsir edition for all verses of a Surah
 */
export async function fetchSpecificTafsir(surahNumber: number, tafsirEdition: string): Promise<Record<number, string>> {
  const cacheKey = `${surahNumber}-${tafsirEdition}`;
  if (tafsirTextCache.has(cacheKey)) {
    return tafsirTextCache.get(cacheKey)!;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/${tafsirEdition}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const list = data.data?.ayahs || [];
      const map: Record<number, string> = {};
      list.forEach((item: any) => {
        map[item.numberInSurah] = item.text;
      });
      tafsirTextCache.set(cacheKey, map);
      return map;
    }
  } catch (e) {
    console.warn(`Could not fetch tafsir ${tafsirEdition} for surah ${surahNumber}:`, e);
  }

  return {};
}

/**
 * Fetch verses for a specific page in the 604-page Madinah Mushaf
 */
export async function fetchPageVerses(pageNumber: number): Promise<{ surahMeta: any; ayahs: Ayah[] }> {
  const surahMeta = getSurahByPage(pageNumber);

  if (pageCache.has(pageNumber)) {
    return { surahMeta, ayahs: pageCache.get(pageNumber)! };
  }

  // Check if we have embedded page 1 or 604
  if (pageNumber === 1 && EMBEDDED_SURAHS[1]) {
    pageCache.set(1, EMBEDDED_SURAHS[1]);
    return { surahMeta, ayahs: EMBEDDED_SURAHS[1] };
  }
  if (pageNumber === 604) {
    const p604Ayahs = [
      ...(EMBEDDED_SURAHS[112] || []),
      ...(EMBEDDED_SURAHS[113] || []),
      ...(EMBEDDED_SURAHS[114] || []),
    ];
    pageCache.set(604, p604Ayahs);
    return { surahMeta, ayahs: p604Ayahs };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);
    const res = await fetch(`https://api.alquran.cloud/v1/page/${pageNumber}/quran-uthmani`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const uthmaniEdition = Array.isArray(data.data?.ayahs) ? data.data.ayahs : [];

      const ayahs: Ayah[] = uthmaniEdition.map((item: any) => {
        return {
          numberInSurah: item.numberInSurah,
          number: item.number,
          text: item.text,
          simpleText: removeTashkeel(item.text),
          page: pageNumber,
          juz: item.juz || (surahMeta ? surahMeta.juz : 1),
          hizb: item.hizbQuarter,
          sajda: Boolean(item.sajda),
          tafsir: ''
        };
      });

      if (ayahs.length > 0) {
        pageCache.set(pageNumber, ayahs);
        return { surahMeta, ayahs };
      }
    }
  } catch (err) {
    console.warn(`Fetch error for page ${pageNumber}, using graceful fallback:`, err);
  }

  // Fallback
  const fallback = await fetchSurahVerses(surahMeta?.number || 1);
  const pageFiltered = fallback.filter(a => a.page === pageNumber);
  const finalAyahs = pageFiltered.length > 0 ? pageFiltered : fallback.slice(0, 7);
  pageCache.set(pageNumber, finalAyahs);
  return { surahMeta, ayahs: finalAyahs };
}
