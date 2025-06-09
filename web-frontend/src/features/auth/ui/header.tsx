import Link from "next/link";
import { DarkModeSwitcher } from "@/widgets/header/ui/dark-mode-switcher";

export const Header = () => {
    return (
        <header className="sticky top-0 z-999 flex w-full border-b border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark">
            <div className="flex flex-grow items-center justify-between px-4 py-5 shadow-2 md:px-5 2xl:px-10">
                <Link href="/">
                    <p className=" text-black text-xl lg:text-[28px] leading-10 dark:text-stroke">
                        med-crm
                    </p>
                </Link>
                <DarkModeSwitcher />
            </div>
        </header>
    );
};
