export const STATIC_FILE_ROUTES = ["/assets", "/_next", "/favicon.ico"];
export const AUTH_API_ROUTE = "/api/v1/web/auth";

export const getPublicRoutes = (locale: string): string[] => [
    `/${locale}/sign-in`,
    `/${locale}/sign-up`,
    `/${locale}/reset-password`,
    AUTH_API_ROUTE,
    ...STATIC_FILE_ROUTES,
];
