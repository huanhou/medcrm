import { useMutation, useQuery } from "@tanstack/react-query";
import { editRole, getRoleById } from "@/shared/api/generated";
import { CreateRoleDto, Role } from "@/shared/api/types";
import { queryClient } from "@/shared/api/query-client";

export function useEditRoleMutation(id: string) {
    return useMutation({
        mutationFn: async (data: CreateRoleDto) => {
            return await editRole(id, data);
        },
    });
}

export function useGetRoleByIdQuery(id: string) {
    return useQuery({
        queryKey: ['role', id],
        queryFn: () => getRoleById(id),
        staleTime: 60 * 60 * 1000,
        enabled: !!id,
        initialData: () => {
            const role = queryClient.getQueryData<Role[]>(['roles']);
            return role?.find((r) => r.id === id);
        },
    });
}