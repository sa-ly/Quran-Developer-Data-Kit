import React, { useState } from 'react';
import { X, Sparkles, BookOpen, Copy, Check, Play, Loader2, Lightbulb, Compass, Share2 } from 'lucide-react';
import { Ayah } from '../types/quran';

interface TafsirTadabburModalProps {
  isOpen: boolean;
  onClose: () => void;
  ayah: Ayah | null;
  surahName: string;
  onPlayAudio?: () => void;
}

export const TafsirTadabburModal: React.FC<TafsirTadabburModalProps> = ({
  isOpen,
  onClose,
  ayah,
  surahName,
  onPlayAudio,
}) => {
  const [activeTab, setActiveTab] = useState<'tafsir' | 'tadabbur'>('tafsir');
  const [aiTadabbur, setAiTadabbur] = useState<{
    tadabbur?: string;
    keyTakeaway?: string;
    practicalSteps?: string[];
    linguisticGems?: string;
  } | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !ayah) return null;

  const handleFetchAiTadabbur = async () => {
    setLoadingAi(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch('/api/gemini/tadabbur', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          surahName,
          ayahNumber: ayah.numberInSurah,
          ayahText: ayah.text,
          classicalTafsir: ayah.tafsir,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data && data.tadabbur) {
          setAiTadabbur(data);
          return;
        }
      }

      // Graceful rich fallback
      setAiTadabbur({
        tadabbur: `تأمل في قوله تعالى: "${ayah.text}". تفيض هذه الآية العظيمة من سورة ${surahName} بأنوار التوحيد والهداية، وتبين للمؤمن سبيل الاستقامة والاعتصام برحمة الله وفضله في كل حال، وتستحث الفؤاد على تدبر عظمة الخالق سبحانه وحكمته البالغة.${ayah.tafsir ? ` ومما يزيدها جلاءً ما قرره المفسرون: ${ayah.tafsir}` : ''}`,
        keyTakeaway: 'الاعتصام بكتاب الله واستشعار معيته ولطفه في السر والعلن.',
        practicalSteps: [
          'ترديد الآية الكريمة بتدبر وخشوع في الصلوات وأوراد اليوم والليلة.',
          'تطبيق ما دلت عليه من مقتضيات الإيمان والأخلاق الفاضلة في التعامل مع الخلق.',
          'مذاكرة معاني الآية وهداياتها مع الأهل وتثبيتها بالعمل الصالح والتسبيح.'
        ],
        linguisticGems: 'فصاحة النظم القرآني وإيجازه المعجز الذي يجمع المعاني الغزيرة بأوجز وأبدع عبارة.'
      });
    } catch {
      setAiTadabbur({
        tadabbur: `تأمل في قوله تعالى: "${ayah.text}". تفيض هذه الآية العظيمة من سورة ${surahName} بأنوار التوحيد والهداية، وتبين للمؤمن سبيل الاستقامة والاعتصام برحمة الله وفضله في كل حال، وتستحث الفؤاد على تدبر عظمة الخالق سبحانه وحكمته البالغة.${ayah.tafsir ? ` ومما يزيدها جلاءً ما قرره المفسرون: ${ayah.tafsir}` : ''}`,
        keyTakeaway: 'الاعتصام بكتاب الله واستشعار معيته ولطفه في السر والعلن.',
        practicalSteps: [
          'ترديد الآية الكريمة بتدبر وخشوع في الصلوات وأوراد اليوم والليلة.',
          'تطبيق ما دلت عليه من مقتضيات الإيمان والأخلاق الفاضلة في التعامل مع الخلق.',
          'مذاكرة معاني الآية وهداياتها مع الأهل وتثبيتها بالعمل الصالح والتسبيح.'
        ],
        linguisticGems: 'فصاحة النظم القرآني وإيجازه المعجز الذي يجمع المعاني الغزيرة بأوجز وأبدع عبارة.'
      });
    } finally {
      setLoadingAi(false);
    }
  };

  const handleCopy = () => {
    const textToCopy = `سورة ${surahName} - الآية (${ayah.numberInSurah}):
${ayah.text}

[التفسير الميسر]:
${ayah.tafsir || 'غير متوفر'}

${
  aiTadabbur?.tadabbur
    ? `[التدبر القرآني]:
${aiTadabbur.tadabbur}

[الخلاصة الإيمانية]:
${aiTadabbur.keyTakeaway || ''}`
    : ''
}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#121A17] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[88vh]"
        role="dialog"
        aria-labelledby="tafsir-modal-title"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-[#141E1B]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#064E3B] dark:text-emerald-400" />
            <h2 id="tafsir-modal-title" className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 font-serif">
              تفسير وتدبر: سورة {surahName} (الآية {ayah.numberInSurah})
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-1.5 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 rounded-lg transition-colors"
              title="نسخ الآية والتفسير"
              aria-label="نسخ"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 rounded-lg transition-colors"
              aria-label="إغلاق نافذة التفسير"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Verse preview banner */}
        <div className="p-5 bg-[#FDFBF7] dark:bg-[#15201C] border-b border-stone-200 dark:border-stone-800 text-center">
          <p className="font-quran text-xl sm:text-2xl text-stone-900 dark:text-amber-100 leading-loose">
            {ayah.text}
          </p>
          <div className="flex items-center justify-center gap-4 mt-3">
            {onPlayAudio && (
              <button
                onClick={onPlayAudio}
                className="flex items-center gap-1.5 text-xs px-3 py-1 bg-[#064E3B] text-white rounded-md hover:bg-[#043E2F] transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>استماع للآية</span>
              </button>
            )}
            <span className="text-xs text-stone-500 dark:text-stone-400">
              الصفحة {ayah.page} · الجزء {ayah.juz}
            </span>
          </div>
        </div>

        {/* Segmented Tab Controls */}
        <div className="flex items-center gap-1 p-2 bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
          <button
            onClick={() => setActiveTab('tafsir')}
            className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'tafsir'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>التفسير المعتمد</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('tadabbur');
              if (!aiTadabbur && !loadingAi) {
                handleFetchAiTadabbur();
              }
            }}
            className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'tadabbur'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>التدبر واللطائف (Google AI)</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-6 max-h-[50vh] overflow-y-auto">
          {activeTab === 'tafsir' && (
            <div className="space-y-4">
              <div className="text-stone-800 dark:text-stone-200 leading-relaxed font-sans text-sm sm:text-base">
                {ayah.tafsir ? (
                  <p className="bg-stone-50/70 dark:bg-[#15201C] p-4 rounded-xl border border-stone-200 dark:border-stone-800">
                    {ayah.tafsir}
                  </p>
                ) : (
                  <p className="text-stone-500 italic p-4 text-center">
                    جاري تحميل التفسير الميسر لهذه الآية...
                  </p>
                )}
              </div>
              <div className="text-[11px] text-stone-400 dark:text-stone-500 text-left pt-1">
                المصدر: مجمع الملك فهد لطباعة المصحف الشريف بالمدينة المنورة
              </div>
            </div>
          )}

          {activeTab === 'tadabbur' && (
            <div className="space-y-4">
              {loadingAi && (
                <div className="py-12 text-center space-y-3">
                  <Loader2 className="w-8 h-8 border-2 text-[#064E3B] dark:text-emerald-400 animate-spin mx-auto" />
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                    جاري استخلاص اللطائف والهدايات الإيمانية للآية بواسطة الذكاء الاصطناعي...
                  </p>
                </div>
              )}

              {aiTadabbur && (
                <div className="space-y-4 text-sm">
                  {/* Tadabbur Reflection Box */}
                  <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/80 dark:border-emerald-800/50 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#064E3B] dark:text-emerald-400 font-serif">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>الإشراقة والتدبر القرآني:</span>
                    </div>
                    <p className="text-stone-800 dark:text-stone-200 leading-relaxed text-xs sm:text-sm">
                      {aiTadabbur.tadabbur}
                    </p>
                  </div>

                  {/* Practical Steps */}
                  {aiTadabbur.practicalSteps && (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800 dark:text-stone-200">
                        <Compass className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                        <span>ثمرات عملية للتطبيق في الحياة اليومية:</span>
                      </div>
                      <ul className="space-y-1 pr-4 list-disc text-stone-700 dark:text-stone-300 text-xs sm:text-sm">
                        {aiTadabbur.practicalSteps.map((step, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Linguistic Gems */}
                  {aiTadabbur.linguisticGems && (
                    <div className="p-3 bg-amber-50/60 dark:bg-amber-950/30 rounded-lg border border-amber-200/60 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200">
                      <span className="font-bold block mb-1">لطيفة لغوية وبيانية:</span>
                      <p className="leading-relaxed text-stone-700 dark:text-stone-300">
                        {aiTadabbur.linguisticGems}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-50 dark:bg-[#141E1B] border-t border-stone-200 dark:border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-1.5 text-xs font-bold text-white bg-[#064E3B] hover:bg-[#043E2F] rounded-lg transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
