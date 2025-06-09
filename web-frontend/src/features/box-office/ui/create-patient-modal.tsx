'use client';

import React, { FC, useState } from 'react';

interface PatientFormProps {
    defaultValues: {
        fio: string;
        phone: string;
        iin: string;
        filial_id: string;
    };
    onSubmit: (data: any) => void;
    isLoading: boolean;
    buttonText: string;
}

const PatientForm: FC<PatientFormProps> = ({ defaultValues, onSubmit, isLoading, buttonText }) => {
    const [formData, setFormData] = useState(defaultValues);

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <label>
                ФИО
                <input
                    type="text"
                    value={formData.fio}
                    onChange={(e) => handleChange('fio', e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </label>
            <label>
                Телефон
                <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </label>
            <label>
                ИИН
                <input
                    type="text"
                    value={formData.iin}
                    onChange={(e) => handleChange('iin', e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </label>
            <label>
                Филиал
                <input
                    type="text"
                    value={formData.filial_id}
                    onChange={(e) => handleChange('filial_id', e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </label>

            <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
            >
                {buttonText}
            </button>
        </form>
    );
};

interface CreatePatientModalProps {
    isOpen: boolean;
    onCloseAction: () => void;
    onPatientCreated?: (patientId: string, patientName: string) => void;
}

export const CreatePatientModal: FC<CreatePatientModalProps> = ({
                                                                    isOpen,
                                                                    onCloseAction,
                                                                    onPatientCreated,
                                                                }) => {
    const buttons = { create: 'Создать' };

    const handleSubmit = (data: any) => {
        const fakeId = Math.random().toString(36).substring(2, 9);

        alert('Пациент успешно создан: ' + data.fio);

        if (onPatientCreated) {
            onPatientCreated(fakeId, data.fio);
        }

        onCloseAction();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed left-0 top-0 z-[999] flex h-full w-full items-center justify-center bg-black bg-opacity-70 px-4 py-5">
            <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Создать пациента</h2>
                    <button
                        onClick={onCloseAction}
                        className="text-gray-600 hover:text-gray-900"
                        aria-label="Закрыть модальное окно"
                    >
                        ×
                    </button>
                </div>
                <PatientForm
                    defaultValues={{ fio: '', phone: '', iin: '', filial_id: '' }}
                    onSubmit={handleSubmit}
                    isLoading={false}
                    buttonText={buttons.create}
                />
            </div>
        </div>
    );
};
