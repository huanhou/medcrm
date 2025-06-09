'use client';

import { UiLayout, Button, Select, DateTimePicker, TextArea, MultiSelect } from '@/shared/ui';
import { AppointmentSchema } from '../lib/appointment-schema';
import { useUnsavedChanges } from '@/shared/lib/hooks';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useAppointmentForm, useServiceSelect } from '../model/use-appointment-form';
import { useGetPatientsQuery } from '@/shared/api/patient-api';
import { useGetServicesQuery } from '@/shared/api/services-api';
import { useGetSpecialistsQuery } from '@/shared/api/specialist';
import { useMemo } from 'react';

interface AppointmentFormProps {
    defaultValues: Partial<AppointmentSchema>;
    onSubmit: (data: AppointmentSchema) => void;
    buttonText: string;
    isLoading: boolean;
}

export const AppointmentForm = ({ defaultValues, onSubmit, buttonText, isLoading }: AppointmentFormProps) => {
    const { handleSubmit, errors, isDirty, isFormSaved, dictionary, register, watch, setValue } = useAppointmentForm({
        defaultValues,
        onSubmit,
    });

    const router = useRouter();
    const { sharedForm, pages } = dictionary;
    const shouldPreventNavigation = () => isDirty && !isFormSaved;
    useUnsavedChanges({ isDirty, isFormSaved, shouldPreventNavigation });

    const handleNavigateAway = () => {
        router.push(ROUTES.appointments);
    };

    const statuses = [
        { label: sharedForm.statuses.completed, value: 'completed' },
        { label: sharedForm.statuses.cancelled, value: 'cancelled' },
        { label: sharedForm.statuses.scheduled, value: 'scheduled' },
    ];

    const { data: patients } = useGetPatientsQuery();
    const { data: specialists } = useGetSpecialistsQuery();

    const { forceRerenderKey, handleServicesChange } = useServiceSelect(setValue);
    const { data: services } = useGetServicesQuery();
    const transformedServices = useMemo(() => {
        return services?.map((service) => ({
            id: service.id,
            label: service.name,
        }));
    }, [services]);

    return (
        <UiLayout>
            <div className='border-b border-stroke px-6.5 py-4 dark:border-dark-3'>
                <h1>{buttonText === sharedForm.buttonText.save ? pages.editAppointment : pages.createAppointment}</h1>
            </div>
            <form onSubmit={handleSubmit} className='space-y-4 p-3.5'>
                <Select
                    label={sharedForm.labels.patient}
                    error={errors.patient_id?.message}
                    icon={<ChevronDownIcon className='size-6 text-gray-6' />}
                    inputProps={{
                        ...register('patient_id'),
                        defaultValue: defaultValues.patient_id,
                    }}
                >
                    <option value=''>{sharedForm.placeholders.patient}</option>
                    {patients?.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                            {patient.fio}
                        </option>
                    ))}
                </Select>
                <Select
                    label={sharedForm.labels.doctor}
                    error={errors.specialist_id?.message}
                    icon={<ChevronDownIcon className='size-6 text-gray-6' />}
                    inputProps={{
                        ...register('specialist_id'),
                        defaultValue: defaultValues.specialist_id,
                    }}
                >
                    <option value=''>{sharedForm.placeholders.doctor}</option>
                    {specialists?.map((specialist) => (
                        <option key={specialist.id} value={specialist.id}>
                            {specialist.fio}
                        </option>
                    ))}
                </Select>

                <MultiSelect
                    key={`multi-select-${forceRerenderKey}`}
                    options={transformedServices || []}
                    onChange={handleServicesChange}
                    label={sharedForm.labels.service}
                    placeholder={sharedForm.placeholders.service}
                    inputProps={{
                        ...register('service_ids'),
                        type: 'text',
                        disabled: isFormSaved,
                    }}
                    error={errors.service_ids?.message}
                    disabled={isFormSaved}
                />

                <DateTimePicker
                    pastDatesDisabled={true}
                    className='w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary'
                    label={sharedForm.labels.dateTime}
                    error={errors.date_time?.message}
                    value={watch('date_time')}
                    placeholder={sharedForm.placeholders.dateTime}
                    onChange={(date) => {
                        setValue('date_time', date ? date.toISOString() : '', {
                            shouldValidate: true,
                            shouldDirty: true,
                        });
                    }}
                />

                <TextArea
                    label={sharedForm.labels.comment}
                    textAreaProps={{
                        ...register('comment'),
                        rows: 4,
                        placeholder: sharedForm.placeholders.comment,
                        defaultValue: defaultValues.comment,
                    }}
                    error={errors.comment?.message}
                />

                <Select
                    label={sharedForm.labels.status}
                    icon={<ChevronDownIcon className='size-6 text-gray-6' />}
                    error={errors.status?.message}
                    inputProps={{
                        ...register('status'),
                        defaultValue: defaultValues.status,
                    }}
                >
                    <option value=''>{sharedForm.placeholders.status}</option>
                    {statuses.map((status) => (
                        <option key={status.value} value={status.value}>
                            {status.label}
                        </option>
                    ))}
                </Select>

                <div className='flex gap-2 items-center ml-auto justify-end'>
                    <Button onClick={handleNavigateAway} className='rounded-[7px]' variant='outlined' type='button'>
                        {sharedForm.buttonText.cancel}
                    </Button>
                    <Button isLoading={isLoading} disabled={isLoading} variant='primary' type='submit' className='rounded-[7px]'>
                        {buttonText}
                    </Button>
                </div>
            </form>
        </UiLayout>
    );
};
