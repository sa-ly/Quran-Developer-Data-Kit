/**
 * Quran text normalization and search utilities
 */

// Regex for Arabic diacritics and Quranic symbols
const DIACRITICS_REGEX = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g;

/**
 * Removes tashkeel and Quranic stop marks for plain search
 */
export function removeTashkeel(text: string): string {
  if (!text) return '';
  return text.replace(DIACRITICS_REGEX, '');
}

/**
 * Normalizes Arabic letters (alef, yaa, taa marbuta) to standard canonical forms
 */
export function normalizeArabic(text: string): string {
  if (!text) return '';
  return removeTashkeel(text)
    .replace(/[إأآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ـ/g, '') // tatweel / kashida
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Checks if search query is found in Arabic text
 */
export function matchesQuery(verseText: string, query: string): boolean {
  if (!query || !verseText) return false;
  const normalizedVerse = normalizeArabic(verseText);
  const normalizedQuery = normalizeArabic(query);
  return normalizedVerse.includes(normalizedQuery);
}

/**
 * Highlight matching query inside text (returns segment array with isMatch flag)
 */
export function highlightMatches(
  text: string,
  query: string
): { segment: string; isMatch: boolean }[] {
  if (!query.trim() || !text) {
    return [{ segment: text, isMatch: false }];
  }

  const cleanQuery = normalizeArabic(query);
  if (!cleanQuery) return [{ segment: text, isMatch: false }];

  // Simple token matching
  const words = text.split(' ');
  return words.map((word, idx) => {
    const normWord = normalizeArabic(word);
    const isMatch = normWord.includes(cleanQuery);
    return {
      segment: idx === words.length - 1 ? word : word + ' ',
      isMatch,
    };
  });
}
