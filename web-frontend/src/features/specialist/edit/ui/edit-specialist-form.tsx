'use client';

import { SpecialistForm } from '../../ui/shared-form';
import {
    useEditSpecialistMutation,
    useGetSpecialistByIdQuery,
} from '@/features/specialist/edit/modal/specialist-edit-api';
import { toast } from 'react-hot-toast';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';
import { queryClient } from '@/shared/api/query-client';
import { useDictionary } from '@/shared/lib/hooks';
import { Loader } from '@/shared/ui';


export const EditSpecialistForm = ({ specialistId }: { specialistId: string }) => {
    const { data: specialistToEdit, isLoading } = useGetSpecialistByIdQuery(specialistId);
    const { dictionary } = useDictionary();
    const { successNotifications, errorNotifications, buttons } = dictionary;
    const router = useRouter();
    const { mutate: edit, isPending, error } = useEditSpecialistMutation(specialistId);


    const onSubmit = (data: any) => {
        edit(data, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['specialistList'] });
                toast.success(successNotifications.saved);
                router.replace(ROUTES.specialists);
                queryClient.invalidateQueries({ queryKey: ['specialist'] });
            },
            onError: () => {
                toast.error(errorNotifications.notSaved);
                console.error(error);
            },
        });
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <SpecialistForm
            key={`${specialistToEdit?.id}`}
            defaultValues={{
                name: specialistToEdit?.name,
                phoneNumber: specialistToEdit?.phoneNumber,
                iin: specialistToEdit?.iin || '',
                status: specialistToEdit?.status as 'active' | 'inactive',
                specialistType: specialistToEdit?.specialistType,
                branch: specialistToEdit?.branch || '',
            }}
            onSubmit={onSubmit}
            isLoading={isPending}
            buttonText={buttons.save}
        />
    );
};