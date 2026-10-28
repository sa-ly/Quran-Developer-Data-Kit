import React, { useState } from 'react';
import { Heart, Sparkles, BookOpen, Copy, Check, Filter } from 'lucide-react';

interface DuaaSectionProps {
  onGoToQuran: () => void;
}

interface DuaItem {
  id: number;
  category: 'quran' | 'hajj' | 'adhkar';
  text: string;
  source: string;
  translation?: string;
  benefits?: string;
}

const DUAA_LIST: DuaItem[] = [
  {
    id: 1,
    category: 'hajj',
    text: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لاَ شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لاَ شَرِيكَ لَكَ',
    source: 'التلبية النبوية المتفق عليها',
    benefits: 'شعار الحج والعمرة وإعلان التوحيد الخالص لله رب العالمين.'
  },
  {
    id: 2,
    category: 'hajj',
    text: 'لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    source: 'حديث يوم عرفة (خير الدعاء دعاء يوم عرفة)',
    benefits: 'أفضل ما قاله النبي ﷺ والنبيون من قبله عشية يوم عرفة.'
  },
  {
    id: 3,
    category: 'quran',
    text: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    source: 'سورة البقرة: الآية 201',
    benefits: 'دعاء الطواف بين الركن اليماني والحجر الأسود، وجامع لخيري الدنيا والآخرة.'
  },
  {
    id: 4,
    category: 'quran',
    text: 'رَبَّنَا لاَ تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً إِنَّكَ أَنتَ الْوَهَّابُ',
    source: 'سورة آل عمران: الآية 8',
    benefits: 'سؤال الثبات على الهداية والرحمة الواسعة.'
  },
  {
    id: 5,
    category: 'quran',
    text: 'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلاَةِ وَمِن ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ * رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ',
    source: 'سورة إبراهيم: الآيات 40-41',
    benefits: 'دعاء خليل الرحمن إبراهيم عليه السلام في حرم مكة المكرمة.'
  },
  {
    id: 6,
    category: 'quran',
    text: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    source: 'سورة الفرقان: الآية 74',
    benefits: 'دعاء عباد الرحمن لصلاح الأهل والذرية والقدوة في التقوى.'
  },
  {
    id: 7,
    category: 'adhkar',
    text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ',
    source: 'صحيح مسلم (جوامع الذكر)',
    benefits: 'ذكر جامع يعدل ساعات طوالاً من التسبيح والذكر.'
  },
  {
    id: 8,
    category: 'adhkar',
    text: 'اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ',
    source: 'صحيح البخاري (سيد الاستغفار)',
    benefits: 'من قالها موقناً بها حين يمسي فمات من ليلته دخل الجنة، وكذلك إذا أصبح.'
  }
];

export const DuaaSection: React.FC<DuaaSectionProps> = ({ onGoToQuran }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'quran' | 'hajj' | 'adhkar'>('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filtered = activeCategory === 'all' 
    ? DUAA_LIST 
    : DUAA_LIST.filter(d => d.category === activeCategory);

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 font-amiri">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-radial from-[#0a5c46] via-[#064E3B] to-[#02281e] text-white p-6 sm:p-10 border-2 border-[#C5A059]/40 shadow-xl text-center">
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#C5A059]/40 text-xs text-[#FCE596] font-serif">
            <Heart className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>منصة حج | hajj.ly · الأدعية القرآنية والنبوية المأثورة</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-white">
            الأَدْعِيَةُ وَالأَذْكَارُ المَأْثُورَةُ
          </h1>

          <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-2xl mx-auto font-serif">
            كنز من الأدعية القرآنية الجامعة، وأدعية الحج ويوم عرفة، وسيد الاستغفار وأذكار اليوم والليلة لحياة إيمانية عامرة بالذكر طوال العام.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={onGoToQuran}
              className="px-5 py-2.5 bg-[#C5A059] hover:bg-[#B38D45] text-stone-900 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-2 cursor-pointer font-serif"
            >
              <BookOpen className="w-4 h-4 text-stone-900" />
              <span>العودة للمصحف الشريف</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
          }`}
        >
          جميع الأدعية والأذكار
        </button>
        <button
          onClick={() => setActiveCategory('hajj')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
            activeCategory === 'hajj'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
          }`}
        >
          أدعية الحج وعرفة والطواف
        </button>
        <button
          onClick={() => setActiveCategory('quran')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
            activeCategory === 'quran'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
          }`}
        >
          أدعية القرآن الكريم (ربنا)
        </button>
        <button
          onClick={() => setActiveCategory('adhkar')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
            activeCategory === 'adhkar'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
          }`}
        >
          أذكار اليوم والليلة
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121A17] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#C5A059]/60 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#064E3B] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  {item.source}
                </span>
                <button
                  onClick={() => handleCopy(item.id, item.text)}
                  className="p-1.5 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors rounded-lg"
                  title="نسخ نص الدعاء"
                >
                  {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <p className="text-lg sm:text-xl font-bold font-serif text-stone-900 dark:text-amber-100 leading-relaxed text-center py-2">
                «{item.text}»
              </p>
            </div>

            {item.benefits && (
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 text-xs text-stone-500 dark:text-stone-400 font-serif">
                {item.benefits}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
