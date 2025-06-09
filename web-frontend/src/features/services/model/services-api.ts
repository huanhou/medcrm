import { useMutation } from '@tanstack/react-query';
import { deleteService } from '@/shared/api/generated';
import { queryClient } from '@/shared/api/query-client';
export function useDeleteServiceMutation() {
    return useMutation({
        mutationFn: async (ids: string[]) => {  // Change from string to string[] to handle multiple IDs
            return await deleteService(ids);  // Pass the array of IDs to deleteService
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] });  // Invalidate the services cache after successful deletion
        },
    });
}

