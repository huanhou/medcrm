
'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Button, MultiSelect, SearchSelect, Select, UiLayout, Input } from '@/shared/ui';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { CreatePatientModal } from './create-patient-modal';

interface FormData {
    patient_id: string;
    service_id: string[];
    specialist_id: string;
    payment_type: string;
    comment: string;
    created_at: string;
}

export const BoxOfficeForm = ({ onFormSubmit, resetForm = false }: { onFormSubmit?: (data: FormData) => void; resetForm?: boolean }) => {
    const [isFormSaved, setIsFormSaved] = useState(false);
    const [savedData, setSavedData] = useState<FormData | null>(null);
    const today = new Date().toLocaleDateString('ru-RU');
    const resetFormRef = useRef(resetForm);

    const patients = [
        { id: 'p1', name: 'Пациент 1' },
        { id: 'p2', name: 'Пациент 2' },
    ];
    const staff = [
        { id: 's1', fio: 'Доктор Иванов' },
        { id: 's2', fio: 'Доктор Петров' },
    ];
    const services = [
        { id: 'srv1', name: 'Услуга 1' },
        { id: 'srv2', name: 'Услуга 2' },
    ];
    const paymentTypes = [
        { value: 'card', label: 'Карта' },
        { value: 'cash', label: 'Наличные' },
    ];

    const patientsOptions = patients.map(p => ({ id: p.id, label: p.name, value: p.id }));
    const staffOptions = staff.map(s => ({ id: s.id, label: s.fio, value: s.id }));
    const servicesOptions = services.map(s => ({ id: s.id, label: s.name, value: s.id }));


    const [formValues, setFormValues] = useState<FormData>({
        patient_id: '',
        service_id: [],
        specialist_id: '',
        payment_type: 'card',
        comment: '',
        created_at: today,
    });

    const handleInputChange = useCallback((field: keyof FormData, value: string | string[]) => {
        setFormValues(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleClearForm = useCallback(() => {
        setFormValues({
            patient_id: '',
            service_id: [],
            specialist_id: '',
            payment_type: 'card',
            comment: '',
            created_at: today,
        });
        setIsFormSaved(false);
        setSavedData(null);
    }, [today]);

    useEffect(() => {
        if (resetForm && !resetFormRef.current) {
            handleClearForm();
        }
        resetFormRef.current = resetForm;
    }, [resetForm, handleClearForm]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsFormSaved(true);
        setSavedData(formValues);
        if (onFormSubmit) {
            onFormSubmit(formValues);
        }
    };

    const [isCreatePatientModalOpen, setIsCreatePatientModalOpen] = useState(false);

    return (
        <>
            <UiLayout>
                <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                    <h1>Создать запись</h1>
                </div>
                <form onSubmit={handleSubmit} className="px-6.5 py-4 gap-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-4">
                            <SearchSelect
                                label="Пациент"
                                options={patientsOptions}
                                onChange={(val) => handleInputChange('patient_id', val)}
                                placeholder="Пациент"
                                value={formValues.patient_id}
                                disabled={isFormSaved}
                            />

                            <MultiSelect
                                options={servicesOptions}
                                onChange={(vals) => handleInputChange('service_id', vals)}
                                label="Услуги"
                                placeholder="Выберите услуги"
                                disabled={false}
                            />

                            <Select
                                label="Тип оплаты"
                                icon={<ChevronDownIcon className="size-6 text-gray-6" />}
                                inputProps={{
                                    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange('payment_type', e.target.value),
                                    value: formValues.payment_type,
                                    disabled: isFormSaved,
                                }}
                            >
                                {paymentTypes.map((type) => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </Select>

                            <Input
                                label="Дата создания"
                                inputProps={{
                                    value: formValues.created_at,
                                    disabled: true,
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <SearchSelect
                                label="Врач"
                                options={staffOptions}
                                onChange={(val) => handleInputChange('specialist_id', val)}
                                placeholder="Врач"
                                value={formValues.specialist_id}
                                disabled={isFormSaved}
                            />
                            <div>
                                <label className="mb-2.5 block font-medium text-black dark:text-white">Комментарий</label>
                                <textarea
                                    value={formValues.comment}
                                    onChange={(e) => handleInputChange('comment', e.target.value)}
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    rows={9}
                                    placeholder="Введите комментарий"
                                    disabled={isFormSaved}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center ml-auto justify-end py-4">
                        <Button
                            className="rounded-[7px] disabled:opacity-50"
                            variant="secondary"
                            type="button"
                            onClick={handleClearForm}
                            disabled={isFormSaved}
                        >
                            Очистить
                        </Button>
                        <Button
                            className="rounded-[7px] disabled:opacity-50"
                            variant="primary"
                            type="submit"
                            disabled={isFormSaved}
                        >
                            Добавить
                        </Button>
                    </div>
                </form>
            </UiLayout>

            <CreatePatientModal
                isOpen={isCreatePatientModalOpen}
                onCloseAction={() => setIsCreatePatientModalOpen(false)}
                onPatientCreated={(id: string) => {
                    setFormValues((prev) => ({ ...prev, patient_id: id }));
                    setIsCreatePatientModalOpen(false);
                }}
            />
        </>
    );
};
