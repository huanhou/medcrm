import { useMutation } from "@tanstack/react-query";
import { createPatient } from "@/shared/api/generated";
import { CreatePatientDto } from "@/shared/api/types";
import { queryClient } from "@/shared/api/query-client";

export function useCreatePatientMutation() {
    return useMutation({
        mutationFn: async (data: CreatePatientDto) => await createPatient(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["patients"] });
        },
    });
}
