import { TajweedRule } from '../types/quran';

export interface TajweedRuleExtended extends TajweedRule {
  darkColor: string;
}

export const TAJWEED_RULES_CATALOG: TajweedRuleExtended[] = [
  {
    id: 'madd_obligatory',
    name: 'المد اللازم (6 حركات)',
    category: 'madd',
    color: '#DC2626',
    darkColor: '#F87171',
    className: 'tajweed-madd',
    description: 'يمد بمقدار 6 حركات وجوباً، عند وقوع ساكن أصلي أو حرف مشدد بعد حرف المد في كلمة واحدة أو حرف من فواتح السور.',
    letters: 'ا، و، ي متبوعة بتشديد أو سكون أصلي',
    example: 'الضَّالِّينَ، الصَّآخَّةُ، الطَّآمَّةُ، الٓمٓ'
  },
  {
    id: 'madd_permissible',
    name: 'المد المتصل والمنفصل والعارض (4-5 حركات)',
    category: 'madd',
    color: '#EA580C',
    darkColor: '#FB923C',
    className: 'tajweed-madd-jaiz',
    description: 'يمد 4 أو 5 حركات إذا تلاه همز في كلمته (متصل) أو كلمة تالية (منفصل)، أو 2-4-6 حركات عند الوقف على السكون العارض.',
    letters: 'ا، و، ي يتبعها همز أو سكون عارض',
    example: 'السَّمَآءِ، جَآءَ، بِمَا أُنزِلَ، الرَّحِيمِ'
  },
  {
    id: 'ghunnah',
    name: 'الغنة المشددة (حركتان)',
    category: 'ghunnah',
    color: '#D97706',
    darkColor: '#FBBF24',
    className: 'tajweed-ghunnah',
    description: 'صوت رخيم يخرج من الخيشوم بمقدار حركتين عند النطق بالنون أو الميم المشددتين.',
    letters: 'نّ، مّ (في أي موضع من الكلمة)',
    example: 'إِنَّ، عَمَّ، النَّاسِ، الْجِنَّةِ، مِمَّا'
  },
  {
    id: 'idgham',
    name: 'الإدغام بغنة (يرملون)',
    category: 'idgham',
    color: '#059669',
    darkColor: '#34D399',
    className: 'tajweed-idgham',
    description: 'إدخال النون الساكنة أو التنوين في أحد أحرف (ي، ن، م، و) مع إخراج غنة ممتدة حركتين.',
    letters: 'ي، ن، م، و بعد نون ساكنة أو تنوين',
    example: 'مَن يَقُولُ، مِن مَّالٍ، هُدًى لِّلْمُتَّقِينَ'
  },
  {
    id: 'ikhfa',
    name: 'الإخفاء الحقيقي (15 حرفاً)',
    category: 'ikhfa',
    color: '#2563EB',
    darkColor: '#60A5FA',
    className: 'tajweed-ikhfa',
    description: 'نطق النون الساكنة أو التنوين بحالة بين الإظهار والإدغام مع بقاء الغنة بمقدار حركتين عند حروف الإخفاء.',
    letters: 'ص، ذ، ث، ك، ج، ش، ق، س، د، ط، ز، ف، ت، ض، ظ',
    example: 'مِن قَبْلِ، كُنتُمْ، أَنفُسَكُمْ، مِن شَرِّ'
  },
  {
    id: 'iqlab',
    name: 'الإقلاب (قلب النون ميماً مخفاة ۢ)',
    category: 'iqlab',
    color: '#7C3AED',
    darkColor: '#C084FC',
    className: 'tajweed-iqlab',
    description: 'قلب النون الساكنة أو التنوين ميماً مخفاة بغنة حركتين إذا جاء بعدها حرف الباء.',
    letters: 'ب بعد نون ساكنة أو تنوين وعلامتها (ۢ)',
    example: 'مِنۢ بَعْدِ، أَنۢبِئْهُم، سَمِيعٌۢ بَصِيرٌ'
  },
  {
    id: 'qalqalah',
    name: 'القلقلة (قطب جد)',
    category: 'qalqalah',
    color: '#0284C7',
    darkColor: '#38BDF8',
    className: 'tajweed-qalqalah',
    description: 'اضطراب ونبرة واضحة عند النطق بأحد حروف القلقلة الساكنة وصلاً أو الموقوف عليها.',
    letters: 'ق، ط، ب، ج، د (الساكنة وصلاً أو وقفاً)',
    example: 'أَحَدٌ، الصَّمَدُ، يَلِدْ، يُولَدْ، الْفَلَقِ، حَبْلٌ'
  },
  {
    id: 'silent',
    name: 'الحروف التي لا تلفظ (اللام الشمسية وهمزة الوصل)',
    category: 'idgham',
    color: '#9CA3AF',
    darkColor: '#64748B',
    className: 'tajweed-silent',
    description: 'الأحرف التي تكتب في الرسم العثماني ولا تنطق في الدرج كاللام الشمسية المدغمة وهمزة الوصل.',
    letters: 'اللام الشمسية، همزة الوصل، ألف التفريق',
    example: 'الرَّحْمَٰنِ، الرَّحِيمِ، الشَّمْسِ، آمَنُواْ'
  }
];

