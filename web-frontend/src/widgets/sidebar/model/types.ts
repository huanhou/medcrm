import { ReactNode } from "react";

export type MenuItemType = {
    icon?: ReactNode;
    label: string;
    route: string;
    permissionRequired?: string;
    children?: MenuItemType[];
};

export type MenuGroupType = {
    name: string;
    menuItems: MenuItemType[];
};
