/**
 * Core Book Architecture
 *
 * This schema enforces "Antigravity" principles:
 * - No presentation logic (HTML) in content
 * - Vertical flow only
 * - Asset IDs instead of paths
 */

export type BlockType =
    | 'paragraph'
    | 'heading'
    | 'image'
    | 'quote'
    | 'list'
    | 'separator';

export interface Block {
    id: string; // Unique ID for keying and deep-linking
    type: BlockType;
    content?: string; // Markdown-lite or plain text. No HTML.
    metadata?: {
        level?: 1 | 2 | 3; // For headings
        imageId?: string; // For image blocks
        caption?: string; // For images
        author?: string; // For quotes
        items?: string[]; // For lists
        [key: string]: any;
    };
}

export interface Chapter {
    id: string;
    title: string;
    slug: string;
    blocks: Block[];
}

export interface BookMetadata {
    title: string;
    author: string;
    coverImageId?: string;
    description?: string;
    publicationDate?: string;
}

export interface Book {
    id: string;
    metadata: BookMetadata;
    chapters: Chapter[];
}