export interface TajweedToken {
  text: string;
  ruleId?: string;
  className?: string;
  color?: string;
  tooltip?: string;
}

// Set of Muqatta'at (Fawatih al-Suwar) with 6-count Madd
const MUQATTAAT_LIST = new Set([
  'الم', 'الٓمٓ', 'المص', 'الٓمٓصٓ', 'الر', 'الٓر', 'المر', 'الٓمٓر',
  'كهيعص', 'كٓهيعٓصٓ', 'طه', 'طٰه', 'طسم', 'طٰسٓمٓ', 'طس', 'طٰسٓ',
  'يس', 'يٰسٓ', 'ص', 'صٓ', 'حم', 'حٰمٓ', 'عسق', 'عٓسٓقٓ', 'ق', 'قٓ', 'ن', 'نٓ'
]);

/**
 * Parses Quranic words and tags letters with standard Tajweed rule classes and color codes
 */
export function parseTajweedWord(word: string, isDark: boolean = false): TajweedToken[] {
  if (!word) return [];

  // 1. Muqatta'at letters at start of surahs (Mad Lazim Harfi 6 movements)
  if (MUQATTAAT_LIST.has(word) || MUQATTAAT_LIST.has(word.replace(/[\u064B-\u0653\u0670\u06E4~]/g, ''))) {
    const rule = TAJWEED_RULES_CATALOG.find(r => r.id === 'madd_obligatory')!;
    return [{
      text: word,
      ruleId: 'madd_obligatory',
      className: 'tajweed-madd',
      color: isDark ? rule.darkColor : rule.color,
      tooltip: 'مد لازم حرفي (6 حركات)'
    }];
  }

  // 2. Madd Lazim (6 movements): explicit madd sign with shaddah / sukun or known patterns like Ad-Dalleen
  const hasMaddSign = /[\u0622\u0653\u06E4~]/.test(word);
  const hasMaddBeforeShaddah = /[اويى][\u0651ّ]|[اويى].{0,2}[\u0651ّ]/.test(word);
  const isAdDalleen = word.includes('الضَّالِّينَ') || word.includes('الضَّالِّينَ') || word.includes('الضالين');
  const isMaddLazimWord = isAdDalleen || /الصَّآخَّةُ|الطَّآمَّةُ|دَابَّةٍ|حَآجَّكَ/.test(word);

  if (isMaddLazimWord || (hasMaddSign && /[ّ\u0651]/.test(word))) {
    const rule = TAJWEED_RULES_CATALOG.find(r => r.id === 'madd_obligatory')!;
    return [{
      text: word,
      ruleId: 'madd_obligatory',
      className: 'tajweed-madd',
      color: isDark ? rule.darkColor : rule.color,
      tooltip: 'مد لازم كلمي مثقل (6 حركات)'
    }];
  }

  // 3. Iqlab: small meem marker \u06E2 (ۢ) or noon before baa
  const hasIqlabMarker = /[\u06E2ۢ]/.test(word);
  const hasIqlabPattern = /ن(?:[\u0652ْ]|\u06E2)?ب/.test(word) || /[\u064B\u064C\u064D]\u06E2?ب/.test(word);

  if (hasIqlabMarker || hasIqlabPattern) {
    const rule = TAJWEED_RULES_CATALOG.find(r => r.id === 'iqlab')!;
    return [{
      text: word,
      ruleId: 'iqlab',
      className: 'tajweed-iqlab',
      color: isDark ? rule.darkColor : rule.color,
      tooltip: 'إقلاب نون ساكنة أو تنوين إلى ميم مخفاة بغنة'
    }];
  }

  // 4. Ghunnah Mushaddadah: Noon or Meem with Shaddah (نّ or مّ)
  const hasGhunnah = /[نم](?:[\u064B-\u0650]?[\u0651ّ]|[\u0651ّ])/.test(word);
  if (hasGhunnah) {
    const rule = TAJWEED_RULES_CATALOG.find(r => r.id === 'ghunnah')!;
    return [{
      text: word,
      ruleId: 'ghunnah',
      className: 'tajweed-ghunnah',
      color: isDark ? rule.darkColor : rule.color,
      tooltip: 'غنة مشددة (حركتان)'
    }];
  }

  // 5. Madd Muttasil or Munfasil (4-5 movements): madd sign followed by hamzah, or hamzah inside word with long vowel
  const hasMaddWithHamza = hasMaddSign || /[اويى][\u0653\u06E4~]?[\u0621\u0623\u0624\u0625\u0626]/.test(word) || /[\u0621\u0623\u0624\u0625\u0626][\u0653\u06E4~]?[اويى]/.test(word);
  const isMaddMuttasilWord = /جَآءَ|جَاءَ|السَّمَآءِ|السَّمَاءِ|سُوءَ|شَاءَ|أُولَٰئِكَ|هَٰؤُلَاءِ|سَوَاءٌ|هَنِيئًا|بِمَا/.test(word);

  if (hasMaddSign || hasMaddWithHamza || isMaddMuttasilWord) {
    const rule = TAJWEED_RULES_CATALOG.find(r => r.id === 'madd_permissible')!;
    return [{
      text: word,
      ruleId: 'madd_permissible',
      className: 'tajweed-madd-jaiz',
      color: isDark ? rule.darkColor : rule.color,
      tooltip: 'مد متصل أو منفصل (4 إلى 5 حركات)'
    }];
  }

  // 6. Qalqalah: letters [ق، ط، ب، ج، د] with sukun, or known verse-ending waqf words (Ahad, As-Samad, Al-Falaq, etc.)
  const hasQalqalahSukun = /[قطبجد][\u0652ْ]/.test(word);
  const endsWithQalqalahSukun = /[قطبجد][\u0652ْ]$/.test(word);
  const isKnownQalqalahWord = /^(?:أَحَدٌ?|الصَّمَدُ?|يَلِدْ|يُولَدْ|الْفَلَقِ?|وَقَبَ?|الْعُقَدِ?|حَسَدَ?|تَبَّ?|مَسَدٍ?|كَسَبَ?|حَبْلٌ?|مَطْلَعِ?|مُحِيطٌ?|قَرِيبٌ?|عَذَابٌ?)$/.test(word);

  if (hasQalqalahSukun || endsWithQalqalahSukun || isKnownQalqalahWord) {
    const rule = TAJWEED_RULES_CATALOG.find(r => r.id === 'qalqalah')!;
    return [{
      text: word,
      ruleId: 'qalqalah',
      className: 'tajweed-qalqalah',
      color: isDark ? rule.darkColor : rule.color,
      tooltip: 'قلقلة (قطب جد)'
    }];
  }

  // 7. Ikhfa Haqiqi: Nun saakinah or unvoweled Nun followed by 15 Ikhfa letters [صذثكجشقسدطزفتضظ]
  const hasIkhfaPattern = /ن[\u0652ْ]?[صذثكجشقسدطزفتضظ]/.test(word);
  const isKnownIkhfaWord = /أَنفُسَكُمْ|كُنتُمْ|مِن|شَرِّ|يُنفِقُونَ|أُنزِلَ|مَنثُورًا|الْإِنسَانَ|قَبْلِكَ|عِندَهُ|عَندَهُ/.test(word) && /ن[صذثكجشقسدطزفتضظ]/.test(word);

  if (hasIkhfaPattern || isKnownIkhfaWord) {
    const rule = TAJWEED_RULES_CATALOG.find(r => r.id === 'ikhfa')!;
    return [{
      text: word,
      ruleId: 'ikhfa',
      className: 'tajweed-ikhfa',
      color: isDark ? rule.darkColor : rule.color,
      tooltip: 'إخفاء حقيقي بغنة'
    }];
  }

  // 8. Idgham with Ghunnah: Nun or Tanween before [ينمو]
  const hasIdghamPattern = /ن[\u0652ْ]?[ينمو]|[\u064B\u064C\u064D][ينمو]/.test(word);
  if (hasIdghamPattern) {
    const rule = TAJWEED_RULES_CATALOG.find(r => r.id === 'idgham')!;
    return [{
      text: word,
      ruleId: 'idgham',
      className: 'tajweed-idgham',
      color: isDark ? rule.darkColor : rule.color,
      tooltip: 'إدغام بغنة (حركتان)'
    }];
  }

  // 9. Madd 'Arid li-s-sukun (at end of verse / pause words like Ar-Raheem, Al-Alameen, Ad-Deen, Nasta'een)
  const isMaddAridWord = /الرَّحِيمِ?|الْعَالَمِينَ?|الدِّينِ?|نَسْتَعِينُ?|الْمُسْتَقِيمَ?|الْمُفْلِحُونَ?|يُوقِنُونَ?|خَبِيرٌ?|عَظِيمٌ?/.test(word);
  if (isMaddAridWord) {
    const rule = TAJWEED_RULES_CATALOG.find(r => r.id === 'madd_permissible')!;
    return [{
      text: word,
      ruleId: 'madd_permissible',
      className: 'tajweed-madd-jaiz',
      color: isDark ? rule.darkColor : rule.color,
      tooltip: 'مد عارض للسكون (2-4-6 حركات عند الوقف)'
    }];
  }

  // 10. Lam Shamsiyyah / Silent letters (ال followed by shamsi letter with shaddah)
  const hasLamShamsiyyah = /^ال[تثدذرزسشصضطظلن][\u0651ّ]/.test(word);
  if (hasLamShamsiyyah) {
    const rule = TAJWEED_RULES_CATALOG.find(r => r.id === 'silent')!;
    return [{
      text: word,
      ruleId: 'silent',
      className: 'tajweed-silent',
      color: isDark ? rule.darkColor : rule.color,
      tooltip: 'لام شمسية مدغمة (لا تلفظ)'
    }];
  }

  // Return standard unadorned word
  return [{
    text: word,
  }];
}
