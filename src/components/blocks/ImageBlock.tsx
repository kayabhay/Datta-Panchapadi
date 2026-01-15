import React from 'react';
import { resolveImage } from '../../lib/assets';
import type { Block } from '../../types/book';

export const ImageBlock: React.FC<{ block: Block }> = ({ block }) => {
    const { imageId, caption, className } = block.metadata || {};

    if (!imageId) return null;

    const src = resolveImage(imageId);

    return (
        <figure className="my-12 flex flex-col items-center">
            <img
                src={src}
                alt={caption || "Book illustration"}
                className={`rounded-sm shadow-sm max-h-[80vh] w-auto object-contain ${className || ''}`}
                loading="lazy"
            />
            {caption && (
                <figcaption className="mt-4 text-sm text-gray-500 font-sans tracking-wide">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
};
