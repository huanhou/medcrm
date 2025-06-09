import { useMemo } from "react";
import { useGetAppointmentsQuery } from "../model/appointment-api";
import { mapToAppointments } from "@/entities/appointment/mapper";
import { useDictionary } from "@/shared/lib/hooks";

export const useGetAppointments = () => {
    const { data, isLoading, isError, isSuccess } = useGetAppointmentsQuery();
    const { dictionary } = useDictionary()
    const transformedData = useMemo(() => {
        return data ? mapToAppointments(dictionary, data) : [];
    }, [dictionary, data]);
    return {
        data: transformedData,
        isLoading,
        isError,
        isSuccess,
    };
};
