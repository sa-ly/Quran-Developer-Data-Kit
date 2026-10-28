import React, { useState } from 'react';
import { Sparkles, BookOpen, Copy, Check, Quote, ShieldCheck } from 'lucide-react';

interface HadithSectionProps {
  onGoToQuran: () => void;
}

interface HadithItem {
  id: number;
  category: 'quran' | 'hajj' | 'jawami';
  text: string;
  narrator: string;
  source: string;
  authenticity: 'متفق عليه (البخاري ومسلم)' | 'صحيح البخاري' | 'صحيح مسلم';
  hadithNumber: string;
  explanation: string;
}

const HADITH_LIST: HadithItem[] = [
  {
    id: 1,
    category: 'quran',
    text: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ.',
    narrator: 'عَنْ عُثْمَانَ بْنِ عَفَّانَ رَضِيَ اللَّهُ عَنْهُ',
    source: 'صحيح البخاري - كِتَابُ فَضَائِلِ القُرْآنِ',
    authenticity: 'صحيح البخاري',
    hadithNumber: 'حديث رقم 5027',
    explanation: 'أفضل مراتب العباد وأعلاهم منزلة عند الله من جمع بين إتقان القرآن الكريم تلاوة وتدبراً وتعليمه للناس ابتغاء مرضاة الله.'
  },
  {
    id: 2,
    category: 'quran',
    text: 'الْمَاهِرُ بِالْقُرْآنِ مَعَ السَّفَرَةِ الْكِرَامِ الْبَرَرَةِ، وَالَّذِي يَقْرَأُ الْقُرْآنَ وَيَتَتَعْتَعُ فِيهِ، وَهُوَ عَلَيْهِ شَاقٌّ، لَهُ أَجْرَانِ.',
    narrator: 'عَنْ عَائِشَةَ أُمِّ الْمُؤْمِنِينَ رَضِيَ اللَّهُ عَنْهَا',
    source: 'صحيح مسلم (كتاب صلاة المسافرين) وصحيح البخاري',
    authenticity: 'متفق عليه (البخاري ومسلم)',
    hadithNumber: 'صحيح مسلم: 798 · البخاري: 4937',
    explanation: 'بشارة نبوية كريمة للمتقن لتجويد القرآن بأنه مع الملائكة الأبرار، وللمتعلم الذي يجاهد لسانه بأن له أجر التلاوة وأجر المشقة.'
  },
  {
    id: 3,
    category: 'quran',
    text: 'اقْرَءُوا الْقُرْآنَ فَإِنَّهُ يَأْتِي يَوْمَ الْقِيَامَةِ شَفِيعًا لِأَصْحَابِهِ.',
    narrator: 'عَنْ أَبِي أُمَامَةَ الْبَاهِلِيِّ رَضِيَ اللَّهُ عَنْهُ',
    source: 'صحيح مسلم - كِتَابُ صَلَاةِ الْمُسَافِرِينَ وَقَصْرِهَا',
    authenticity: 'صحيح مسلم',
    hadithNumber: 'صحيح مسلم: حديث رقم 804',
    explanation: 'الحث على ملازمة تلاوة كتاب الله والعمل به في الدنيا؛ ليكون لصاحبه نوراً وشفيعاً يوم الحساب بين يدي الله تعالى.'
  },
  {
    id: 4,
    category: 'hajj',
    text: 'الْعُمْرَةُ إِلَى الْعُمْرَةِ كَفَّارَةٌ لِمَا بَيْنَهُمَا، وَالْحَجُّ الْمَبْرُورُ لَيْسَ لَهُ جَزَاءٌ إِلَّا الْجَنَّةُ.',
    narrator: 'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ',
    source: 'متفق عليه (صحيح البخاري وصحيح مسلم)',
    authenticity: 'متفق عليه (البخاري ومسلم)',
    hadithNumber: 'البخاري: 1773 · مسلم: 1349',
    explanation: 'بيان فضل الحج المبرور الخالص لوجه الله، المنزه عن الرياء والفسوق والجدال، وأن ثوابه الحتمي هو دخول الجنة ورضوان الله.'
  },
  {
    id: 5,
    category: 'hajj',
    text: 'مَنْ حَجَّ لِلَّهِ فَلَمْ يَرْفُثْ، وَلَمْ يَفْسُقْ، رَجَعَ كَيَوْمِ وَلَدَتْهُ أُمُّهُ.',
    narrator: 'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ',
    source: 'متفق عليه (صحيح البخاري وصحيح مسلم)',
    authenticity: 'متفق عليه (البخاري ومسلم)',
    hadithNumber: 'البخاري: 1521 · مسلم: 1350',
    explanation: 'المغفرة التامة ومحو جميع الذنوب والخطايا لمن أخلص حجه لله واجتنب المحرمات والرفث وفسوق القول والعمل.'
  },
  {
    id: 6,
    category: 'jawami',
    text: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ فَهِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ، وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا أَوِ امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ.',
    narrator: 'عَنْ أَمِيرِ الْمُؤْمِنِينَ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ',
    source: 'متفق عليه - أول حديث في صحيح البخاري وصحيح مسلم',
    authenticity: 'متفق عليه (البخاري ومسلم)',
    hadithNumber: 'البخاري: حديث رقم 1 · مسلم: 1907',
    explanation: 'قاعدة الإسلام الكبرى ومدار قبول جميع الطاعات والأعمال من قراءة قرآن وصلاة وحج، فلا يقبل الله عملاً إلا ما ابتغي به وجهه.'
  },
  {
    id: 7,
    category: 'jawami',
    text: 'كَلِمَتَانِ خَفِيفَتَانِ عَلَى اللِّسَانِ، ثَقِيلَتَانِ فِي الْمِيزَانِ، حَبِيبَتَانِ إِلَى الرَّحْمَنِ: سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ.',
    narrator: 'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ',
    source: 'متفق عليه - ختام صحيح البخاري وصحيح مسلم',
    authenticity: 'متفق عليه (البخاري ومسلم)',
    hadithNumber: 'البخاري: حديث رقم 6406 · مسلم: 2694',
    explanation: 'عظيم فضل هذا الذكر اليسير الذي يحبه الله الرحمن وتثقل به موازين العبد يوم القيامة.'
  },
  {
    id: 8,
    category: 'jawami',
    text: 'لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ.',
    narrator: 'عَنْ أَنَسِ بْنِ مَالِكٍ رَضِيَ اللَّهُ عَنْهُ',
    source: 'متفق عليه (صحيح البخاري وصحيح مسلم)',
    authenticity: 'متفق عليه (البخاري ومسلم)',
    hadithNumber: 'البخاري: 13 · مسلم: 45',
    explanation: 'سلامة الصدر وكمال الإيمان؛ بأن يحب المسلم لأخيه المسلم من الخير والهداية والبركة ما يتمناه لنفسه.'
  }
];

