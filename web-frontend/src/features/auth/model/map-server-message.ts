import { DictionaryType } from "@/shared/config/i18n";
import { serverMessageMap } from "@/shared/constants/server-message-map";

export const mapServerMessageToDictionary = (
    serverMessage: string | string[],
    dictionary: DictionaryType,
): string => {
    const message = Array.isArray(serverMessage)
        ? serverMessage[0]
        : serverMessage;

    const dictionaryKey =
        serverMessageMap[message as keyof typeof serverMessageMap] ||
        "unknown_error";
    return dictionary.errors[dictionaryKey as keyof typeof dictionary.errors];
};
