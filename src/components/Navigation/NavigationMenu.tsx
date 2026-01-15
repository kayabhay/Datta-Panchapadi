import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sampleBook } from '../../data/sample-book';

export const NavigationMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating Trigger Button - Fades when scrolling down (logic can be added) */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-6 left-6 z-50 p-2 rounded-full hover:bg-gray-100 transition-colors opacity-70 hover:opacity-100"
                aria-label="Open Menu"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-white/80 backdrop-blur-sm z-40"
                        />

                        {/* Drawer */}
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-80 bg-white border-r border-gray-100 shadow-xl z-50 p-8 overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-12">
                                <span className="text-sm font-sans tracking-widest text-gray-400 uppercase">Contents</span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-gray-100 rounded-full"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>

                            <nav className="space-y-6">
                                {sampleBook.chapters.map((chapter) => (
                                    <div
                                        key={chapter.id}
                                        className="group cursor-pointer"
                                        onClick={() => {
                                            const el = document.getElementById(chapter.id);
                                            el?.scrollIntoView({ behavior: 'smooth' });
                                            setIsOpen(false);
                                        }}
                                    >
                                        <div className="text-lg font-serif text-ink group-hover:text-red-700 transition-colors">
                                            {chapter.title || "Chapter"}
                                        </div>
                                        <div className="text-xs text-gray-400 font-sans mt-1">
                                            {chapter.slug}
                                        </div>
                                    </div>
                                ))}
                            </nav>

                            <div className="mt-12 pt-12 border-t border-gray-100">
                                <h3 className="text-sm font-sans font-bold text-ink mb-2">{sampleBook.metadata.title}</h3>
                                <p className="text-xs text-gray-500">{sampleBook.metadata.author}</p>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
