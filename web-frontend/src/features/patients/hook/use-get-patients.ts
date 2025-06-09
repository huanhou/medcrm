import { useGetPatientsQuery } from "@/shared/api/patient-api";

export const useGetPatients = () => {
    const { data, isLoading, isError, isSuccess } = useGetPatientsQuery();


    return {
        data,
        isLoading,
        isError,
        isSuccess,
    };
};
