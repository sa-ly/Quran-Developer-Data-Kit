/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SurahContinuousView } from './components/SurahContinuousView';
import { MushafPageView } from './components/MushafPageView';
import { SurahIndexView } from './components/SurahIndexView';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { TafsirTadabburModal } from './components/TafsirTadabburModal';
import { TafsirLibraryModal } from './components/TafsirLibraryModal';
import { LanguageSelectorModal } from './components/LanguageSelectorModal';
import { TajweedGuideModal } from './components/TajweedGuideModal';
import { LicensesAttributionModal } from './components/LicensesAttributionModal';
import { SearchModal } from './components/SearchModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { Footer } from './components/Footer';

import { Ayah, SurahMeta, Bookmark } from './types/quran';
import { SURAH_LIST, getSurahMeta, getSurahByPage } from './data/surahList';
import { fetchSurahVerses, fetchPageVerses } from './services/quranApi';
import { ACCREDITED_TAFSIR_EDITIONS, TafsirEdition } from './data/tafsirEditions';
import { SUPPORTED_LANGUAGES, LanguageConfig } from './utils/i18n';

export default function App() {
  // Navigation & View State
  const [activeView, setActiveView] = useState<'reader' | 'pages' | 'index'>('reader');
  const [currentSurahNumber, setCurrentSurahNumber] = useState<number>(1);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);

  // Internationalization State
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    try {
      return localStorage.getItem('quran_language') || 'ar';
    } catch {
      return 'ar';
    }
  });

  // Dark Mode State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('quran_dark_mode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Active Tafsir State
  const [activeTafsir, setActiveTafsir] = useState<TafsirEdition>(() => {
    try {
      const saved = localStorage.getItem('quran_active_tafsir_id');
      const found = ACCREDITED_TAFSIR_EDITIONS.find(t => t.id === saved);
      return found || ACCREDITED_TAFSIR_EDITIONS[0];
    } catch {
      return ACCREDITED_TAFSIR_EDITIONS[0];
    }
  });

  // Data State
  const [surahAyahs, setSurahAyahs] = useState<Ayah[]>([]);
  const [pageAyahs, setPageAyahs] = useState<Ayah[]>([]);
  const [loadingSurah, setLoadingSurah] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(false);

  // Audio Playback State
  const [playingAyah, setPlayingAyah] = useState<Ayah | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedReciterId, setSelectedReciterId] = useState<string>('alafasy');

  // Modals & Drawers State
  const [tafsirModalOpen, setTafsirModalOpen] = useState<boolean>(false);
  const [tafsirLibraryOpen, setTafsirLibraryOpen] = useState<boolean>(false);
  const [languageModalOpen, setLanguageModalOpen] = useState<boolean>(false);
  const [selectedAyahForTafsir, setSelectedAyahForTafsir] = useState<Ayah | null>(null);
  const [tajweedGuideOpen, setTajweedGuideOpen] = useState<boolean>(false);
  const [licensesModalOpen, setLicensesModalOpen] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [bookmarksDrawerOpen, setBookmarksDrawerOpen] = useState<boolean>(false);

  // Preferences & Bookmarks
  const [tajweedEnabled, setTajweedEnabled] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<number>(26);
  const [selectedFont, setSelectedFont] = useState<'quran' | 'scheherazade' | 'amiri'>('quran');
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    try {
      const saved = localStorage.getItem('quran_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Current active Surah metadata
  const currentSurahMeta: SurahMeta = getSurahMeta(currentSurahNumber) || SURAH_LIST[0];

  // Sync Dark Mode to DOM
  useEffect(() => {
    try {
      localStorage.setItem('quran_dark_mode', String(darkMode));
    } catch (e) {
      console.warn('Failed to save dark mode:', e);
    }
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Sync Language and Direction to DOM
  useEffect(() => {
    try {
      localStorage.setItem('quran_language', currentLanguage);
    } catch (e) {
      console.warn('Failed to save language:', e);
    }
    const isRTL = currentLanguage === 'ar' || currentLanguage === 'ur';
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLanguage);
  }, [currentLanguage]);

  // Save bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('quran_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('Failed to save bookmarks:', e);
    }
  }, [bookmarks]);

  // Load verses when Surah, active Tafsir, or Language changes
  useEffect(() => {
    let isCancelled = false;
    async function loadSurah() {
      setLoadingSurah(true);
      const langConfig = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage);
      const translationEdition = langConfig && langConfig.code !== 'ar' ? langConfig.translationId : undefined;
      const ayahs = await fetchSurahVerses(currentSurahNumber, activeTafsir.apiIdentifier, translationEdition);
      if (!isCancelled) {
        setSurahAyahs(ayahs);
        setLoadingSurah(false);
      }
    }
    loadSurah();
    return () => {
      isCancelled = true;
    };
  }, [currentSurahNumber, activeTafsir.id, currentLanguage]);

  // Load page verses when Page changes
  useEffect(() => {
    let isCancelled = false;
    async function loadPage() {
      setLoadingPage(true);
      const res = await fetchPageVerses(currentPageNumber);
      if (!isCancelled) {
        setPageAyahs(res.ayahs);
        setLoadingPage(false);
      }
    }
    loadPage();
    return () => {
      isCancelled = true;
    };
  }, [currentPageNumber]);

  // Check URL query parameters (e.g. ?autostart=1 or ?page=X)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'pages') {
      setActiveView('pages');
    } else if (params.get('view') === 'index') {
      setActiveView('index');
    }
    const sParam = params.get('surah');
    if (sParam) {
      const sNum = parseInt(sParam, 10);
      if (sNum >= 1 && sNum <= 114) {
        setCurrentSurahNumber(sNum);
      }
    }
    const pParam = params.get('page');
    if (pParam) {
      const pNum = parseInt(pParam, 10);
      if (pNum >= 1 && pNum <= 604) {
        setCurrentPageNumber(pNum);
      }
    }
  }, []);

  // Audio Playback Handlers
  const handlePlayAyah = (ayah: Ayah) => {
    if (playingAyah?.numberInSurah === ayah.numberInSurah && isPlaying) {
      setIsPlaying(false);
    } else {
      setPlayingAyah(ayah);
      setIsPlaying(true);
    }
  };

  const handleNextAyah = () => {
    if (!playingAyah) return;
    const nextIdx = surahAyahs.findIndex(a => a.numberInSurah === playingAyah.numberInSurah) + 1;
    if (nextIdx < surahAyahs.length) {
      setPlayingAyah(surahAyahs[nextIdx]);
      setIsPlaying(true);
    } else {
      if (currentSurahNumber < 114) {
        const nextSurah = currentSurahNumber + 1;
        setCurrentSurahNumber(nextSurah);
      } else {
        setIsPlaying(false);
      }
    }
  };

  const handlePrevAyah = () => {
    if (!playingAyah) return;
    const prevIdx = surahAyahs.findIndex(a => a.numberInSurah === playingAyah.numberInSurah) - 1;
    if (prevIdx >= 0) {
      setPlayingAyah(surahAyahs[prevIdx]);
      setIsPlaying(true);
    }
  };

  // Tafsir Modal Handler
  const handleOpenTafsir = (ayah: Ayah) => {
    setSelectedAyahForTafsir(ayah);
    setTafsirModalOpen(true);
  };

  // Bookmark Toggle
  const handleToggleBookmark = (ayah: Ayah) => {
    const existing = bookmarks.find(
      b => b.surahNumber === currentSurahNumber && b.ayahNumber === ayah.numberInSurah
    );
    if (existing) {
      setBookmarks(bookmarks.filter(b => b.id !== existing.id));
    } else {
      const newBookmark: Bookmark = {
        id: `${currentSurahNumber}-${ayah.numberInSurah}-${Date.now()}`,
        surahNumber: currentSurahNumber,
        surahName: currentSurahMeta.name,
        ayahNumber: ayah.numberInSurah,
        text: ayah.text,
        createdAt: Date.now(),
      };
      setBookmarks([newBookmark, ...bookmarks]);
    }
  };

  const isBookmarked = (ayahNumber: number): boolean => {
    return bookmarks.some(
      b => b.surahNumber === currentSurahNumber && b.ayahNumber === ayahNumber
    );
  };

  // Navigation Jump Handlers
  const handleSelectSurah = (surahNumber: number) => {
    setCurrentSurahNumber(surahNumber);
    const meta = getSurahMeta(surahNumber);
    if (meta) {
      setCurrentPageNumber(meta.page);
    }
    setActiveView('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAyahFromSearch = (surahNumber: number, ayahNumber: number) => {
    setCurrentSurahNumber(surahNumber);
    setActiveView('reader');
    setTimeout(() => {
      const elem = document.getElementById(`ayah-${ayahNumber}`);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#0c1311] text-stone-900 dark:text-stone-100 selection:bg-[#C5A059]/25 w-full max-w-full overflow-x-hidden transition-colors">
      {/* Universal Top Bar with Globe, Tafsir, Dark Mode, Tajweed */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        openSearch={() => setSearchModalOpen(true)}
        openBookmarks={() => setBookmarksDrawerOpen(true)}
        openTajweedGuide={() => setTajweedGuideOpen(true)}
        openTafsirLibrary={() => setTafsirLibraryOpen(true)}
        openLanguageModal={() => setLanguageModalOpen(true)}
        openLicenses={() => setLicensesModalOpen(true)}
        tajweedEnabled={tajweedEnabled}
        setTajweedEnabled={setTajweedEnabled}
        bookmarkCount={bookmarks.length}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentLanguage={currentLanguage}
        activeTafsirName={activeTafsir.name}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activeView === 'reader' && (
          <SurahContinuousView
            surah={currentSurahMeta}
            ayahs={surahAyahs}
            loading={loadingSurah}
            onSelectSurah={handleSelectSurah}
            playingAyahNumber={playingAyah?.numberInSurah ?? null}
            isPlaying={isPlaying}
            onPlayAyah={handlePlayAyah}
            onOpenTafsir={handleOpenTafsir}
            onToggleBookmark={handleToggleBookmark}
            isBookmarked={isBookmarked}
            tajweedEnabled={tajweedEnabled}
            fontSize={fontSize}
            setFontSize={setFontSize}
            selectedFont={selectedFont}
            setSelectedFont={setSelectedFont}
            isDark={darkMode}
            onOpenTajweedGuide={() => setTajweedGuideOpen(true)}
            currentLanguage={currentLanguage}
          />
        )}

        {activeView === 'pages' && (
          <MushafPageView
            currentPage={currentPageNumber}
            onPageChange={(page) => {
              setCurrentPageNumber(page);
              const foundSurah = getSurahByPage(page);
              if (foundSurah && foundSurah.number !== currentSurahNumber) {
                setCurrentSurahNumber(foundSurah.number);
              }
            }}
            pageVerses={pageAyahs}
            loading={loadingPage}
            surahMeta={getSurahByPage(currentPageNumber)}
            tajweedEnabled={tajweedEnabled}
            onPlayAyah={handlePlayAyah}
            onOpenTafsir={handleOpenTafsir}
            onToggleBookmark={handleToggleBookmark}
            isBookmarked={isBookmarked}
            playingAyahNumber={playingAyah?.numberInSurah ?? null}
            isPlaying={isPlaying}
            isDark={darkMode}
            onOpenTajweedGuide={() => setTajweedGuideOpen(true)}
            currentLanguage={currentLanguage}
          />
        )}

        {activeView === 'index' && (
          <SurahIndexView
            onSelectSurah={handleSelectSurah}
            onSelectPage={(page) => {
              setCurrentPageNumber(page);
              setActiveView('pages');
            }}
            currentLanguage={currentLanguage}
          />
        )}
      </main>

      {/* Sticky Audio Player Bar */}
      {playingAyah && (
        <AudioPlayerBar
          currentAyah={playingAyah}
          surahNumber={currentSurahNumber}
          surahName={currentSurahMeta.name}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onNextAyah={handleNextAyah}
          onPrevAyah={handlePrevAyah}
          onClose={() => {
            setIsPlaying(false);
            setPlayingAyah(null);
          }}
          selectedReciterId={selectedReciterId}
          onSelectReciter={setSelectedReciterId}
        />
      )}

      {/* Tafsir and AI Tadabbur Modal */}
      <TafsirTadabburModal
        isOpen={tafsirModalOpen}
        onClose={() => setTafsirModalOpen(false)}
        ayah={selectedAyahForTafsir}
        surahName={currentSurahMeta.name}
        onPlayAudio={() => {
          if (selectedAyahForTafsir) {
            handlePlayAyah(selectedAyahForTafsir);
          }
        }}
      />

      {/* Accredited Tafsir Library and Downloader Modal */}
      <TafsirLibraryModal
        isOpen={tafsirLibraryOpen}
        onClose={() => setTafsirLibraryOpen(false)}
        activeTafsirId={activeTafsir.id}
        onSelectTafsir={(edition) => {
          setActiveTafsir(edition);
          try {
            localStorage.setItem('quran_active_tafsir_id', edition.id);
          } catch (e) {
            console.warn(e);
          }
        }}
        currentSurahNumber={currentSurahNumber}
      />

      {/* Multilingual Selector Modal with Globe Trigger */}
      <LanguageSelectorModal
        isOpen={languageModalOpen}
        onClose={() => setLanguageModalOpen(false)}
        currentLanguage={currentLanguage}
        onSelectLanguage={(lang: LanguageConfig) => {
          setCurrentLanguage(lang.code);
        }}
      />

      {/* Tajweed Color Guide Modal */}
      <TajweedGuideModal
        isOpen={tajweedGuideOpen}
        onClose={() => setTajweedGuideOpen(false)}
      />

      {/* Licenses and Legal Attribution Modal */}
      <LicensesAttributionModal
        isOpen={licensesModalOpen}
        onClose={() => setLicensesModalOpen(false)}
      />

      {/* Quran Search Modal (Text & AI Semantic) */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectAyah={handleSelectAyahFromSearch}
      />

      {/* Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={bookmarksDrawerOpen}
        onClose={() => setBookmarksDrawerOpen(false)}
        bookmarks={bookmarks}
        onSelectBookmark={handleSelectAyahFromSearch}
        onRemoveBookmark={(id) => setBookmarks(bookmarks.filter(b => b.id !== id))}
      />

      {/* Footer with Mandatory Legal Attribution */}
      <Footer
        onOpenLicenses={() => setLicensesModalOpen(true)}
        onOpenTajweedGuide={() => setTajweedGuideOpen(true)}
      />
    </div>
  );
}
