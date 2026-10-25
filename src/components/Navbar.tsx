import React from 'react';
import { BookOpen, Search, Bookmark as BookmarkIcon, Sparkles, HelpCircle, Palette, Moon, Sun, Globe, Library } from 'lucide-react';
import { getUIText } from '../utils/i18n';

interface NavbarProps {
  activeView: 'reader' | 'pages' | 'index';
  setActiveView: (view: 'reader' | 'pages' | 'index') => void;
  openSearch: () => void;
  openBookmarks: () => void;
  openTajweedGuide: () => void;
  openTafsirLibrary: () => void;
  openLanguageModal: () => void;
  openLicenses: () => void;
  tajweedEnabled: boolean;
  setTajweedEnabled: (enabled: boolean) => void;
  bookmarkCount: number;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  currentLanguage: string;
  activeTafsirName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  openSearch,
  openBookmarks,
  openTajweedGuide,
  openTafsirLibrary,
  openLanguageModal,
  openLicenses,
  tajweedEnabled,
  setTajweedEnabled,
  bookmarkCount,
  darkMode,
  setDarkMode,
  currentLanguage,
  activeTafsirName,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 dark:bg-[#101715]/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-1.5 sm:gap-4 h-16">
          {/* Zone 1: Single Brand Wordmark */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => setActiveView('reader')}
              className="flex items-center gap-2 text-right focus:outline-hidden group"
              aria-label={getUIText(currentLanguage, 'appTitle')}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#064E3B] dark:bg-[#0a6c53] text-[#C5A059] dark:text-[#E4BA68] flex items-center justify-center text-xl border border-[#C5A059]/40 shadow-xs group-hover:bg-[#043E2F] transition-colors shrink-0">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#C5A059] dark:text-[#E4BA68]" />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100 font-cairo whitespace-nowrap">
                  {getUIText(currentLanguage, 'appTitle')}
                </span>
                <span className="hidden sm:block text-[11px] text-stone-500 dark:text-stone-400 font-cairo whitespace-nowrap -mt-0.5">
                  {getUIText(currentLanguage, 'appSubtitle')}
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveView('reader')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'reader'
                  ? 'bg-stone-200/80 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60'
              }`}
            >
              {getUIText(currentLanguage, 'surahView')}
            </button>

            <button
              onClick={() => setActiveView('pages')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'pages'
                  ? 'bg-stone-200/80 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60'
              }`}
            >
              {getUIText(currentLanguage, 'mushafView')}
            </button>

            <button
              onClick={() => setActiveView('index')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'index'
                  ? 'bg-stone-200/80 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60'
              }`}
            >
              {getUIText(currentLanguage, 'indexView')}
            </button>

            {/* Dedicated Tafsir Library Trigger */}
            <button
              onClick={openTafsirLibrary}
              className="px-2.5 py-1.5 text-xs font-medium text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 border border-emerald-300/60 dark:border-emerald-700/60"
              title="مكتبة وتنزيل كتب التفسير المعتمدة"
            >
              <Library className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>{getUIText(currentLanguage, 'tafsirLibrary')}</span>
            </button>

            {/* Tajweed Guide Trigger */}
            <button
              onClick={openTajweedGuide}
              className="px-2.5 py-1.5 text-xs font-medium text-amber-800 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/60 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <Palette className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{getUIText(currentLanguage, 'tajweedGuide')}</span>
            </button>

            <button
              onClick={openLicenses}
              className="px-2.5 py-1.5 text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
              <span>{getUIText(currentLanguage, 'licenses')}</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action and Quick Utilities */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Dedicated Globe Language Switcher */}
            <button
              onClick={openLanguageModal}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-bold bg-white dark:bg-[#141E1B] text-[#064E3B] dark:text-emerald-300 border border-stone-200 dark:border-stone-700 hover:border-emerald-500 rounded-lg shadow-2xs transition-colors cursor-pointer"
              aria-label="تغيير لغة التطبيق والترجمة"
              title="اختيار لغة التطبيق والترجمة (عربي، إنجليزي، بنغالي، هندي، ألماني، إيطالي، صيني...)"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-spin-slow" />
              <span className="uppercase text-[11px] font-mono tracking-wider font-extrabold">
                {currentLanguage}
              </span>
            </button>

            {/* Mobile/Compact Tafsir Library Trigger */}
            <button
              onClick={openTafsirLibrary}
              className="lg:hidden p-1.5 sm:px-2 sm:py-1.5 text-xs font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-lg transition-colors flex items-center gap-1"
              title="مكتبة التفاسير والتنزيل"
              aria-label="مكتبة التفاسير"
            >
              <Library className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">التفاسير</span>
            </button>

            {/* Dark / Night Mode Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
                darkMode
                  ? 'bg-amber-950/60 text-amber-300 border-amber-600/70 hover:bg-amber-900/50'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
              aria-label={darkMode ? getUIText(currentLanguage, 'lightMode') : getUIText(currentLanguage, 'darkMode')}
              title={darkMode ? getUIText(currentLanguage, 'lightMode') : getUIText(currentLanguage, 'darkMode')}
            >
              {darkMode ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-stone-600" />
              )}
              <span className="hidden md:inline font-cairo">
                {darkMode ? getUIText(currentLanguage, 'lightMode') : getUIText(currentLanguage, 'darkMode')}
              </span>
            </button>

            {/* Tajweed Color Toggle Button */}
            <button
              onClick={() => setTajweedEnabled(!tajweedEnabled)}
              className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
                tajweedEnabled
                  ? 'bg-amber-100/90 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700/80 shadow-xs'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800'
              }`}
              aria-pressed={tajweedEnabled}
              aria-label={getUIText(currentLanguage, 'toggleTajweed')}
              title={tajweedEnabled ? getUIText(currentLanguage, 'tajweedActive') : getUIText(currentLanguage, 'tajweedDisabled')}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full shadow-xs ${
                  tajweedEnabled ? 'bg-red-500 animate-pulse' : 'bg-stone-300 dark:bg-stone-600'
                }`}
              />
              <span className="font-cairo font-bold hidden sm:inline">
                {tajweedEnabled ? getUIText(currentLanguage, 'tajweedActive') : getUIText(currentLanguage, 'tajweedDisabled')}
              </span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="flex items-center gap-1.5 p-2 sm:px-2.5 sm:py-1.5 text-xs text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-900 hover:bg-stone-200/80 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg transition-colors"
              aria-label={getUIText(currentLanguage, 'search')}
            >
              <Search className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
              <span className="hidden md:inline">{getUIText(currentLanguage, 'search')}</span>
            </button>

            {/* Bookmarks */}
            <button
              onClick={openBookmarks}
              className="relative p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
              aria-label={`${getUIText(currentLanguage, 'bookmarks')} (${bookmarkCount})`}
            >
              <BookmarkIcon className="w-4 h-4" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] bg-[#064E3B] text-white rounded-full flex items-center justify-center font-bold">
                  {bookmarkCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation bar */}
      <div className="lg:hidden flex items-center justify-around border-t border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-[#101715] px-2 py-2">
        <button
          onClick={() => setActiveView('reader')}
          className={`px-2 py-1 text-xs rounded-md ${
            activeView === 'reader' ? 'bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold' : 'text-stone-600 dark:text-stone-300'
          }`}
        >
          {getUIText(currentLanguage, 'surahView')}
        </button>
        <button
          onClick={() => setActiveView('pages')}
          className={`px-2 py-1 text-xs rounded-md ${
            activeView === 'pages' ? 'bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold' : 'text-stone-600 dark:text-stone-300'
          }`}
        >
          {getUIText(currentLanguage, 'mushafView')}
        </button>
        <button
          onClick={() => setActiveView('index')}
          className={`px-2 py-1 text-xs rounded-md ${
            activeView === 'index' ? 'bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold' : 'text-stone-600 dark:text-stone-300'
          }`}
        >
          {getUIText(currentLanguage, 'indexView')}
        </button>
        <button
          onClick={openTajweedGuide}
          className="px-2 py-1 text-xs text-amber-700 dark:text-amber-400 font-medium"
        >
          {getUIText(currentLanguage, 'tajweedGuide')}
        </button>
        <button
          onClick={openTafsirLibrary}
          className="px-2 py-1 text-xs text-emerald-700 dark:text-emerald-400 font-medium"
        >
          {getUIText(currentLanguage, 'tafsirLibrary')}
        </button>
      </div>
    </header>
  );
};
