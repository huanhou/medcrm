'use client';

import { useForm } from 'react-hook-form';
import { useEditSettings, useSettings } from './api';
import { settingsSchema } from '../lib/setting-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Settings } from '@/shared/api/types';
import { useGetStaffQuery } from '@/shared/api/staff-api';
import { useCallback, useEffect } from 'react';
import { useDictionary } from '@/shared/lib/hooks';
export const useSettingsForm = () => {
    const { data, isLoading, error } = useSettings();
    const { data: staff } = useGetStaffQuery();
    const { dictionary } = useDictionary();
    const formMethods = useForm<Settings>({
        resolver: zodResolver(settingsSchema(dictionary)),
        mode: "onBlur",
        defaultValues: {
            organization_name: '',
            iin_bin: '',
            legal_address: '',
            director: '',
            bio: '',
            phone: '',
            logo: '',
        }
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        setValue,
        watch,
        reset,
    } = formMethods;

    useEffect(() => {
        if (data) {
            reset({
                organization_name: data.organization_name || '',
                iin_bin: data.iin_bin || '',
                legal_address: data.legal_address || '',
                director: data.director,
                bio: data.bio || '',
                phone: data.phone || '',
                logo: data.logo || '',
            });
        }
    }, [data, reset]);



    return {
        data,
        isLoading,
        error,
        handleSubmit,
        register,
        errors,
        isDirty,
        setValue,
        watch,
        staff,
        reset
    };
};
