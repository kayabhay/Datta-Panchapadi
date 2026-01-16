import React from 'react';
import { NavigationMenu } from '../Navigation/NavigationMenu';
import { useReader } from '../../context/ReaderContext';
import { UtilityBar } from './UtilityBar';
import clsx from 'clsx';

interface ReaderLayoutProps {
    children: React.ReactNode;
}

export const ReaderLayout: React.FC<ReaderLayoutProps> = ({ children }) => {
    const { theme, fontFamily, fontSize } = useReader();

    const fontClass = {
        'serif': 'font-serif',
        'sans': 'font-sans',
        'slab': 'font-[var(--font-slab)]'
    }[fontFamily];

    return (
        <div
            className={clsx(
                "min-h-screen w-full transition-colors duration-300 selection:bg-yellow-100 selection:text-ink",
                `theme-${theme}`,
                fontClass
            )}
            style={{
                background: 'var(--bg-app)'
            } as React.CSSProperties}
        >
            <NavigationMenu />
            {/* 
            Antigravity Principle: Minimal Chrome.
            We might add a fading nav bar later. for now, just content.
            */}
            <main className="w-full flex justify-center pb-24">
                <div style={{ fontSize: `${fontSize}px` }} className="w-full">
                    {children}
                </div>
            </main>

            <UtilityBar />
        </div>
    );
};
