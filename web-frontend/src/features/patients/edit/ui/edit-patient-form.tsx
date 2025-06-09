'use client';

import { useEffect, useState } from 'react';
import { PatientForm } from '../../ui/shared-form';
import { useEditPatientMutation } from '../modal/patient-edit-api';
import { toast } from 'react-hot-toast';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';
import { queryClient } from '@/shared/api/query-client';
import { useDictionary } from '@/shared/lib/hooks';
import { PatientSchema } from '@/features/patients/lib/patients-schema';
import { useGetPatientByIdQuery } from '../../model/patients-api';
import { Loader } from '@/shared/ui';
import { Patient } from '@/shared/api/types';

export const EditPatientForm = ({ patientId }: { patientId: string }) => {
    const { dictionary } = useDictionary();
    const { successNotifications, errorNotifications, buttons } = dictionary;
    const router = useRouter();

    const [defaultValues, setDefaultValues] = useState<Partial<PatientSchema>>({
        fio: '',
        phone: '',
        iin: '',
        filial_id: '',
        description: ''
    });

    const { data: patientToEdit, isLoading } = useGetPatientByIdQuery(patientId);
    const { mutate: edit, isPending, error } = useEditPatientMutation(patientId);

    useEffect(() => {
        if (patientToEdit) {
            setDefaultValues({
                fio: patientToEdit.fio ?? '',
                phone: patientToEdit.phone ?? '',
                iin: patientToEdit.iin ?? '',
                filial_id: patientToEdit.filial_id ?? '',
                description: patientToEdit.description ?? ''
            });
        }
    }, [patientToEdit]);

    const onSubmit = (data: PatientSchema) => {
        edit(data, {
            onSuccess: () => {
                queryClient.setQueryData<Patient[]>(['patients'], (old) =>
                    old?.map(p => p.id === patientId ? { ...p, ...data } : p) || []
                );

                toast.success(successNotifications.saved);
                router.replace(ROUTES.patients);
            },
            onError: () => {
                toast.error(errorNotifications.notSaved);
                console.error(error);
            },
        });
    };

    if (isLoading || !patientToEdit) {
        return <Loader />;
    }

    return (
        <PatientForm
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            isLoading={isPending}
            buttonText={buttons.save}
        />
    );
};