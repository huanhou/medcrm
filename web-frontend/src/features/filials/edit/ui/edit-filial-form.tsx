'use client';

import { useEditFilialMutation } from '../modal/filial-edit-api';
import { toast } from 'react-hot-toast';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';
import { queryClient } from '@/shared/api/query-client';
import { useDictionary } from '@/shared/lib/hooks';
import { useGetFilialByIdQuery } from '../../model/filial-api';
import { Loader } from '@/shared/ui';
import { Filial } from '@/shared/api/types';
import { FilialForm } from '../../ui/shared-form';
import { FilialSchema } from '../../lib/filial-schema';
import { getChangedFields } from '@/shared/helpers/get-changed-fields';

function updateFilialCache(filialId: string, newData: FilialSchema & { id: string }) {
    const currentList = queryClient.getQueryData<Filial[]>(['filials']) || [];
    const updatedList = currentList.map((filial) =>
        filial.id === filialId
            ? {
                ...filial,
                ...newData,
                status: newData.status as 'active' | 'inactive',
                address: newData.address || null,
            }
            : filial
    );
    queryClient.setQueryData(['filials'], updatedList);
    queryClient.invalidateQueries({ queryKey: ['filial'] });
}

export const EditFilialForm = ({ filialId }: { filialId: string }) => {
    const { dictionary } = useDictionary();
    const { successNotifications, errorNotifications, buttons } = dictionary;
    const router = useRouter();
    const { data: filialToEdit, isLoading } = useGetFilialByIdQuery(filialId);
    const { mutate: edit, isPending } = useEditFilialMutation(filialId);

    const onSubmit = (data: FilialSchema) => {
        if (!filialToEdit) return;

        const changedFields = getChangedFields(data, filialToEdit);

        if (Object.keys(changedFields).length === 0) return;

        edit(changedFields, {
            onSuccess: () => {
                updateFilialCache(filialId, { id: filialId, ...data });
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

    if (isLoading) {
        return <Loader />;
    }

    if (!filialToEdit) {
        return null;
    }

    return (
        <FilialForm
            defaultValues={{
                name: filialToEdit.name,
                address: filialToEdit.address || '',
                email: filialToEdit.email,
                phone: filialToEdit.phone,
                status: filialToEdit.status as 'active' | 'inactive',
            }}
            onSubmit={onSubmit}
            isLoading={isPending}
            buttonText={buttons.save}
        />
    );
};
