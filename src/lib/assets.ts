/**
 * Asset Resolution Strategy
 *
 * All media in the book is referenced by ID.
 * This module is the ONLY place where those IDs are converted to URLs.
 */

const ASSET_BASE_PATH = '/assets';

/**
 * Resolves an image ID to a usable URL.
 * @param imageId - The unique identifier for the image
 * @returns The fully qualified URL for the image
 */
export function resolveImage(imageId: string): string {
    // In a real app, this might look up a manifest or sign a URL.
    // For now, we enforce a convention: ID "chapter1-hero" -> "/assets/chapter1-hero.jpg"
    // We can support extensions in ID or assume jpg/png. 

    // Design Choice: IDs should include extension? 
    // "Antigravity" view: IDs are abstract. The system should know the format.
    // But for simplicity in this MVP, we will assume the ID might contain the extension 
    // OR we default to .jpg if missing, but let's encourage explicit IDs for now or simple mapping.

    // Let's assume the ID is the filename for simplicity of the MVP file system.
    return `${ASSET_BASE_PATH}/${imageId}`;
}

export function getCoverUrl(_bookId: string, coverImageId?: string): string {
    if (!coverImageId) return '';
    return resolveImage(coverImageId);
}
