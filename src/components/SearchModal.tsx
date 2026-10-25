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
      if (normalizeArabic(s.name).includes(cleanQ)) {
        textResults.push({
          surahNumber: s.number,
          surahName: s.name,
          ayahNumber: 1,
          text: `سورة ${s.name} (${s.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}) - ${s.numberOfAyahs} آيات`,
          page: s.page,
        });
      }
    });
  }

  const handleSemanticSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSemanticLoading(true);
    try {
      const res = await fetch('/api/gemini/semantic-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      if (res.ok) {
        const data = await res.json();
        setSemanticResults(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSemanticLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh]"
        role="dialog"
        aria-labelledby="search-modal-title"
        aria-modal="true"
      >
        {/* Header with Search Input */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="flex items-center justify-between pb-3">
            <h2 id="search-modal-title" className="text-base font-bold text-stone-900 font-serif flex items-center gap-2">
              <Search className="w-4 h-4 text-[#064E3B]" />
              البحث القرآني الفوري والموضوعي
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 rounded-lg transition-colors"
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
              className="w-full pl-4 pr-10 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B]"
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
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-200/70 text-stone-700 hover:bg-stone-200'
              }`}
            >
              بحث لفظي بالنص (مباشر)
            </button>
            <button
              onClick={() => setSearchMode('semantic')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                searchMode === 'semantic'
                  ? 'bg-[#064E3B] text-white'
                  : 'bg-stone-200/70 text-stone-700 hover:bg-stone-200'
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
                <div className="text-center py-10 text-stone-500 text-xs">
                  أدخل حرفين على الأقل للبحث في آيات وسور القرآن الكريم بالرسم العثماني.
                </div>
              ) : textResults.length === 0 ? (
                <div className="text-center py-10 text-stone-500 text-xs">
                  لم يتم العثور على نتائج تطابق: "{query}"
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-xs text-stone-500 pb-1">
                    تم العثور على {textResults.length} نتيجة:
                  </div>
                  {textResults.map((res, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        onSelectAyah(res.surahNumber, res.ayahNumber);
                        onClose();
                      }}
                      className="p-3.5 bg-[#FDFBF7] rounded-lg border border-stone-200 hover:border-[#064E3B] hover:shadow-xs transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between text-xs text-stone-500 pb-1">
                        <span className="font-bold text-[#064E3B] font-serif">
                          سورة {res.surahName} · الآية {res.ayahNumber}
                        </span>
                        <span className="flex items-center gap-1 group-hover:text-stone-900">
                          انتقال للآية <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                      <p className="font-quran text-base sm:text-lg text-stone-900 leading-relaxed pt-1">
                        {highlightMatches(res.text, query).map((seg, sIdx) => (
                          <span
                            key={sIdx}
                            className={seg.isMatch ? 'bg-amber-200 font-bold px-0.5 rounded-xs' : ''}
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
              <div className="flex items-center justify-between bg-emerald-50/60 p-3 rounded-lg border border-emerald-200 text-xs text-emerald-900">
                <span>
                  البحث الدلالي الذكي يحلل المعنى والموضوع القرآني حتى وإن لم تتطابق الألفاظ حرفياً.
                </span>
                <button
                  onClick={handleSemanticSearch}
                  disabled={semanticLoading || !query.trim()}
                  className="px-3 py-1 bg-[#064E3B] text-white rounded-md text-xs font-medium hover:bg-[#043E2F] disabled:opacity-50 transition-colors shrink-0 flex items-center gap-1.5"
                >
                  {semanticLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />}
                  <span>بحث ذكي</span>
                </button>
              </div>

              {semanticLoading && (
                <div className="text-center py-10 space-y-2">
                  <Loader2 className="w-6 h-6 animate-spin text-[#064E3B] mx-auto" />
                  <p className="text-xs text-stone-500">جاري استخراج المعاني والمحاور القرآنية...</p>
                </div>
              )}

              {semanticResults && !semanticLoading && (
                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-lg border border-stone-200 space-y-2">
                    <h3 className="font-bold text-stone-900 text-xs font-serif">
                      خلاصة هدايات القرآن في موضوع: "{query}"
                    </h3>
                    <p className="text-stone-700 text-xs leading-relaxed">
                      {semanticResults.summary}
                    </p>
                  </div>

                  {semanticResults.relatedThemes && (
                    <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-1.5">
                      <span className="font-bold text-stone-900 text-xs">أبرز المحاور المرتبطة:</span>
                      <div className="flex flex-wrap gap-2 pt-1 text-xs text-stone-700">
                        {semanticResults.relatedThemes.map((theme, tIdx) => (
                          <span
                            key={tIdx}
                            className="bg-white px-2.5 py-1 rounded-md border border-stone-200"
                          >
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {semanticResults.recommendedSurahs && (
                    <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-1.5">
                      <span className="font-bold text-stone-900 text-xs">سور يُوصى بتدبرها:</span>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {semanticResults.recommendedSurahs.map((sName, sIdx) => {
                          const found = SURAH_LIST.find((s) => s.name === sName);
                          return (
                            <button
                              key={sIdx}
                              onClick={() => {
                                if (found) {
                                  onSelectAyah(found.number, 1);
                                  onClose();
                                }
                              }}
                              className="text-xs bg-[#064E3B] text-white px-2.5 py-1 rounded-md hover:bg-[#043E2F] transition-colors"
                            >
                              سورة {sName}
                            </button>
                          );
                        })}
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
