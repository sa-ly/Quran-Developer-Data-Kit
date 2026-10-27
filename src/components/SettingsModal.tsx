import React, { useState } from 'react';
import { X, Settings, Palette, ShieldCheck, Sliders, Info, BookCheck, Award, ExternalLink, Moon, Sun, Check, Sparkles } from 'lucide-react';
import { TAJWEED_RULES_CATALOG } from '../utils/tajweedParser';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'tajweed' | 'licenses' | 'preferences' | 'about';
  tajweedEnabled: boolean;
  setTajweedEnabled: (enabled: boolean) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  currentLanguage: string;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'tajweed',
  tajweedEnabled,
  setTajweedEnabled,
  darkMode,
  setDarkMode,
  currentLanguage,
}) => {
  const [activeTab, setActiveTab] = useState<'tajweed' | 'licenses' | 'preferences' | 'about'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 dark:bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 font-amiri">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#121A17] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-labelledby="settings-modal-title"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-[#141E1B]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#064E3B] dark:bg-emerald-800 text-[#C5A059] flex items-center justify-center">
              <Settings className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div>
              <h2 id="settings-modal-title" className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
                الإعدادات والمعلومات والتوثيق
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                الدليل التجويدي، التراخيص، الرواية، وإعدادات العرض
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 rounded-lg transition-colors"
            aria-label="إغلاق الإعدادات"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs Inside Modal */}
        <div className="flex items-center gap-1 p-2 bg-stone-100 dark:bg-stone-900/90 border-b border-stone-200 dark:border-stone-800 overflow-x-auto text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab('tajweed')}
            className={`py-1.5 px-3 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'tajweed'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-amber-600" />
            <span>دليل التجويد والرواية</span>
          </button>

          <button
            onClick={() => setActiveTab('preferences')}
            className={`py-1.5 px-3 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'preferences'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-600" />
            <span>تفضيلات العرض</span>
          </button>

          <button
            onClick={() => setActiveTab('licenses')}
            className={`py-1.5 px-3 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'licenses'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>التراخيص والمصادر</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`py-1.5 px-3 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'about'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <Info className="w-3.5 h-3.5 text-purple-600" />
            <span>عن المشروع والنشر</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {/* TAB 1: TAJWEED & RIWAYAH */}
          {activeTab === 'tajweed' && (
            <div className="space-y-4">
              {/* Narration Sanad Card */}
              <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/40 space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-bold text-sm">
                  <Award className="w-4 h-4 text-[#C5A059]" />
                  <span>توثيق القراءة والرواية المعتمدة:</span>
                </div>
                <div className="bg-white/90 dark:bg-[#101715]/90 p-3.5 rounded-lg border border-emerald-200 dark:border-emerald-800/80 space-y-2 text-xs sm:text-sm text-stone-800 dark:text-stone-200">
                  <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300 text-base">
                    <BookCheck className="w-4 h-4 text-[#064E3B] dark:text-emerald-400" />
                    <span>رواية حَفْص عن عَاصِم الكوفي من طريق الشَّاطِبِيَّة</span>
                  </div>
                  <ul className="pr-4 list-disc space-y-1.5 text-stone-700 dark:text-stone-300">
                    <li>
                      <strong className="text-stone-900 dark:text-stone-100">الراوي:</strong> الإمام أبو عمر حفص بن سليمان بن المغيرة الأسدي الكوفي (المتوفى 180 هـ).
                    </li>
                    <li>
                      <strong className="text-stone-900 dark:text-stone-100">القارئ:</strong> الإمام عاصم بن بهدلة أبي النَّجود الحنّاط الكوفي (المتوفى 127 هـ).
                    </li>
                    <li>
                      <strong className="text-stone-900 dark:text-stone-100">طريق الرواية:</strong> طريق الشاطبية من قصيدة «حرز الأماني ووجه التهاني» للإمام القاسم بن فيرُّه الشاطبي (المتوفى 590 هـ).
                    </li>
                    <li>
                      <strong className="text-stone-900 dark:text-stone-100">المطابقة الرسمية:</strong> مطابقة تامة لرسم وضبط «مصحف المدينة النبوية» الصادر عن مجمع الملك فهد لطباعة المصحف الشريف.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Tajweed Rules Grid */}
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-amber-600" />
                  <span>دليل الألوان الاصطلاحية لأحكام التجويد:</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TAJWEED_RULES_CATALOG.map((rule) => (
                    <div
                      key={rule.id}
                      className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-[#FDFBF7] dark:bg-[#15201C] space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                            style={{ backgroundColor: rule.color }}
                          />
                          <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">{rule.name}</h4>
                        </div>
                        <span className="text-[11px] text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-900 px-2 py-0.5 rounded border border-stone-200 dark:border-stone-800">
                          {rule.letters}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">{rule.description}</p>
                      <div className="pt-1.5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                        <span className="text-stone-400">مثال:</span>
                        <span className={`font-quran text-base ${rule.className}`} style={{ color: rule.color }}>
                          {rule.example}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PREFERENCES */}
          {activeTab === 'preferences' && (
            <div className="space-y-4">
              <div className="p-4 bg-stone-50 dark:bg-[#15201C] rounded-xl border border-stone-200 dark:border-stone-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">أحكام التجويد الملونة</h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">تلوين أحرف المدود والغنة والإدغام والإخفاء والقلقلة</p>
                  </div>
                  <button
                    onClick={() => setTajweedEnabled(!tajweedEnabled)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors flex items-center gap-1.5 ${
                      tajweedEnabled
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300'
                    }`}
                  >
                    {tajweedEnabled ? <Check className="w-3.5 h-3.5" /> : null}
                    <span>{tajweedEnabled ? 'مفعّل' : 'معطّل'}</span>
                  </button>
                </div>

                <div className="border-t border-stone-200 dark:border-stone-800 pt-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">الوضع الليلي (الداكن)</h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">خلفية داكنة زمردية ومذهبة مريحة للعين أثناء القراءة ليلاً</p>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors flex items-center gap-1.5 ${
                      darkMode
                        ? 'bg-amber-900/80 text-amber-200 border-amber-700'
                        : 'bg-white text-stone-800 border-stone-300'
                    }`}
                  >
                    {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
                    <span>{darkMode ? 'الوضع الليلي مفعّل' : 'الوضع النهاري مفعّل'}</span>
                  </button>
                </div>
              </div>

              <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800/80 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>
                  واجهة التطبيق مكتوبة بالكامل بالخط الأميري الأصيل المتناسق مع روح المصحف الشريف والخطوط العثمانية المعتمدة.
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: LICENSES */}
          {activeTab === 'licenses' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-xl border border-emerald-300 dark:border-emerald-800 text-xs sm:text-sm text-stone-800 dark:text-stone-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>بيان الامتثال القانوني والإسناد المفتوح:</span>
                </div>
                <p className="leading-relaxed text-xs">
                  "تم استخدام النصوص القرآنية من مشروع Tanzil.net بموجب رخصة Creative Commons Attribution 3.0، والخطوط القرآنية عبر رخصة SIL Open Font License 1.1 ومجمع الملك فهد لطباعة المصحف الشريف."
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-stone-50 dark:bg-[#15201C] rounded-xl border border-stone-200 dark:border-stone-800 space-y-1">
                  <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">1. مشروع تنزيل (Tanzil.net)</h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    النص القرآني المعتمد والمشكول بالرسم العثماني مأخوذ من مشروع تنزيل العالمي تحت رخصة CC-BY 3.0.
                  </p>
                </div>

                <div className="p-3.5 bg-stone-50 dark:bg-[#15201C] rounded-xl border border-stone-200 dark:border-stone-800 space-y-1">
                  <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">2. مجمع الملك فهد لطباعة المصحف الشريف</h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    التفسير الميسر المعتمد وضبط مصحف المدينة النبوية الشريفة (604 صفحة) مستند إلى إصدارات المجمع الموثقة.
                  </p>
                </div>

                <div className="p-3.5 bg-stone-50 dark:bg-[#15201C] rounded-xl border border-stone-200 dark:border-stone-800 space-y-1">
                  <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">3. الخطوط والطباعة الرقمية</h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    خط Amiri وخط Scheherazade New منشورة تحت رخصة SIL Open Font License (OFL-1.1).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ABOUT */}
          {activeTab === 'about' && (
            <div className="space-y-4">
              <div className="p-4 bg-stone-50 dark:bg-[#15201C] rounded-xl border border-stone-200 dark:border-stone-800 space-y-2">
                <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">المصحف الشريف الرقمي (Hafs 'an 'Asim Edition)</h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  تطبيق إسلامي حديث ومتكامل لخدمة كتاب الله العزيز، تم تصميمه وفق أعلى معايير الأصالة التراثية والدقة العلمية وسرعة التصفح الحديثة.
                </p>
              </div>

              <div className="p-3.5 bg-sky-50/70 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-800 space-y-2 text-xs">
                <span className="font-bold text-sky-900 dark:text-sky-200 block">النشر والاستضافة السحابية (Cloudflare Pages):</span>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  المشروع مهيأ 100% كـ Vite Single Page Application للبناء والنشر التلقائي بنقرة واحدة عبر Cloudflare Pages أو GitHub Pages مع دعم كامل للعمل أوفلاين دون الحاجة لخادم خلفي.
                </p>
              </div>
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
