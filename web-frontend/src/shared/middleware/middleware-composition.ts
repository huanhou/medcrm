import { NextRequest, NextResponse } from "next/server";
import { AUTH_API_ROUTE, getPublicRoutes } from "../config/routes";
import {
    defaultLocale,
    handleLocaleRedirection,
    locales,
} from "../config/i18n";
import { LocaleMiddleware } from "./locale.middleware";

export async function middlewareComposition(request: NextRequest) {
    const {pathname} = request.nextUrl;

    if (pathname.startsWith(AUTH_API_ROUTE)) {
        return NextResponse.next();
    }

    const currentLocale = LocaleMiddleware.validateLocale(pathname);
    const publicRoutes = getPublicRoutes(currentLocale);

    if (publicRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.next();
    }

    const redirectResponse = handleLocaleRedirection(
        request,
        locales.map((locale) => locale.code),
        defaultLocale,
    );
}

