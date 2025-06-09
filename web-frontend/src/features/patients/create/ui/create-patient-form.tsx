'use client';

import { PatientForm } from '../../ui/shared-form';
import { useDictionary } from '@/shared/lib/hooks';
import { useCreatePatientMutation } from '../modal/patient-create-api';
import { CreatePatientDto } from '@/shared/api/types';
import { queryClient } from '@/shared/api/query-client';
import { toast } from 'react-hot-toast';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';

export const CreatePatientForm = () => {
    const router = useRouter();
    const { mutate: create, isPending } = useCreatePatientMutation();
    const { dictionary } = useDictionary();
    const { buttons, successNotifications, errorNotifications } = dictionary;

    const onSubmit = (data: CreatePatientDto) => {
        create(data, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['patients'] });
                toast.success(successNotifications.saved);
                router.replace(ROUTES.patients);
            },
            onError: () => {
                toast.error(errorNotifications.notSaved);
            },
        });
    };

    return (
        <PatientForm
            defaultValues={{
                fio: '',
                phone: '',
                iin: '',
                filial_id: '',
                description: ''
            }}
            onSubmit={onSubmit}
            isLoading={isPending}
            buttonText={buttons.create}
        />
    );
};

