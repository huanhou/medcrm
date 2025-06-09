import { NextRequest, NextResponse } from "next/server";
import getLocale from "./get-locale";

const handleLocaleRedirection = (
    request: NextRequest,
    localeCodes: string[],
    defaultLocale: string,
): NextResponse | null => {
    const { pathname } = request.nextUrl;

    const cleanedPathname = localeCodes.some((locale) =>
        pathname.startsWith(`/${locale}/`),
    )
        ? `/${pathname.split("/").slice(2).join("/")}`
        : pathname;

    if (cleanedPathname.startsWith("/api")) {
        return null;
    }

    const pathnameHasLocale = localeCodes.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    );

    if (!pathnameHasLocale) {
        const locale = getLocale(request, localeCodes, defaultLocale);
        const isValidLocale = localeCodes.includes(locale);
        const redirectLocale = isValidLocale ? locale : defaultLocale;

        const redirectUrl = new URL(
            `/${redirectLocale}${cleanedPathname}`,
            request.url,
        );
        return NextResponse.redirect(redirectUrl);
    }

    return null;
};

export default handleLocaleRedirection;
