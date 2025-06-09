"use client";

import {
    ChangePasswordForm,
    ResetPasswordPage,
    TelegramForm,
    UiFormPageLayout,
} from "@/features/auth";
import { useState } from "react";
import { Success } from "@/shared/ui";

export const ResetPassword = () => {
    const [view, setView] = useState("telegram-form");
    if (view === "telegram-form") {
        return (
            <UiFormPageLayout
                form={<TelegramForm setView={setView} />}
                pageName="resetPassword"
            />
        );
    }

    if (view === "reset-password") {
        return <ResetPasswordPage setView={setView} />;
    }

    if (view === "change-password") {
        return (
            <UiFormPageLayout
                form={<ChangePasswordForm setView={setView} />}
                pageName="resetPassword"
            />
        );
    }

    if (view === "success") {
        return (
            <UiFormPageLayout
                form={<Success section="ResetPassword" />}
                pageName="resetPassword"
            />
        );
    }
};
