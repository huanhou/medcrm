import { useMemo } from "react";
import { mapToRoles } from "@/entities/roles/mapper";
import { useGetRolesQuery } from "@/shared/api/roles-api";

export const useRole = () => {
    const { data, isLoading, isError, isSuccess } = useGetRolesQuery();

    const transformedData = useMemo(() => {
        return data ? mapToRoles(data) : [];
    }, [data]);

    return {
        data: transformedData,
        isLoading,
        isError,
        isSuccess,
    };
};
