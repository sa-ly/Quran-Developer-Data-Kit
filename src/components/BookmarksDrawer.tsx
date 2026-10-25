import React from 'react';
import { X, Bookmark as BookmarkIcon, Trash2, ArrowUpRight } from 'lucide-react';
import { Bookmark } from '../types/quran';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Bookmark[];
  onSelectBookmark: (surahNumber: number, ayahNumber: number) => void;
  onRemoveBookmark: (id: string) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onSelectBookmark,
  onRemoveBookmark,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/50 dark:bg-black/70 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-white dark:bg-[#121A17] h-full shadow-2xl border-r border-stone-200 dark:border-stone-800 flex flex-col"
        role="dialog"
        aria-labelledby="bookmarks-title"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-[#141E1B]">
          <div className="flex items-center gap-2">
            <BookmarkIcon className="w-5 h-5 text-amber-700 dark:text-amber-400 fill-amber-700 dark:fill-amber-400" />
            <h2 id="bookmarks-title" className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">
              العلامات المرجعية المحفوظة ({bookmarks.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 rounded-lg transition-colors"
            aria-label="إغلاق العلامات المرجعية"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bookmarks List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {bookmarks.length === 0 ? (
            <div className="text-center py-16 space-y-2 text-stone-500 dark:text-stone-400">
              <BookmarkIcon className="w-8 h-8 mx-auto text-stone-300 dark:text-stone-600" />
              <p className="text-sm font-medium">لا توجد علامات مرجعية حتى الآن</p>
              <p className="text-xs text-stone-400 dark:text-stone-500">
                يمكنك حفظ أي آية أثناء القراءة بالضغط على أيقونة العلامة المرجعية للعودة إليها لاحقاً.
              </p>
            </div>
          ) : (
            bookmarks.map((bm) => (
              <div
                key={bm.id}
                className="p-3.5 bg-[#FDFBF7] dark:bg-[#15201C] rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-400 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 dark:text-amber-100 font-serif text-sm">
                    سورة {bm.surahName} (الآية {bm.ayahNumber})
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        onSelectBookmark(bm.surahNumber, bm.ayahNumber);
                        onClose();
                      }}
                      className="p-1.5 text-xs text-[#064E3B] dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 rounded-md transition-colors flex items-center gap-1"
                      title="انتقال للآية"
                      aria-label="انتقال"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onRemoveBookmark(bm.id)}
                      className="p-1.5 text-xs text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-md transition-colors"
                      title="حذف من العلامات"
                      aria-label="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="font-quran text-base text-stone-800 dark:text-stone-200 leading-relaxed font-serif line-clamp-2">
                  {bm.text}
                </p>

                <div className="text-[10px] text-stone-400 dark:text-stone-500 text-left pt-1 font-mono">
                  {new Date(bm.createdAt).toLocaleDateString('ar-EG', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
