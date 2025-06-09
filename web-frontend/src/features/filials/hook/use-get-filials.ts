import { useMemo } from "react";
import { useGetFilialsQuery } from "../model/filial-api";
import { mapToFilials } from "@/entities/filials/mapper";
import { useDictionary } from "@/shared/lib/hooks";

export const useGetFilials = () => {
    const { data, isLoading, isError, isSuccess } = useGetFilialsQuery();
    const { dictionary } = useDictionary()
    const transformedData = useMemo(() => {
        return data ? mapToFilials(dictionary, data) : [];
    }, [dictionary, data]);
    return {
        data: transformedData,
        isLoading,
        isError,
        isSuccess,
    };
};
