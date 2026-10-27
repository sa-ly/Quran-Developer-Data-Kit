import React from 'react';
import { BookOpen, Search, Bookmark as BookmarkIcon, Moon, Sun, Globe, Library, Settings } from 'lucide-react';
import { getUIText } from '../utils/i18n';

interface NavbarProps {
  activeView: 'reader' | 'pages' | 'index';
  setActiveView: (view: 'reader' | 'pages' | 'index') => void;
  openSearch: () => void;
  openBookmarks: () => void;
  openSettings: (tab?: 'tajweed' | 'licenses' | 'preferences' | 'about') => void;
  openTafsirLibrary: () => void;
  openLanguageModal: () => void;
  tajweedEnabled: boolean;
  setTajweedEnabled: (enabled: boolean) => void;
  bookmarkCount: number;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  currentLanguage: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  openSearch,
  openBookmarks,
  openSettings,
  openTafsirLibrary,
  openLanguageModal,
  tajweedEnabled,
  setTajweedEnabled,
  bookmarkCount,
  darkMode,
  setDarkMode,
  currentLanguage,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 dark:bg-[#101715]/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 shadow-xs transition-colors font-amiri">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-1.5 sm:gap-4 h-16">
          {/* Zone 1: Single Brand Wordmark in Classical Amiri Typography */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => setActiveView('reader')}
              className="flex items-center gap-2.5 text-right focus:outline-hidden group cursor-pointer"
              aria-label={getUIText(currentLanguage, 'appTitle')}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#064E3B] dark:bg-[#0a6c53] text-[#C5A059] dark:text-[#E4BA68] flex items-center justify-center text-xl border border-[#C5A059]/40 shadow-xs group-hover:bg-[#043E2F] transition-colors shrink-0">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#C5A059] dark:text-[#E4BA68]" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 font-serif whitespace-nowrap">
                  {getUIText(currentLanguage, 'appTitle')}
                </span>
                <span className="hidden sm:block text-xs text-emerald-800 dark:text-emerald-400 font-serif whitespace-nowrap -mt-0.5">
                  {getUIText(currentLanguage, 'appSubtitle')}
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Primary Reading & Browsing Views (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 font-serif">
            <button
              onClick={() => setActiveView('reader')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'reader'
                  ? 'bg-stone-200/90 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60'
              }`}
            >
              {getUIText(currentLanguage, 'surahView')}
            </button>

            <button
              onClick={() => setActiveView('pages')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'pages'
                  ? 'bg-stone-200/90 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60'
              }`}
            >
              {getUIText(currentLanguage, 'mushafView')}
            </button>

            <button
              onClick={() => setActiveView('index')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'index'
                  ? 'bg-stone-200/90 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60'
              }`}
            >
              {getUIText(currentLanguage, 'indexView')}
            </button>

            {/* Dedicated Tafsir Library Trigger */}
            <button
              onClick={openTafsirLibrary}
              className="px-3 py-1.5 text-sm text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 border border-emerald-300/60 dark:border-emerald-700/60 font-semibold"
              title="مكتبة وتنزيل كتب التفسير المعتمدة"
            >
              <Library className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>{getUIText(currentLanguage, 'tafsirLibrary')}</span>
            </button>
          </nav>

          {/* Zone 3: Reading Utilities & Gear Settings */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Globe Language Switcher */}
            <button
              onClick={openLanguageModal}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-bold bg-white dark:bg-[#141E1B] text-[#064E3B] dark:text-emerald-300 border border-stone-200 dark:border-stone-700 hover:border-emerald-500 rounded-lg shadow-2xs transition-colors cursor-pointer"
              aria-label="تغيير لغة التطبيق والترجمة"
              title="اختيار لغة التطبيق والترجمة (10 لغات)"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="uppercase text-[11px] font-mono tracking-wider font-extrabold">
                {currentLanguage}
              </span>
            </button>

            {/* Dark / Night Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap font-serif ${
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
              <span className="hidden md:inline">
                {darkMode ? getUIText(currentLanguage, 'lightMode') : getUIText(currentLanguage, 'darkMode')}
              </span>
            </button>

            {/* Tajweed Color Toggle Button */}
            <button
              onClick={() => setTajweedEnabled(!tajweedEnabled)}
              className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap font-serif ${
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
              <span className="font-bold hidden sm:inline">
                {tajweedEnabled ? getUIText(currentLanguage, 'tajweedActive') : getUIText(currentLanguage, 'tajweedDisabled')}
              </span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="flex items-center gap-1.5 p-2 sm:px-2.5 sm:py-1.5 text-xs text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-900 hover:bg-stone-200/80 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg transition-colors font-serif"
              aria-label={getUIText(currentLanguage, 'search')}
              title="البحث في آيات وسور القرآن الكريم"
            >
              <Search className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
              <span className="hidden md:inline">{getUIText(currentLanguage, 'search')}</span>
            </button>

            {/* Bookmarks */}
            <button
              onClick={openBookmarks}
              className="relative p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
              aria-label={`${getUIText(currentLanguage, 'bookmarks')} (${bookmarkCount})`}
              title="العلامات المرجعية المحفوظة"
            >
              <BookmarkIcon className="w-4 h-4" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] bg-[#064E3B] text-white rounded-full flex items-center justify-center font-bold">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* Gear Icon: Unified Hub for Guide, Narration, Licenses, and Preferences */}
            <button
              onClick={() => openSettings('tajweed')}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 bg-stone-100 dark:bg-stone-900 hover:bg-stone-200/80 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg transition-colors cursor-pointer"
              title="الإعدادات، دليل أحكام التجويد، توثيق الرواية، والتراخيص"
              aria-label="الإعدادات والمعلومات"
            >
              <Settings className="w-4 h-4 text-[#064E3B] dark:text-[#C5A059]" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="lg:hidden flex items-center justify-around border-t border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-[#101715] px-2 py-2 font-serif text-xs">
        <button
          onClick={() => setActiveView('reader')}
          className={`px-2.5 py-1 rounded-md ${
            activeView === 'reader' ? 'bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold' : 'text-stone-600 dark:text-stone-300'
          }`}
        >
          {getUIText(currentLanguage, 'surahView')}
        </button>
        <button
          onClick={() => setActiveView('pages')}
          className={`px-2.5 py-1 rounded-md ${
            activeView === 'pages' ? 'bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold' : 'text-stone-600 dark:text-stone-300'
          }`}
        >
          {getUIText(currentLanguage, 'mushafView')}
        </button>
        <button
          onClick={() => setActiveView('index')}
          className={`px-2.5 py-1 rounded-md ${
            activeView === 'index' ? 'bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold' : 'text-stone-600 dark:text-stone-300'
          }`}
        >
          {getUIText(currentLanguage, 'indexView')}
        </button>
        <button
          onClick={openTafsirLibrary}
          className="px-2.5 py-1 text-emerald-700 dark:text-emerald-400 font-bold"
        >
          {getUIText(currentLanguage, 'tafsirLibrary')}
        </button>
        <button
          onClick={() => openSettings('tajweed')}
          className="px-2.5 py-1 text-stone-700 dark:text-stone-300 flex items-center gap-1 font-bold"
          title="الإعدادات والدليل"
        >
          <Settings className="w-3.5 h-3.5 text-[#064E3B] dark:text-[#C5A059]" />
          <span>الإعدادات</span>
        </button>
      </div>
    </header>
  );
};
