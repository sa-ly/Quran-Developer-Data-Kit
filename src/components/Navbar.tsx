import React from 'react';
import { BookOpen, Search, Bookmark as BookmarkIcon, Moon, Sun, Globe, Library, Settings, Compass, Heart, Quote, ChevronDown } from 'lucide-react';
import { getUIText } from '../utils/i18n';
import { QuranLogo } from './QuranLogo';

export type PortalSection = 'quran' | 'hajj' | 'duaa' | 'hadith';

interface NavbarProps {
  portalSection: PortalSection;
  setPortalSection: (section: PortalSection) => void;
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
  portalSection,
  setPortalSection,
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
      {/* Top Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 h-16">
          {/* Brand & Logo with "hajj.ly" & "القرآن" Calligraphy */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            <button
              onClick={() => {
                setPortalSection('quran');
                setActiveView('reader');
              }}
              className="flex items-center gap-2.5 text-right focus:outline-hidden group cursor-pointer"
              aria-label="hajj.ly - منصة حج"
            >
              {/* Professional Sacred Vector Emblem */}
              <div className="relative group-hover:scale-105 transition-transform">
                <QuranLogo size={42} className="shadow-xs" />
              </div>

              <div className="flex flex-col text-right">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 font-serif leading-none">
                    hajj.ly
                  </span>
                  <span className="text-[11px] font-sans font-bold px-1.5 py-0.5 rounded bg-emerald-100/90 dark:bg-emerald-950/80 text-[#064E3B] dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-700/80 leading-none">
                    مَنَصَّة حَجّ
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs text-emerald-800 dark:text-emerald-400 font-serif whitespace-nowrap mt-0.5 font-medium">
                  {portalSection === 'quran'
                    ? 'المصحف الشريف · رواية حفص عن عاصم'
                    : portalSection === 'hajj'
                    ? 'مناسك الحج والعمرة ودليل المشاعر'
                    : portalSection === 'duaa'
                    ? 'الأدعية القرآنية والنبوية والأذكار'
                    : 'الأحاديث النبوية الشريفة وجوامع الكلم'}
                </span>
              </div>
            </button>
          </div>

          {/* Portal Main Sections Switcher (Desktop) */}
          <div className="hidden md:flex items-center p-1 bg-stone-200/70 dark:bg-stone-900/80 rounded-xl border border-stone-200/90 dark:border-stone-800 text-xs sm:text-sm font-serif">
            <button
              onClick={() => setPortalSection('quran')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                portalSection === 'quran'
                  ? 'bg-[#064E3B] text-white font-bold shadow-xs'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>القرآن الكريم</span>
            </button>

            <button
              onClick={() => setPortalSection('hajj')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                portalSection === 'hajj'
                  ? 'bg-[#064E3B] text-white font-bold shadow-xs'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              <span>مناسك الحج</span>
            </button>

            <button
              onClick={() => setPortalSection('duaa')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                portalSection === 'duaa'
                  ? 'bg-[#064E3B] text-white font-bold shadow-xs'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>الأدعية والأذكار</span>
            </button>

            <button
              onClick={() => setPortalSection('hadith')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                portalSection === 'hadith'
                  ? 'bg-[#064E3B] text-white font-bold shadow-xs'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              <Quote className="w-3.5 h-3.5 text-sky-500" />
              <span>الأحاديث النبوية</span>
            </button>
          </div>

          {/* Quick Controls & Utilities */}
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
              className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap font-serif cursor-pointer ${
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
            </button>

            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="flex items-center gap-1.5 p-2 sm:px-2.5 sm:py-1.5 text-xs text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-900 hover:bg-stone-200/80 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg transition-colors font-serif cursor-pointer"
              aria-label="البحث"
              title="البحث في آيات وسور القرآن الكريم"
            >
              <Search className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
            </button>

            {/* Bookmarks */}
            <button
              onClick={openBookmarks}
              className="relative p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
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

            {/* Gear Icon: Unified Settings & Info Hub */}
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

      {/* Secondary Bar when in Quran Section: Sub-Views & Tajweed Toggle */}
      {portalSection === 'quran' && (
        <div className="border-t border-stone-200/70 dark:border-stone-800 bg-[#FAF8F5]/80 dark:bg-[#121A17]/80 px-3 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between text-xs font-serif overflow-x-auto gap-2">
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setActiveView('reader')}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeView === 'reader'
                  ? 'bg-stone-200/90 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/60'
              }`}
            >
              {getUIText(currentLanguage, 'surahView')}
            </button>

            <button
              onClick={() => setActiveView('pages')}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeView === 'pages'
                  ? 'bg-stone-200/90 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/60'
              }`}
            >
              {getUIText(currentLanguage, 'mushafView')}
            </button>

            <button
              onClick={() => setActiveView('index')}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeView === 'index'
                  ? 'bg-stone-200/90 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/60'
              }`}
            >
              {getUIText(currentLanguage, 'indexView')}
            </button>

            <button
              onClick={openTafsirLibrary}
              className="px-2.5 py-1 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 rounded-md transition-colors whitespace-nowrap flex items-center gap-1 font-semibold border border-emerald-300/50 dark:border-emerald-700/50 cursor-pointer"
            >
              <Library className="w-3 h-3 text-emerald-700 dark:text-emerald-400" />
              <span>{getUIText(currentLanguage, 'tafsirLibrary')}</span>
            </button>
          </div>

          {/* Quick Tajweed Toggle in Quran Sub-Bar */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setTajweedEnabled(!tajweedEnabled)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-colors whitespace-nowrap font-serif cursor-pointer text-xs ${
                tajweedEnabled
                  ? 'bg-amber-100/90 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700/80 shadow-2xs font-bold'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border-stone-300 dark:border-stone-700'
              }`}
              title={tajweedEnabled ? getUIText(currentLanguage, 'tajweedActive') : getUIText(currentLanguage, 'tajweedDisabled')}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  tajweedEnabled ? 'bg-red-500 animate-pulse' : 'bg-stone-400'
                }`}
              />
              <span>{tajweedEnabled ? 'التجويد مفعّل' : 'التجويد متوقف'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Portal Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-[#101715] px-1 py-1.5 font-serif text-xs">
        <button
          onClick={() => setPortalSection('quran')}
          className={`px-2 py-1 rounded-md flex items-center gap-1 ${
            portalSection === 'quran' ? 'bg-[#064E3B] text-white font-bold' : 'text-stone-700 dark:text-stone-300'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>القرآن</span>
        </button>
        <button
          onClick={() => setPortalSection('hajj')}
          className={`px-2 py-1 rounded-md flex items-center gap-1 ${
            portalSection === 'hajj' ? 'bg-[#064E3B] text-white font-bold' : 'text-stone-700 dark:text-stone-300'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>الحج</span>
        </button>
        <button
          onClick={() => setPortalSection('duaa')}
          className={`px-2 py-1 rounded-md flex items-center gap-1 ${
            portalSection === 'duaa' ? 'bg-[#064E3B] text-white font-bold' : 'text-stone-700 dark:text-stone-300'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>الأدعية</span>
        </button>
        <button
          onClick={() => setPortalSection('hadith')}
          className={`px-2 py-1 rounded-md flex items-center gap-1 ${
            portalSection === 'hadith' ? 'bg-[#064E3B] text-white font-bold' : 'text-stone-700 dark:text-stone-300'
          }`}
        >
          <Quote className="w-3.5 h-3.5" />
          <span>الحديث</span>
        </button>
      </div>
    </header>
  );
};
