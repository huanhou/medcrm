'use client';

import { ServiceForm } from '../../ui/shared-form';
import { useEditServiceMutation, useGetServiceByIdQuery } from '../model/services-edit-api';
import { toast } from 'react-hot-toast';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';
import { queryClient } from '@/shared/api/query-client';
import { useDictionary } from '@/shared/lib/hooks';
import { ServiceSchema } from '@/features/services/lib/services-schema';
import { Loader } from '@/shared/ui';
import { getChangedFields } from '@/shared/helpers/get-changed-fields';

export const EditServiceForm = ({ serviceId }: { serviceId: string }) => {
    const { dictionary } = useDictionary();
    const { successNotifications, errorNotifications, buttons } = dictionary;
    const router = useRouter();
    const { data: serviceToEdit, isLoading } = useGetServiceByIdQuery(serviceId);

    const { mutate: edit, isPending } = useEditServiceMutation(serviceId);
    if (!serviceId) {
        toast.error(errorNotifications.staffNotfound);
        return null;
    }
    const onSubmit = (data: ServiceSchema) => {
        if (!serviceToEdit) return;

        const formData = {
            ...data,
            price: serviceToEdit.price === +data.price ? undefined : +data.price,
        };

        const changedFields = getChangedFields(formData, serviceToEdit);

        if (Object.keys(changedFields).length === 0) return;

        edit(changedFields, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['services'] });
                queryClient.invalidateQueries({ queryKey: ['service', serviceId] });
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

    if (isLoading) {
        return <Loader />;
    }
    if (serviceId) {
        return (
            <ServiceForm
                defaultValues={{
                    name: serviceToEdit?.name,
                    description: serviceToEdit?.description,
                    price: serviceToEdit?.price?.toString() || '',
                    is_active: serviceToEdit?.is_active,
                }}
                onSubmit={onSubmit}
                isLoading={isPending}
                buttonText={buttons.save}
            />
        );
    }
};
