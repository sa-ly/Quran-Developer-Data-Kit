import React, { useState } from 'react';
import { Compass, BookOpen, CheckCircle2, MapPin, HeartHandshake, Sparkles, Clock, Calendar, ArrowRight } from 'lucide-react';

interface HajjGuideSectionProps {
  onGoToQuran: () => void;
}

interface HajjDayStep {
  id: string;
  day: string;
  date: string;
  title: string;
  description: string;
  acts: string[];
  duaa: string;
  location: string;
}

const HAJJ_DAYS: HajjDayStep[] = [
  {
    id: 'umrah',
    day: 'العمرة (للمتمتع)',
    date: 'قبل أيام الحج',
    title: 'مناسك العمرة: الإحرام، الطواف، السعي، الحلق أو التقصير',
    description: 'يبدأ الحاج المتمتع بالإحرام من الميقات ملبياً: (لبيك عمرة متمتعاً بها إلى الحج)، ثم يطوف بالكعبة سبعة أشواط، ويسعى بين الصفا والمروة، ثم يقصر ويتحلل.',
    acts: [
      'الإحرام من الميقات والتلبية: لبيك اللهم لبيك',
      'طواف العمرة 7 أشواط بدءاً من الحجر الأسود واستلام الركن اليماني',
      'صلاة ركعتين خلف مقام إبراهيم عليه السلام وشرب ماء زمزم',
      'السعي بين الصفا والمروة 7 أشواط بدءاً بالصفا',
      'الحلق أو التقصير (والتقصير أفضل للمتمتع ليبقي شعراً للحج)'
    ],
    duaa: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    location: 'مكة المكرمة - المسجد الحرام'
  },
  {
    id: 'day8',
    day: 'اليوم الأول',
    date: '8 ذو الحجة',
    title: 'يوم التروية: الإحرام والخروج إلى مِنى',
    description: 'يُحرم الحاج بالحج من مسكنه بمكة المكرمة ضحى، ويتوجه إلى مشعر مِنى فيصلي بها الظهر والعصر والمغرب والعشاء وفجر يوم عرفة قصراً بلا جمع.',
    acts: [
      'الاغتسال والتطيب ولبس ثياب الإحرام',
      'عقد نية الحج والتلبية: لبيك حِجاً',
      'المبيت بمشعر مِنى ليلة التاسع سنة مؤكدة عن رسول الله ﷺ',
      'قضاء الوقت في التلبية والتسبيح وقراءة القرآن والدعاء'
    ],
    duaa: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لاَ شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لاَ شَرِيكَ لَكَ',
    location: 'مشعر مِنى'
  },
  {
    id: 'day9',
    day: 'اليوم الثاني (الركن الأعظم)',
    date: '9 ذو الحجة',
    title: 'يوم عرفة والنفرة إلى مزدلفة',
    description: 'الحج عرفة؛ يقف الحجاج بصعيد عرفات الطاهر بعد زوال الشمس، ويجمعون بين الظهر والعصر جمع تقديم وقصراً، ويتفرغون للضراعة والدعاء حتى غروب الشمس ثم ينفرون إلى مزدلفة.',
    acts: [
      'التوجه من مِنى إلى عرفات بعد طلوع شمس 9 ذو الحجة',
      'صلاة الظهر والعصر ركعتين ركعتين بأذان وإقامتين جمع تقديم',
      'التفرغ التام للذكر والدعاء والاستغفار واستقبال القبلة',
      'الإفاضة والنفرة إلى مزدلفة بعد مغيب شمس عرفة بسكينة ووقار',
      'صلاة المغرب والعشاء بمزدلفة جمع تأخير والمبيت بها حتى الفجر'
    ],
    duaa: 'لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    location: 'صعيد عرفات ➔ مشعر مزدلفة'
  },
  {
    id: 'day10',
    day: 'اليوم الثالث',
    date: '10 ذو الحجة (عيد الأضحى)',
    title: 'يوم النحر: رمي جمرة العقبة، الهدي، الحلق، وطواف الإفاضة',
    description: 'أعظم أيام الحج؛ يعود الحجاج من مزدلفة إلى مِنى لرمي جمرة العقبة الكبرى، ثم ذبح الهدي، والحلق أو التقصير، ثم طواف الإفاضة والسعي بالبيت العتيق.',
    acts: [
      'رمي جمرة العقبة الكبرى بسبع حصيات مع التكبير عند كل حصاة',
      'ذبح الهدي للمتمتع والقارن',
      'الحلق أو التقصير (والحلق للرجال أفضل) وبه يحصل التحلل الأول',
      'طواف الإفاضة بالمسجد الحرام والسعي للحج وبه يحصل التحلل الأكبر',
      'الرجوع للمبيت بمشعر مِنى ليالي أيام التشريق'
    ],
    duaa: 'اللَّهُمَّ اجْعَلْهُ حَجّاً مَبْرُوراً، وَذَنْباً مَغْفُوراً، وَسَعْياً مَشْكُوراً',
    location: 'مِنى ➔ المسجد الحرام'
  },
  {
    id: 'tashreeq',
    day: 'أيام التشريق والوداع',
    date: '11 - 13 ذو الحجة',
    title: 'رمي الجمرات الثلاث، المبيت بمِنى، وطواف الوداع',
    description: 'يقضي الحاج أيام التشريق بمنى ذاكراً لله، ويرمي الجمرات الثلاث (الصغرى فالوسطى فالكبرى) بعد الزوال، ثم يختم حجه بطواف الوداع قبل مغادرة مكة.',
    acts: [
      'المبيت بمِنى ليلتي 11 و12 للمتعجل، وليلة 13 للمتأخر',
      'رمي الجمرات الثلاث يومياً بعد الزوال بإحدى وعشرين حصاة',
      'الإكثار من ذكر الله والتكبير المقيد والمطلق',
      'طواف الوداع بالكعبة المشرفة قبل السفر ليكون آخر عهده بالبيت'
    ],
    duaa: 'اللَّهُمَّ إِنِّي عَبْدُكَ وَابْنُ عَبْدِكَ، حَمَلْتَنِي عَلَى دَابَّتِكَ وَسَيَّرْتَنِي فِي بِلادِكَ، حَتَّى أَدْخَلْتَنِي بَيْتَكَ، فَاغْفِرْ لِي وَتَقَبَّلْ مِنِّي',
    location: 'مشعر مِنى ➔ المسجد الحرام'
  }
];

