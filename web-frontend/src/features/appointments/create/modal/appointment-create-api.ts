import { useMutation } from "@tanstack/react-query";
import { createAppointment } from "@/shared/api/generated";
import { CreateAppointmentDto } from "@/shared/api/types";
import { queryClient } from "@/shared/api/query-client";

export function useCreateAppointmentMutation() {
    return useMutation({
        mutationFn: async (data: CreateAppointmentDto) => await createAppointment(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
        },
    });
}
