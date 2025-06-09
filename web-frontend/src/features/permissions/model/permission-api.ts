import { useQuery, useMutation } from '@tanstack/react-query';
import { getPermissions, deletePermission } from '@/shared/api/generated';
import { queryClient } from '@/shared/api/query-client';
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
        mutationFn: async (ids: string[]) => {  // Change from string to string[] to handle multiple IDs
            return await deletePermission(ids);  // Pass the array of IDs to deletePermission
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['permissions'] });
        },
    });
}


