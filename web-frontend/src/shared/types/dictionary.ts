import { dictionary } from "../lib/dictionary";

export type DictionaryPages = keyof typeof dictionary.pages;

type BannerSection = keyof typeof dictionary.Banner;

export interface BannerProps {
    section: BannerSection;
}

export type SuccessSection = keyof typeof dictionary.Success;
