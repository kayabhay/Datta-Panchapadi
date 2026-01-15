import React from 'react';
import type { Chapter } from '../../types/book';
import { BlockRenderer } from '../blocks/BlockRenderer';

interface ChapterViewProps {
    chapter: Chapter;
}

export const ChapterView: React.FC<ChapterViewProps> = ({ chapter }) => {
    return (
        <article className="min-h-screen py-12 px-6 md:px-0 w-full max-w-2xl mx-auto flex flex-col justify-center">
            {chapter.title && chapter.title !== "Front Cover" && (
                <header className="mb-12 text-center">
                    <span className="text-sm font-sans tracking-widest text-gray-400 uppercase">
                        {chapter.slug.replace(/-/g, ' ')}
                    </span>
                </header>
            )}

            <div className="space-y-2">
                {chapter.blocks.map((block) => (
                    <BlockRenderer key={block.id} block={block} />
                ))}
            </div>

            <div className="mt-24 mb-12 text-center">
                <span className="text-2xl text-gray-300">❧</span>
            </div>
        </article>
    );
};
