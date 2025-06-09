import { DictionaryProvider } from "@/app/providers";
import { getDictionary } from "@/shared/config/i18n";
import { ReactNode } from "react";

interface DictionaryLayoutProps {
    params: Promise<{ lang: string }>;
    children: ReactNode;
}

export default async function DictionaryLayout({
                                                   params,
                                                   children,
                                               }: DictionaryLayoutProps) {
    const { lang } = await params;

    const initialDictionary = await getDictionary(lang);

    return (
        <DictionaryProvider lang={lang} initialDictionary={initialDictionary}>
            {children}
        </DictionaryProvider>
    );
}
