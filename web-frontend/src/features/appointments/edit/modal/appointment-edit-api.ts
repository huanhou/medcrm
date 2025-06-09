import { useMutation } from "@tanstack/react-query";
import { editAppointment } from "@/shared/api/generated";
import { CreateAppointmentDto } from "@/shared/api/types";
import { queryClient } from "@/shared/api/query-client";

export function useEditAppointmentMutation(id: string) {
    return useMutation({
        mutationFn: async (data: CreateAppointmentDto) => {
            return await editAppointment(id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
        },
    });
}