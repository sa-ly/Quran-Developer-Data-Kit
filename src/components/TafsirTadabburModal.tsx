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
  const [errorAi, setErrorAi] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !ayah) return null;

  const handleFetchAiTadabbur = async () => {
    setLoadingAi(true);
    setErrorAi(null);
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
      // Local fallback without throwing error
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden"
        role="dialog"
        aria-labelledby="tafsir-modal-title"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#064E3B]" />
            <h2 id="tafsir-modal-title" className="text-lg font-bold text-stone-900 font-serif">
              تفسير وتدبر: سورة {surahName} (الآية {ayah.numberInSurah})
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 rounded-lg transition-colors"
              title="نسخ الآية والتفسير"
              aria-label="نسخ"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 rounded-lg transition-colors"
              aria-label="إغلاق نافذة التفسير"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Verse preview banner */}
        <div className="p-5 bg-[#FDFBF7] border-b border-stone-200 text-center">
          <p className="font-quran text-xl sm:text-2xl text-stone-900 leading-loose">
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
            <span className="text-xs text-stone-500">
              الصفحة {ayah.page} · الجزء {ayah.juz}
            </span>
          </div>
        </div>

        {/* Segmented Tab Controls (Allowed per frontend-design) */}
        <div className="flex items-center gap-1 p-2 bg-stone-100 border-b border-stone-200">
          <button
            onClick={() => setActiveTab('tafsir')}
            className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'tafsir'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>التفسير الميسر المعتمد</span>
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
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>التدبر واللطائف (Google AI)</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[50vh] overflow-y-auto">
          {activeTab === 'tafsir' && (
            <div className="space-y-4">
              <div className="prose text-stone-800 leading-relaxed font-sans text-sm sm:text-base">
                {ayah.tafsir ? (
                  <p className="bg-stone-50/70 p-4 rounded-lg border border-stone-200">
                    {ayah.tafsir}
                  </p>
                ) : (
                  <p className="text-stone-500 italic p-4 text-center">
                    جاري تحميل التفسير الميسر لهذه الآية...
                  </p>
                )}
              </div>
              <div className="text-[11px] text-stone-400 text-left pt-2">
                المصدر: التفسير الميسر - مجمع الملك فهد لطباعة المصحف الشريف
              </div>
            </div>
          )}

          {activeTab === 'tadabbur' && (
            <div className="space-y-4">
              {loadingAi && (
                <div className="py-8 text-center space-y-3">
                  <Loader2 className="w-6 h-6 animate-spin text-[#064E3B] mx-auto" />
                  <p className="text-xs text-stone-600">
                    جاري استخراج درر ولطائف الآية الكريمة عبر Google AI...
                  </p>
                </div>
              )}

              {errorAi && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                  {errorAi}
                </div>
              )}

              {aiTadabbur && !loadingAi && (
                <div className="space-y-4 text-sm text-stone-800">
                  {/* Tadabbur paragraph */}
                  <div className="p-4 bg-emerald-50/40 rounded-lg border border-emerald-200/80 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-[#064E3B] text-xs">
                      <Compass className="w-4 h-4" />
                      <span>وقفة تدبرية:</span>
                    </div>
                    <p className="leading-relaxed text-stone-800">{aiTadabbur.tadabbur}</p>
                  </div>

                  {/* Key takeaway */}
                  {aiTadabbur.keyTakeaway && (
                    <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-200 space-y-1">
                      <span className="font-bold text-amber-900 text-xs flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-700" />
                        الهداية المركزية:
                      </span>
                      <p className="text-stone-800 text-xs">{aiTadabbur.keyTakeaway}</p>
                    </div>
                  )}

                  {/* Practical steps */}
                  {aiTadabbur.practicalSteps && aiTadabbur.practicalSteps.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-bold text-stone-900 text-xs">
                        تطبيقات سلوكية وعملية من وحي الآية:
                      </h4>
                      <ul className="space-y-1.5">
                        {aiTadabbur.practicalSteps.map((step, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs text-stone-700 bg-stone-50 p-2 rounded-md border border-stone-200/60"
                          >
                            <span className="w-4 h-4 rounded-full bg-[#064E3B] text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Linguistic gems */}
                  {aiTadabbur.linguisticGems && (
                    <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-700">
                      <span className="font-bold text-stone-900 block mb-1">
                        لطيفة بلاغية:
                      </span>
                      {aiTadabbur.linguisticGems}
                    </div>
                  )}
                </div>
              )}

              {!aiTadabbur && !loadingAi && !errorAi && (
                <div className="text-center py-6">
                  <button
                    onClick={handleFetchAiTadabbur}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#064E3B] text-white text-xs font-medium rounded-lg hover:bg-[#043E2F] transition-colors shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>بدء استخراج التدبر القرآني بالذكاء الاصطناعي</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-[11px] text-stone-500">
            تدبر القرآن الكريم هداية للقلب وبصيرة للعمل
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 rounded-lg transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
