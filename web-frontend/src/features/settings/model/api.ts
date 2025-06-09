'use client';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettings, editSettings } from "@/shared/api/generated";
import { Settings } from "@/shared/api/types";
import { toast } from "react-hot-toast";
import { useDictionary } from "@/shared/lib/hooks";
export const useSettings = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['settings'],
        queryFn: () => getSettings(),
    });

    return { data, isLoading, error };
};

export const useEditSettings = () => {
    const queryClient = useQueryClient();
    const { dictionary } = useDictionary();
    const { mutate, isPending, error } = useMutation({
        mutationFn: (data: Omit<Settings, 'logo'>) => editSettings(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['settings'] });
            toast.success(dictionary.successNotifications.saved);
        },
        onError: () => {
            toast.error(dictionary.errorNotifications.notSaved);
        },
    });

};