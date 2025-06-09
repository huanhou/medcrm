import { useMemo } from "react";
import { useGetSpecialistsQuery } from "@/features/specialist/model/specialist-api";
import { mapToSpecialistEmployee } from "@/entities/specialist/mapper";
import { useDictionary } from "@/shared/lib/hooks";

export const useSpecialists = () => {
    const { dictionary } = useDictionary();
    const { data, isLoading, isError, isSuccess } = useGetSpecialistsQuery();

    const transformedData = useMemo(() => {
        return data ? mapToSpecialistEmployee(data, dictionary) : [];
    }, [data, dictionary]);

    return {
        data: transformedData,
        isLoading,
        isError,
        isSuccess,
    };
};
