import React, { createContext, useContext, useState } from 'react';

export type Theme = 'light' | 'dark' | 'papyrus';
export type FontFamily = 'serif' | 'sans' | 'slab';

interface ReaderContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    fontSize: number;
    increaseFontSize: () => void;
    decreaseFontSize: () => void;
    fontFamily: FontFamily;
    cycleFontFamily: () => void;
    activeChapterId: string;
    setActiveChapterId: (id: string) => void;
}

const ReaderContext = createContext<ReaderContextType | undefined>(undefined);

export const ReaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initialize state from localStorage or defaults
    const [theme, setThemeState] = useState<Theme>(() => {
        return (localStorage.getItem('reader-theme') as Theme) || 'light';
    });

    // Default base size 100% (16px approx)
    const [fontSize, setFontSizeState] = useState<number>(() => {
        const stored = localStorage.getItem('reader-font-size');
        return stored ? parseInt(stored, 10) : 16;
    });

    const [fontFamily, setFontFamilyState] = useState<FontFamily>(() => {
        return (localStorage.getItem('reader-font-family') as FontFamily) || 'serif';
    });

    const [activeChapterId, setActiveChapterId] = useState<string>('');

    // Apply Font Size to Root HTML element for REM scaling
    /* 
    Antigravity Update: Removed root scaling to keep layout fixed. 
    Font size is now applied to content wrapper.
    */
    // useEffect(() => {
    //     document.documentElement.style.fontSize = `${fontSize}px`;
    // }, [fontSize]);

    // Wrappers to sync with localStorage
    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('reader-theme', newTheme);
    };

    const increaseFontSize = () => {
        setFontSizeState(prev => {
            const newValue = Math.min(prev + 2, 24); // Cap at 24px base
            localStorage.setItem('reader-font-size', newValue.toString());
            return newValue;
        });
    };

    const decreaseFontSize = () => {
        setFontSizeState(prev => {
            const newValue = Math.max(prev - 2, 12); // Min 12px base
            localStorage.setItem('reader-font-size', newValue.toString());
            return newValue;
        });
    };

    const cycleFontFamily = () => {
        setFontFamilyState(prev => {
            let next: FontFamily = 'serif';
            if (prev === 'serif') next = 'sans';
            else if (prev === 'sans') next = 'slab';
            else next = 'serif';

            localStorage.setItem('reader-font-family', next);
            return next;
        });
    };

    return (
        <ReaderContext.Provider value={{
            theme,
            setTheme,
            fontSize,
            increaseFontSize,
            decreaseFontSize,
            fontFamily,
            cycleFontFamily,
            activeChapterId,
            setActiveChapterId
        }}>
            {children}
        </ReaderContext.Provider>
    );
};

export const useReader = () => {
    const context = useContext(ReaderContext);
    if (context === undefined) {
        throw new Error('useReader must be used within a ReaderProvider');
    }
    return context;
};
