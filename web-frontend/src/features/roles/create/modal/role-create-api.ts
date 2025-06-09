import { useMutation } from "@tanstack/react-query";
import { createRole } from "@/shared/api/generated";

import { CreateRoleDto } from "@/shared/api/types";

export function useCreateRoleMutation() {
    return useMutation({
        mutationFn: async (data: CreateRoleDto) => await createRole(data),
    });
}
