import React from 'react';
import { ShieldCheck, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  onOpenLicenses: () => void;
  onOpenTajweedGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLicenses,
  onOpenTajweedGuide,
}) => {
  return (
    <footer className="border-t border-stone-200 bg-[#FAF8F5] py-8 text-stone-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        {/* Prominent Legal Attribution statement as explicitly requested by prompt */}
        <div className="p-4 bg-[#F5F1E8]/80 rounded-xl border border-[#C5A059]/30 text-center max-w-3xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-1.5 font-bold text-stone-900 font-serif text-sm">
            <ShieldCheck className="w-4 h-4 text-[#064E3B]" />
            <span>بيان الإسناد والامتثال القانوني للتراخيص</span>
          </div>
          <p className="text-stone-800 leading-relaxed font-serif text-sm">
            "تم استخدام النصوص القرآنية من مشروع Tanzil.net بموجب رخصة CC BY 3.0، والخطوط القرآنية عبر رخصة SIL OFL 1.1 ومجمع الملك فهد لطباعة المصحف الشريف."
          </p>
          <div className="pt-1">
            <button
              onClick={onOpenLicenses}
              className="text-xs font-semibold text-[#064E3B] hover:underline"
            >
              عرض تفاصيل التراخيص والمصادر الكاملة ←
            </button>
          </div>
        </div>

        {/* Clean Secondary Links & Editorial Notes (Zero-pill discipline) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-200/60 text-stone-500 text-[11px]">
          <div className="flex items-center gap-2">
            <span>المصحف الشريف الرقمي</span>
            <span aria-hidden="true">·</span>
            <span>الرسم العثماني المعتمد</span>
            <span aria-hidden="true">·</span>
            <span>رواية حفص عن عاصم</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenTajweedGuide}
              className="hover:text-stone-900 transition-colors"
            >
              دليل أحكام التجويد
            </button>
            <button
              onClick={onOpenLicenses}
              className="hover:text-stone-900 transition-colors"
            >
              التراخيص المفتوحة
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
