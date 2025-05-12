'use client';

import { useState } from 'react';
import { UiLayout, Input, Button, Select, PhoneInput } from '@/shared/ui';
import { EyeIcon, EyeSlashIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useDictionary } from '@/shared/lib/hooks';

export const StaffForm = () => {
    const { dictionary } = useDictionary();
    const { sharedForm } = dictionary;

    const [formData, setFormData] = useState({
        fio: '',
        email: '',
        phone_number: '',
        address: '',
        filial_id: '',
        status: '',
        role_id: '',
        password: '',
    });

    const [isDirty, setIsDirty] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setIsDirty(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            alert('Форма сохранена (на клиенте)');
            setIsSubmitting(false);
            setIsDirty(false);
        }, 1000);
    };

    return (
        <UiLayout>
            <div className='border-b border-stroke px-6.5 py-4 dark:border-dark-3'>
            <h1>{sharedForm.headings.add}</h1>
            </div>
            <form onSubmit={handleSubmit} className='space-y-4 p-3.5'>
    <Input
        label={sharedForm.labels.fullName}
    inputProps={{
        type: 'text',
            placeholder: sharedForm.placeholders.fullName,
            value: formData.fio,
            onChange: e => handleChange('fio', e.target.value),
    }}
    />

    <Input
    label={sharedForm.labels.password}
    inputProps={{
        type: isPasswordVisible ? 'text' : 'password',
            placeholder: sharedForm.placeholders.password,
            value: formData.password,
            onChange: e => handleChange('password', e.target.value),
    }}
    icon={
        isPasswordVisible ? (
            <EyeIcon className='size-6 text-gray-6 cursor-pointer' onClick={() => setIsPasswordVisible(false)} />
) : (
        <EyeSlashIcon className='size-6 text-gray-6 cursor-pointer' onClick={() => setIsPasswordVisible(true)} />
)
}
    />

    <Input
    label={sharedForm.labels.email}
    inputProps={{
        type: 'email',
            placeholder: sharedForm.placeholders.email,
            value: formData.email,
            onChange: e => handleChange('email', e.target.value),
    }}
    />

                <PhoneInput
                    label={sharedForm.labels.phoneNumber}
                    registerWithMask={() => ({
                        name: 'phone_number',
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange('phone_number', e.target.value),
                        value: formData.phone_number,
                    })}
                    name='phone_number'
                    placeholder={sharedForm.placeholders.phoneNumber}
                />


                <Input
    label={sharedForm.labels.address}
    inputProps={{
        type: 'text',
            placeholder: sharedForm.placeholders.address,
            value: formData.address,
            onChange: e => handleChange('address', e.target.value),
    }}
    />

    <Select
    label={sharedForm.labels.branch}
    inputProps={{
        value: formData.filial_id,
            onChange: e => handleChange('filial_id', e.target.value),
    }}
    icon={<ChevronDownIcon className='size-6 text-gray-6' />}
>
    <option value=''>{sharedForm.placeholders.branch}</option>
        <option value='1'>Филиал 1</option>
    <option value='2'>Филиал 2</option>
    </Select>

    <Select
    label={sharedForm.labels.status}
    inputProps={{
        value: formData.status,
            onChange: e => handleChange('status', e.target.value),
    }}
    icon={<ChevronDownIcon className='size-6 text-gray-6' />}
>
    <option value='active'>Активный</option>
        <option value='inactive'>Неактивный</option>
        </Select>

        <Select
    label={sharedForm.labels.role}
    inputProps={{
        value: formData.role_id,
            onChange: e => handleChange('role_id', e.target.value),
    }}
    icon={<ChevronDownIcon className='size-6 text-gray-6' />}
>
    <option value='admin'>Админ</option>
        <option value='doctor'>Врач</option>
        </Select>

        <div className='flex justify-end gap-3'>
    <Button
        type='submit'
    disabled={!isDirty || isSubmitting}
    isLoading={isSubmitting}
    className='rounded-[7px]'
    variant={isDirty ? 'primary' : 'outlined'}
        >
        {sharedForm.buttonText.save}
        </Button>
        </div>
        </form>
        </UiLayout>
);
};
