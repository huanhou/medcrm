'use client';

import { useDictionary } from '@/shared/lib/hooks';
import { Input, Lock, Button, PhoneInput, Phone } from '@/shared/ui';

import { useSignInForm } from '../../model/use-sign-in-form';
import { useHookFormMask } from 'use-mask-input';

export function SignInForm() {
    const { dictionary } = useDictionary();
    const { register, handleSubmit, errors, isPending } = useSignInForm();
    const registerWithMask = useHookFormMask(register);

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <PhoneInput
                label={dictionary.SignIn.phone_number}
                registerWithMask={registerWithMask}
                name='phone_number'
                error={errors.phone_number?.message}
                className='mb-4.5'
                placeholder={dictionary.SignIn.phonePlaceHolder}
                icon={<Phone />}
            />

            <Input
                label={dictionary.SignIn.password}
                inputProps={{
                    type: 'password',
                    ...register('password'),
                    placeholder: dictionary.SignIn.passwordPlaceHolder,
                }}
                error={errors.password?.message}
                icon={<Lock />}
            />

            <div className='mb-5.5 mt-5 flex items-center justify-end'>
                <label htmlFor='formCheckbox' className='flex flex-row-reverse cursor-pointer gap-2'>
                    <div className='relative pt-0.5'>
                        <input {...register('rememberMe')} type='checkbox' id='formCheckbox' className='taskCheckbox sr-only' />
                        <div className='box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-dark-3'>
              <span className='text-white opacity-0'>
                <svg
                    className='fill-current'
                    width='10'
                    height='7'
                    viewBox='0 0 10 7'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M9.70685 0.292804C9.89455 0.480344 10 0.734667 10 0.999847C10 1.26503 9.89455 1.51935 9.70685 1.70689L4.70059 6.7072C4.51283 6.89468 4.2582 7 3.9927 7C3.72721 7 3.47258 6.89468 3.28482 6.7072L0.281063 3.70701C0.0986771 3.5184 -0.00224342 3.26578 3.785e-05 3.00357C0.00231912 2.74136 0.10762 2.49053 0.29326 2.30511C0.4789 2.11969 0.730026 2.01451 0.992551 2.01224C1.25508 2.00996 1.50799 2.11076 1.69683 2.29293L3.9927 4.58607L8.29108 0.292804C8.47884 0.105322 8.73347 0 8.99896 0C9.26446 0 9.51908 0.105322 9.70685 0.292804Z'
                      fill=''
                  />
                </svg>
              </span>
                        </div>
                    </div>
                    <p>{dictionary.SignIn.rememberMe}</p>
                </label>
            </div>

            <Button
                isLoading={isPending}
                disabled={isPending}
                variant='primary'
                type='submit'
                className='w-full rounded-[8px] mt-4 justify-center disabled:opacity-50'
            >
                {dictionary.SignIn.signIn}
            </Button>
        </form>
    );
}
