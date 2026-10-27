import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Repeat, X, Music } from 'lucide-react';
import { RECITERS, getAyahAudioUrl } from '../services/quranApi';
import { Ayah } from '../types/quran';

interface AudioPlayerBarProps {
  currentAyah: Ayah | null;
  surahNumber: number;
  surahName: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNextAyah: () => void;
  onPrevAyah: () => void;
  onClose: () => void;
  selectedReciterId: string;
  onSelectReciter: (id: string) => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentAyah,
  surahNumber,
  surahName,
  isPlaying,
  onPlayPause,
  onNextAyah,
  onPrevAyah,
  onClose,
  selectedReciterId,
  onSelectReciter,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [autoRepeat, setAutoRepeat] = useState(false);

  // Sync audio source when ayah or reciter changes
  useEffect(() => {
    if (!currentAyah) return;
    const url = getAyahAudioUrl(selectedReciterId, surahNumber, currentAyah.numberInSurah);
    if (audioRef.current) {
      audioRef.current.src = url;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.warn('Audio play error:', e));
      }
    }
  }, [currentAyah?.numberInSurah, surahNumber, selectedReciterId]);

  // Sync isPlaying state
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(e => console.warn('Audio play error:', e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const cur = audioRef.current.currentTime;
      const dur = audioRef.current.duration || 1;
      setProgress((cur / dur) * 100);
      setDuration(dur);
    }
  };

  const handleEnded = () => {
    if (autoRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      onNextAyah();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current && duration) {
      audioRef.current.currentTime = (val / 100) * duration;
      setProgress(val);
    }
  };

  if (!currentAyah) return null;

  const currentReciter = RECITERS.find(r => r.id === selectedReciterId) || RECITERS[0];

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white/95 dark:bg-[#111A17]/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 shadow-xl px-4 py-3 transition-all">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        preload="auto"
      />

      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Reciter and Ayah details */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#064E3B] dark:bg-emerald-800 text-white flex items-center justify-center shrink-0">
              <Music className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 font-serif">
                  سورة {surahName}
                </span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded">
                  الآية {currentAyah.numberInSurah}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-[11px] text-stone-600 dark:text-stone-300">
                <select
                  value={selectedReciterId}
                  onChange={(e) => onSelectReciter(e.target.value)}
                  className="bg-stone-100 dark:bg-[#15201C] border border-stone-200 dark:border-stone-700 rounded px-2 py-0.5 text-[11px] font-semibold text-emerald-900 dark:text-emerald-300 focus:outline-hidden cursor-pointer max-w-[210px] sm:max-w-[240px] truncate"
                  aria-label="اختيار القارئ"
                >
                  {RECITERS.map((r) => (
                    <option key={r.id} value={r.id} className="dark:bg-[#121A17] text-stone-900 dark:text-stone-100">
                      القارئ: {r.name} ({r.style})
                    </option>
                  ))}
                </select>
                <span className="hidden md:inline text-[10px] text-stone-400 dark:text-stone-500 truncate">
                  · {currentReciter.style}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="sm:hidden p-1 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
            aria-label="إغلاق المشغل"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Playback Controls & Progress */}
        <div className="flex flex-col items-center gap-1.5 w-full sm:max-w-md">
          <div className="flex items-center gap-4">
            <button
              onClick={onPrevAyah}
              className="p-1.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
              title="الآية السابقة"
              aria-label="الآية السابقة"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={onPlayPause}
              className="w-9 h-9 rounded-full bg-[#064E3B] hover:bg-[#043E2F] text-white flex items-center justify-center shadow-md transition-transform active:scale-95"
              aria-label={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white translate-x-[-1px]" />}
            </button>

            <button
              onClick={onNextAyah}
              className="p-1.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
              title="الآية التالية"
              aria-label="الآية التالية"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={() => setAutoRepeat(!autoRepeat)}
              className={`p-1.5 rounded-md transition-colors ${
                autoRepeat ? 'text-[#064E3B] dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/60 font-bold' : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
              }`}
              title={autoRepeat ? 'تكرار الآية مفعل' : 'تكرار الآية معطل'}
              aria-label="تكرار الآية"
            >
              <Repeat className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Seekbar */}
          <div className="w-full flex items-center gap-2 px-2">
            <input
              type="range"
              min="0"
              max="100"
              value={progress || 0}
              onChange={handleSeek}
              className="w-full h-1 bg-stone-300 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#064E3B] dark:accent-emerald-500"
              aria-label="شريط تقدم التلاوة"
            />
          </div>
        </div>

        {/* Mute and Close controls */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.muted = !isMuted;
                setIsMuted(!isMuted);
              }
            }}
            className="p-1.5 text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
            aria-label={isMuted ? 'إلغاء كتم الصوت' : 'كتم الصوت'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
            title="إغلاق المشغل"
            aria-label="إغلاق المشغل الصوتي"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
