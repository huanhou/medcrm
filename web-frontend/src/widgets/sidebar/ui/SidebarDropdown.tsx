import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuItemType } from '../model/types';

export const SidebarDropdown = ({ item }: { item: MenuItemType[] }) => {
    const pathname = usePathname();
    const cleanPath = (path: string) => path.replace(/^\/(?:kz|ru)/, '');

    return (
        <ul className='my-2 flex flex-col gap-1.5 pl-9'>
            {item.map((menuItem: MenuItemType, index: number) => {
                const cleanPathname = cleanPath(pathname);
                const cleanItemRoute = cleanPath(menuItem.route);

                return (
                    <li key={index}>
                        <Link
                            href={menuItem.route}
                            className={`relative flex rounded-[7px] px-3.5 py-2 font-medium duration-300 ease-in-out ${
                                cleanPathname === cleanItemRoute
                                    ? 'bg-primary/[.07] text-primary dark:bg-white/10 dark:text-white'
                                    : 'text-dark-4 hover:bg-gray-2 hover:text-dark dark:text-gray-5 dark:hover:bg-white/10 dark:hover:text-white'
                            }`}
                        >
                            {menuItem.label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};
