'use client';

import { StaffForm } from '../../ui/shared-form';
import { useCreateStaffMutation } from '@/features/staff/create/modal/staff-create-api';
import { useDictionary } from '@/shared/lib/hooks';
import { queryClient } from '@/shared/api/query-client';
import { toast } from 'react-hot-toast';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const CreateStaffForm = () => {
    const router = useRouter();
    const { mutate: create, isPending } = useCreateStaffMutation();
    const { dictionary } = useDictionary();
    const { buttons, successNotifications, errorNotifications } = dictionary;
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const onSubmit = (data: any) => {
        create(data, {
            onSuccess: async () => {
                await queryClient.invalidateQueries({ queryKey: ['staffList'] });
                toast.success(successNotifications.saved);
                router.replace(ROUTES.staff);
            },
            onError: (error: any) => {
                if (error.response?.data?.message === 'Email  already exists') {
                    toast.error(errorNotifications.emailAlreadyExists);
                } else if (error.response?.data?.message === 'Phone number already exists') {
                    toast.error(errorNotifications.phoneAlreadyExists);
                } else {
                    toast.error(error.response?.data?.message);
                }
            },
        });
    };

    return (
        <StaffForm
            defaultValues={{
                fullName: '',
                email: '',
                phone: '',
                address: '',
                branch: '',
                status: 'active',
                role: '',
            }}
            onSubmit={onSubmit}
            isPasswordDisabled={false}
            isLoading={isPending}
            buttonText={buttons.create}
            isPasswordVisible={isPasswordVisible}
            setIsPasswordVisible={setIsPasswordVisible}
        />
    );
};
