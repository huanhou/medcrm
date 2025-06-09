'use client';

import { RoleForm } from '../../ui/shared-form';
import { useDictionary } from '@/shared/lib/hooks';
import { useCreateRoleMutation } from '@/features/roles/create/modal/role-create-api';
import { CreateRoleDto } from '@/shared/api/types';
import { queryClient } from '@/shared/api/query-client';
import { toast } from 'react-hot-toast';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';

export const CreateRoleForm = () => {
    const router = useRouter();
    const { mutate: create, isPending } = useCreateRoleMutation();
    const { dictionary } = useDictionary();
    const { buttons, successNotifications, errorNotifications } = dictionary;
    const onSubmit = (data: CreateRoleDto) => {
        create(data, {
            onSuccess: async () => {
                await queryClient.invalidateQueries({ queryKey: ['roles'] });
                toast.success(successNotifications.saved);
                router.replace(ROUTES.roles);
            },
            onError: (error: Error) => {
                if ((error as any)?.response?.data?.message?.includes('already exists')) {
                    toast.error(errorNotifications.roleAlreadyExists);
                } else {
                    toast.error(errorNotifications.notSaved);
                }
            },
        });
    };

    return (
        <RoleForm
            defaultValues={{
                roleName: '',
                permission: [],
            }}
            onSubmit={onSubmit}
            isLoading={isPending}
            buttonText={buttons.create}
        />
    );
};
