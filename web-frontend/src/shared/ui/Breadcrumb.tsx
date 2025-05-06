"use client";

import Link from "next/link";
import clsx from "clsx";
import { useDictionary } from "@/shared/lib/hooks";
import { DictionaryPages } from "@/shared/types/dictionary";

type BreadcrumbProps = {
    pageName: DictionaryPages;
    isAuth?: boolean;
};

export const Breadcrumb = ({ pageName, isAuth = true }: BreadcrumbProps) => {
    const { dictionary } = useDictionary();

    return (
        <div
            className={clsx(
                "mb-6",
                "flex",
                "flex-col",
                "gap-3",
                "sm:flex-row",
                "sm:items-center",
                "sm:justify-between",
            )}
        >
            <nav>
                <ol className={clsx("flex", "items-center", "gap-2")}>
                    <li>
                        <Link className={clsx("font-medium")} href="/web-frontend/public">
                            {isAuth ? dictionary.pages.home : "MedCRM"} /
                        </Link>
                    </li>
                    <li className={clsx("font-medium", "text-primary")}>
                        {dictionary.pages[pageName]}
                    </li>
                </ol>
            </nav>
        </div>
    );
};
