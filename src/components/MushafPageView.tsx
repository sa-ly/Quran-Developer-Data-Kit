import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, BookOpen, Sparkles } from 'lucide-react';
import { Ayah, SurahMeta } from '../types/quran';
import { parseTajweedWord } from '../utils/tajweedParser';
import { TOTAL_PAGES_COUNT, getSurahByPage } from '../data/surahList';
import { AyahBadge } from './AyahBadge';
import { getUIText } from '../utils/i18n';

interface MushafPageViewProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  pageVerses: Ayah[];
  loading: boolean;
  surahMeta?: SurahMeta;
  tajweedEnabled: boolean;
  onPlayAyah: (ayah: Ayah) => void;
  onOpenTafsir: (ayah: Ayah) => void;
  onToggleBookmark: (ayah: Ayah) => void;
  isBookmarked: (ayahNumber: number) => boolean;
  playingAyahNumber: number | null;
  isPlaying: boolean;
  isDark: boolean;
  onOpenTajweedGuide: () => void;
  currentLanguage: string;
}

export const MushafPageView: React.FC<MushafPageViewProps> = ({
  currentPage,
  onPageChange,
  pageVerses,
  loading,
  surahMeta,
  tajweedEnabled,
  onPlayAyah,
  onOpenTafsir,
  isBookmarked,
  playingAyahNumber,
  isPlaying,
  isDark,
  onOpenTajweedGuide,
  currentLanguage,
}) => {
  const [pageInput, setPageInput] = useState(String(currentPage));

  const currentSurah = surahMeta || getSurahByPage(currentPage);
  const isRTL = currentLanguage === 'ar' || currentLanguage === 'ur';

  const handlePageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(pageInput, 10);
    if (!isNaN(val) && val >= 1 && val <= TOTAL_PAGES_COUNT) {
      onPageChange(val);
    } else {
      setPageInput(String(currentPage));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 pb-28 space-y-5">
      {/* Page Navigation & Jump Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-[#141E1B] rounded-xl border border-stone-200 dark:border-stone-800 shadow-xs transition-colors">
        <div className="flex items-center gap-2">
          {/* RTL vs LTR Page buttons */}
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed rounded-md transition-colors flex items-center gap-1"
            title={getUIText(currentLanguage, 'previousPage')}
            aria-label={getUIText(currentLanguage, 'previousPage')}
          >
            {isRTL ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{getUIText(currentLanguage, 'previousPage')}</span>
          </button>

          <form onSubmit={handlePageSubmit} className="flex items-center gap-1.5">
            <span className="text-xs text-stone-500 dark:text-stone-400">{getUIText(currentLanguage, 'page')}:</span>
            <input
              type="number"
              min="1"
              max={TOTAL_PAGES_COUNT}
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              className="w-14 text-center text-xs font-bold font-mono py-1 border border-stone-200 dark:border-stone-700 rounded-md bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-[#064E3B]"
              aria-label="رقم الصفحة"
            />
            <span className="text-xs text-stone-400 dark:text-stone-500">/ 604</span>
            <button
              type="submit"
              className="px-2 py-1 text-xs bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-md border border-stone-200 dark:border-stone-700 transition-colors"
            >
              {getUIText(currentLanguage, 'jump')}
            </button>
          </form>

          <button
            onClick={() => currentPage < TOTAL_PAGES_COUNT && onPageChange(currentPage + 1)}
            disabled={currentPage >= TOTAL_PAGES_COUNT}
            className="px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed rounded-md transition-colors flex items-center gap-1"
            title={getUIText(currentLanguage, 'nextPage')}
            aria-label={getUIText(currentLanguage, 'nextPage')}
          >
            <span className="hidden sm:inline">{getUIText(currentLanguage, 'nextPage')}</span>
            {isRTL ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Quick Range Slider */}
        <div className="flex items-center gap-2 w-full sm:w-48">
          <input
            type="range"
            min="1"
            max={TOTAL_PAGES_COUNT}
            value={currentPage}
            onChange={(e) => {
              const p = Number(e.target.value);
              setPageInput(String(p));
              onPageChange(p);
            }}
            className="w-full h-1.5 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#064E3B] dark:accent-emerald-500"
            aria-label="شريط تصفح الصفحات"
          />
        </div>
      </div>

      {/* Prominent Quick Tajweed Color Legend Strip */}
      {tajweedEnabled && (
        <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 px-3.5 bg-amber-50/80 dark:bg-[#131C1A] rounded-xl border border-amber-200/90 dark:border-stone-800 text-xs shadow-2xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="font-bold text-stone-900 dark:text-amber-100 font-serif">
              {getUIText(currentLanguage, 'tajweedKey')}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px]">
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-100/90 dark:bg-red-950/60 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-900 font-serif font-semibold">
              <span className="w-2 h-2 rounded-full bg-red-600 dark:bg-red-400" />
              {getUIText(currentLanguage, 'maddRule')}
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100/90 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900 font-serif font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-600 dark:bg-amber-400" />
              {getUIText(currentLanguage, 'ghunnahRule')}
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100/90 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 font-serif font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
              {getUIText(currentLanguage, 'idghamRule')}
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-100/90 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-900 font-serif font-semibold">
              <span className="w-2 h-2 rounded-full bg-sky-600 dark:bg-sky-400" />
              {getUIText(currentLanguage, 'qalqalahRule')}
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-100/90 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-900 font-serif font-semibold">
              <span className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400" />
              {getUIText(currentLanguage, 'iqlabRule')}
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-100/90 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900 font-serif font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
              {getUIText(currentLanguage, 'ikhfaRule')}
            </span>
          </div>

          <button
            onClick={onOpenTajweedGuide}
            className="text-[11px] font-bold text-amber-800 dark:text-amber-300 hover:underline flex items-center gap-1"
          >
            {getUIText(currentLanguage, 'details')}
          </button>
        </div>
      )}

      {/* Physical Madinah Mushaf Page Simulator */}
      <div className="relative bg-[#FDFBF7] dark:bg-[#121A17] rounded-2xl border-2 border-[#C5A059]/50 dark:border-[#C5A059]/40 shadow-md p-4 sm:p-8 islamic-border-frame min-h-[620px] flex flex-col justify-between transition-colors">
        {/* Ornate Header Ribbon: Surah Name, Juz, Hizb */}
        <div className="flex items-center justify-between border-b-2 border-[#C5A059]/40 dark:border-[#C5A059]/30 pb-3 mb-6 text-xs text-stone-700 dark:text-stone-300 font-serif">
          <div className="font-bold text-[#064E3B] dark:text-emerald-400 text-sm">
            {getUIText(currentLanguage, 'juz')} {currentSurah?.juz || 1}
          </div>
          <div className="text-base font-bold text-stone-900 dark:text-amber-100 px-3 py-0.5 bg-[#FAF8F5] dark:bg-[#141E1B] border border-[#C5A059]/30 rounded-md">
            سورة {currentSurah?.name || 'الفاتحة'}
          </div>
          <div className="text-stone-600 dark:text-stone-400 font-medium">
            {getUIText(currentLanguage, 'hizb')} {Math.ceil((currentSurah?.juz || 1) * 2)}
          </div>
        </div>

        {/* Page Content */}
        {loading ? (
          <div className="my-auto py-24 text-center space-y-2 text-stone-500">
            <div className="w-8 h-8 border-2 border-[#064E3B] dark:border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs">جاري تحميل الصفحة {currentPage} من المصحف الشريف...</p>
          </div>
        ) : (
          <div className="my-auto text-justify leading-[2.6] font-quran text-xl sm:text-2xl text-stone-900 dark:text-amber-50 px-1 sm:px-4">
            {/* If this is the start of a surah, display surah header */}
            {currentSurah && currentSurah.page === currentPage && (
              <div className="mb-6 p-4 rounded-xl border border-[#C5A059]/50 dark:border-[#C5A059]/40 bg-[#FAF8F5] dark:bg-[#141E1B] text-center space-y-1">
                <h2 className="text-2xl font-bold font-serif text-[#064E3B] dark:text-emerald-400">
                  سُورَةُ {currentSurah.name}
                </h2>
                <div className="text-xs text-stone-500 dark:text-stone-400 font-sans">
                  {currentSurah.revelationType === 'Meccan' ? getUIText(currentLanguage, 'meccan') : getUIText(currentLanguage, 'medinan')} · {currentSurah.numberOfAyahs} {getUIText(currentLanguage, 'ayahsCount')}
                </div>
                {currentSurah.number !== 9 && (
                  <p className="text-xl pt-2 font-serif text-stone-800 dark:text-amber-100">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                )}
              </div>
            )}

            {/* Verses stream */}
            {pageVerses.map((ayah) => {
              const isPlayingThis = playingAyahNumber === ayah.numberInSurah && isPlaying;

              return (
                <span
                  key={ayah.number}
                  className={`inline transition-colors rounded-sm px-1 cursor-pointer group hover:bg-[#C5A059]/15 dark:hover:bg-[#C5A059]/25 ${
                    isPlayingThis ? 'bg-emerald-100 dark:bg-emerald-950/60 text-[#064E3B] dark:text-emerald-300 font-semibold' : ''
                  }`}
                  onClick={() => onPlayAyah(ayah)}
                  title={`الآية ${ayah.numberInSurah} - اضغط للاستماع`}
                >
                  {tajweedEnabled ? (
                    ayah.text.split(' ').map((word, wIdx) => {
                      const tokens = parseTajweedWord(word, isDark);
                      return (
                        <span key={wIdx} className="inline-block mx-0.5">
                          {tokens.map((token, tIdx) => (
                            <span
                              key={tIdx}
                              className={token.className}
                              style={token.color ? { color: token.color } : undefined}
                              title={token.tooltip}
                            >
                              {token.text}
                            </span>
                          ))}
                          {' '}
                        </span>
                      );
                    })
                  ) : (
                    <span>{ayah.text} </span>
                  )}

                  {/* Ornate Islamic Ayah Medal */}
                  <AyahBadge ayahNumber={ayah.numberInSurah} />
                </span>
              );
            })}
          </div>
        )}

        {/* Page Footer: Page Number & Tafsir quick action */}
        <div className="border-t-2 border-[#C5A059]/40 dark:border-[#C5A059]/30 pt-3 mt-6 flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
          <div className="flex items-center gap-2">
            {pageVerses[0] && (
              <button
                onClick={() => onOpenTafsir(pageVerses[0])}
                className="flex items-center gap-1 text-[11px] text-[#064E3B] dark:text-emerald-400 hover:underline font-bold"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{getUIText(currentLanguage, 'tafsirAndTadabbur')}</span>
              </button>
            )}
          </div>

          <div className="w-9 h-9 rounded-full bg-[#FAF8F5] dark:bg-[#141E1B] border border-[#C5A059]/50 dark:border-[#C5A059]/40 flex items-center justify-center font-serif font-bold text-stone-900 dark:text-amber-100 shadow-xs">
            {currentPage}
          </div>

          <div className="text-[11px] text-stone-400 dark:text-stone-500 font-medium">
            {getUIText(currentLanguage, 'madinahMushaf')}
          </div>
        </div>
      </div>
    </div>
  );
};
