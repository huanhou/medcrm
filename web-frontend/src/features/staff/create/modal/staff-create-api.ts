import { useMutation } from "@tanstack/react-query";
import { createStaff } from "@/shared/api/generated";
import { CreateStaffDto } from "@/shared/api/types";

export function useCreateStaffMutation() {
    return useMutation({
        mutationFn: async (data: CreateStaffDto) => await createStaff(data),
    });
}
