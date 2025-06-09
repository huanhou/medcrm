"use client";

import { ThemeProvider as Theme } from "next-themes";
import { THEMES } from "@/shared/constants/themes";
import { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
    return (
        <Theme attribute="class" enableSystem={false} defaultTheme={THEMES.LIGHT}>
            {children}
        </Theme>
    );
}
