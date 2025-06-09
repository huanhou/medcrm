import { useMemo } from "react";
import { useGetStaffQuery } from "@/features/staff/model/staff-api";
import { mapToEmployee } from "@/entities/staff/mapper";
import { useDictionary } from "@/shared/lib/hooks";

export const useStaff = () => {
    const { dictionary } = useDictionary();
    const { data, isLoading, isError, isSuccess } = useGetStaffQuery();

    const transformedData = useMemo(() => {
        return data ? mapToEmployee(data, dictionary) : [];
    }, [data, dictionary]);

    return {
        data: transformedData,
        isLoading,
        isError,
        isSuccess,
    };
};
