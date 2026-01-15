import React from 'react';
import { NavigationMenu } from '../Navigation/NavigationMenu';

interface ReaderLayoutProps {
    children: React.ReactNode;
}

export const ReaderLayout: React.FC<ReaderLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen w-full bg-paper selection:bg-yellow-100 selection:text-ink">
            <NavigationMenu />
            {/* 
         Antigravity Principle: Minimal Chrome.
         We might add a fading nav bar later. for now, just content.
       */}
            <main className="w-full">
                {children}
            </main>
        </div>
    );
};
