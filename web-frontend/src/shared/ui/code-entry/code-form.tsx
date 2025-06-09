"use client";
import { FC } from "react";
import { CodeInput } from "./code-input";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../buttons/Button";
import { useDictionary } from "@/shared/lib/hooks";

interface ResetPasswordFormProps {
    onSubmit: (code: string) => void;
}

export const CodeForm: FC<ResetPasswordFormProps> = ({ onSubmit }) => {
    const { dictionary } = useDictionary();

    const methods = useForm<{ code: string[] }>({
        defaultValues: { code: ["", "", "", ""] },
    });

    const { handleSubmit } = methods;

    const handleFormSubmit = (data: { code: string[] }) => {
        onSubmit(data.code.join(""));
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <CodeInput length={4} />
                <p className="mb-5 mt-4 text-center font-medium text-dark dark:text-white">
                    {dictionary.ResetPassword.DidntGetTheCode}{" "}
                    <button type="button" className="text-primary">
                        {dictionary.ResetPassword.reresend}
                    </button>
                </p>

                <Button
                    className="w-full rounded-[10px] mt-4 justify-center disabled:opacity-50"
                    type="submit"
                    variant="primary"
                >
                    {dictionary.ResetPassword.check}
                </Button>
            </form>
        </FormProvider>
    );
};
