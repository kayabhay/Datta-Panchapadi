import React from 'react';
import type { Block } from '../../types/book';
import { Paragraph, Heading, Quote, UnorderedList, Separator } from './TypographyBlocks';
import { ImageBlock } from './ImageBlock';

interface BlockRendererProps {
    block: Block;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
    switch (block.type) {
        case 'paragraph':
            return <Paragraph content={block.content || ''} className={block.metadata?.className} />;
        case 'image':
            return <ImageBlock block={block} />;
        case 'heading':
            return (
                <Heading
                    content={block.content || ''}
                    level={block.metadata?.level || 1}
                    className={block.metadata?.className}
                />
            );
        case 'quote':
            return <Quote content={block.content || ''} author={block.metadata?.author} />;
        case 'list':
            return <UnorderedList items={block.metadata?.items || []} className={block.metadata?.className} />;
        case 'separator':
            return <Separator />;
        default:
            console.warn(`Unknown block type: ${block.type}`);
            return null;
    }
};
