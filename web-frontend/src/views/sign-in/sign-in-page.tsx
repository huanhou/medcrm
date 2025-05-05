import { SignInForm, UiFormPageLayout } from '@/features/auth';

export function SignInPage() {
    return <UiFormPageLayout form={<SignInForm />} pageName='signIn' />;
}
