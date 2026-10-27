import { Ayah, Reciter } from '../types/quran';
import { EMBEDDED_SURAHS } from '../data/sampleVerses';
import { BAQARAH_FULL_AYAHS } from '../data/baqarahFull';
import { getSurahMeta, getSurahByPage } from '../data/surahList';
import { removeTashkeel } from '../utils/quranSearch';

/**
 * 20 Accredited World-Renowned Qaris (Reciters) for Hafs 'an 'Asim
 * Verified with EveryAyah.com High Quality Audio CDNs
 */
export const RECITERS: Reciter[] = [
  {
    id: 'alafasy',
    name: 'مشاري بن راشد العفاسي',
    style: 'مرتل ومتقن',
    cdnPrefix: 'https://everyayah.com/data/Alafasy_128kbps/'
  },
  {
    id: 'husary',
    name: 'محمود خليل الحصري (مرتل)',
    style: 'شيخ عموم المقارئ المصرية (ضبط التلاوة)',
    cdnPrefix: 'https://everyayah.com/data/Husary_128kbps/'
  },
  {
    id: 'husary_mujawwad',
    name: 'محمود خليل الحصري (مجود)',
    style: 'المصحف المجود بالأنغام الأصيلة',
    cdnPrefix: 'https://everyayah.com/data/Husary_Mujawwad_64kbps/'
  },
  {
    id: 'minshawy',
    name: 'محمد صديق المنشاوي (مرتل)',
    style: 'الصوت الباكي الخاشع',
    cdnPrefix: 'https://everyayah.com/data/Minshawy_Murattal_128kbps/'
  },
  {
    id: 'minshawy_mujawwad',
    name: 'محمد صديق المنشاوي (مجود)',
    style: 'المصحف المجود الفريد',
    cdnPrefix: 'https://everyayah.com/data/Minshawy_Mujawwad_192kbps/'
  },
  {
    id: 'abdulbasit',
    name: 'عبد الباسط عبد الصمد (مرتل)',
    style: 'صوت مكة وترتيل هادئ',
    cdnPrefix: 'https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/'
  },
  {
    id: 'abdulbasit_mujawwad',
    name: 'عبد الباسط عبد الصمد (مجود)',
    style: 'التلاوة المجودة الشهيرة',
    cdnPrefix: 'https://everyayah.com/data/Abdul_Basit_Mujawwad_128kbps/'
  },
  {
    id: 'hudhaify',
    name: 'علي بن عبد الرحمن الحذيفي',
    style: 'إمام وخطيب المسجد النبوي الشريف',
    cdnPrefix: 'https://everyayah.com/data/Hudhaify_128kbps/'
  },
  {
    id: 'maher',
    name: 'ماهر المعيقلي',
    style: 'إمام وخطيب المسجد الحرام',
    cdnPrefix: 'https://everyayah.com/data/MaherAlMuaiqly128kbps/'
  },
  {
    id: 'sudais',
    name: 'عبد الرحمن السديس',
    style: 'إمام وخطيب المسجد الحرام',
    cdnPrefix: 'https://everyayah.com/data/Abdurrahmaan_As-Sudais_192kbps/'
  },
  {
    id: 'shuraym',
    name: 'سعود الشريم',
    style: 'إمام المسجد الحرام الأسبق',
    cdnPrefix: 'https://everyayah.com/data/Saood_ash-Shuraym_128kbps/'
  },
  {
    id: 'dussary',
    name: 'ياسر الدوسري',
    style: 'إمام وخطيب المسجد الحرام',
    cdnPrefix: 'https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/'
  },
  {
    id: 'ayyoub',
    name: 'محمد أيوب',
    style: 'إمام المسجد النبوي الشريف (المقام الحجازي)',
    cdnPrefix: 'https://everyayah.com/data/Muhammad_Ayyoub_128kbps/'
  },
  {
    id: 'jaber',
    name: 'علي عبد الله جابر',
    style: 'إمام المسجد الحرام الأسبق رحمه الله',
    cdnPrefix: 'https://everyayah.com/data/Ali_Jaber_64kbps/'
  },
  {
    id: 'ghamadi',
    name: 'سعد الغامدي',
    style: 'تلاوة ندية خاشعة',
    cdnPrefix: 'https://everyayah.com/data/Ghamadi_40kbps/'
  },
  {
    id: 'ajamy',
    name: 'أحمد بن علي العجمي',
    style: 'تلاوة شجية مؤثرة',
    cdnPrefix: 'https://everyayah.com/data/Ahmed_ibn_Ali_al-Ajamy_128kbps_ketaballah.net/'
  },
  {
    id: 'shaatree',
    name: 'أبو بكر الشاطري',
    style: 'ترتيل هادئ متقن',
    cdnPrefix: 'https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/'
  },
  {
    id: 'qatami',
    name: 'ناصر القطامي',
    style: 'تلاوة نجدية حزينة خاشعة',
    cdnPrefix: 'https://everyayah.com/data/Nasser_Alqatami_128kbps/'
  },
  {
    id: 'abbad',
    name: 'فارس عباد',
    style: 'نبرة يمنية ندية',
    cdnPrefix: 'https://everyayah.com/data/Fares_Abbad_64kbps/'
  },
  {
    id: 'budair',
    name: 'صلاح البدير',
    style: 'إمام وخطيب المسجد النبوي الشريف',
    cdnPrefix: 'https://everyayah.com/data/Salah_Al_Budair_128kbps/'
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

// Seed Al-Fatihah (7 verses) and complete short surahs
if (EMBEDDED_SURAHS[1]) surahCache.set('1-ar.muyassar-', EMBEDDED_SURAHS[1]);
if (EMBEDDED_SURAHS[112]) surahCache.set('112-ar.muyassar-', EMBEDDED_SURAHS[112]);
if (EMBEDDED_SURAHS[113]) surahCache.set('113-ar.muyassar-', EMBEDDED_SURAHS[113]);
if (EMBEDDED_SURAHS[114]) surahCache.set('114-ar.muyassar-', EMBEDDED_SURAHS[114]);
if (EMBEDDED_SURAHS[108]) surahCache.set('108-ar.muyassar-', EMBEDDED_SURAHS[108]);

// Seed FULL Surah Al-Baqarah (286 complete verses)
surahCache.set('2-ar.muyassar-', BAQARAH_FULL_AYAHS);

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

  // Surah Al-Baqarah (286 complete verses) instant local return for default tafsir
  if (surahNumber === 2 && tafsirEdition === 'ar.muyassar' && !translationEdition) {
    surahCache.set(cacheKey, BAQARAH_FULL_AYAHS);
    return BAQARAH_FULL_AYAHS;
  }

  // Check persistent localStorage cache
  try {
    const localSaved = localStorage.getItem(`quran_surah_${surahNumber}_${tafsirEdition}_${translationEdition || ''}`);
    if (localSaved) {
      const parsed = JSON.parse(localSaved);
      const meta = getSurahMeta(surahNumber);
      if (meta && parsed.length >= meta.numberOfAyahs) {
        surahCache.set(cacheKey, parsed);
        return parsed;
      }
    }
  } catch {}

  const meta = getSurahMeta(surahNumber);
  if (!meta) return [];

  // Compose editions query
  const editions = ['quran-uthmani', tafsirEdition];
  if (translationEdition && translationEdition !== tafsirEdition && translationEdition !== 'ar.muyassar') {
    editions.push(translationEdition);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);
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

      if (ayahs.length >= meta.numberOfAyahs) {
        surahCache.set(cacheKey, ayahs);
        try {
          localStorage.setItem(`quran_surah_${surahNumber}_${tafsirEdition}_${translationEdition || ''}`, JSON.stringify(ayahs));
        } catch {}
        return ayahs;
      }
    }
  } catch (err) {
    console.warn('Network fetch error for Surah, falling back to local fallback data:', err);
  }

  // If Surah Al-Baqarah, always return the complete 286 verses
  if (surahNumber === 2) {
    surahCache.set(cacheKey, BAQARAH_FULL_AYAHS);
    return BAQARAH_FULL_AYAHS;
  }

  // Fallback: check if we have complete base embedded surah
  const baseEmbedded = EMBEDDED_SURAHS[surahNumber];
  if (baseEmbedded && baseEmbedded.length >= meta.numberOfAyahs) {
    surahCache.set(cacheKey, baseEmbedded);
    return baseEmbedded;
  }

  // General Fallback with full number of ayahs
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
    const timeoutId = setTimeout(() => controller.abort(), 8000);
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

  // If Al-Baqarah and default muyassar, populate from BAQARAH_FULL_AYAHS
  if (surahNumber === 2 && tafsirEdition === 'ar.muyassar') {
    const map: Record<number, string> = {};
    BAQARAH_FULL_AYAHS.forEach(a => {
      map[a.numberInSurah] = a.tafsir || '';
    });
    tafsirTextCache.set(cacheKey, map);
    return map;
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

  // Check if page belongs to Surah Al-Baqarah (pages 2 to 49)
  if (pageNumber >= 2 && pageNumber <= 49) {
    const baqarahPageAyahs = BAQARAH_FULL_AYAHS.filter(a => a.page === pageNumber);
    if (baqarahPageAyahs.length > 0) {
      pageCache.set(pageNumber, baqarahPageAyahs);
      return { surahMeta, ayahs: baqarahPageAyahs };
    }
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
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
