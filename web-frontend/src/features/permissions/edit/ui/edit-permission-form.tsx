'use client';

import { PermissionForm } from '../../ui/shared-form';
import { useEditPermissionMutation, useGetPermissionByIdQuery } from '../modal/permission-edit-api';
import { toast } from 'react-hot-toast';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';
import { queryClient } from '@/shared/api/query-client';
import { useDictionary } from '@/shared/lib/hooks';
import { PermissionSchema } from '@/features/permissions/lib/permission-schema';
import { Loader } from '@/shared/ui';

export const EditPermissionForm = ({ permissionId }: { permissionId: string }) => {
    const { dictionary } = useDictionary();
    const { successNotifications, errorNotifications, buttons } = dictionary;
    const router = useRouter();
    const { data: permissionToEdit, isLoading } = useGetPermissionByIdQuery(permissionId);

    const { mutate: edit, isPending } = useEditPermissionMutation(permissionId);

    if (!permissionId) {
        toast.error(errorNotifications.PermissionNotfound);
        return null;
    }

    const onSubmit = (data: PermissionSchema) => {
        edit(data, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['permissions'] });
                queryClient.invalidateQueries({ queryKey: ['permission'] });
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

    if (isLoading) {
        return <Loader />;
    }

    return (
        <PermissionForm
            defaultValues={{
                name: permissionToEdit?.name,
                description: permissionToEdit?.description,
                // No code field in the edit form
            }}
            onSubmit={onSubmit}
            isLoading={isPending}
            buttonText={buttons.save}
            isCodeDisabled={false} // Disable code field (it's not part of the form in edit mode)
        />
    );
};