export const HajjGuideSection: React.FC<HajjGuideSectionProps> = ({ onGoToQuran }) => {
  const [selectedDay, setSelectedDay] = useState<string>('day9');

  const currentStep = HAJJ_DAYS.find(s => s.id === selectedDay) || HAJJ_DAYS[2];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 font-amiri">
      {/* Portal Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-radial from-[#0a5c46] via-[#064E3B] to-[#02281e] text-white p-6 sm:p-10 border-2 border-[#C5A059]/40 shadow-xl text-center">
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#C5A059]/40 text-xs text-[#FCE596] font-serif">
            <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>منصة حج | hajj.ly · دليل مناسك الحج والعمرة التفاعلي</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-white">
            دَلِيلُ مَنَاسِكِ الحَجِّ وَالعُمْرَةِ
          </h1>

          <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-2xl mx-auto font-serif">
            دليل شرعي وعملي ميسر لحجاج بيت الله الحرام والمعتمرين يوضح أعمال المناسك خطوة بخطوة من الإحرام إلى طواف الوداع وفق الهدي النبوي الشريف.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onGoToQuran}
              className="px-5 py-2.5 bg-[#C5A059] hover:bg-[#B38D45] text-stone-900 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-2 cursor-pointer font-serif"
            >
              <BookOpen className="w-4 h-4 text-stone-900" />
              <span>تلاوة القرآن الكريم (قسم المصحف)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Days Tabs Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {HAJJ_DAYS.map((step) => {
          const isActive = step.id === selectedDay;
          return (
            <button
              key={step.id}
              onClick={() => setSelectedDay(step.id)}
              className={`px-4 py-3 rounded-2xl border text-right transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#064E3B] text-white border-[#C5A059] shadow-md scale-[1.02]'
                  : 'bg-white dark:bg-[#121A17] text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-[#C5A059]/60'
              }`}
            >
              <div className="text-[11px] font-bold opacity-80">{step.date}</div>
              <div className="text-sm sm:text-base font-bold font-serif whitespace-nowrap">{step.day}</div>
            </button>
          );
        })}
      </div>

      {/* Detailed Day Content Card */}
      <div className="bg-white dark:bg-[#121A17] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#064E3B] dark:text-emerald-400">
              <Calendar className="w-4 h-4 text-[#C5A059]" />
              <span>{currentStep.date} · {currentStep.day}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-serif">
              {currentStep.title}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-xs text-stone-600 dark:text-stone-300 shrink-0">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>الموقع: {currentStep.location}</span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed font-serif">
          {currentStep.description}
        </p>

        {/* Acts & Checklist */}
        <div className="space-y-3 pt-2">
          <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 flex items-center gap-2 font-serif">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>أبرز الأعمال والواجبات في هذا اليوم:</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentStep.acts.map((act, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/60 dark:bg-[#15201C] flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-[#064E3B]/10 dark:bg-emerald-950 text-[#064E3B] dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 font-serif leading-relaxed">
                  {act}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Duaa for the Day */}
        <div className="p-5 rounded-2xl border-2 border-[#C5A059]/40 bg-amber-50/70 dark:bg-amber-950/20 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>الدعاء والذكر المستحب في هذا اليوم:</span>
          </div>
          <p className="text-base sm:text-xl font-bold font-serif text-stone-900 dark:text-amber-100 leading-relaxed text-center py-2">
            «{currentStep.duaa}»
          </p>
        </div>
      </div>
    </div>
  );
};
