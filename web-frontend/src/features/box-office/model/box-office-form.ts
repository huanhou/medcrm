import { useCallback, useMemo, useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

type BoxOfficeFormFields = {
    patient_id: string;
    specialist_id: string;
    service_id: string[];
    payment_type: string;
    comment?: string;
    created_at?: string;
};

export const useServiceSelect = (setValue: UseFormSetValue<BoxOfficeFormFields>) => {
    const [forceRerenderKey, setForceRerenderKey] = useState(0);

    const handleServicesChange = useCallback(
        (ids: string[]) => {
            setValue('service_id', ids);
        },
        [setValue]
    );

    const rerenderMultiSelect = useCallback(() => {
        setForceRerenderKey((prev) => prev + 1);
    }, []);

    return { forceRerenderKey, handleServicesChange, rerenderMultiSelect };
};

export const usePatientDoctor = (setValue: UseFormSetValue<BoxOfficeFormFields>, watch: UseFormWatch<BoxOfficeFormFields>) => {
    const [isCreatePatientModalOpen, setIsCreatePatientModalOpen] = useState(false);

    const watchPatientId = watch('patient_id');
    const watchStaffId = watch('specialist_id');

    const watchedValues = useMemo(
        () => ({
            patientId: watchPatientId,
            staffId: watchStaffId,
        }),
        [watchPatientId, watchStaffId]
    );

    const handlePatientChange = useCallback(
        (selectedId: string) => {
            setValue('patient_id', selectedId);
        },
        [setValue]
    );

    const handleStaffChange = useCallback(
        (selectedId: string) => {
            setValue('specialist_id', selectedId);
        },
        [setValue]
    );

    const handlePatientCreated = useCallback(
        (patientId: string) => {
            setValue('patient_id', patientId);
        },
        [setValue]
    );

    return {
        watchedValues,
        isCreatePatientModalOpen,
        setIsCreatePatientModalOpen,
        handlePatientChange,
        handleStaffChange,
        handlePatientCreated,
    };
};