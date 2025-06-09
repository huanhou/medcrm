"use client";

import Image from "next/image";
import { useDictionary } from "@/shared/lib/hooks";
import { BannerProps } from "@/shared/types/dictionary";
import { Logo } from "@/shared/ui";

export const Banner = ({ section }: BannerProps) => {
    const { dictionary } = useDictionary();

    return (
        <div className="hidden lg:block rounded-2xl relative px-12.5 py-14 bg-gradient-to-br from-[#FD981D] to-[#FFF8FC]  ">
            <Logo />
            <div className="space-y-4 mt-10">
                <p className="mt-2 text-[#1F2A37] text-[20px] leading-7 font-medium">
                    {dictionary.Banner[section].text}
                </p>
                <p className="mt-4 text-5xl font-bold text-black ">
                    {dictionary.Banner[section].title}
                </p>
                <p className="mt-1 text-[#4B5563] text-[16px] leading-6">
                    {dictionary.Banner[section].subText}
                </p>
            </div>
            <div className="absolute bottom-1 right-1 opacity-30">
                <Image
                    src="/assets/banner.svg"
                    alt="banner"
                    className="dark:opacity-20"
                    aria-hidden="true"
                    width={575}
                    height={460}
                />
            </div>
        </div>
    );
};
