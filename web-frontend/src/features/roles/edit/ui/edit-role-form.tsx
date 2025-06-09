'use client';

import { RoleForm } from '../../ui/shared-form';
import { useEditRoleMutation, useGetRoleByIdQuery } from '../modal/role-edit-api';
import { toast } from 'react-hot-toast';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';
import { queryClient } from '@/shared/api/query-client';
import { useDictionary } from '@/shared/lib/hooks';
import { CreateRoleDto } from '@/shared/api/types';

export const EditRoleForm = ({ roleId }: { roleId: string }) => {
    const { dictionary } = useDictionary();
    const { successNotifications, errorNotifications, buttons } = dictionary;
    const router = useRouter();

    const { data: roleToEdit } = useGetRoleByIdQuery(roleId);

    const { mutate: edit, isPending, error } = useEditRoleMutation(roleId);
    if (!roleId) {
        toast.error(errorNotifications.staffNotfound);
        return null;
    }
    const onSubmit = (data: CreateRoleDto) => {
        edit(data, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['roles'] });
                toast.success(successNotifications.saved);
                router.replace(ROUTES.roles);
                queryClient.invalidateQueries({ queryKey: ['role'] });
            },
            onError: () => {
                if ((error as any)?.response?.data?.message?.includes('already exists')) {
                    toast.error(errorNotifications.roleAlreadyExists);
                } else {
                    toast.error(errorNotifications.notSaved);
                }
            },
        });
    };

    const permissions = roleToEdit?.Permissions?.map((p) => p.id) || [];
    return (
        <RoleForm
            defaultValues={{
                roleName: roleToEdit?.name,
                permission: permissions,
            }}
            onSubmit={onSubmit}
            isLoading={isPending}
            buttonText={buttons.save}
        />
    );
};
