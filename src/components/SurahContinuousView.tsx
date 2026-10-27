import React, { useState } from 'react';
import { Play, Pause, BookOpen, Bookmark as BookmarkIcon, Copy, Check, ChevronRight, ChevronLeft, Sparkles, Languages } from 'lucide-react';
import { Ayah, SurahMeta } from '../types/quran';
import { parseTajweedWord } from '../utils/tajweedParser';
import { SURAH_LIST } from '../data/surahList';
import { AyahBadge } from './AyahBadge';
import { getUIText } from '../utils/i18n';

interface SurahContinuousViewProps {
  surah: SurahMeta;
  ayahs: Ayah[];
  loading: boolean;
  onSelectSurah: (surahNumber: number) => void;
  playingAyahNumber: number | null;
  isPlaying: boolean;
  onPlayAyah: (ayah: Ayah) => void;
  onOpenTafsir: (ayah: Ayah) => void;
  onToggleBookmark: (ayah: Ayah) => void;
  isBookmarked: (ayahNumber: number) => boolean;
  tajweedEnabled: boolean;
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  selectedFont: 'quran' | 'scheherazade' | 'amiri';
  setSelectedFont: (font: 'quran' | 'scheherazade' | 'amiri') => void;
  isDark: boolean;
  onOpenTajweedGuide: () => void;
  currentLanguage: string;
}

