import React from 'react';
import clsx from 'clsx';

// Typography Primitives

export const Paragraph: React.FC<{ content: string; className?: string }> = ({ content, className }) => (
    <p className={clsx("mb-6 text-lg leading-relaxed text-ink/90 font-serif max-w-prose", className)}>
        {content}
    </p>
);

export const Heading: React.FC<{ content: string; level: 1 | 2 | 3; className?: string }> = ({ content, level, className }) => {
    const styles = {
        1: "text-4xl font-bold mt-12 mb-6 tracking-tight text-ink",
        2: "text-2xl font-semibold mt-10 mb-5 tracking-tight text-ink/80",
        3: "text-xl font-medium mt-8 mb-4 text-ink/80",
    };

    const Tag: React.ElementType = `h${level}` as any;
    // Merging styles: level-based defaults + optional overrides + hard constraints (font-sans)
    // If metadata className is provided (like text-red-700), it will append/override.
    return (
        <Tag className={clsx(styles[level as keyof typeof styles] || styles[1], "font-sans", className)}>
            {content}
        </Tag>
    );
};

export const Quote: React.FC<{ content: string; author?: string }> = ({ content, author }) => (
    <figure className="my-10 pl-6 border-l-4 border-gray-300 italic text-gray-700">
        <blockquote className="text-xl font-serif leading-loose">
            "{content}"
        </blockquote>
        {author && (
            <figcaption className="mt-4 text-sm font-sans text-gray-500 uppercase tracking-widest">
                — {author}
            </figcaption>
        )}
    </figure>
);

export const UnorderedList: React.FC<{ items: string[]; className?: string }> = ({ items, className }) => (
    <ul className={clsx("list-disc pl-6 mb-6 space-y-2 text-lg text-ink/90 font-serif max-w-prose marker:text-gray-400", className)}>
        {items.map((item, idx) => (
            <li key={idx}>{item}</li>
        ))}
    </ul>
);

export const Separator: React.FC = () => (
    <div className="flex justify-center my-12">
        <div className="w-16 h-1 bg-gray-200 rounded-full" />
    </div>
)
