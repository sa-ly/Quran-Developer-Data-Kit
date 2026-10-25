export interface SurahMeta {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
  page: number; // Starting page in standard Madinah Mushaf (1-604)
  juz: number;
}

export interface Ayah {
  numberInSurah: number;
  number: number; // Global verse number (1 to 6236)
  text: string; // Tanzil Uthmani text
  simpleText: string; // Plain Arabic without diacritics for search & copy
  page: number;
  juz: number;
  hizb?: number;
  rub?: number;
  sajda?: boolean;
  tafsir?: string; // Classical Al-Muyassar or chosen Tafsir
  translation?: string; // Translated meaning in active language
  tafsirs?: Record<string, string>; // Multi-edition tafsirs cache
}

export interface Reciter {
  id: string;
  name: string;
  style: string;
  cdnPrefix: string;
}

export interface TajweedRule {
  id: string;
  name: string;
  category: 'madd' | 'ghunnah' | 'idgham' | 'ikhfa' | 'iqlab' | 'qalqalah';
  color: string;
  className: string;
  description: string;
  letters: string;
  example: string;
}

export interface Bookmark {
  id: string;
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  text: string;
  createdAt: number;
}

export interface SearchResult {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  text: string;
  page: number;
}
