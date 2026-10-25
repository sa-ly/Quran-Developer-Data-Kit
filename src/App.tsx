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
import { TajweedGuideModal } from './components/TajweedGuideModal';
import { LicensesAttributionModal } from './components/LicensesAttributionModal';
import { SearchModal } from './components/SearchModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { Footer } from './components/Footer';

import { Ayah, SurahMeta, Bookmark } from './types/quran';
import { SURAH_LIST, getSurahMeta, getSurahByPage } from './data/surahList';
import { fetchSurahVerses, fetchPageVerses } from './services/quranApi';

export default function App() {
  // Navigation & View State
  const [activeView, setActiveView] = useState<'reader' | 'pages' | 'index'>('reader');
  const [currentSurahNumber, setCurrentSurahNumber] = useState<number>(1);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);

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

  // Save bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('quran_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('Failed to save bookmarks:', e);
    }
  }, [bookmarks]);

  // Load verses when Surah changes
  useEffect(() => {
    let isCancelled = false;
    async function loadSurah() {
      setLoadingSurah(true);
      const ayahs = await fetchSurahVerses(currentSurahNumber);
      if (!isCancelled) {
        setSurahAyahs(ayahs);
        setLoadingSurah(false);
      }
    }
    loadSurah();
    return () => {
      isCancelled = true;
    };
  }, [currentSurahNumber]);

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

  // Check URL query parameters (e.g. ?autostart=1)
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
      // Advance to next Surah if available
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
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-[#C5A059]/25 w-full max-w-full overflow-x-hidden">
      {/* Universal Top Bar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        openSearch={() => setSearchModalOpen(true)}
        openBookmarks={() => setBookmarksDrawerOpen(true)}
        openTajweedGuide={() => setTajweedGuideOpen(true)}
        openLicenses={() => setLicensesModalOpen(true)}
        tajweedEnabled={tajweedEnabled}
        setTajweedEnabled={setTajweedEnabled}
        bookmarkCount={bookmarks.length}
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
          />
        )}

        {activeView === 'index' && (
          <SurahIndexView
            onSelectSurah={handleSelectSurah}
            onSelectPage={(page) => {
              setCurrentPageNumber(page);
              setActiveView('pages');
            }}
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
