'use client';

import { useState } from 'react';
import { Input, Button, UiLayout } from '@/shared/ui';

export function ProfileForm() {
    const [formData, setFormData] = useState({
        fio: 'Абай Кунанбаев',
        phone_number: '+77001112233',
        address: 'г. Алматы, пр. Абая 10',
        email: 'abai@example.com',
        filial: 'Алматы клиника',
        role: 'Админ',
    });

    const [isDirty, setIsDirty] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setIsDirty(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            alert('Форма сохранена (только на клиенте)');
            setIsDirty(false);
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <UiLayout>
            <div className='border-b border-stroke px-6.5 py-4 dark:border-dark-3 flex justify-between items-center'>
                <h1>Редактировать профиль</h1>
                {isDirty && (
                    <span className='text-sm text-amber-500 animate-pulse'>
            * Есть несохраненные изменения
          </span>
                )}
            </div>

            <form onSubmit={handleSubmit} className='space-y-4 p-3.5'>
                <Input
                    label='ФИО'
                    inputProps={{
                        value: formData.fio,
                        onChange: e => handleChange('fio', e.target.value),
                    }}
                />

                <Input
                    label='Телефон'
                    inputProps={{
                        value: formData.phone_number,
                        onChange: e => handleChange('phone_number', e.target.value),
                    }}
                />

                <Input
                    label='Адрес'
                    inputProps={{
                        value: formData.address,
                        onChange: e => handleChange('address', e.target.value),
                    }}
                />

                <Input
                    label='Email'
                    inputProps={{
                        value: formData.email,
                        onChange: e => handleChange('email', e.target.value),
                    }}
                />

                <Input
                    label='Филиал'
                    inputProps={{
                        value: formData.filial,
                        disabled: true,
                    }}
                />

                <Input
                    label='Роль'
                    inputProps={{
                        value: formData.role,
                        disabled: true,
                    }}
                />

                <div className='flex justify-end pt-4'>
                    <Button
                        variant={isDirty ? 'primary' : 'outlined'}
                        type='submit'
                        disabled={isSubmitting || !isDirty}
                        isLoading={isSubmitting}
                        className={`w-full sm:w-auto rounded-[7px] transition-all duration-300 ${
                            !isDirty ? 'opacity-50 cursor-not-allowed' : 'shadow-md hover:shadow-lg'
                        }`}
                    >
                        Сохранить
                    </Button>
                </div>
            </form>
        </UiLayout>
    );
}
