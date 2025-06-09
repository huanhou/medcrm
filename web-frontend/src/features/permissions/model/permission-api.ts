import { useQuery, useMutation } from '@tanstack/react-query';
import { getPermissions, deletePermission } from '@/shared/api/generated';

export function useGetPermissionsQuery() {
    return useQuery({
        queryKey: ['permissions'],
        queryFn: async () => {
            return await getPermissions();
        },
        staleTime: 60 * 60 * 1000,
    });
}

export function useDeletePermissionMutation() {
    return useMutation({
        mutationFn: async (id: string) => { // change from string[] to string
            return await deletePermission(id);  // Ensure API supports single ID deletion
        },
    });
}

