'use client';

import React, { useEffect, useState, ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { LocalSessionProvider } from '@/shared/session/session-provider';
import { PermissionProvider } from '@/shared/context/permission-context';
import { DictionaryType, getDictionary } from '@/shared/config/i18n';
import { DictionaryContext } from '@/shared/lib/context';
import { User } from '@/shared/types/user';
import { queryClient } from '@/shared/api/query-client';

interface ProvidersProps {
    children: ReactNode;
}

export function QueryProvider({ children }: ProvidersProps) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export function ThemeProvider({ children }: ProvidersProps) {
    return (
        <NextThemesProvider attribute='class' defaultTheme='light' enableSystem>
            {children}
        </NextThemesProvider>
    );
}

export function UserProvider({ children, user }: ProvidersProps & { user?: User | null }) {
    return (
        <LocalSessionProvider initialUser={user}>
            <PermissionProvider>{children}</PermissionProvider>
        </LocalSessionProvider>
    );
}

export const DictionaryProvider = ({
                                       children,
                                       lang,
                                       initialDictionary,
                                   }: {
    children: React.ReactNode;
    lang: string;
    initialDictionary: DictionaryType;
}) => {
    const [dictionary, setDictionary] = useState<DictionaryType>(initialDictionary);

    useEffect(() => {
        const loadDictionary = async () => {
            const dict = await getDictionary(lang);
            setDictionary(dict);
        };

        if (lang !== 'ru') {
            loadDictionary();
        }
    }, [lang]);

    return <DictionaryContext.Provider value={{ dictionary, lang }}>{children}</DictionaryContext.Provider>;
};
