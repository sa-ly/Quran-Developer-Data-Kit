import React, { useState } from 'react';
import { Search, Compass } from 'lucide-react';
import { SURAH_LIST } from '../data/surahList';
import { normalizeArabic } from '../utils/quranSearch';
import { getUIText } from '../utils/i18n';

interface SurahIndexViewProps {
  onSelectSurah: (surahNumber: number) => void;
  onSelectPage: (pageNumber: number) => void;
  currentLanguage?: string;
}

export const SurahIndexView: React.FC<SurahIndexViewProps> = ({
  onSelectSurah,
  onSelectPage,
  currentLanguage = 'ar',
}) => {
  const [filterType, setFilterType] = useState<'all' | 'Meccan' | 'Medinan'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSurahs = SURAH_LIST.filter((s) => {
    // Type filter
    if (filterType !== 'all' && s.revelationType !== filterType) {
      return false;
    }
    // Search query
    if (!searchQuery.trim()) return true;
    const normQ = normalizeArabic(searchQuery);
    const normName = normalizeArabic(s.name);
    const matchNum = String(s.number) === searchQuery.trim();
    const matchEnglish = s.englishName.toLowerCase().includes(searchQuery.toLowerCase());
    return normName.includes(normQ) || matchNum || matchEnglish;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      {/* Editorial Title & Metrics Overview */}
      <div className="text-center space-y-2 py-4">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          فهرس سور القرآن الكريم (114 سورة)
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
          المصحف المرتل برواية حفص عن عاصم بالرسم العثماني المعتمد وفق طبعة مجمع الملك فهد لطباعة المصحف الشريف
        </p>

        {/* Clean Unboxed Metadata Strip */}
        <div className="flex items-center justify-center gap-3 text-xs text-stone-500 dark:text-stone-400 pt-2">
          <span>114 سورة</span>
          <span aria-hidden="true">·</span>
          <span>6,236 آية</span>
          <span aria-hidden="true">·</span>
          <span>30 جزءاً</span>
          <span aria-hidden="true">·</span>
          <span>604 صفحات</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 bg-white dark:bg-[#141E1B] rounded-xl border border-stone-200 dark:border-stone-800 shadow-xs transition-colors">
        {/* Interactive Segmented Filter Controls */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-900 rounded-lg w-full sm:w-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`flex-1 sm:flex-none px-2 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filterType === 'all'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            جميع السور (114)
          </button>
          <button
            onClick={() => setFilterType('Meccan')}
            className={`flex-1 sm:flex-none px-2 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filterType === 'Meccan'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            مكية (86)
          </button>
          <button
            onClick={() => setFilterType('Medinan')}
            className={`flex-1 sm:flex-none px-2 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filterType === 'Medinan'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            مدنية (28)
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute right-3 top-2.5 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder={getUIText(currentLanguage, 'surahSearchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pr-9 pl-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg focus:outline-hidden focus:border-[#064E3B] text-stone-900 dark:text-stone-100 placeholder:text-stone-400"
            aria-label="تصفية السور"
          />
        </div>
      </div>

      {/* Surahs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredSurahs.map((surah) => (
          <div
            key={surah.number}
            onClick={() => onSelectSurah(surah.number)}
            className="p-4 bg-white dark:bg-[#141E1B] rounded-xl border border-stone-200 dark:border-stone-800 hover:border-[#C5A059] dark:hover:border-[#C5A059] hover:shadow-md transition-all cursor-pointer group text-right flex items-center justify-between gap-3"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSelectSurah(surah.number);
            }}
          >
            <div className="flex items-center gap-3">
              {/* Surah Number Box */}
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] dark:bg-[#101715] border border-stone-200 dark:border-stone-700 group-hover:border-[#C5A059] text-stone-800 dark:text-stone-200 flex items-center justify-center font-serif font-bold text-sm shrink-0 transition-colors">
                {surah.number}
              </div>

              <div>
                <h3 className="font-bold text-stone-900 dark:text-amber-100 text-base font-serif group-hover:text-[#064E3B] dark:group-hover:text-emerald-400 transition-colors">
                  سورة {surah.name}
                </h3>
                <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1.5 pt-0.5">
                  <span>{surah.revelationType === 'Meccan' ? getUIText(currentLanguage, 'meccan') : getUIText(currentLanguage, 'medinan')}</span>
                  <span aria-hidden="true">·</span>
                  <span>{surah.numberOfAyahs} {getUIText(currentLanguage, 'ayahsCount')}</span>
                  <span aria-hidden="true">·</span>
                  <span>{getUIText(currentLanguage, 'juz')} {surah.juz}</span>
                </div>
              </div>
            </div>

            {/* Page Jump */}
            <div className="text-left shrink-0">
              <span className="text-[11px] text-stone-400 block">{getUIText(currentLanguage, 'page')}</span>
              <span className="text-xs font-mono font-bold text-stone-700 dark:text-stone-300">
                {surah.page}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredSurahs.length === 0 && (
        <div className="text-center py-16 text-stone-500 space-y-2">
          <Compass className="w-8 h-8 mx-auto text-stone-400" />
          <p className="text-sm font-medium">لم يتم العثور على سورة تطابق بحثك</p>
          <p className="text-xs text-stone-400">تأكد من كتابة اسم السورة بشكل صحيح أو استخدم رقمها</p>
        </div>
      )}
    </div>
  );
};
