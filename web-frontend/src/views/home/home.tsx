"use client";

import { useEffect } from "react";
import { Breadcrumb } from "@/shared/ui";
import DefaultLayout from "@/app/DefaultLayout";

export function HomePage() {
    useEffect(() => {
        console.log("🏠 HomePage mounted — this runs immediately");
        // Add any other logic you need here
    }, []);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="home" />
        </DefaultLayout>
    );
}
