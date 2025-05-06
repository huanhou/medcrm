"use client";

import { useRef, useEffect, ReactNode, RefObject, FC } from "react";

interface Props {
    children: ReactNode;
    exceptionRef?: RefObject<HTMLElement>;
    onClick: () => void;
    className?: string;
}

export const ClickOutside: FC<Props> = ({
                                            children,
                                            exceptionRef,
                                            onClick,
                                            className,
                                        }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickListener = (event: MouseEvent) => {
            let clickedInside: null | boolean = false;
            if (exceptionRef) {
                clickedInside =
                    (wrapperRef.current &&
                        wrapperRef.current.contains(event.target as Node)) ||
                    (exceptionRef.current && exceptionRef.current === event.target) ||
                    (exceptionRef.current &&
                        exceptionRef.current.contains(event.target as Node));
            } else {
                clickedInside =
                    wrapperRef.current &&
                    wrapperRef.current.contains(event.target as Node);
            }

            if (!clickedInside) onClick();
        };

        document.addEventListener("mousedown", handleClickListener);

        return () => {
            document.removeEventListener("mousedown", handleClickListener);
        };
    }, [exceptionRef, onClick]);

    return (
        <div ref={wrapperRef} className={`${className || ""}`}>
            {children}
        </div>
    );
};
