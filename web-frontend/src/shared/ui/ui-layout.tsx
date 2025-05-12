import { ReactNode } from "react";

export const UiLayout = ({ children }: { children: ReactNode }) => {
    return (
        <section className="data-table-common data-table-two rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
            {children}
        </section>
    );
};
