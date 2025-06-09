'use client';

import { useState } from 'react';
import { Input, Button, PhoneInput } from '@/shared/ui';
import { useDictionary } from '@/shared/lib/hooks';
import { useHookFormMask } from 'use-mask-input';
import { useSignUpForm } from '../../model/use-sign-up-form';

export function SignUpForm() {
    const { dictionary } = useDictionary();
    const [step, setStep] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [formData, setFormData] = useState<Record<string, any>>({});

    const {
        handleSubmit,
        isPending,
        errors: formErrors,
        register,
        handleNextStep,
    } = useSignUpForm(step, formData);

    const registerWithMask = useHookFormMask(register);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (step < 2) {
            const canProceed = await handleNextStep();
            if (canProceed) {
                setStep((prev) => prev + 1);
            }
        } else {
            await handleSubmit(e);
        }
    };

    const handlePreviousStep = () => {
        setStep((prev) => prev - 1);
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            {step === 0 && (
                <>
                    <Input
                        label={dictionary.SignUp.name}
                        inputProps={{
                            type: 'text',
                            placeholder: dictionary.SignUp.namePlaceHolder,
                            ...register('fio'),
                        }}
                        error={formErrors.fio?.message as string}
                    />
                    <PhoneInput
                        label={dictionary.SignUp.phone}
                        name="phone_number"
                        error={formErrors.phone_number?.message as string}
                        className="mb-4.5"
                        placeholder={dictionary.SignUp.phonePlaceHolder}
                        registerWithMask={registerWithMask}
                    />
                    <Input
                        label={dictionary.SignUp.email}
                        inputProps={{
                            type: 'email',
                            placeholder: dictionary.SignUp.emailPlaceHolder,
                            ...register('email'),
                        }}
                        error={formErrors.email?.message as string}
                    />
                </>
            )}
            {step === 1 && (
                <>
                    <Input
                        label="OTP"
                        inputProps={{
                            type: 'text',
                            placeholder: "Введите OTP из письма",
                            ...register('otp'),
                        }}
                        error={formErrors.otp?.message as string}
                    />
                </>
            )}
            {step === 2 && (
                <>
                    <Input
                        label={dictionary.SignUp.password}
                        inputProps={{
                            type: 'password',
                            placeholder: dictionary.SignUp.passwordPlaceHolder,
                            ...register('password'),
                        }}
                        error={formErrors.password?.message as string}
                    />
                    <Input
                        label={dictionary.SignUp.confirmPassword}
                        inputProps={{
                            type: 'password',
                            placeholder: dictionary.SignUp.confirmPassword,
                            ...register('confirmPassword'),
                        }}
                        error={formErrors.confirmPassword?.message as string}
                    />
                </>
            )}

            <div className="flex justify-between gap-4">
                {step > 0 && (
                    <Button className="w-full rounded-lg" variant="outlined" onClick={handlePreviousStep}>
                        {dictionary.common.back}
                    </Button>
                )}
                <Button
                    className="w-full rounded-lg"
                    variant="primary"
                    type="submit"
                    disabled={isPending}
                    isLoading={isPending}
                >
                    {step < 2 ? dictionary.common.next : dictionary.SignUp.signUpButton}
                </Button>
            </div>
        </form>
    );
}
