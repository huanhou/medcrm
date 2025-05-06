"use client";
import { ReactNode, useState } from "react";

import { Header } from "@/widgets/header/ui";
import { Sidebar } from "@/widgets/sidebar";

function DefaultLayout({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar action={setSidebarOpen} sidebarOpen={sidebarOpen} />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main>
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default DefaultLayout;
