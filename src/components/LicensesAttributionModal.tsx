import React, { useState } from 'react';
import { X, Check, Copy, ShieldCheck, ExternalLink, BookOpen } from 'lucide-react';

interface LicensesAttributionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LicensesAttributionModal: React.FC<LicensesAttributionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const legalAttributionStatement =
    'تم استخدام النصوص القرآنية من مشروع Tanzil.net بموجب رخصة CC BY 3.0، والخطوط القرآنية عبر رخصة SIL OFL 1.1 ومجمع الملك فهد لطباعة المصحف الشريف.';

  const copyAttribution = () => {
    navigator.clipboard.writeText(legalAttributionStatement);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden"
        role="dialog"
        aria-labelledby="licenses-title"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#064E3B]" />
            <h2 id="licenses-title" className="text-lg font-bold text-stone-900 font-serif">
              التراخيص وإسناد المصادر الرسمية (Legal Attribution)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 rounded-lg transition-colors"
            aria-label="إغلاق نافذة التراخيص"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-sm leading-relaxed text-stone-700">
          {/* Prominent Legal Citation Notice Box */}
          <div className="p-4 bg-[#F5F1E8] rounded-lg border border-[#C5A059]/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#064E3B]" />
                صيغة الإسناد المعتمدة للامتثال القانوني الكامل:
              </span>
              <button
                onClick={copyAttribution}
                className="flex items-center gap-1 text-xs px-2.5 py-1 bg-white hover:bg-stone-50 border border-stone-300 rounded-md text-stone-700 transition-colors"
                aria-label="نسخ نص الإسناد"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'تم النسخ' : 'نسخ الإسناد'}</span>
              </button>
            </div>
            <p className="text-stone-900 font-medium font-serif text-base bg-white/70 p-3 rounded-md border border-stone-200/60">
              "{legalAttributionStatement}"
            </p>
          </div>

          {/* Section 1: Tanzil Project */}
          <div className="space-y-2 border-b border-stone-100 pb-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-stone-900 text-base">
                1. النص القرآني المعتمد (Tanzil.net)
              </h3>
              <span className="text-xs font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                CC BY 3.0
              </span>
            </div>
            <p className="text-stone-600">
              تم استيراد النصوص القرآنية بالرسم العثماني المعتمد والرسم الإملائي البسيط من مشروع تنزيل (Tanzil.net).
              الاستخدام يخضع لرخصة المشاع الإبداعي نَسب المصنّف 3.0 (Creative Commons Attribution 3.0)، مع الالتزام الصارم بنقل النص القرآني كما هو دون أي تحريف أو حذف أو تعديل إملائي.
            </p>
          </div>

          {/* Section 2: Tajweed rules JSON */}
          <div className="space-y-2 border-b border-stone-100 pb-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-stone-900 text-base">
                2. قواعد وبيانات التجويد (cpfair / quran-tajweed)
              </h3>
              <span className="text-xs font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                CC BY 4.0
              </span>
            </div>
            <p className="text-stone-600">
              مؤشرات نطاقات أحكام التجويد (المدود، الغنن، القلقلة، الإدغام، الإخفاء، والإقلاب) مبنية وموثقة استناداً إلى بيانات مشروع التجويد الرقمي المفتوح (cpfair / quran-tajweed) بموجب رخصة المشاع الإبداعي 4.0 (CC BY 4.0).
            </p>
          </div>

          {/* Section 3: Fonts (SIL OFL) */}
          <div className="space-y-2 border-b border-stone-100 pb-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-stone-900 text-base">
                3. الخطوط المتجهة المفتوحة (SIL OFL 1.1)
              </h3>
              <span className="text-xs font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                SIL OFL 1.1
              </span>
            </div>
            <p className="text-stone-600">
              خطوط <span className="font-semibold text-stone-800"><bdi>Amiri Quran</bdi></span> و <span className="font-semibold text-stone-800"><bdi>Scheherazade New</bdi></span> خاضعة لرخصة الخطوط الحرة المفتوحة SIL Open Font License 1.1، التي تسمح بالدمج والعرض والتوزيع الرقمي داخل التطبيقات والمواقع مجاناً.
            </p>
          </div>

          {/* Section 4: King Fahd Complex */}
          <div className="space-y-2 border-b border-stone-100 pb-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-stone-900 text-base">
                4. خطوط مجمع الملك فهد لطباعة المصحف الشريف (KFGQPC)
              </h3>
              <span className="text-xs font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                KFGQPC License
              </span>
            </div>
            <p className="text-stone-600">
              خطوط حفص والخطوط الصفحية (QCF V1 & V2) مطورة بواسطة مجمع الملك فهد لطباعة المصحف الشريف بالمدينة المنورة، ومتاحة للاستخدام غير التجاري والتوزيع ضمن التطبيقات كما هي دون تعديل بنيوي أو بيع مستقل.
            </p>
          </div>

          {/* Section 5: Audio Reciters Attribution */}
          <div className="space-y-2">
            <h3 className="font-bold text-stone-900 text-base">
              5. التلاوات الصوتية وشبكة EveryAyah
            </h3>
            <p className="text-stone-600">
              التلاوات الصوتية بصوت المشايخ الكرام (مشاري راشد العفاسي، محمود خليل الحصري، عبد الباسط عبد الصمد، سعد الغامدي) مستضافة عبر البنية التحتية لمشروع EveryAyah.com القرآني المفتوح للأمة الإسلامية.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-medium text-white bg-[#064E3B] hover:bg-[#043E2F] rounded-lg transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
