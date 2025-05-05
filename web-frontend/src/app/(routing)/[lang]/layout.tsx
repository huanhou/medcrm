import { DictionaryProvider } from "@/app/providers";
import { getDictionary } from "@/shared/config/i18n";
import { ReactNode } from "react";
import '../../css/style.css'
interface DictionaryLayoutProps {
    params: { lang: string };
    children: ReactNode;
}

export default async function DictionaryLayout({
                                                   params,
                                                   children,
                                               }: DictionaryLayoutProps) {
    const { lang } = params;
    const initialDictionary = await getDictionary(lang);

    return (
        <html lang={lang}>
        <body>
        <DictionaryProvider lang={lang} initialDictionary={initialDictionary}>
            {children}
        </DictionaryProvider>
        </body>
        </html>
    );
}
