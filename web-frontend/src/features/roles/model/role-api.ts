import { useMutation } from '@tanstack/react-query';
import { deleteRole } from '@/shared/api/generated';


export function useDeleteRoleMutation() {
    return useMutation({
        mutationFn: async (ids: number[]) => {
            return await deleteRole(ids);  // Pass the array of IDs to deleteRole
        },
    });
}
