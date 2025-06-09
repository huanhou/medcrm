'use client';

import { PermissionForm } from '../../ui/shared-form';
import { useDictionary } from '@/shared/lib/hooks';
import { useCreatePermissionMutation } from '../modal/permission-create-api';
import { CreatePermissionDto } from '@/shared/api/types';
import { queryClient } from '@/shared/api/query-client';
import { toast } from 'react-hot-toast';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';

export const CreatePermissionForm = () => {
    const router = useRouter();
    const { mutate: create, isPending } = useCreatePermissionMutation();
    const { dictionary } = useDictionary();
    const { buttons, successNotifications, errorNotifications } = dictionary;
    const onSubmit = (data: CreatePermissionDto) => {
        create(data, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['permissions'] });
                toast.success(successNotifications.saved);
                router.replace(ROUTES.permission);
            },
            onError: (error: Error) => {
                if ((error as any)?.response?.data?.message?.includes('already exist')) {
                    toast.error(errorNotifications.permissionAlreadyExists);
                } else {
                    toast.error(errorNotifications.notSaved);
                }
            },
        });
    };

    return (
        <PermissionForm
            defaultValues={{
                name: '',
                description: '',
                code: '',
            }}
            onSubmit={onSubmit}
            isLoading={isPending}
            buttonText={buttons.create}
        />
    );
};
