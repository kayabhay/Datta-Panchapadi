import React, { useEffect, useRef } from 'react';
import type { Chapter } from '../../types/book';
import { BlockRenderer } from '../blocks/BlockRenderer';
import { useReader } from '../../context/ReaderContext';

interface ChapterViewProps {
    chapter: Chapter;
}

export const ChapterView: React.FC<ChapterViewProps> = ({ chapter }) => {
    const { setActiveChapterId } = useReader();
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setActiveChapterId(chapter.id);
                }
            },
            { threshold: 0.3 } // 30% of chapter visible = active
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [chapter.id, setActiveChapterId]);

    return (
        <article ref={ref} className="min-h-screen py-12 px-6 md:px-0 w-full max-w-2xl mx-auto flex flex-col justify-center">
            {chapter.title && chapter.title !== "Front Cover" && (
                <header className="mb-12 text-center">
                    {/* <span className="text-sm font-sans tracking-widest text-gray-400 uppercase">
                        {chapter.slug.replace(/-/g, ' ')}
                    </span> */}
                </header>
            )}

            <div className="space-y-2">
                {chapter.blocks.map((block) => (
                    <BlockRenderer key={block.id} block={block} />
                ))}
            </div>

            <div className="mt-12 text-center">
                <span className="text-2xl text-gray-300">❧</span>
            </div>
        </article>
    );
};
