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
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/50 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl border-r border-stone-200 flex flex-col"
        role="dialog"
        aria-labelledby="bookmarks-title"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <BookmarkIcon className="w-5 h-5 text-amber-700 fill-amber-700" />
            <h2 id="bookmarks-title" className="text-base font-bold text-stone-900 font-serif">
              العلامات المرجعية المحفوظة ({bookmarks.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 rounded-lg transition-colors"
            aria-label="إغلاق العلامات المرجعية"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bookmarks List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {bookmarks.length === 0 ? (
            <div className="text-center py-16 space-y-2 text-stone-500">
              <BookmarkIcon className="w-8 h-8 mx-auto text-stone-300" />
              <p className="text-sm font-medium">لا توجد علامات مرجعية حتى الآن</p>
              <p className="text-xs text-stone-400">
                يمكنك حفظ أي آية أثناء القراءة بالضغط على أيقونة العلامة المرجعية للعودة إليها لاحقاً.
              </p>
            </div>
          ) : (
            bookmarks.map((bm) => (
              <div
                key={bm.id}
                className="p-3.5 bg-[#FDFBF7] rounded-xl border border-stone-200 hover:border-amber-400 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 font-serif text-sm">
                    سورة {bm.surahName} (الآية {bm.ayahNumber})
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        onSelectBookmark(bm.surahNumber, bm.ayahNumber);
                        onClose();
                      }}
                      className="p-1.5 text-xs text-[#064E3B] hover:bg-emerald-50 rounded-md transition-colors flex items-center gap-1"
                      title="انتقال للآية"
                      aria-label="انتقال"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onRemoveBookmark(bm.id)}
                      className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="حذف العلامة"
                      aria-label="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="font-quran text-base text-stone-800 line-clamp-2 leading-relaxed">
                  {bm.text}
                </p>

                <div className="text-[10px] text-stone-400 text-left">
                  {new Date(bm.createdAt).toLocaleDateString('ar-EG', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
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
