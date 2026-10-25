import React from 'react';
import { BookOpen, Search, Bookmark as BookmarkIcon, Sparkles, HelpCircle, Palette } from 'lucide-react';

interface NavbarProps {
  activeView: 'reader' | 'pages' | 'index';
  setActiveView: (view: 'reader' | 'pages' | 'index') => void;
  openSearch: () => void;
  openBookmarks: () => void;
  openTajweedGuide: () => void;
  openLicenses: () => void;
  tajweedEnabled: boolean;
  setTajweedEnabled: (enabled: boolean) => void;
  bookmarkCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  openSearch,
  openBookmarks,
  openTajweedGuide,
  openLicenses,
  tajweedEnabled,
  setTajweedEnabled,
  bookmarkCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-8 h-16">
          {/* Zone 1: Single Brand Wordmark */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => setActiveView('reader')}
              className="flex items-center gap-2 text-right focus:outline-hidden group"
              aria-label="الرئيسية - المصحف الشريف الرقمي"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#064E3B] text-[#C5A059] flex items-center justify-center text-xl border border-[#C5A059]/40 shadow-xs group-hover:bg-[#043E2F] transition-colors shrink-0">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#C5A059]" />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold tracking-tight text-stone-900 font-cairo whitespace-nowrap">
                  المصحف الشريف
                </span>
                <span className="hidden sm:block text-[11px] text-stone-500 font-cairo whitespace-nowrap -mt-0.5">
                  بالرسم العثماني المعتمد والتجويد
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => setActiveView('reader')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'reader'
                  ? 'bg-stone-200/80 text-stone-900 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              عرض السور والآيات
            </button>

            <button
              onClick={() => setActiveView('pages')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'pages'
                  ? 'bg-stone-200/80 text-stone-900 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              مصحف المدينة (604 صفحة)
            </button>

            <button
              onClick={() => setActiveView('index')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'index'
                  ? 'bg-stone-200/80 text-stone-900 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              فهرس السور الـ 114
            </button>

            <button
              onClick={openTajweedGuide}
              className="px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <Palette className="w-3.5 h-3.5 text-amber-700" />
              <span>دليل التجويد الملون</span>
            </button>

            <button
              onClick={openLicenses}
              className="px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5 text-stone-500" />
              <span>التراخيص والمصادر</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action and Quick Utilities */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 text-xs text-stone-600 bg-stone-100 hover:bg-stone-200/80 border border-stone-200 rounded-lg transition-colors"
              aria-label="البحث القرآني"
            >
              <Search className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden sm:inline">البحث في القرآن</span>
            </button>

            {/* Bookmarks */}
            <button
              onClick={openBookmarks}
              className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
              aria-label={`العلامات المرجعية (${bookmarkCount})`}
            >
              <BookmarkIcon className="w-4 h-4 text-stone-600" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] bg-[#064E3B] text-white rounded-full flex items-center justify-center font-bold">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* Tajweed Toggle Button */}
            <button
              onClick={() => setTajweedEnabled(!tajweedEnabled)}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
                tajweedEnabled
                  ? 'bg-amber-100/80 text-amber-900 border-amber-300'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
              }`}
              aria-pressed={tajweedEnabled}
              aria-label="تبديل ألوان التجويد"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  tajweedEnabled ? 'bg-amber-600' : 'bg-stone-300'
                }`}
              />
              <span className="hidden xs:inline">التجويد</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation bar */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-200 bg-[#FAF8F5] px-2 py-2">
        <button
          onClick={() => setActiveView('reader')}
          className={`px-2.5 py-1 text-xs rounded-md ${
            activeView === 'reader' ? 'bg-stone-200 text-stone-900 font-bold' : 'text-stone-600'
          }`}
        >
          عرض الآيات
        </button>
        <button
          onClick={() => setActiveView('pages')}
          className={`px-2.5 py-1 text-xs rounded-md ${
            activeView === 'pages' ? 'bg-stone-200 text-stone-900 font-bold' : 'text-stone-600'
          }`}
        >
          المصحف الصفحي
        </button>
        <button
          onClick={() => setActiveView('index')}
          className={`px-2.5 py-1 text-xs rounded-md ${
            activeView === 'index' ? 'bg-stone-200 text-stone-900 font-bold' : 'text-stone-600'
          }`}
        >
          فهرس السور
        </button>
        <button
          onClick={openLicenses}
          className="px-2 py-1 text-xs text-stone-600"
        >
          التراخيص
        </button>
      </div>
    </header>
  );
};
