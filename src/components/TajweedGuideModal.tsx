import React from 'react';
import { X, Palette, Info, Award, BookCheck, ShieldCheck } from 'lucide-react';
import { TAJWEED_RULES_CATALOG } from '../utils/tajweedParser';

interface TajweedGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TajweedGuideModal: React.FC<TajweedGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#121A17] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-labelledby="tajweed-modal-title"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-[#141E1B]">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-amber-700 dark:text-amber-400" />
            <div>
              <h2 id="tajweed-modal-title" className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 font-serif">
                دليل وضوابط أحكام التجويد الملونة
              </h2>
              <p className="text-[11px] text-emerald-800 dark:text-emerald-400 font-medium">
                رواية حفص عن عاصم بن أبي النَّجود من طريق الشاطبية
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 rounded-lg transition-colors"
            aria-label="إغلاق دليل التجويد"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {/* Prominent Recitation & Sanad Clarification Banner */}
          <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/40 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-bold text-xs sm:text-sm">
              <Award className="w-4 h-4 text-[#C5A059]" />
              <span>توثيق القراءة والرواية المعتمدة في هذا المصحف:</span>
            </div>
            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
              هذا المصحف الشريف وضوابط التجويد الملونة مضبوطة بالكامل على:
            </p>
            <div className="bg-white/80 dark:bg-[#101715]/90 p-3 rounded-lg border border-emerald-200 dark:border-emerald-800/80 space-y-1.5 text-xs text-stone-800 dark:text-stone-200">
              <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                <BookCheck className="w-4 h-4 text-[#064E3B] dark:text-emerald-400" />
                <span>رواية حَفْص عن عَاصِم بن أبي النَّجُود الكوفي من طريق الشَّاطِبِيَّة</span>
              </div>
              <ul className="pr-4 list-disc space-y-1 text-stone-600 dark:text-stone-300 text-[11px]">
                <li>
                  <strong className="text-stone-800 dark:text-stone-200">الراوي:</strong> الإمام أبو عمر حفص بن سليمان بن المغيرة الأسدي الكوفي (المتوفى 180 هـ).
                </li>
                <li>
                  <strong className="text-stone-800 dark:text-stone-200">القارئ الأصل:</strong> الإمام عاصم بن بهدلة أبي النَّجود الحنّاط الكوفي (المتوفى 127 هـ).
                </li>
                <li>
                  <strong className="text-stone-800 dark:text-stone-200">طريق الرواية:</strong> طريق الشاطبية من منظومة «حرز الأماني ووجه التهاني» للإمام القاسم بن فيرُّه الشاطبي (المتوفى 590 هـ).
                </li>
                <li>
                  <strong className="text-stone-800 dark:text-stone-200">المطابقة الرسمية:</strong> مطابقة تامة لرسم وضبط «مصحف المدينة النبوية» الصادر عن مجمع الملك فهد لطباعة المصحف الشريف.
                </li>
              </ul>
            </div>
            <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-normal pt-1">
              * ملاحظة فنية: تختلف أزمنة المدود وأحكام الإمالات وتسهيل الهمزات بين القراءات العشر (كقالون وورش والدوري). وفي هذا المصحف تم الالتزام بأصول الشاطبية لحفص (توسط المد المنفصل والمتصل 4-5 حركات، ومد البدل حركتان، والسكتات الأربع الواجبة لحفص).
            </p>
          </div>

          {/* Quick Notice */}
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed bg-amber-50/70 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-200 dark:border-amber-800 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
            <span>
              تم تلوين الحركات والأحرف وفق المعايير المعتمدة في مصاحف التجويد الملونة لتسهيل تطبيق أحكام التلاوة على القارئ، مع إمكانية تشغيل أو إيقاف التلوين بضغطة زر وتوافق كامل مع الوضعين الليلي والنهاري.
            </span>
          </p>

          {/* Catalog of Rules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {TAJWEED_RULES_CATALOG.map((rule) => (
              <div
                key={rule.id}
                className="p-3.5 rounded-lg border border-stone-200/90 dark:border-stone-800 bg-[#FDFBF7] dark:bg-[#15201C] hover:border-stone-300 dark:hover:border-stone-700 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                      style={{ backgroundColor: rule.color }}
                    />
                    <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">{rule.name}</h3>
                  </div>
                  <span className="text-[11px] font-cairo font-medium text-stone-600 dark:text-stone-300 bg-white dark:bg-stone-900 px-2 py-0.5 rounded border border-stone-200 dark:border-stone-700">
                    {rule.letters}
                  </span>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">{rule.description}</p>

                <div className="pt-1.5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">مثال قرآني:</span>
                  <span
                    className={`font-quran text-base ${rule.className}`}
                    style={{ color: rule.color }}
                  >
                    {rule.example}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-50 dark:bg-[#141E1B] border-t border-stone-200 dark:border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-[#064E3B] hover:bg-[#043E2F] rounded-lg transition-colors"
          >
            فهمت، شكراً
          </button>
        </div>
      </div>
    </div>
  );
};
