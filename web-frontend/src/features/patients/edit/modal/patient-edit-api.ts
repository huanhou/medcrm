import { useMutation } from "@tanstack/react-query";
import { editPatient } from "@/shared/api/generated";
import { CreatePatientDto } from "@/shared/api/types";
import { queryClient } from "@/shared/api/query-client";

export function useEditPatientMutation(id: string) {
    return useMutation({
        mutationFn: async (data: CreatePatientDto) => {
            return await editPatient(id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["patients"] });
        },
    });
}
