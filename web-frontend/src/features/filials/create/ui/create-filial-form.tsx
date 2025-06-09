'use client';

import { FilialForm } from '../../ui/shared-form';
import { useDictionary } from '@/shared/lib/hooks';
import { useCreateFilialMutation } from '../modal/filial-create-api';
import { queryClient } from '@/shared/api/query-client';
import { toast } from 'react-hot-toast';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';
import { FilialSchema } from '../../lib/filial-schema';

export const CreateFilialForm = () => {
    const router = useRouter();
    const { mutate: create, isPending } = useCreateFilialMutation();
    const { dictionary } = useDictionary();
    const { buttons, successNotifications, errorNotifications } = dictionary;
    const onSubmit = (data: FilialSchema) => {
        create(data, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['filials'] });
                toast.success(successNotifications.saved);
                router.replace(ROUTES.filials);
            },
            onError: (error: any) => {
                if (error.response?.data?.message.toString() === 'Name already exists') {
                    toast.error(errorNotifications.filialAlreadyExists);
                } else {
                    toast.error(errorNotifications.notSaved);
                }
            },
        });
    };

    return (
        <FilialForm
            defaultValues={{
                name: '',
                address: '',
                email: '',
                phone: '',
                status: 'active',
            }}
            onSubmit={onSubmit}
            isLoading={isPending}
            buttonText={buttons.create}
        />
    );
};
