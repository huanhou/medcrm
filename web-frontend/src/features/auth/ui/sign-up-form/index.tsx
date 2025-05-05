'use client';

import { useState } from 'react';
import { Input, Button, PhoneInput } from '@/shared/ui';
import { useDictionary } from '@/shared/lib/hooks';
import { useHookFormMask } from 'use-mask-input';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

export function SignUpForm() {
    const { dictionary } = useDictionary();
    const [step, setStep] = useState(0);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const registerWithMask = useHookFormMask(register);

    const onSubmit = (data: any) => {
        console.log('Form data:', data);
    };

    const handleNextStep = async () => {
        setStep((prev) => prev + 1);
    };

    const handlePreviousStep = () => {
        setStep((prev) => prev - 1);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            {step === 0 && (
                <>
                    <Input
                        label={dictionary.SignUp.name}
                        inputProps={{
                            type: 'text',
                            placeholder: dictionary.SignUp.namePlaceHolder,
                            ...register('fio'),
                        }}
                        error={errors.fio?.message as string}
                    />
                    <PhoneInput
                        label={dictionary.SignUp.phone}
                        name='phone_number'
                        error={errors.phone_number?.message as string}
                        className='mb-4.5'
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
                        error={errors.email?.message as string}
                    />
                </>
            )}
            {step === 1 && (
                <>
                    <div>
                        <div className='w-[300px] h-[200px] rounded-md border border-gray-200 shadow-sm flex items-center justify-center text-gray-500'>
                            CAPTCHA IMAGE
                        </div>
                        <button
                            type='button'
                            className='text-sm text-blue-400 cursor-pointer hover:text-blue-500 mt-2'
                        >
                            {dictionary.common.generateNewCode}
                        </button>
                    </div>
                    <Input
                        label={dictionary.SignUp.captcha}
                        inputProps={{
                            type: 'text',
                            placeholder: dictionary.SignUp.captchaPlaceholder,
                            ...register('captcha'),
                        }}
                        error={errors.captcha?.message as string}
                    />
                </>
            )}
            {step === 2 && (
                <>
                    <Input
                        label={dictionary.SignUp.activationCode}
                        inputProps={{
                            type: 'text',
                            placeholder: dictionary.SignUp.activationCodePlaceholder,
                            ...register('activationCode'),
                        }}
                        error={errors.activationCode?.message as string}
                    />
                    <Input
                        label={dictionary.SignUp.password}
                        inputProps={{
                            type: 'password',
                            placeholder: dictionary.SignUp.passwordPlaceHolder,
                            ...register('password'),
                        }}
                        error={errors.password?.message as string}
                    />
                    <Input
                        label={dictionary.SignUp.confirmPassword}
                        inputProps={{
                            type: 'password',
                            placeholder: dictionary.SignUp.confirmPassword,
                            ...register('confirmPassword'),
                        }}
                        error={errors.confirmPassword?.message as string}
                    />
                </>
            )}
            <div className='flex justify-between gap-4'>
                {step > 0 && (
                    <Button
                        className='w-full rounded-lg'
                        variant='outlined'
                        type='button'
                        onClick={handlePreviousStep}
                    >
                        {dictionary.common.back}
                    </Button>
                )}
                <Button
                    className='w-full rounded-lg'
                    variant='primary'
                    type={step < 2 ? 'button' : 'submit'}
                    onClick={step < 2 ? handleNextStep : undefined}
                >
                    {step < 2 ? dictionary.common.next : dictionary.SignUp.signUpButton}
                </Button>
            </div>
        </form>
    );
}
