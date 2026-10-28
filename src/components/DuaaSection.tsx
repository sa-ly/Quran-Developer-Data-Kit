import React, { useState } from 'react';
import { Heart, Sparkles, BookOpen, Copy, Check, ShieldCheck } from 'lucide-react';

interface DuaaSectionProps {
  onGoToQuran: () => void;
}

interface DuaItem {
  id: number;
  category: 'quran' | 'hajj' | 'adhkar';
  text: string;
  source: string;
  authenticity: string;
  referenceNumber: string;
  benefits?: string;
}

const DUAA_LIST: DuaItem[] = [
  {
    id: 1,
    category: 'hajj',
    text: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لاَ شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لاَ شَرِيكَ لَكَ.',
    source: 'التلبية النبوية الشريفة',
    authenticity: 'متفق عليه (البخاري ومسلم)',
    referenceNumber: 'البخاري: 1549 · مسلم: 1184',
    benefits: 'شعار الحج والعمرة الخالد وإعلان التوحيد الخالص لله بلسان الخضوع والمحبة.'
  },
  {
    id: 2,
    category: 'hajj',
    text: 'لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.',
    source: 'دعاء يوم عرفة المشرف',
    authenticity: 'جامع الترمذي (حسن) وأصله في الصحيحين',
    referenceNumber: 'الترمذي: 3585 · البخاري: 6403 · مسلم: 2691',
    benefits: 'قال النبي ﷺ: «خَيْرُ الدُّعَاءِ دُعَاءُ يَوْمِ عَرَفَةَ، وَخَيْرُ مَا قُلْتُ أَنَا وَالنَّبِيُّونَ مِنْ قَبْلِي...».'
  },
  {
    id: 3,
    category: 'quran',
    text: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ.',
    source: 'سورة البقرة: الآية 201',
    authenticity: 'القرآن الكريم وسنة الطواف الصحيحة',
    referenceNumber: 'سنن أبي داود: 1892 · صحيح ابن حبان: 3828',
    benefits: 'كان النبي ﷺ يكثر من هذا الدعاء، ويقرؤه بين الركن اليماني والحجر الأسود أثناء الطواف.'
  },
  {
    id: 4,
    category: 'adhkar',
    text: 'اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ.',
    source: 'سيد الاستغفار',
    authenticity: 'صحيح البخاري',
    referenceNumber: 'صحيح البخاري: حديث رقم 6306',
    benefits: 'قال النبي ﷺ: «مَنْ قَالَهَا مِنَ النَّهَارِ مُوقِنًا بِهَا، فَمَاتَ مِنْ يَوْمِهِ قَبْلَ أَنْ يُمْسِيَ، فَهُوَ مِنْ أَهْلِ الجَنَّةِ».'
  },
  {
    id: 5,
    category: 'adhkar',
    text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ: عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ.',
    source: 'صحيح مسلم (جوامع الذكر)',
    authenticity: 'صحيح مسلم',
    referenceNumber: 'صحيح مسلم: حديث رقم 2726',
    benefits: 'علمها النبي ﷺ لأم المؤمنين جويرية رضي الله عنها، وبيّن أنها تعدل ساعات طويلة من التسبيح والذكر.'
  },
  {
    id: 6,
    category: 'adhkar',
    text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَنْ شِمَالِي وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي.',
    source: 'دعاء الصباح والمساء لحفظ العبد',
    authenticity: 'صحيح (أبو داود وابن ماجه)',
    referenceNumber: 'سنن أبي داود: 5074 · ابن ماجه: 3871',
    benefits: 'لم يكن رسول الله ﷺ يدع هؤلاء الدعوات حين يمسي وحين يصبح قط؛ لحفظ الدين والنفس والأهل والمال.'
  },
  {
    id: 7,
    category: 'quran',
    text: 'رَبَّنَا لاَ تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً إِنَّكَ أَنتَ الْوَهَّابُ.',
    source: 'سورة آل عمران: الآية 8',
    authenticity: 'القرآن الكريم (الرسم العثماني)',
    referenceNumber: 'آل عمران: آية 8',
    benefits: 'دعاء الراسخين في العلم يسألون الله تعالى الثبات على الهداية والاعتصام بالحق حتى الممات.'
  },
  {
    id: 8,
    category: 'quran',
    text: 'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلاَةِ وَمِن ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ * رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ.',
    source: 'سورة إبراهيم: الآيات 40-41',
    authenticity: 'القرآن الكريم (الرسم العثماني)',
    referenceNumber: 'إبراهيم: آيات 40-41',
    benefits: 'دعاء خليل الرحمن إبراهيم عليه السلام في حرم مكة المبارك لذريته وللمؤمنين جميعاً بالمغفرة وإقامة الصلاة.'
  },
  {
    id: 9,
    category: 'quran',
    text: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا.',
    source: 'سورة الفرقان: الآية 74',
    authenticity: 'القرآن الكريم (الرسم العثماني)',
    referenceNumber: 'الفرقان: آية 74',
    benefits: 'دعاء عباد الرحمن لصلاح البيوت وسعادة الأهل وبر الذرية وبلوغ إمامة التقوى والصلاح.'
  },
  {
    id: 10,
    category: 'hajj',
    text: 'آيِبُونَ تَائِبُونَ عَابِدُونَ، لِرَبِّنَا حَامِدُونَ، صَدَقَ اللَّهُ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَهَزَمَ الأَحْزَابَ وَحْدَهُ.',
    source: 'دعاء الرجوع من الحج والعمرة والسفر',
    authenticity: 'متفق عليه (البخاري ومسلم)',
    referenceNumber: 'البخاري: 1797 · مسلم: 1344',
    benefits: 'كان النبي ﷺ إذا قفل من الحج أو العمرة كبر على كل شرف من الأرض ثلاث تكبيرات ثم قال هذا الذكر المبارك.'
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
            <span>منصة حج | hajj.ly · الأدعية القرآنية والنبوية الثابتة</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-white">
            الأَدْعِيَةُ وَالأَذْكَارُ المَأْثُورَةُ
          </h1>

          <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-2xl mx-auto font-serif">
            أدعية وأذكار مستخلصة حصراً من كتاب الله وسنة رسوله ﷺ الثابتة في الصحاح، مضبوطة الحروف والتشكيل ومعزوة إلى مراجعها بدقة تامة.
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

      {/* Scholarly Verification Banner */}
      <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex items-start sm:items-center gap-3.5 text-xs sm:text-sm text-stone-800 dark:text-stone-200">
        <ShieldCheck className="w-6 h-6 text-[#064E3B] dark:text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
        <div className="space-y-0.5">
          <strong className="text-emerald-900 dark:text-emerald-300 font-bold text-sm block">
            توثيق الصحة والضبط الشرعي:
          </strong>
          <span className="text-stone-700 dark:text-stone-300 leading-relaxed">
            كافة الأدعية في هذا القسم إما آيات قرآنية محكمة بالرسم العثماني أو أدعية نبوية مخرجة في الصحاح (صحيح البخاري وصحيح مسلم والسنن الصحيحة)، دون أي أدعية مجهولة المصدر أو مبتدعة.
          </span>
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
          جميع الأدعية الموثقة ({DUAA_LIST.length})
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
          أدعية القرآن الكريم
        </button>
        <button
          onClick={() => setActiveCategory('adhkar')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
            activeCategory === 'adhkar'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
          }`}
        >
          أذكار الصباح والمساء
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
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-300/80 dark:border-emerald-700/80">
                    {item.authenticity}
                  </span>
                  <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                    {item.referenceNumber}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(item.id, item.text)}
                  className="p-1.5 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors rounded-lg cursor-pointer"
                  title="نسخ نص الدعاء"
                >
                  {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="text-xs text-stone-500 dark:text-stone-400 font-serif">
                {item.source}:
              </div>

              <p className="text-lg sm:text-xl font-bold font-serif text-stone-900 dark:text-amber-100 leading-relaxed text-center py-2">
                «{item.text}»
              </p>
            </div>

            {item.benefits && (
              <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 text-xs text-stone-600 dark:text-stone-300 font-serif">
                <span className="font-bold text-[#064E3B] dark:text-emerald-400">الفضل والمناسبة: </span>
                {item.benefits}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
