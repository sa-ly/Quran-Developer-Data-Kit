import React from 'react';
import { ShieldCheck, Settings } from 'lucide-react';

interface FooterProps {
  onOpenLicenses: () => void;
  onOpenTajweedGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLicenses,
  onOpenTajweedGuide,
}) => {
  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-[#0c1311] py-8 text-stone-600 dark:text-stone-400 text-sm transition-colors font-amiri">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        {/* Prominent Legal Attribution statement */}
        <div className="p-4 bg-[#F5F1E8]/80 dark:bg-[#141E1B] rounded-xl border border-[#C5A059]/30 dark:border-stone-800 text-center max-w-3xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-1.5 font-bold text-stone-900 dark:text-stone-100 font-serif text-base">
            <ShieldCheck className="w-4 h-4 text-[#064E3B] dark:text-emerald-400" />
            <span>بيان الإسناد والامتثال القانوني للتراخيص</span>
          </div>
          <p className="text-stone-800 dark:text-stone-300 leading-relaxed font-serif text-sm">
            "تم استخدام النصوص القرآنية من مشروع Tanzil.net بموجب رخصة CC BY 3.0، والخطوط القرآنية عبر رخصة SIL OFL 1.1 ومجمع الملك فهد لطباعة المصحف الشريف."
          </p>
          <div className="pt-1">
            <button
              onClick={onOpenLicenses}
              className="text-xs font-semibold text-[#064E3B] dark:text-emerald-400 hover:underline cursor-pointer"
            >
              عرض تفاصيل التراخيص والمصادر الكاملة ←
            </button>
          </div>
        </div>

        {/* Clean Secondary Links & Editorial Notes */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-200/60 dark:border-stone-800 text-stone-500 dark:text-stone-400 text-xs font-serif">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-700 dark:text-stone-300">المصحف الشريف الرقمي</span>
            <span aria-hidden="true">·</span>
            <span>الرسم العثماني المعتمد</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-800 dark:text-emerald-400">رواية حفص عن عاصم (طريق الشاطبية)</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenTajweedGuide}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
            >
              دليل أحكام التجويد
            </button>
            <button
              onClick={onOpenLicenses}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
            >
              التراخيص المفتوحة
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
