
declare global {
    interface Window {
        __DOCUMENT_CACHE__: Record<string, any>;
    }
}

if (typeof window !== 'undefined' && !window.__DOCUMENT_CACHE__) {
    window.__DOCUMENT_CACHE__ = {};
}


export function saveToCache(key: string, data: any): void {
    if (typeof window === 'undefined') return;
    window.__DOCUMENT_CACHE__[key] = data;
}


export function getFromCache<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    return window.__DOCUMENT_CACHE__[key] || null;
}


export function removeFromCache(key: string): void {
    if (typeof window === 'undefined') return;
    delete window.__DOCUMENT_CACHE__[key];
}


export function generateCacheKey(type: string, id: string): string {
    return `${type}-${id}`;
}

export function hasInCache(key: string): boolean {
    if (typeof window === 'undefined') return false;
    return !!window.__DOCUMENT_CACHE__[key];
}