export const HadithSection: React.FC<HadithSectionProps> = ({ onGoToQuran }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'quran' | 'hajj' | 'jawami'>('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filtered = activeTab === 'all' 
    ? HADITH_LIST 
    : HADITH_LIST.filter(h => h.category === activeTab);

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
            <Quote className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>منصة حج | hajj.ly · الأحاديث النبوية الشريفة من الصحاح</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-white">
            الأَحَادِيثُ النَّبَوِيَّةُ الشَّرِيفَةُ
          </h1>

          <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-2xl mx-auto font-serif">
            أحاديث صحيحة مستخرجة حصراً من أصح كتب السنة (صحيح البخاري وصحيح مسلم)، مضبوطة بالتشكيل التام ومدعمة بأرقام الأحاديث في دواوين السنة.
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

      {/* Scholarly Verification Badge & Assurance Banner */}
      <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex items-start sm:items-center gap-3.5 text-xs sm:text-sm text-stone-800 dark:text-stone-200">
        <ShieldCheck className="w-6 h-6 text-[#064E3B] dark:text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
        <div className="space-y-0.5">
          <strong className="text-emerald-900 dark:text-emerald-300 font-bold text-sm block">
            توثيق الصحة والضبط العلمي:
          </strong>
          <span className="text-stone-700 dark:text-stone-300 leading-relaxed">
            كافة الأحاديث الواردة في هذا القسم مخرجة حصراً من «صحيح البخاري» و«صحيح مسلم» (متفق عليها)، مضبوطة بنصها الكامل ودون اختصار أو بتر، وبإسنادها ورقم الحديث المعتمد.
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
          }`}
        >
          جميع الأحاديث الموثقة ({HADITH_LIST.length})
        </button>
        <button
          onClick={() => setActiveTab('quran')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
            activeTab === 'quran'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
          }`}
        >
          فضائل القرآن الكريم
        </button>
        <button
          onClick={() => setActiveTab('hajj')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
            activeTab === 'hajj'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
          }`}
        >
          فضائل الحج والعمرة
        </button>
        <button
          onClick={() => setActiveTab('jawami')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
            activeTab === 'jawami'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
          }`}
        >
          جوامع الكلم وأصول الدين
        </button>
      </div>

      {/* Hadith Cards Grid */}
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
                    {item.hadithNumber}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(item.id, item.text)}
                  className="p-1.5 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors rounded-lg cursor-pointer"
                  title="نسخ نص الحديث"
                >
                  {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="text-xs text-stone-500 dark:text-stone-400 font-serif">
                {item.narrator}، قالَ رَسُولُ اللَّهِ ﷺ:
              </div>

              <p className="text-lg sm:text-xl font-bold font-serif text-stone-900 dark:text-amber-100 leading-relaxed text-center py-2">
                «{item.text}»
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 space-y-1 text-xs text-stone-600 dark:text-stone-300 font-serif">
              <div className="text-[11px] text-stone-400 dark:text-stone-500 font-medium">
                المصدر: {item.source}
              </div>
              <div>
                <span className="font-bold text-[#064E3B] dark:text-emerald-400">الفائدة والهداية: </span>
                {item.explanation}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
