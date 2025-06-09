import { useMutation } from "@tanstack/react-query";
import { editFilial } from "@/shared/api/generated";
import { EditFilialDto } from "@/shared/api/types";
import { queryClient } from "@/shared/api/query-client";

export function useEditFilialMutation(id: string) {
    return useMutation({
        mutationFn: async (data: EditFilialDto) => {
            return await editFilial(id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["filials"] });
        },
    });
}