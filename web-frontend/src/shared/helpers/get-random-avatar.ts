'use client';

import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';
import { useEffect, useState } from 'react';
export function generateAvatar(seed?: string) {
    // Fallback for server: use a basic random seed if crypto is not available
    const avatarSeed =
        seed ||
        (typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : Math.random().toString(36).substring(2));

    return createAvatar(thumbs, {
        seed: avatarSeed,
        backgroundColor: ['#ffcc00', '#ff6600', '#0987EC'],
    }).toDataUri();
}


export function useAvatar(seed?: string) {
    const [avatar, setAvatar] = useState<string | null>(null);

    useEffect(() => {
        setAvatar(generateAvatar(seed));
    }, [seed]);

    return avatar;
}

export function generateStaticAvatar(identifier: string) {
    return createAvatar(thumbs, {
        seed: identifier,
        backgroundColor: ['#ffcc00', '#ff6600', '#0987EC'],
    }).toDataUri();
}
