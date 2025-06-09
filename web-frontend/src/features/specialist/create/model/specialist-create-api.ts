import { useMutation } from "@tanstack/react-query";
import { createSpecialist } from "@/shared/api/generated";
import { CreateSpecialistDto } from "@/shared/api/types";

export function useCreateSpecialistMutation() {
    return useMutation({
        mutationFn: async (data: CreateSpecialistDto) =>
            await createSpecialist(data),
    });
}
