import { useMutation } from "@tanstack/react-query";
import { createFilial } from "@/shared/api/generated";
import { CreateFilialDto } from "@/shared/api/types";
import { queryClient } from "@/shared/api/query-client";

export function useCreateFilialMutation() {
    return useMutation({
        mutationFn: async (data: CreateFilialDto) => await createFilial(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["filials"] });
        },
    });
}
