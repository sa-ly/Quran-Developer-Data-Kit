import React from 'react';
import { X, Globe, Check, BookOpen } from 'lucide-react';
import { SUPPORTED_LANGUAGES, LanguageConfig } from '../utils/i18n';

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: string;
  onSelectLanguage: (lang: LanguageConfig) => void;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onSelectLanguage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-xl bg-white dark:bg-[#121A17] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
        role="dialog"
        aria-labelledby="lang-modal-title"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-[#141E1B]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#064E3B] text-white flex items-center justify-center shadow-xs">
              <Globe className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div>
              <h2 id="lang-modal-title" className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 font-serif">
                اختيار لغة التطبيق والترجمة
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Change Application Language & Quran Translation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 rounded-lg transition-colors"
            aria-label="إغلاق نافذة اختيار اللغة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Languages Grid */}
        <div className="p-5 max-h-[70vh] overflow-y-auto space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = currentLanguage === lang.code;

              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    onSelectLanguage(lang);
                    onClose();
                  }}
                  className={`p-3.5 rounded-xl border text-right transition-all flex items-start justify-between gap-2 cursor-pointer ${
                    isSelected
                      ? 'border-[#064E3B] bg-emerald-50/60 dark:bg-emerald-950/40 ring-1 ring-[#064E3B]'
                      : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-[#141E1B] hover:border-stone-300 dark:hover:border-stone-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                        {lang.nativeName}
                      </span>
                      <span className="text-xs text-stone-500 dark:text-stone-400">
                        ({lang.name})
                      </span>
                    </div>

                    <div className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1 flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-[#C5A059] shrink-0" />
                      <span>{lang.translatorName}</span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#064E3B] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-50 dark:bg-[#141E1B] border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <span className="text-xs text-stone-500 dark:text-stone-400">
            تراخيص الترجمات معتمدة من مجمع الملك فهد لطباعة المصحف الشريف
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-white bg-[#064E3B] hover:bg-[#043E2F] rounded-lg transition-colors"
          >
            تم
          </button>
        </div>
      </div>
    </div>
  );
};
