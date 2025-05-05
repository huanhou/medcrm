import { DictionaryType } from "../dictionaries/type";

const dictionaries: Record<string, () => Promise<DictionaryType>> = {
    kz: () => import("../dictionaries/kz.json").then((module) => module.default),
    ru: () => import("../dictionaries/ru.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
    return locale == "ru" ? dictionaries.ru() : dictionaries.kz();
};

export default getDictionary;
