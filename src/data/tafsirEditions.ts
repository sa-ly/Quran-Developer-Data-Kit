export interface TafsirEdition {
  id: string;
  name: string;
  author: string;
  era: string;
  description: string;
  language: string;
  category: 'classical' | 'simplified' | 'linguistic';
  apiIdentifier: string;
  popular: boolean;
}

export const ACCREDITED_TAFSIR_EDITIONS: TafsirEdition[] = [
  {
    id: 'muyassar',
    name: 'التفسير الميسر',
    author: 'نخبة من كبار علماء التفسير (مجمع الملك فهد)',
    era: 'معاصر (1419هـ)',
    description: 'تفسير وجيز ميسر صادر عن مجمع الملك فهد لطباعة المصحف الشريف بالمدينة المنورة، صيغ بعبارة سهلة يفهمها كل مسلم.',
    language: 'العربية',
    category: 'simplified',
    apiIdentifier: 'ar.muyassar',
    popular: true
  },
  {
    id: 'ibnkathir',
    name: 'تفسير ابن كثير (تفسير القرآن العظيم)',
    author: 'الإمام الحافظ إسماعيل بن كثير الدمشقي',
    era: 'القرن الثامن (774هـ)',
    description: 'أشهر تفاسير القرآن بالمأثور، جمع بين الآيات والأحاديث النبوية الصحيحة وأقوال الصحابة وأئمة التابعين.',
    language: 'العربية',
    category: 'classical',
    apiIdentifier: 'ar.ibnkathir',
    popular: true
  },
  {
    id: 'saadi',
    name: 'تفسير السعدي (تيسير الكريم الرحمن)',
    author: 'الشيخ عبد الرحمن بن ناصر السعدي',
    era: 'القرن الرابع عشر (1376هـ)',
    description: 'تفسير جامع يتميز بالعبارة الواضحة السلسة وسياق المعاني الإيمانية والمقاصد والأحكام والفوائد التربوية.',
    language: 'العربية',
    category: 'simplified',
    apiIdentifier: 'ar.saadi',
    popular: true
  },
  {
    id: 'qurtubi',
    name: 'تفسير القرطبي (الجامع لأحكام القرآن)',
    author: 'الإمام أبو عبد الله محمد بن أحمد القرطبي',
    era: 'القرن السابع (671هـ)',
    description: 'موسوعة فقهية تفسيرية كبرى، تستنبط الأحكام الشرعية والدلائل اللغوية والقراءات مع النزاهة والتحقيق.',
    language: 'العربية',
    category: 'classical',
    apiIdentifier: 'ar.qurtubi',
    popular: true
  },
  {
    id: 'baghawi',
    name: 'تفسير البغوي (معالم التنزيل)',
    author: 'الإمام الحسين بن مسعود البغوي (محيي السنة)',
    era: 'القرن السادس (516هـ)',
    description: 'تفسير متوسط بالمأثور معتمد لدى أهل السنة والجماعة، خريج الأسانيد، سالم من البدع والأقوال الشاذة.',
    language: 'العربية',
    category: 'classical',
    apiIdentifier: 'ar.baghawi',
    popular: false
  },
  {
    id: 'jalalayn',
    name: 'تفسير الجلالين',
    author: 'الإمامان جلال الدين المحلي وجلال الدين السيوطي',
    era: 'القرن التاسع والعاشر (911هـ)',
    description: 'تفسير مدرسي مختصر شهير جداً، ركّز على ضبط الكلمات وإيضاح المعنى اللغوي المباشر وإعراب المشكل.',
    language: 'العربية',
    category: 'classical',
    apiIdentifier: 'ar.jalalayn',
    popular: true
  },
  {
    id: 'irab',
    name: 'إعراب القرآن وبيان معانيه',
    author: 'قاسم حميد دعاس وأحمد حميدان وإسماعيل القاسم',
    era: 'معاصر',
    description: 'مرجع نحوي ولغوي شامل لإعراب كلمات وآيات القرآن الكريم كلمة كلمة لخدمة طلاب العلم والباحثين.',
    language: 'العربية',
    category: 'linguistic',
    apiIdentifier: 'ar.muyassar', // fallback identifier
    popular: false
  }
];
