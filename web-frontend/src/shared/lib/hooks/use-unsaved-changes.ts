"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface UnsavedChangesOptions {
    isDirty: boolean;
    isFormSaved: boolean;
    shouldPreventNavigation: () => boolean;
}

export const useUnsavedChanges = ({
                                      isDirty,
                                      isFormSaved,
                                      shouldPreventNavigation,
                                  }: UnsavedChangesOptions) => {
    const router = useRouter();
    const navigatingBack = useRef(false);
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;

        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (!isMounted.current) return;

            if (isDirty && !isFormSaved) {
                event.preventDefault();
                event.returnValue = "";
            }
        };

        const handlePopState = () => {
            if (!isMounted.current) return;

            if (shouldPreventNavigation()) {
                const confirmation = window.confirm(
                    "Вы уверены, что хотите уйти? Данные не сохранены.",
                );

                if (!confirmation) {
                    navigatingBack.current = true;
                    window.history.forward();
                } else {
                    window.removeEventListener("popstate", handlePopState);
                }
            }
        };

        const handlePushState = () => {
            if (!isMounted.current) return;

            if (navigatingBack.current) {
                navigatingBack.current = false;
                return;
            }
            window.history.pushState(null, "", window.location.href);
        };

        const handleClick = (event: MouseEvent) => {
            if (!isMounted.current) return;

            const target =
                event.target instanceof Element ? event.target.closest("a") : null;

            if (target instanceof HTMLAnchorElement && target.href) {
                if (isDirty && !isFormSaved) {
                    event.preventDefault();
                    const confirmation = window.confirm(
                        "Вы уверены, что хотите уйти? Данные не сохранены?",
                    );

                    if (shouldPreventNavigation()) {
                        if (!confirmation) {
                            return;
                        }
                    }

                    if (isMounted.current) {
                        window.removeEventListener("popstate", handlePopState);
                        window.removeEventListener("beforeunload", handleBeforeUnload);
                        document.removeEventListener("click", handleClick);
                        router.push(target.href);
                    }
                } else {
                    router.push(target.href);
                }
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener("beforeunload", handleBeforeUnload);
            window.addEventListener("popstate", handlePopState);
            window.addEventListener("pushstate", handlePushState);
            document.addEventListener("click", handleClick, true);
        }

        return () => {
            isMounted.current = false;

            if (typeof window !== 'undefined') {
                window.removeEventListener("beforeunload", handleBeforeUnload);
                window.removeEventListener("popstate", handlePopState);
                window.removeEventListener("pushstate", handlePushState);
                document.removeEventListener("click", handleClick, true);
            }
        };
    }, [isDirty, isFormSaved, shouldPreventNavigation, router]);
};
