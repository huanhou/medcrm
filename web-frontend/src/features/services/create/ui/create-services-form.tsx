'use client';

import { ServiceForm } from '../../ui/shared-form';
import { useDictionary } from '@/shared/lib/hooks';
import { useCreateServiceMutation } from '../model/services-create-api';
import { CreateServiceDto } from '@/shared/api/types';
import { queryClient } from '@/shared/api/query-client';
import { toast } from 'react-hot-toast';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';

export const CreateServiceForm = () => {
    const router = useRouter();
    const { mutate: create, isPending } = useCreateServiceMutation();
    const { dictionary } = useDictionary();
    const { buttons, successNotifications, errorNotifications } = dictionary;
    const onSubmit = (data: CreateServiceDto) => {
        create(data, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['services'] });
                toast.success(successNotifications.saved);
                router.replace(ROUTES.services);
            },
            onError: (error: Error) => {
                if ((error as any)?.response?.data?.message?.includes('already exist')) {
                    toast.error(errorNotifications.serviceAlreadyExists);
                } else {
                    toast.error(errorNotifications.notSaved);
                }
            },
        });
    };

    return (
        <ServiceForm
            defaultValues={{
                name: '',
                description: '',
                price: '',
                is_active: true,
            }}
            onSubmit={onSubmit}
            isLoading={isPending}
            buttonText={buttons.create}
        />
    );
};
