'use client';

import { StaffForm } from '../../ui/shared-form';
import { useEditStaffMutation, useGetStaffByIdQuery } from '@/features/staff/edit/modal/staff-edit-api';
import { toast } from 'react-hot-toast';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';
import { queryClient } from '@/shared/api/query-client';
import { useDictionary } from '@/shared/lib/hooks';
import { Loader } from '@/shared/ui';
import { useState } from 'react';

export const EditStaffForm = ({ staffId }: { staffId: string }) => {
    const { data: staffToEdit, isLoading } = useGetStaffByIdQuery(staffId);
    const { dictionary } = useDictionary();
    const { successNotifications, errorNotifications, buttons } = dictionary;
    const router = useRouter();
    const { mutate: edit, isPending, error } = useEditStaffMutation(staffId);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const onSubmit = (data: any) => {
        edit(data, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['staffList'] });
                toast.success(successNotifications.saved);
                router.replace(ROUTES.staff);
                queryClient.invalidateQueries({ queryKey: ['staff'] });
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
        <StaffForm
            key={`${staffToEdit?.id}`}
            defaultValues={{
                fio: staffToEdit?.fio,
                email: staffToEdit?.email,
                phone_number: staffToEdit?.phone_number,
                address: staffToEdit?.address || '',
                filial_id: staffToEdit?.filial_id,
                role_id: staffToEdit?.role_id,
                status: staffToEdit?.status as 'active' | 'inactive',
            }}
            onSubmit={onSubmit}
            isPasswordDisabled={true}
            isLoading={isPending}
            buttonText={buttons.save}
            isPasswordVisible={isPasswordVisible}
            setIsPasswordVisible={setIsPasswordVisible}
        />
    );
};
