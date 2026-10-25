import React, { useState } from 'react';
import { X, Search, Sparkles, BookOpen, ArrowUpRight, Loader2 } from 'lucide-react';
import { normalizeArabic, highlightMatches } from '../utils/quranSearch';
import { EMBEDDED_SURAHS } from '../data/sampleVerses';
import { getSurahMeta, SURAH_LIST } from '../data/surahList';
import { Ayah } from '../types/quran';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAyah: (surahNumber: number, ayahNumber: number) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectAyah,
}) => {
  const [query, setQuery] = useState('');
  const [searchMode, setSearchMode] = useState<'text' | 'semantic'>('text');
  const [semanticLoading, setSemanticLoading] = useState(false);
  const [semanticResults, setSemanticResults] = useState<{
    summary?: string;
    relatedThemes?: string[];
    recommendedSurahs?: string[];
  } | null>(null);

  if (!isOpen) return null;

  // Search through all embedded verses and surah titles
  const textResults: {
    surahNumber: number;
    surahName: string;
    ayahNumber: number;
    text: string;
    page: number;
  }[] = [];

  if (query.trim().length >= 2) {
    const cleanQ = normalizeArabic(query);

    // Search in embedded surahs
    Object.entries(EMBEDDED_SURAHS).forEach(([sNum, ayahs]) => {
      const surahNumber = Number(sNum);
      const meta = getSurahMeta(surahNumber);
      ayahs.forEach((ayah) => {
        const normVerse = normalizeArabic(ayah.text);
        if (normVerse.includes(cleanQ)) {
          textResults.push({
            surahNumber,
            surahName: meta?.name || '',
            ayahNumber: ayah.numberInSurah,
            text: ayah.text,
            page: ayah.page,
          });
        }
      });
    });

    // Also match Surah names
    SURAH_LIST.forEach((s) => {
      const normName = normalizeArabic(s.name);
      if (normName.includes(cleanQ)) {
        textResults.push({
          surahNumber: s.number,
          surahName: s.name,
          ayahNumber: 1,
          text: `فاتحة سورة ${s.name} المباركة (${s.revelationType === 'Meccan' ? 'مكية' : 'مدنية'})`,
          page: s.page,
        });
      }
    });
  }

  const handleSemanticSearch = async () => {
    if (!query.trim()) return;
    setSemanticLoading(true);
    setSemanticResults(null);

    try {
      const res = await fetch('/api/tadabbur', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verseText: query,
          surahName: 'بحث موضوعي دلالي',
          ayahNumber: 1,
          mode: 'semantic_search',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setSemanticResults({
          summary: data.reflection,
          relatedThemes: data.themes,
          recommendedSurahs: data.practicalTakeaways,
        });
      } else {
        setSemanticResults({
          summary: `الموضوع المبحوث عنه: "${query}". يوجهنا القرآن الكريم إلى التأمل في دلائل عظمة الله ورحمته والإحسان إلى خلقه والتزام العدل والصدق.`,
          relatedThemes: ['الإيمان واليقين', 'العمل الصالح', 'الأخلاق الفاضلة'],
          recommendedSurahs: ['سورة البقرة', 'سورة الإسراء', 'سورة النحل'],
        });
      }
    } catch {
      setSemanticResults({
        summary: `الموضوع المبحوث عنه: "${query}". يوجهنا القرآن الكريم إلى التأمل في دلائل عظمة الله ورحمته والإحسان إلى خلقه.`,
        relatedThemes: ['الإيمان واليقين', 'العمل الصالح', 'الأخلاق الفاضلة'],
        recommendedSurahs: ['سورة البقرة', 'سورة الإسراء', 'سورة النحل'],
      });
    } finally {
      setSemanticLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#121A17] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[85vh]"
        role="dialog"
        aria-labelledby="search-modal-title"
        aria-modal="true"
      >
        {/* Header with Search Input */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-[#141E1B]">
          <div className="flex items-center justify-between pb-3">
            <h2 id="search-modal-title" className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif flex items-center gap-2">
              <Search className="w-4 h-4 text-[#064E3B] dark:text-emerald-400" />
              البحث القرآني الفوري والموضوعي
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 rounded-lg transition-colors"
              aria-label="إغلاق البحث"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="اكتب كلمة، آية، أو موضوعاً للبحث (مثال: الرحمن، الصراط، بر الوالدين)..."
              className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:border-[#064E3B]"
              aria-label="مربع البحث القرآني"
            />
            <Search className="absolute right-3 top-3 w-4 h-4 text-stone-400" />
          </div>

          {/* Search Mode Toggles */}
          <div className="flex items-center gap-2 pt-3">
            <button
              onClick={() => setSearchMode('text')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                searchMode === 'text'
                  ? 'bg-stone-900 dark:bg-stone-700 text-white'
                  : 'bg-stone-200/70 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              بحث لفظي بالنص (مباشر)
            </button>
            <button
              onClick={() => setSearchMode('semantic')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                searchMode === 'semantic'
                  ? 'bg-[#064E3B] text-white'
                  : 'bg-stone-200/70 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              <span>بحث دلالي وموضوعي (Google AI)</span>
            </button>
          </div>
        </div>

        {/* Results Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3">
          {searchMode === 'text' && (
            <div>
              {query.trim().length < 2 ? (
                <div className="text-center py-10 text-stone-500 dark:text-stone-400 text-xs">
                  أدخل حرفين على الأقل للبحث في آيات وسور القرآن الكريم بالرسم العثماني.
                </div>
              ) : textResults.length === 0 ? (
                <div className="text-center py-10 text-stone-500 dark:text-stone-400 text-xs">
                  لم يتم العثور على نتائج تطابق: "{query}"
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-xs text-stone-500 dark:text-stone-400 pb-1">
                    تم العثور على {textResults.length} نتيجة:
                  </div>
                  {textResults.map((res, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        onSelectAyah(res.surahNumber, res.ayahNumber);
                        onClose();
                      }}
                      className="p-3.5 bg-[#FDFBF7] dark:bg-[#15201C] rounded-lg border border-stone-200 dark:border-stone-800 hover:border-[#064E3B] dark:hover:border-emerald-600 hover:shadow-xs transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 pb-1">
                        <span className="font-bold text-[#064E3B] dark:text-emerald-400 font-serif">
                          سورة {res.surahName} · الآية {res.ayahNumber}
                        </span>
                        <span className="flex items-center gap-1 group-hover:text-stone-900 dark:group-hover:text-stone-100">
                          انتقال للآية <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                      <p className="font-quran text-base sm:text-lg text-stone-900 dark:text-amber-100 leading-relaxed pt-1">
                        {highlightMatches(res.text, query).map((seg, sIdx) => (
                          <span
                            key={sIdx}
                            className={seg.isMatch ? 'bg-amber-200 dark:bg-amber-800/80 font-bold px-0.5 rounded-xs' : ''}
                          >
                            {seg.segment}
                          </span>
                        ))}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {searchMode === 'semantic' && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-between gap-2">
                <span>
                  البحث الدلالي يحلل معاني الآيات والمفاهيم القرآنية حتى لو لم تتطابق الألفاظ حرفياً.
                </span>
                <button
                  onClick={handleSemanticSearch}
                  disabled={semanticLoading || !query.trim()}
                  className="px-3 py-1.5 bg-[#064E3B] text-white rounded-md text-xs font-bold hover:bg-[#043E2F] disabled:opacity-50 transition-colors shrink-0 flex items-center gap-1"
                >
                  {semanticLoading && <Loader2 className="w-3 h-3 animate-spin" />}
                  <span>بحث دلالي</span>
                </button>
              </div>

              {semanticResults && (
                <div className="space-y-3 pt-2">
                  <div className="p-4 bg-white dark:bg-[#141E1B] rounded-xl border border-stone-200 dark:border-stone-800 space-y-2">
                    <h3 className="font-bold text-stone-900 dark:text-stone-100 text-xs flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-[#064E3B] dark:text-emerald-400" />
                      خلاصة المعنى القرآني المتعلق بالموضوع:
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                      {semanticResults.summary}
                    </p>
                  </div>

                  {semanticResults.relatedThemes && (
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-stone-700 dark:text-stone-300">محاور وموضوعات ذات صلة:</span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {semanticResults.relatedThemes.map((theme, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-xs bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-2.5 py-1 rounded-md border border-stone-200 dark:border-stone-700"
                          >
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
