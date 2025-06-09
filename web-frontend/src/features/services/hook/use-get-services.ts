import { useGetServicesQuery } from "@/shared/api/services-api";

export const useServices = () => {
    const { data, isLoading, isError, isSuccess } = useGetServicesQuery();

    return {
        data,
        isLoading,
        isError,
        isSuccess,
    };
};
