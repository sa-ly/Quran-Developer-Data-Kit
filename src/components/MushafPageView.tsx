import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, BookOpen, Play, Bookmark as BookmarkIcon, Sparkles } from 'lucide-react';
import { Ayah, SurahMeta } from '../types/quran';
import { parseTajweedWord } from '../utils/tajweedParser';
import { TOTAL_PAGES_COUNT, getSurahByPage } from '../data/surahList';
import { AyahBadge } from './AyahBadge';

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
  onToggleBookmark,
  isBookmarked,
  playingAyahNumber,
  isPlaying,
}) => {
  const [pageInput, setPageInput] = useState(String(currentPage));

  const currentSurah = surahMeta || getSurahByPage(currentPage);

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
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-xl border border-stone-200 shadow-xs">
        <div className="flex items-center gap-2">
          {/* In RTL: Right button goes to previous page, Left button goes to next page */}
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-50 border border-stone-200 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed rounded-md transition-colors flex items-center gap-1"
            title="الصفحة السابقة"
            aria-label="الصفحة السابقة"
          >
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">السابقة</span>
          </button>

          <form onSubmit={handlePageSubmit} className="flex items-center gap-1.5">
            <span className="text-xs text-stone-500">صفحة:</span>
            <input
              type="number"
              min="1"
              max={TOTAL_PAGES_COUNT}
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              className="w-14 text-center text-xs font-bold font-mono py-1 border border-stone-200 rounded-md focus:outline-hidden focus:border-[#064E3B]"
              aria-label="رقم الصفحة"
            />
            <span className="text-xs text-stone-400">/ 604</span>
            <button
              type="submit"
              className="px-2 py-1 text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md border border-stone-200 transition-colors"
            >
              انتقال
            </button>
          </form>

          <button
            onClick={() => currentPage < TOTAL_PAGES_COUNT && onPageChange(currentPage + 1)}
            disabled={currentPage >= TOTAL_PAGES_COUNT}
            className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-50 border border-stone-200 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed rounded-md transition-colors flex items-center gap-1"
            title="الصفحة التالية"
            aria-label="الصفحة التالية"
          >
            <span className="hidden sm:inline">التالية</span>
            <ChevronLeft className="w-3.5 h-3.5" />
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
            className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#064E3B]"
            aria-label="شريط تصفح الصفحات"
          />
        </div>
      </div>

      {/* Physical Madinah Mushaf Page Simulator */}
      <div className="relative bg-[#FDFBF7] rounded-2xl border-2 border-[#C5A059]/50 shadow-md p-4 sm:p-8 islamic-border-frame min-h-[620px] flex flex-col justify-between">
        {/* Ornate Header Ribbon: Surah Name, Juz, Hizb */}
        <div className="flex items-center justify-between border-b-2 border-[#C5A059]/40 pb-3 mb-6 text-xs text-stone-700 font-serif">
          <div className="font-bold text-[#064E3B] text-sm">
            الجزء {currentSurah?.juz || 1}
          </div>
          <div className="text-base font-bold text-stone-900 px-3 py-0.5 bg-[#FAF8F5] border border-[#C5A059]/30 rounded-md">
            سورة {currentSurah?.name || 'الفاتحة'}
          </div>
          <div className="text-stone-600 font-medium">
            الحزب {Math.ceil((currentSurah?.juz || 1) * 2)}
          </div>
        </div>

        {/* Page Content */}
        {loading ? (
          <div className="my-auto py-24 text-center space-y-2 text-stone-500">
            <div className="w-8 h-8 border-2 border-[#064E3B] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs">جاري تحميل الصفحة {currentPage} من المصحف الشريف...</p>
          </div>
        ) : (
          <div className="my-auto text-justify leading-[2.6] font-quran text-xl sm:text-2xl text-stone-900 px-1 sm:px-4">
            {/* If this is the start of a surah, display surah header */}
            {currentSurah && currentSurah.page === currentPage && (
              <div className="mb-6 p-4 rounded-xl border border-[#C5A059]/50 bg-[#FAF8F5] text-center space-y-1">
                <h2 className="text-2xl font-bold font-serif text-[#064E3B]">
                  سُورَةُ {currentSurah.name}
                </h2>
                <div className="text-xs text-stone-500 font-sans">
                  {currentSurah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} · {currentSurah.numberOfAyahs} آيات
                </div>
                {currentSurah.number !== 9 && (
                  <p className="text-xl pt-2 font-serif text-stone-800">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                )}
              </div>
            )}

            {/* Verses stream */}
            {pageVerses.map((ayah) => {
              const isPlayingThis = playingAyahNumber === ayah.numberInSurah && isPlaying;
              const bookmarked = isBookmarked(ayah.numberInSurah);

              return (
                <span
                  key={ayah.number}
                  className={`inline transition-colors rounded-sm px-1 cursor-pointer group hover:bg-[#C5A059]/15 ${
                    isPlayingThis ? 'bg-emerald-100 text-[#064E3B] font-semibold' : ''
                  }`}
                  onClick={() => onPlayAyah(ayah)}
                  title={`الآية ${ayah.numberInSurah} - اضغط للاستماع`}
                >
                  {tajweedEnabled ? (
                    ayah.text.split(' ').map((word, wIdx) => {
                      const tokens = parseTajweedWord(word);
                      return (
                        <span key={wIdx} className="inline-block mx-0.5">
                          {tokens.map((token, tIdx) => (
                            <span key={tIdx} className={token.className}>
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
        <div className="border-t-2 border-[#C5A059]/40 pt-3 mt-6 flex items-center justify-between text-xs text-stone-600">
          <div className="flex items-center gap-2">
            {pageVerses[0] && (
              <button
                onClick={() => onOpenTafsir(pageVerses[0])}
                className="flex items-center gap-1 text-[11px] text-[#064E3B] hover:underline"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>تفسير آيات الصفحة</span>
              </button>
            )}
          </div>

          <div className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#C5A059]/50 flex items-center justify-center font-serif font-bold text-stone-900 shadow-xs">
            {currentPage}
          </div>

          <div className="text-[11px] text-stone-400">
            مصحف المدينة النبوية
          </div>
        </div>
      </div>
    </div>
  );
};
