export function getChangedFields<T extends Record<string, any>, K extends Record<string, any>>(
    data: T,
    original: K
): Partial<T> {
    return Object.entries(data).reduce((acc, [key, value]) => {
        const k = key as keyof T & keyof K;
        if (value !== original[k]) {
            acc[k] = value;
        }
        return acc;
    }, {} as Partial<T>);
}