export const SurahContinuousView: React.FC<SurahContinuousViewProps> = ({
  surah,
  ayahs,
  loading,
  onSelectSurah,
  playingAyahNumber,
  isPlaying,
  onPlayAyah,
  onOpenTafsir,
  onToggleBookmark,
  isBookmarked,
  tajweedEnabled,
  fontSize,
  setFontSize,
  selectedFont,
  setSelectedFont,
  isDark,
  onOpenTajweedGuide,
  currentLanguage,
}) => {
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);

  const handleCopyAyah = (ayah: Ayah) => {
    const textToCopy = `${ayah.text} [سورة ${surah.name}: ${ayah.numberInSurah}]${
      ayah.translation ? `\n\n"${ayah.translation}"` : ''
    }`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedAyah(ayah.numberInSurah);
    setTimeout(() => setCopiedAyah(null), 2000);
  };

  const fontClass =
    selectedFont === 'quran'
      ? 'font-quran'
      : selectedFont === 'scheherazade'
      ? 'font-scheherazade'
      : 'font-amiri';

  const isRTL = currentLanguage === 'ar' || currentLanguage === 'ur';

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 pb-28 space-y-5">
      {/* Top Reading Bar & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-white dark:bg-[#141E1B] rounded-xl border border-stone-200 dark:border-stone-800 shadow-xs transition-colors">
        {/* Surah Navigation selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => surah.number > 1 && onSelectSurah(surah.number - 1)}
            disabled={surah.number <= 1}
            className="p-1.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-md border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800"
            title={getUIText(currentLanguage, 'previousSurah')}
            aria-label={getUIText(currentLanguage, 'previousSurah')}
          >
            {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          <select
            value={surah.number}
            onChange={(e) => onSelectSurah(Number(e.target.value))}
            className="text-xs font-bold text-stone-900 dark:text-stone-100 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg py-1.5 px-3 focus:outline-hidden cursor-pointer"
            aria-label={getUIText(currentLanguage, 'selectSurah')}
          >
            {SURAH_LIST.map((s) => (
              <option key={s.number} value={s.number}>
                {s.number}. سورة {s.name} ({s.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}) - {s.numberOfAyahs} آيات
              </option>
            ))}
          </select>

          <button
            onClick={() => surah.number < 114 && onSelectSurah(surah.number + 1)}
            disabled={surah.number >= 114}
            className="p-1.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-md border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800"
            title={getUIText(currentLanguage, 'nextSurah')}
            aria-label={getUIText(currentLanguage, 'nextSurah')}
          >
            {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Font styling & Size toggles */}
        <div className="flex items-center gap-3">
          {/* Font Family selector */}
          <div className="flex items-center gap-1 text-xs text-stone-600 dark:text-stone-300">
            <span className="hidden sm:inline">{getUIText(currentLanguage, 'font')}:</span>
            <select
              value={selectedFont}
              onChange={(e: any) => setSelectedFont(e.target.value)}
              className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-md py-1 px-2 text-xs text-stone-800 dark:text-stone-200"
              aria-label="اختيار خط المصحف"
            >
              <option value="quran">أميري قرآني (Amiri Quran)</option>
              <option value="scheherazade">شهرزاد (Scheherazade)</option>
              <option value="amiri">أميري عادي (Amiri Standard)</option>
            </select>
          </div>

          {/* Font Size Buttons */}
          <div className="flex items-center gap-1 border border-stone-200 dark:border-stone-700 rounded-md p-0.5 bg-stone-50 dark:bg-stone-900">
            <button
              onClick={() => setFontSize((s) => Math.max(20, s - 2))}
              className="px-2 py-0.5 text-xs text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800 rounded transition-colors font-bold"
              title={getUIText(currentLanguage, 'decreaseFont')}
              aria-label={getUIText(currentLanguage, 'decreaseFont')}
            >
              -A
            </button>
            <span className="text-[11px] font-mono px-1 text-stone-500 dark:text-stone-400 tabular-nums">{fontSize}</span>
            <button
              onClick={() => setFontSize((s) => Math.min(44, s + 2))}
              className="px-2 py-0.5 text-xs text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800 rounded transition-colors font-bold"
              title={getUIText(currentLanguage, 'increaseFont')}
              aria-label={getUIText(currentLanguage, 'increaseFont')}
            >
              +A
            </button>
          </div>
        </div>
      </div>

      {/* Prominent Quick Tajweed Color Legend Strip */}
      {tajweedEnabled && (
        <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 px-3.5 bg-amber-50/80 dark:bg-[#131C1A] rounded-xl border border-amber-200/90 dark:border-stone-800 text-xs shadow-2xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
              <span className="font-bold text-stone-900 dark:text-amber-100 font-serif">
                {getUIText(currentLanguage, 'tajweedKey')}
              </span>
              <span className="text-[10px] text-emerald-800 dark:text-emerald-300 font-semibold">
                (رواية حفص عن عاصم · طريق الشاطبية)
              </span>
            </div>
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

      {/* Ornate Surah Marquee Banner */}
      <div className="relative p-6 sm:p-8 bg-[#FDFBF7] dark:bg-[#121A17] rounded-2xl border-2 border-[#C5A059]/40 dark:border-[#C5A059]/30 shadow-sm text-center islamic-border-frame overflow-hidden">
        <div className="space-y-2">
          <div className="text-xs tracking-widest text-[#064E3B] dark:text-emerald-400 font-semibold font-cairo">
            سُورَةُ {surah.name}
          </div>
          <h1 className="text-3xl sm:text-4xl font-cairo font-bold text-stone-900 dark:text-amber-100 tracking-tight">
            سُورَةُ {surah.name}
          </h1>
          <div className="text-xs text-stone-600 dark:text-stone-400 flex items-center justify-center gap-2 pt-1 font-cairo">
            <span>{surah.revelationType === 'Meccan' ? getUIText(currentLanguage, 'meccan') : getUIText(currentLanguage, 'medinan')}</span>
            <span aria-hidden="true">·</span>
            <span>{surah.numberOfAyahs} {getUIText(currentLanguage, 'ayahsCount')}</span>
            <span aria-hidden="true">·</span>
            <span>{getUIText(currentLanguage, 'page')} {surah.page}</span>
            <span aria-hidden="true">·</span>
            <span>{getUIText(currentLanguage, 'juz')} {surah.juz}</span>
          </div>
        </div>

        {/* Basmalah (except for Surah 9 At-Tawbah) */}
        {surah.number !== 9 && (
          <div className="mt-6 pt-5 border-t border-[#C5A059]/20">
            <p className="font-quran text-2xl sm:text-3xl text-stone-900 dark:text-amber-100 leading-relaxed font-serif">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>
        )}
      </div>

      {/* Verses List */}
      {loading ? (
        <div className="py-16 text-center text-stone-500 space-y-2">
          <div className="w-8 h-8 border-2 border-[#064E3B] dark:border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs">جاري تحميل آيات سورة {surah.name} المباركة...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {ayahs.map((ayah) => {
            const isPlayingThis = playingAyahNumber === ayah.numberInSurah && isPlaying;
            const bookmarked = isBookmarked(ayah.numberInSurah);

            return (
              <div
                key={ayah.numberInSurah}
                id={`ayah-${ayah.numberInSurah}`}
                className={`p-5 sm:p-6 rounded-xl border transition-all ${
                  isPlayingThis
                    ? 'border-[#064E3B] dark:border-emerald-600 bg-emerald-50/30 dark:bg-emerald-950/30 shadow-md ring-1 ring-[#064E3B] dark:ring-emerald-600'
                    : 'bg-white dark:bg-[#141E1B] border-stone-200/90 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                }`}
              >
                {/* Verse Header Row */}
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-stone-100 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#FAF8F5] dark:bg-[#101715] border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 flex items-center justify-center font-serif font-bold text-xs">
                      {ayah.numberInSurah}
                    </span>
                    <span className="font-medium text-stone-700 dark:text-stone-300">
                      الآية {ayah.numberInSurah}
                    </span>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onPlayAyah(ayah)}
                      className={`p-1.5 rounded-md transition-colors ${
                        isPlayingThis
                          ? 'bg-[#064E3B] text-white'
                          : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
                      }`}
                      title={isPlayingThis ? getUIText(currentLanguage, 'pause') : getUIText(currentLanguage, 'listen')}
                      aria-label={`تلاوة الآية ${ayah.numberInSurah}`}
                    >
                      {isPlayingThis ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => onOpenTafsir(ayah)}
                      className="p-1.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md transition-colors"
                      title={getUIText(currentLanguage, 'tafsirAndTadabbur')}
                      aria-label={`تفسير الآية ${ayah.numberInSurah}`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onToggleBookmark(ayah)}
                      className={`p-1.5 rounded-md transition-colors ${
                        bookmarked
                          ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/40'
                          : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
                      }`}
                      title={bookmarked ? getUIText(currentLanguage, 'removeBookmark') : getUIText(currentLanguage, 'addBookmark')}
                      aria-label="علامة مرجعية"
                    >
                      <BookmarkIcon className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-600' : ''}`} />
                    </button>

                    <button
                      onClick={() => handleCopyAyah(ayah)}
                      className="p-1.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md transition-colors"
                      title={getUIText(currentLanguage, 'copyVerse')}
                      aria-label="نسخ"
                    >
                      {copiedAyah === ayah.numberInSurah ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Verse Quranic Text */}
                <div
                  className={`${fontClass} text-stone-900 dark:text-amber-50 text-right leading-loose`}
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {tajweedEnabled ? (
                    <span>
                      {ayah.text.split(' ').map((word, wIdx) => {
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
                      })}
                    </span>
                  ) : (
                    <span>{ayah.text}</span>
                  )}
                  {/* Ornate Islamic Ayah Medal */}
                  <AyahBadge ayahNumber={ayah.numberInSurah} />
                </div>

                {/* Multilingual Translated Meaning for non-Arabic users */}
                {currentLanguage !== 'ar' && ayah.translation && (
                  <div className="mt-3.5 pt-3 border-t border-stone-100 dark:border-stone-800/80 text-left">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#064E3B] dark:text-emerald-400 pb-1">
                      <Languages className="w-3 h-3" />
                      <span>Meaning ({currentLanguage.toUpperCase()}):</span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
                      {ayah.translation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
