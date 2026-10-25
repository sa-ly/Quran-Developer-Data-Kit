import React, { useState, useEffect } from 'react';
import { X, BookOpen, Download, Check, Sparkles, Star, ChevronLeft, ChevronRight, FileText, Loader2 } from 'lucide-react';
import { ACCREDITED_TAFSIR_EDITIONS, TafsirEdition } from '../data/tafsirEditions';
import { SURAH_LIST } from '../data/surahList';
import { fetchSpecificTafsir, fetchSurahVerses } from '../services/quranApi';
import { Ayah } from '../types/quran';

interface TafsirLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTafsirId: string;
  onSelectTafsir: (edition: TafsirEdition) => void;
  currentSurahNumber: number;
}

export const TafsirLibraryModal: React.FC<TafsirLibraryModalProps> = ({
  isOpen,
  onClose,
  activeTafsirId,
  onSelectTafsir,
  currentSurahNumber,
}) => {
  const [selectedSurah, setSelectedSurah] = useState(currentSurahNumber);
  const [previewEdition, setPreviewEdition] = useState<TafsirEdition>(
    () => ACCREDITED_TAFSIR_EDITIONS.find(t => t.id === activeTafsirId) || ACCREDITED_TAFSIR_EDITIONS[0]
  );
  const [previewAyahs, setPreviewAyahs] = useState<Ayah[]>([]);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    setSelectedSurah(currentSurahNumber);
  }, [currentSurahNumber]);

  // Load preview verses with the selected tafsir
  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    async function loadData() {
      setLoadingPreview(true);
      const ayahs = await fetchSurahVerses(selectedSurah, previewEdition.apiIdentifier);
      if (!cancelled) {
        setPreviewAyahs(ayahs);
        setLoadingPreview(false);
      }
    }
    loadData();
    return () => {
      cancelled = true;
    };
  }, [isOpen, selectedSurah, previewEdition.id]);

  if (!isOpen) return null;

  const currentSurahMeta = SURAH_LIST.find(s => s.number === selectedSurah) || SURAH_LIST[0];

  // Export and download Tafsir for the current Surah
  const handleDownloadTafsir = () => {
    const title = `تفسير سورة ${currentSurahMeta.name} - ${previewEdition.name}`;
    const header = `=========================================\n${title}\nالمؤلف: ${previewEdition.author}\nالمصدر: المصحف الشريف الرقمي\n=========================================\n\n`;
    
    const content = previewAyahs.map(a => {
      return `[الآية ${a.numberInSurah}]:\n${a.text}\n\nالتفسير:\n${a.tafsir || 'لا يتوفر نص مخصص'}\n\n-----------------------------------------`;
    }).join('\n\n');

    const fullText = header + content;
    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Tafsir_${currentSurahMeta.name}_${previewEdition.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-[#121A17] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-labelledby="tafsir-library-title"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-[#141E1B]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#064E3B] text-[#C5A059] flex items-center justify-center font-bold text-lg shadow-xs">
              <BookOpen className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div>
              <h2 id="tafsir-library-title" className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 font-serif">
                مكتبة التفاسير المعتمدة وعلوم القرآن
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                مجموعة من أمهات كتب التفسير بالمأثور واللغة المتاحة للقراءة الفورية والتنزيل
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 rounded-lg transition-colors"
            aria-label="إغلاق مكتبة التفاسير"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body (2-column layout on desktop) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-stone-200 dark:divide-stone-800">
          {/* Left Column: List of Editions */}
          <div className="md:col-span-5 p-4 sm:p-5 space-y-3 bg-[#FDFBF7] dark:bg-[#0F1714] overflow-y-auto">
            <div className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center justify-between pb-1">
              <span>اختر التفسير المعتمد:</span>
              <span className="text-[11px] text-stone-500">
                {ACCREDITED_TAFSIR_EDITIONS.length} تفاسير متاحة
              </span>
            </div>

            <div className="space-y-2">
              {ACCREDITED_TAFSIR_EDITIONS.map((edition) => {
                const isActive = activeTafsirId === edition.id;
                const isSelectedForPreview = previewEdition.id === edition.id;

                return (
                  <div
                    key={edition.id}
                    onClick={() => setPreviewEdition(edition)}
                    className={`p-3.5 rounded-xl border text-right transition-all cursor-pointer relative ${
                      isSelectedForPreview
                        ? 'border-[#064E3B] bg-emerald-50/50 dark:bg-emerald-950/40 ring-1 ring-[#064E3B]'
                        : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-[#141E1B] hover:border-stone-300 dark:hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 pb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-stone-900 dark:text-stone-100 font-serif">
                          {edition.name}
                        </span>
                        {edition.popular && (
                          <span className="text-[10px] bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 px-1.5 py-0.2 rounded font-medium">
                            شائع
                          </span>
                        )}
                      </div>
                      {isActive && (
                        <span className="text-[11px] font-bold text-[#064E3B] dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          المعتمد حالياً
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-stone-600 dark:text-stone-300 font-medium">
                      {edition.author}
                    </div>

                    <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed pt-1.5 line-clamp-2">
                      {edition.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[10px] text-stone-400 dark:text-stone-500">
                        الحقبة: {edition.era}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTafsir(edition);
                        }}
                        className={`text-[11px] px-2.5 py-1 rounded-md font-bold transition-colors ${
                          isActive
                            ? 'bg-[#064E3B] text-white'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-[#064E3B] hover:text-white'
                        }`}
                      >
                        {isActive ? 'التفسير النشط' : 'اعتماده للتلاوة'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Preview & Surah Downloader */}
          <div className="md:col-span-7 p-4 sm:p-5 flex flex-col justify-between space-y-4 bg-white dark:bg-[#121A17] overflow-y-auto">
            {/* Top Toolbar: Surah selector & Download Button */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-700 dark:text-stone-300">السورة:</span>
                <select
                  value={selectedSurah}
                  onChange={(e) => setSelectedSurah(Number(e.target.value))}
                  className="text-xs font-bold bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 rounded-lg py-1 px-2.5"
                  aria-label="اختيار سورة للتفسير"
                >
                  {SURAH_LIST.map((s) => (
                    <option key={s.number} value={s.number}>
                      {s.number}. سورة {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Download Action */}
              <button
                onClick={handleDownloadTafsir}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all shadow-xs ${
                  downloadSuccess
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-[#064E3B] hover:bg-[#043E2F] text-[#FAF8F5] border-[#064E3B]'
                }`}
                title="تنزيل نص التفسير للسورة المختارة بصيغة نصية كاملة"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>تم التنزيل بنجاح!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>تنزيل التفسير كاملاً (ملف TXT)</span>
                  </>
                )}
              </button>
            </div>

            {/* Edition Info Header */}
            <div className="p-3 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200/80 dark:border-amber-800/50">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200">
                <FileText className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                <span>معاينة: {previewEdition.name}</span>
                <span className="text-stone-400 dark:text-stone-500 font-normal">·</span>
                <span className="font-medium text-stone-700 dark:text-stone-300">سورة {currentSurahMeta.name}</span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 pt-1">
                {previewEdition.description}
              </p>
            </div>

            {/* Preview Verses Stream */}
            <div className="flex-1 space-y-3 overflow-y-auto max-h-[380px] pr-1">
              {loadingPreview ? (
                <div className="py-20 text-center text-stone-500 space-y-2">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#064E3B]" />
                  <p className="text-xs">جاري تحميل نصوص التفسير المعتمدة...</p>
                </div>
              ) : previewAyahs.length === 0 ? (
                <div className="py-16 text-center text-stone-400 text-xs">
                  لا تتوفر بيانات حالياً لهذه السورة
                </div>
              ) : (
                previewAyahs.slice(0, 10).map((a) => (
                  <div
                    key={a.numberInSurah}
                    className="p-3.5 bg-stone-50/70 dark:bg-[#15201C] rounded-xl border border-stone-200 dark:border-stone-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 pb-1 border-b border-stone-200/60 dark:border-stone-800">
                      <span className="font-bold text-[#064E3B] dark:text-emerald-400 font-serif">
                        الآية {a.numberInSurah}
                      </span>
                    </div>

                    <p className="font-quran text-lg text-stone-900 dark:text-amber-100 leading-relaxed font-serif">
                      {a.text}
                    </p>

                    <div className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed pt-1 font-cairo bg-white dark:bg-[#101715] p-2.5 rounded-lg border border-stone-200/70 dark:border-stone-800">
                      {a.tafsir || 'جاري توفير نص التفسير...'}
                    </div>
                  </div>
                ))
              )}
              {previewAyahs.length > 10 && (
                <p className="text-center text-[11px] text-stone-400 pt-1">
                  عرض أول 10 آيات من السورة للمعاينة السريعة · استخدم زر التنزيل للحصول على كامل التفسير
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-stone-50 dark:bg-[#141E1B] border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>يمكنك أيضاً استخدام التدبر الذكي المباشر من خلال الضغط على أيقونة الكتاب بجوار أي آية.</span>
          </div>

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
