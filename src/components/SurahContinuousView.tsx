import React, { useState } from 'react';
import { Play, Pause, BookOpen, Bookmark as BookmarkIcon, Copy, Check, ChevronRight, ChevronLeft, Volume2, Type } from 'lucide-react';
import { Ayah, SurahMeta } from '../types/quran';
import { parseTajweedWord } from '../utils/tajweedParser';
import { SURAH_LIST } from '../data/surahList';
import { AyahBadge } from './AyahBadge';

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
}) => {
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);

  const handleCopyAyah = (ayah: Ayah) => {
    navigator.clipboard.writeText(`${ayah.text} [سورة ${surah.name}: ${ayah.numberInSurah}]`);
    setCopiedAyah(ayah.numberInSurah);
    setTimeout(() => setCopiedAyah(null), 2000);
  };

  const fontClass =
    selectedFont === 'quran'
      ? 'font-quran'
      : selectedFont === 'scheherazade'
      ? 'font-scheherazade'
      : 'font-amiri';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      {/* Top Reading Bar & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-white rounded-xl border border-stone-200 shadow-xs">
        {/* Surah Navigation selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => surah.number > 1 && onSelectSurah(surah.number - 1)}
            disabled={surah.number <= 1}
            className="p-1.5 text-stone-600 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed rounded-md border border-stone-200 hover:bg-stone-50"
            title="السورة السابقة"
            aria-label="السورة السابقة"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <select
            value={surah.number}
            onChange={(e) => onSelectSurah(Number(e.target.value))}
            className="text-xs font-bold text-stone-900 bg-stone-50 border border-stone-200 rounded-lg py-1.5 px-3 focus:outline-hidden cursor-pointer"
            aria-label="اختيار السورة"
          >
            {SURAH_LIST.map((s) => (
              <option key={s.number} value={s.number}>
                {s.number}. سورة {s.name} ({s.revelationType === 'Meccan' ? 'مكية' : 'مدنية'})
              </option>
            ))}
          </select>

          <button
            onClick={() => surah.number < 114 && onSelectSurah(surah.number + 1)}
            disabled={surah.number >= 114}
            className="p-1.5 text-stone-600 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed rounded-md border border-stone-200 hover:bg-stone-50"
            title="السورة التالية"
            aria-label="السورة التالية"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Font styling & Size toggles */}
        <div className="flex items-center gap-3">
          {/* Font Family selector */}
          <div className="flex items-center gap-1 text-xs text-stone-600">
            <span className="hidden sm:inline">الخط:</span>
            <select
              value={selectedFont}
              onChange={(e: any) => setSelectedFont(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-md py-1 px-2 text-xs text-stone-800"
              aria-label="اختيار خط المصحف"
            >
              <option value="quran">أميري قرآني (Amiri Quran)</option>
              <option value="scheherazade">شهرزاد (Scheherazade)</option>
              <option value="amiri">أميري عادي (Amiri Standard)</option>
            </select>
          </div>

          {/* Font Size Buttons */}
          <div className="flex items-center gap-1 border border-stone-200 rounded-md p-0.5 bg-stone-50">
            <button
              onClick={() => setFontSize((s) => Math.max(20, s - 2))}
              className="px-2 py-0.5 text-xs text-stone-700 hover:bg-white rounded transition-colors font-bold"
              title="تصغير حجم الخط"
              aria-label="تصغير الخط"
            >
              -A
            </button>
            <span className="text-[11px] font-mono px-1 text-stone-500 tabular-nums">{fontSize}</span>
            <button
              onClick={() => setFontSize((s) => Math.min(42, s + 2))}
              className="px-2 py-0.5 text-xs text-stone-700 hover:bg-white rounded transition-colors font-bold"
              title="تكبير حجم الخط"
              aria-label="تكبير الخط"
            >
              +A
            </button>
          </div>
        </div>
      </div>

      {/* Ornate Surah Marquee Banner */}
      <div className="relative p-6 sm:p-8 bg-[#FDFBF7] rounded-2xl border-2 border-[#C5A059]/40 shadow-sm text-center islamic-border-frame overflow-hidden">
        {/* Subtle decorative geometric corner marks */}
        <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#C5A059]/60" />
        <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-[#C5A059]/60" />
        <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#C5A059]/60" />
        <div className="absolute bottom-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-[#C5A059]/60" />

        <div className="space-y-2">
          <div className="text-xs tracking-widest text-[#064E3B] font-semibold font-cairo">
            سُورَةُ {surah.name}
          </div>
          <h1 className="text-3xl sm:text-4xl font-cairo font-bold text-stone-900 tracking-tight">
            سُورَةُ {surah.name}
          </h1>
          <div className="text-xs text-stone-600 flex items-center justify-center gap-2 pt-1 font-cairo">
            <span>{surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}</span>
            <span aria-hidden="true">·</span>
            <span>{surah.numberOfAyahs} آيات</span>
            <span aria-hidden="true">·</span>
            <span>الصفحة {surah.page}</span>
            <span aria-hidden="true">·</span>
            <span>الجزء {surah.juz}</span>
          </div>
        </div>

        {/* Basmalah (except for Surah 9 At-Tawbah) */}
        {surah.number !== 9 && (
          <div className="mt-6 pt-5 border-t border-[#C5A059]/20">
            <p className="font-quran text-2xl sm:text-3xl text-stone-900 leading-relaxed font-serif">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>
        )}
      </div>

      {/* Verses List */}
      {loading ? (
        <div className="py-16 text-center text-stone-500 space-y-2">
          <div className="w-8 h-8 border-2 border-[#064E3B] border-t-transparent rounded-full animate-spin mx-auto" />
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
                className={`p-5 sm:p-6 bg-white rounded-xl border transition-all ${
                  isPlayingThis
                    ? 'border-[#064E3B] bg-emerald-50/20 shadow-md ring-1 ring-[#064E3B]'
                    : 'border-stone-200/90 hover:border-stone-300'
                }`}
              >
                {/* Verse Header Row */}
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-stone-100 text-xs text-stone-500">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#FAF8F5] border border-stone-200 text-stone-700 flex items-center justify-center font-serif font-bold text-xs">
                      {ayah.numberInSurah}
                    </span>
                    <span className="font-medium text-stone-700">
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
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                      }`}
                      title={isPlayingThis ? 'إيقاف التلاوة' : 'استماع للتلاوة'}
                      aria-label={`تلاوة الآية ${ayah.numberInSurah}`}
                    >
                      {isPlayingThis ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => onOpenTafsir(ayah)}
                      className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
                      title="التفسير والتدبر"
                      aria-label={`تفسير الآية ${ayah.numberInSurah}`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onToggleBookmark(ayah)}
                      className={`p-1.5 rounded-md transition-colors ${
                        bookmarked ? 'text-amber-600 bg-amber-50' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                      }`}
                      title={bookmarked ? 'إزالة من العلامات المرجعية' : 'إضافة للعلامات المرجعية'}
                      aria-label="علامة مرجعية"
                    >
                      <BookmarkIcon className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-600' : ''}`} />
                    </button>

                    <button
                      onClick={() => handleCopyAyah(ayah)}
                      className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
                      title="نسخ نص الآية"
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
                  className={`${fontClass} text-stone-900 text-right leading-loose`}
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {tajweedEnabled ? (
                    <span>
                      {ayah.text.split(' ').map((word, wIdx) => {
                        const tokens = parseTajweedWord(word);
                        return (
                          <span key={wIdx} className="inline-block mx-0.5">
                            {tokens.map((token, tIdx) => (
                              <span
                                key={tIdx}
                                className={token.className}
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
