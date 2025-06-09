import { useQuery, useMutation } from "@tanstack/react-query";
import { getSpecialists, deleteSpecialist } from "@/shared/api/generated";

export const useGetSpecialistsQuery = () => {
    return useQuery({
        queryKey: ["specialistList"],
        queryFn: getSpecialists,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};

export const useDeleteSpecialistMutation = () => {
    return useMutation({
        mutationFn: async (ids: number[]) => {
            return await deleteSpecialist(ids);
        },
    });
};
