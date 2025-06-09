'use client';

import { UiLayout, Input, Button, Select, PhoneInput } from '@/shared/ui';
import { StaffSchemaType } from '@/features/staff/model/staff-schema';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useUnsavedChanges } from '@/shared/lib/hooks';
import { useStaffForm } from '../model/use-staff-form';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface StaffFormProps {
    defaultValues: Partial<StaffSchemaType>;
    onSubmit: (data: StaffSchemaType) => void;
    isPasswordDisabled?: boolean;
    buttonText: string;
    isLoading: boolean;
    isPasswordVisible?: boolean;
    setIsPasswordVisible?: (value: boolean) => void;
}

export const StaffForm = ({
                              defaultValues,
                              onSubmit,
                              isPasswordDisabled = false,
                              buttonText,
                              isLoading,
                              isPasswordVisible = false,
                              setIsPasswordVisible,
                          }: StaffFormProps) => {
    const {
        handleSubmit,
        registerWithMask,
        errors,
        isDirty,
        isFormSaved,
        filials,
        roles,
        statuses,
        dictionary,
        register,
    } = useStaffForm({ defaultValues, onSubmit, isPasswordDisabled });

    const router = useRouter();
    const { sharedForm } = dictionary;
    const shouldPreventNavigation = () => isDirty && !isFormSaved;
    useUnsavedChanges({ isDirty, isFormSaved, shouldPreventNavigation });

    const handleNavigateAway = () => {
        router.push(ROUTES.staff);
    };

    const heading =
        buttonText === sharedForm.buttonText.save
            ? sharedForm.headings.edit
            : sharedForm.headings.add;

    return (
        <UiLayout>
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                <h1>{heading}</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 p-3.5">
                <Input
                    label={sharedForm.labels.fullName}
                    inputProps={{
                        ...register('fullName'),  // Changed to full_name
                        type: 'text',
                        placeholder: sharedForm.placeholders.fullName,
                    }}
                    error={errors.fullName?.message}  // Changed to full_name
                />

                {!isPasswordDisabled && (
                    <Input
                        label={sharedForm.labels.password}
                        inputProps={{
                            ...register('password'),
                            type: isPasswordVisible ? 'text' : 'password',
                            placeholder: sharedForm.placeholders.password,
                        }}
                        icon={
                            isPasswordVisible ? (
                                <EyeIcon
                                    className="size-6 text-gray-6 cursor-pointer"
                                    onClick={() => setIsPasswordVisible?.(false)}
                                />
                            ) : (
                                <EyeSlashIcon
                                    className="size-6 text-gray-6 cursor-pointer"
                                    onClick={() => setIsPasswordVisible?.(true)}
                                />
                            )
                        }
                        error={errors.password?.message}
                    />
                )}

                <Input
                    label={sharedForm.labels.email}
                    inputProps={{
                        ...register('email'),
                        type: 'email',
                        placeholder: sharedForm.placeholders.email,
                    }}
                    error={errors.email?.message}
                />

                <PhoneInput
                    label={sharedForm.labels.phoneNumber}
                    registerWithMask={registerWithMask}
                    name="phone"
                    error={errors.phone?.message}
                    className="mb-4.5"
                    placeholder={sharedForm.placeholders.phoneNumber}
                />

                <Input
                    label={sharedForm.labels.address}
                    inputProps={{
                        ...register('address'),
                        type: 'text',
                        placeholder: sharedForm.placeholders.address,
                    }}
                    error={errors.address?.message}
                />

                <Select
                    label={sharedForm.labels.branch}
                    icon={<ChevronDownIcon className="size-6 text-gray-6" />}
                    error={errors.branch?.message}
                    inputProps={{
                        ...register('branch'),  // Correctly mapped to branch
                        defaultValue: defaultValues.branch,
                    }}
                >
                    <option value="">{sharedForm.placeholders.branch}</option>
                    {Array.isArray(filials) ? (
                        filials.map((filial) => (
                            <option key={filial.name} value={filial.name}>{filial.name}</option>
                        ))
                    ) : (
                        <option disabled>Загрузка филиалов...</option>
                    )}
                </Select>

                <Select
                    label={sharedForm.labels.status}
                    icon={<ChevronDownIcon className="size-6 text-gray-6" />}
                    error={errors.status?.message}
                    inputProps={{
                        ...register('status'),
                        defaultValue: defaultValues.status,
                    }}
                >
                    <option value="">{sharedForm.placeholders.status}</option>
                    {statuses.map((status) => (
                        <option key={status.value} value={status.value}>
                            {status.label}
                        </option>
                    ))}
                </Select>

                <Select
                    label={sharedForm.labels.role}
                    icon={<ChevronDownIcon className="size-6 text-gray-6" />}
                    error={errors.role?.message}
                    inputProps={{
                        ...register('role'),  // Correctly mapped to role
                        defaultValue: defaultValues.role,
                    }}
                >
                    <option value=''>{sharedForm.labels.role}</option>
                    {roles?.map((role) => (
                        <option key={role.name} value={role.name}>{role.name}</option>
                    ))}
                </Select>

                <div className="flex gap-2 items-center ml-auto justify-end">
                    <Button
                        onClick={handleNavigateAway}
                        className="rounded-[7px]"
                        variant="outlined"
                        type="button"
                    >
                        {sharedForm.buttonText.cancel}
                    </Button>
                    <Button
                        isLoading={isLoading}
                        disabled={isLoading}
                        variant="primary"
                        type="submit"
                        className="rounded-[7px]"
                    >
                        {buttonText}
                    </Button>
                </div>
            </form>
        </UiLayout>
    );
};
