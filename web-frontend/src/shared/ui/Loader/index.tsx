import clsx from "clsx";

export const Loader = ({ className }: { className?: string }) => {
    return (
        <div
            className={clsx("flex h-screen items-center justify-center", className)}
        >
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
    );
};
