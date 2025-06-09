import { defaultLocale, locales } from "@/shared/config/i18n";

export class LocaleMiddleware {
    static validateLocale(pathname: string): string {
        const pathnameLocale = pathname.split("/")[1];
        const isValidLocale = locales.some(
            (locale) => locale.code === pathnameLocale,
        );
        return isValidLocale ? pathnameLocale : defaultLocale;
    }
}
