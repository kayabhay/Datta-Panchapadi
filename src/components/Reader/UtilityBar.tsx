import React from 'react';
import { useReader } from '../../context/ReaderContext';
import { sampleBook } from '../../data/sample-book';

interface UtilityBarProps { }

export const UtilityBar: React.FC<UtilityBarProps> = () => {
    const {
        theme, setTheme,
        increaseFontSize, decreaseFontSize,
        fontFamily, cycleFontFamily,
        activeChapterId
    } = useReader();

    // Find indices for navigation
    const currentIndex = sampleBook.chapters.findIndex(ch => ch.id === activeChapterId);

    // Safety check - if no active chapter, defaulting to 0 or keeping current valid logic
    const safeIndex = currentIndex === -1 ? 0 : currentIndex;

    const prevChapter = safeIndex > 0 ? sampleBook.chapters[safeIndex - 1] : null;
    const nextChapter = safeIndex < sampleBook.chapters.length - 1 ? sampleBook.chapters[safeIndex + 1] : null;

    const scrollToChapter = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const cycleTheme = () => {
        if (theme === 'light') setTheme('dark');
        else if (theme === 'dark') setTheme('papyrus');
        else setTheme('light');
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 bg-paper/90 backdrop-blur-md border-t border-ink/10 transition-colors duration-300 print:hidden">
            <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">

                {/* Navigation Group */}
                <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-start">
                    <button
                        onClick={() => prevChapter && scrollToChapter(prevChapter.id)}
                        disabled={!prevChapter}
                        className="px-4 py-2 rounded-lg hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-sans text-sm font-medium flex items-center gap-2"
                    >
                        <span>←</span> <span className="hidden sm:inline">Prev</span>
                    </button>

                    <span className="text-xs font-sans opacity-40 uppercase tracking-widest text-center truncate px-2">
                        {currentIndex + 1} / {sampleBook.chapters.length}
                    </span>

                    <button
                        onClick={() => nextChapter && scrollToChapter(nextChapter.id)}
                        disabled={!nextChapter}
                        className="px-4 py-2 rounded-lg hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-sans text-sm font-medium flex items-center gap-2"
                    >
                        <span className="hidden sm:inline">Next</span> <span>→</span>
                    </button>
                </div>

                {/* Controls Group */}
                <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-center md:justify-end">

                    {/* Theme Toggle */}
                    <button
                        onClick={cycleTheme}
                        className="p-2 rounded-lg hover:bg-black/5 transition-colors"
                        title="Change Theme"
                    >
                        {theme === 'light' && "☀️"}
                        {theme === 'dark' && "🌙"}
                        {theme === 'papyrus' && "📜"}
                    </button>

                    <div className="h-6 w-px bg-current opacity-10" />

                    {/* Font Size */}
                    <div className="flex items-center bg-black/5 rounded-lg">
                        <button
                            onClick={decreaseFontSize}
                            className="px-3 py-2 hover:bg-black/5 rounded-l-lg text-sm font-sans transition-colors"
                        >
                            A-
                        </button>
                        <div className="w-px h-full bg-black/5" />
                        <button
                            onClick={increaseFontSize}
                            className="px-3 py-2 hover:bg-black/5 rounded-r-lg text-lg font-serif font-bold transition-colors"
                        >
                            A+
                        </button>
                    </div>

                    <div className="h-6 w-px bg-current opacity-10" />

                    {/* Font Family */}
                    <button
                        onClick={cycleFontFamily}
                        className="px-3 py-2 rounded-lg hover:bg-black/5 transition-colors font-sans text-sm min-w-[4rem]"
                    >
                        {fontFamily === 'serif' && 'Serif'}
                        {fontFamily === 'sans' && 'Sans'}
                        {fontFamily === 'slab' && 'Slab'}
                    </button>
                </div>

            </div>
        </div>
    );
};
