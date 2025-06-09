import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest } from "next/server";

const getLocale = (
    request: NextRequest,
    localeCodes: string[],
    defaultLocale: string,
) => {
    const negotiator = new Negotiator({
        headers: Object.fromEntries(request.headers.entries()),
    });
    const languages: string[] = negotiator.languages();
    try {
        return match(languages, localeCodes, defaultLocale);
    } catch (e) {
        console.error(e);
        return defaultLocale;
    }
};

export default getLocale;
