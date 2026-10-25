import { TajweedRule } from '../types/quran';

export const TAJWEED_RULES_CATALOG: TajweedRule[] = [
  {
    id: 'madd_obligatory',
    name: 'المد اللازم والمتصل (4-6 حركات)',
    category: 'madd',
    color: '#DC2626',
    className: 'tajweed-madd',
    description: 'يمد بمقدار 4 إلى 6 حركات إذا جاء بعد حرف المد همزة في نفس الكلمة أو سكون أصلي.',
    letters: 'ا، و، ي (الممدودة)',
    example: 'السَّمَآءِ، الصَّآخَّةُ، جَآءَ'
  },
  {
    id: 'madd_permissible',
    name: 'المد المنفصل والعارض (2-4 حركات)',
    category: 'madd',
    color: '#EA580C',
    className: 'tajweed-madd-jaiz',
    description: 'يمد بمقدار حركتين أو 4 حركات، كالمد المنفصل أو مد العارض للسكون عند الوقف.',
    letters: 'ا، و، ي',
    example: 'فِي أَنفُسِكُمْ، الرَّحِيمِ'
  },
  {
    id: 'ghunnah',
    name: 'الغنة المشددة (حركتان)',
    category: 'ghunnah',
    color: '#D97706',
    className: 'tajweed-ghunnah',
    description: 'صوت رخيم يخرج من الخيشوم عند النطق بالنون أو الميم المشددتين.',
    letters: 'نّ، مّ',
    example: 'إِنَّ، عَمَّ، النَّاسِ'
  },
  {
    id: 'idgham',
    name: 'الإدغام بغنة (يرملون)',
    category: 'idgham',
    color: '#059669',
    className: 'tajweed-idgham',
    description: 'إدخال النون الساكنة أو التنوين في أحد حروف (ي، ن، م، و) مع الغنة حركتين.',
    letters: 'ي، ن، م، و (بعد نون ساكنة أو تنوين)',
    example: 'مَن يَقُولُ، مِن مَّالٍ، هُدًى لِّلْمُتَّقِينَ'
  },
  {
    id: 'ikhfa',
    name: 'الإخفاء الحقيقي (15 حرفاً)',
    category: 'ikhfa',
    color: '#2563EB',
    className: 'tajweed-ikhfa',
    description: 'النطق بالنون الساكنة أو التنوين بصفة بين الإظهار والإدغام مع بقاء الغنة.',
    letters: 'ص، ذ، ث، ك، ج، ش، ق، س، د، ط، ز، ف، ت، ض، ظ',
    example: 'مِن قَبْلِ، كُنتُمْ، أَنفُسَكُمْ'
  },
  {
    id: 'iqlab',
    name: 'الإقلاب (قلب النون ميماً مخفاة ۢ)',
    category: 'iqlab',
    color: '#7C3AED',
    className: 'tajweed-iqlab',
    description: 'قلب النون الساكنة أو التنوين ميماً مخفاة بغنة إذا جاء بعدها حرف الباء.',
    letters: 'ب (وعلامته ميم صغيرة ۢ)',
    example: 'مِنۢ بَعْدِ، أَنۢبِئْهُم، سَمِيعٌۢ بَصِيرٌ'
  },
  {
    id: 'qalqalah',
    name: 'القلقلة (قطب جد)',
    category: 'qalqalah',
    color: '#0284C7',
    className: 'tajweed-qalqalah',
    description: 'اضطراب في مخرج الحرف الساكن عند النطق به حتى يُسمع له نبرة قوية.',
    letters: 'ق، ط، ب، ج، د (الساكنة)',
    example: 'الْفَلَقِ، أَحَدٌ، حَبْلٌ، مَطْلَعِ'
  }
];

export interface TajweedToken {
  text: string;
  ruleId?: string;
  className?: string;
  tooltip?: string;
}

/**
 * Parses Quranic words and tags letters with standard Tajweed rule classes
 */
export function parseTajweedWord(word: string): TajweedToken[] {
  if (!word) return [];

  // If word has no special tajweed patterns, return plain
  const tokens: TajweedToken[] = [];
  
  // Regex detection patterns for common tajweed signs:
  // 1. Madd sign: contains ~ or \u0622 (آ) or \u06E4 (Quranic maddah) or \u0653
  const hasMadd = /[\u0622\u0653\u06E4~]/.test(word);
  // 2. Iqlab: small meem \u06E2 (ۢ)
  const hasIqlab = /[\u06E2ۢ]/.test(word);
  // 3. Ghunnah: Noon or Meem with shaddah (نّ or مّ), handling variable diacritic ordering
  const hasGhunnah = /[نم](?:[\u064B-\u0650]?[\u0651ّ]|[\u0651ّ])/.test(word);
  // 4. Qalqalah letters: [قطبجد] with sukun or at end
  const hasQalqalah = /[قطبجد][\u0652ْ]?$/.test(word) || /[قطبجد][\u0652ْ]/.test(word);
  // 5. Ikhfa: nun without vowel followed by ikhfa letters
  const hasIkhfa = /ن[صذثكجشقسدطزفتضظ]/.test(word);

  if (hasIqlab) {
    tokens.push({
      text: word,
      ruleId: 'iqlab',
      className: 'tajweed-iqlab',
      tooltip: 'إقلاب'
    });
  } else if (hasMadd) {
    tokens.push({
      text: word,
      ruleId: 'madd_obligatory',
      className: 'tajweed-madd',
      tooltip: 'مد متصل أو لازم'
    });
  } else if (hasGhunnah) {
    tokens.push({
      text: word,
      ruleId: 'ghunnah',
      className: 'tajweed-ghunnah',
      tooltip: 'غنة مشددة'
    });
  } else if (hasQalqalah) {
    tokens.push({
      text: word,
      ruleId: 'qalqalah',
      className: 'tajweed-qalqalah',
      tooltip: 'قلقلة'
    });
  } else if (hasIkhfa) {
    tokens.push({
      text: word,
      ruleId: 'ikhfa',
      className: 'tajweed-ikhfa',
      tooltip: 'إخفاء بغنة'
    });
  } else {
    tokens.push({
      text: word,
    });
  }

  return tokens;
}
