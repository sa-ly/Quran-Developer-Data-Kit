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
    if (audioRef.current && duration > 0) {
      audioRef.current.currentTime = (val / 100) * duration;
      setProgress(val);
    }
  };

  if (!currentAyah) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/98 backdrop-blur-md border-t border-stone-300 shadow-xl px-4 py-3">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
      />

      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Ayah & Reciter Info */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#064E3B] text-[#C5A059] flex items-center justify-center font-bold text-xs shrink-0">
              <Music className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900 font-serif">
                سورة {surahName} · الآية ({currentAyah.numberInSurah})
              </div>
              <div className="text-[11px] text-stone-500 flex items-center gap-2">
                <select
                  value={selectedReciterId}
                  onChange={(e) => onSelectReciter(e.target.value)}
                  className="bg-transparent border-none text-stone-600 focus:outline-hidden cursor-pointer hover:text-stone-900 font-medium p-0 text-[11px]"
                  aria-label="اختيار القارئ"
                >
                  {RECITERS.map((r) => (
                    <option key={r.id} value={r.id} className="text-stone-900 bg-white">
                      القارئ: {r.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="sm:hidden p-1 text-stone-500 hover:text-stone-800"
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
              className="p-1.5 text-stone-600 hover:text-stone-900 transition-colors"
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
              className="p-1.5 text-stone-600 hover:text-stone-900 transition-colors"
              title="الآية التالية"
              aria-label="الآية التالية"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={() => setAutoRepeat(!autoRepeat)}
              className={`p-1.5 rounded-md transition-colors ${
                autoRepeat ? 'text-[#064E3B] bg-emerald-100/70 font-bold' : 'text-stone-400 hover:text-stone-700'
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
              className="w-full h-1 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-[#064E3B]"
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
            className="p-1.5 text-stone-500 hover:text-stone-800 transition-colors"
            aria-label={isMuted ? 'إلغاء كتم الصوت' : 'كتم الصوت'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 transition-colors"
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
