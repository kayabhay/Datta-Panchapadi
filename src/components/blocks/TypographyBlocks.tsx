import React from 'react';
import clsx from 'clsx';

// Typography Primitives

export const Paragraph: React.FC<{ content: string; className?: string }> = ({ content, className }) => (
    <p className={clsx("mb-6 px-8 leading-relaxed text-ink/90 max-w-prose text-[1.125em]", className)}>
        {content}
    </p>
);

export const Heading: React.FC<{ content: string; level: 1 | 2 | 3; className?: string }> = ({ content, level, className }) => {
    // Using em units so headings scale relative to the base font size set in ReaderLayout
    const styles = {
        1: "text-[2.25em] font-bold mt-12 mb-6 tracking-tight text-ink", // ~4xl equivalent
        2: "text-[1.5em] font-semibold mt-10 mb-5 tracking-tight text-ink/80", // ~2xl equivalent
        3: "text-[1.25em] font-medium mt-8 mb-4 text-ink/80", // ~xl equivalent
    };

    const Tag: React.ElementType = `h${level}` as any;

    return (
        <Tag className={clsx(styles[level as keyof typeof styles] || styles[1], className)}>
            {content}
        </Tag>
    );
};

export const Quote: React.FC<{ content: string; author?: string }> = ({ content, author }) => (
    <figure className="my-10 pl-6 border-l-4 border-gray-300 italic text-gray-700">
        <blockquote className="text-[1.25em] leading-loose">
            "{content}"
        </blockquote>
        {author && (
            <figcaption className="mt-4 text-[0.875em] text-gray-500 uppercase tracking-widest">
                — {author}
            </figcaption>
        )}
    </figure>
);

export const UnorderedList: React.FC<{ items: string[]; className?: string }> = ({ items, className }) => (
    <ul className={clsx("list-disc pl-6 mb-6 space-y-2 text-ink/90 max-w-prose marker:text-gray-400", className)}>
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
