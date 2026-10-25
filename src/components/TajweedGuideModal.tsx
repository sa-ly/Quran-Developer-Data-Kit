import React from 'react';
import { X, Palette, Info } from 'lucide-react';
import { TAJWEED_RULES_CATALOG } from '../utils/tajweedParser';

interface TajweedGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TajweedGuideModal: React.FC<TajweedGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#121A17] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
        role="dialog"
        aria-labelledby="tajweed-modal-title"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-[#141E1B]">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-amber-700 dark:text-amber-400" />
            <h2 id="tajweed-modal-title" className="text-lg font-bold text-stone-900 dark:text-stone-100 font-serif">
              دليل الألوان الاصطلاحية لأحكام التجويد
            </h2>
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
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed bg-amber-50/70 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-200 dark:border-amber-800 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
            <span>
              تم تلوين الحركات والأحرف وفقاً للمعايير المعتمدة في مصاحف التجويد الملونة لتسهيل تطبيق أحكام التلاوة على القارئ، مع إمكانية تشغيل أو إيقاف التلوين بضغطة زر وتوافق كامل مع الوضعين الليلي والنهاري.
            </span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
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
        <div className="px-6 py-4 bg-stone-50 dark:bg-[#141E1B] border-t border-stone-200 dark:border-stone-800 flex justify-end">
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
