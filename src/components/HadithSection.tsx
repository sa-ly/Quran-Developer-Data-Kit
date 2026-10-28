import React, { useState } from 'react';
import { Sparkles, BookOpen, Copy, Check, Quote, Award } from 'lucide-react';

interface HadithSectionProps {
  onGoToQuran: () => void;
}

interface HadithItem {
  id: number;
  category: 'quran' | 'hajj' | 'jawami';
  text: string;
  narrator: string;
  source: string;
  explanation: string;
}

const HADITH_LIST: HadithItem[] = [
  {
    id: 1,
    category: 'quran',
    text: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ.',
    narrator: 'عن عثمان بن عفان رضي الله عنه',
    source: 'صحيح البخاري',
    explanation: 'أفضل مراتب العباد وأعلاهم منزلة من جمع بين تعلم القرآن الكريم وتعليمه للناس ابتغاء وجه الله.'
  },
  {
    id: 2,
    category: 'quran',
    text: 'الْمَاهِرُ بِالْقُرْآنِ مَعَ السَّفَرَةِ الْكِرَامِ الْبَرَرَةِ، وَالَّذِي يَقْرَأُ الْقُرْآنَ وَيَتَتَعْتَعُ فِيهِ وَهُوَ عَلَيْهِ شَاقٌّ لَهُ أَجْرَانِ.',
    narrator: 'عن عائشة أم المؤمنين رضي الله عنها',
    source: 'صحيح مسلم',
    explanation: 'بشارة عظيمة للمتقن بتجويده وللمبتدئ الذي يجاهد نفسه؛ فالأول مع الملائكة، والثاني له أجر القراءة وأجر المشقة.'
  },
  {
    id: 3,
    category: 'hajj',
    text: 'الْعُمْرَةُ إِلَى الْعُمْرَةِ كَفَّارَةٌ لِمَا بَيْنَهُمَا، وَالْحَجُّ الْمَبْرُورُ لَيْسَ لَهُ جَزَاءٌ إِلاَّ الْجَنَّةُ.',
    narrator: 'عن أبي هريرة رضي الله عنه',
    source: 'متفق عليه (البخاري ومسلم)',
    explanation: 'بيان فضل الحج المبرور الخالص من الرياء والرفث والفسوق، وأن جزاءه الأعظم هو دخول الجنة ونيل الرضوان.'
  },
  {
    id: 4,
    category: 'hajj',
    text: 'مَنْ حَجَّ لِلَّهِ فَلَمْ يَرْفُثْ، وَلَمْ يَفْسُقْ، رَجَعَ كَيَوْمِ وَلَدَتْهُ أُمُّهُ.',
    narrator: 'عن أبي هريرة رضي الله عنه',
    source: 'صحيح البخاري',
    explanation: 'المغفرة الشاملة ومحو الخطايا والذنوب لمن أدى فريضة الحج إيماناً واحتساباً وطاعة لله.'
  },
  {
    id: 5,
    category: 'jawami',
    text: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ فَهِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ...',
    narrator: 'عن عمر بن الخطاب رضي الله عنه',
    source: 'متفق عليه (البخاري ومسلم)',
    explanation: 'أصل الدين ومدار قبول الطاعات من صلاة وحج وقراءة قرآن، فلا يقبل الله من العمل إلا ما كان خالصاً صواباً.'
  },
  {
    id: 6,
    category: 'jawami',
    text: 'لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ.',
    narrator: 'عن أنس بن مالك رضي الله عنه',
    source: 'صحيح البخاري',
    explanation: 'كمال الإيمان وحسن الخلق وسلامة الصدر ومحبة الخير للناس جميعاً.'
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
            <span>منصة حج | hajj.ly · الأحاديث النبوية الشريفة وجوامع الكلم</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-white">
            الأَحَادِيثُ النَّبَوِيَّةُ الشَّرِيفَةُ
          </h1>

          <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-2xl mx-auto font-serif">
            أحاديث صحيحة من مشكاة النبوة في فضائل القرآن الكريم، وثواب الحج والعمرة، وجوامع الآداب النبوية التي تنير درب المسلم طوال حياته.
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
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
          }`}
        >
          جميع الأحاديث
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
          جوامع الكلم والآداب
        </button>
      </div>

      {/* Hadith Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121A17] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#C5A059]/60 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                  {item.source}
                </span>
                <button
                  onClick={() => handleCopy(item.id, item.text)}
                  className="p-1.5 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors rounded-lg"
                  title="نسخ نص الحديث"
                >
                  {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="text-xs text-stone-500 dark:text-stone-400 font-serif">
                {item.narrator}: قال رسول الله ﷺ:
              </div>

              <p className="text-lg sm:text-xl font-bold font-serif text-stone-900 dark:text-amber-100 leading-relaxed text-center py-2">
                «{item.text}»
              </p>
            </div>

            <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 text-xs text-stone-600 dark:text-stone-300 font-serif">
              <span className="font-bold text-[#064E3B] dark:text-emerald-400">الفائدة والهداية: </span>
              {item.explanation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
