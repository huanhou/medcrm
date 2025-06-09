
import { CodeForm } from "./code-form";
import { Logo } from "@/shared/ui";

interface CodePageProps {
    title: string;
    description: string;
    onSubmit: (code: string) => void;
}

export function CodePage({ title, description, onSubmit }: CodePageProps) {
    return (
        <div className="overflow-hidden bg-gray-4 px-4 dark:bg-dark-2 sm:px-8">
            <div className="flex h-screen flex-col items-center justify-center overflow-hidden">
                <div className="no-scrollbar overflow-y-auto py-20">
                    <div className="mx-auto w-full max-w-[552px]">
                        <div className="text-center">
                            <div className="rounded-xl bg-white p-4 shadow-card-10 dark:bg-gray-dark lg:p-7.5 xl:p-12.5">
                                <Logo />

                                <h1 className="mb-2.5 text-3xl font-black leading-[48px] text-dark dark:text-white">
                                    {title}
                                </h1>

                                <p className="mb-7.5 font-medium text-dark-4 dark:text-dark-6">
                                    {description}
                                </p>

                                <CodeForm onSubmit={onSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
