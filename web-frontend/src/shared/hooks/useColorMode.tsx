"use client";

import useLocalStorage from "@/shared/hooks/useLocalStorage";

export const useColorMode = () => {
    const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");

    const updateColorMode = (newMode: string) => {
        setColorMode(newMode);
        document.documentElement.classList.toggle("dark", newMode === "dark");
    };

    if (typeof window !== "undefined") {
        document.documentElement.classList.toggle("dark", colorMode === "dark");
    }

    return [colorMode, updateColorMode] as const;
};
