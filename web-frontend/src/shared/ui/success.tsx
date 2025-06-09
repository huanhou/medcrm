"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ROUTES } from "@/shared/constants/routs";
import { Button, Check } from "@/shared/ui";
import { useDictionary } from "@/shared/lib/hooks";
import { SuccessSection } from "@/shared/types/dictionary";

interface SuccessComponentProps {
    redirectPath?: string;
    section: SuccessSection;
}

export function Success({
                            redirectPath = ROUTES.home,
                            section,
                        }: SuccessComponentProps) {
    const router = useRouter();
    const { dictionary } = useDictionary();

    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <Image src="/assets/logo/logo.svg" alt="logo" height={200} width={200} />
            <p className="text-2xl text-[#454545] font-black dark:text-stroke">
                {dictionary.Success[section].title}
            </p>
            <p className="text-night text-lg leading-6 flex items-center gap-2 dark:text-stroke">
                {dictionary.Success[section].text}
                <span className="text-primary">
          <Check />
        </span>
            </p>
            <Button
                className="w-full rounded-[10px] mt-4 justify-center disabled:opacity-50"
                onClick={() => router.push(redirectPath)}
                variant="primary"
            >
                {dictionary.Success[section].button}
            </Button>
        </div>
    );
}
