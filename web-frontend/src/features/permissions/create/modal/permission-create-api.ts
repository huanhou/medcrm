import { useMutation } from "@tanstack/react-query";
import { createPermission } from "@/shared/api/generated";
import { CreatePermissionDto } from "@/shared/api/types";

export function useCreatePermissionMutation() {
    return useMutation({
        mutationFn: async (data: CreatePermissionDto) =>
            await createPermission(data),
    });
}
