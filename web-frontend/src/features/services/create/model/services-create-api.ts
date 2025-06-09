import { useMutation } from "@tanstack/react-query";
import { createService } from "@/shared/api/generated";
import { CreateServiceDto } from "@/shared/api/types";

export function useCreateServiceMutation() {
    return useMutation({
        mutationFn: async (data: CreateServiceDto) => await createService(data),
    });
}
