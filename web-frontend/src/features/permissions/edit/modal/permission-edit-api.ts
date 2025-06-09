import { useMutation, useQuery } from "@tanstack/react-query";
import { editPermission, getPermissionById } from "@/shared/api/generated";
import { CreatePermissionDto, Permission } from "@/shared/api/types";
import { queryClient } from "@/shared/api/query-client";


export function useGetPermissionByIdQuery(id: string) {
    return useQuery({
        queryKey: ['permission', id],
        queryFn: async () => {
            return await getPermissionById(id);
        },
        staleTime: 60 * 60 * 1000,
        enabled: !!id,
        initialData: () => {
            // Safeguard: Make sure 'permissions' is an array
            const permissions = queryClient.getQueryData<Permission[]>(['permissions']);

            // Check if permissions is actually an array before calling .find()
            if (Array.isArray(permissions)) {
                return permissions.find((p) => p.id === id);
            }

            // Return undefined or a default value if it's not an array
            return undefined;
        },
    });
}

export function useEditPermissionMutation(id: string) {
    return useMutation({
        mutationFn: async (data: CreatePermissionDto) => {
            return await editPermission(id, data);
        },
    });
}
