import { useMutation } from '@tanstack/react-query';
import { deleteService } from '@/shared/api/generated';

export function useDeleteServiceMutation() {
    return useMutation({
        mutationFn: async (ids: string[]) => {
            return await deleteService(ids);  // Call to delete the service
        },
        onSuccess: () => {
            // On success, invalidate queries or perform any necessary state updates
        },
    });
}
