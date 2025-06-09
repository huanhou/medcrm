'use client';

import { SpecialistForm } from '../../ui/shared-form';
import { useCreateSpecialistMutation } from '@/features/specialist/create/model/specialist-create-api';
import { useDictionary } from '@/shared/lib/hooks';
import { queryClient } from '@/shared/api/query-client';
import { toast } from 'react-hot-toast';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';


export const CreateSpecialistForm = () => {
    const router = useRouter();
    const { mutate: create, isPending } = useCreateSpecialistMutation();
    const { dictionary } = useDictionary();
    const { buttons, successNotifications, errorNotifications } = dictionary;

    const onSubmit = (data: any) => {
        create(data, {
            onSuccess: async () => {
                await queryClient.invalidateQueries({ queryKey: ['specialistList'] });
                toast.success(successNotifications.saved);
                router.replace(ROUTES.specialists);
            },
            onError: (error: any) => {
                if (error.response?.data?.message === 'Phone number already exists') {
                    toast.error(errorNotifications.phoneAlreadyExists);
                } else {
                    toast.error(error.response?.data?.message || 'Ошибка при создании');
                }
            },
        });
    };

    return (
        <SpecialistForm
            defaultValues={{
                fio: '',
                phone_number: '',
                iin: '',
                Internal: true,
                status: 'active',
                filial_id: '',
            }}
            onSubmit={onSubmit}
            isLoading={isPending}
            buttonText={buttons.create}
        />
    );
};