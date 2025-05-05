import {  SignUpForm, UiFormPageLayout } from "@/features/auth";

export function SignUpPage() {
    return (
        <UiFormPageLayout
            pageName="signUp"
            form={<SignUpForm />}
        />
    );
}
