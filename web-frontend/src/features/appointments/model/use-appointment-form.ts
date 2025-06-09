import { useCallback, useState } from "react";
import { useForm, UseFormSetValue } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAppointmentSchema, AppointmentSchema } from "../lib/appointment-schema";
import { useDictionary } from "@/shared/lib/hooks";

interface UseAppointmentsFormProps {
    defaultValues: Partial<AppointmentSchema>;
    onSubmit: (data: AppointmentSchema) => void;
}
//
export const useAppointmentForm = ({ defaultValues, onSubmit }: UseAppointmentsFormProps) => {
    const { dictionary } = useDictionary();
    const appointmentSchema = createAppointmentSchema(dictionary);
    const [isFormSaved, setIsFormSaved] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const formMethods = useForm<AppointmentSchema>({
        resolver: zodResolver(appointmentSchema),
        mode: "onBlur",
        defaultValues: defaultValues
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        setValue,
        watch,
    } = formMethods;

    const handleFormSubmit = (data: AppointmentSchema) => {
        setIsFormSaved(true);
        onSubmit(data);
    };


    return {
        formMethods,
        handleSubmit: handleSubmit(handleFormSubmit),
        register,
        errors,
        isDirty,
        isFormSaved,
        dictionary,
        modalOpen,
        setModalOpen,
        setValue,
        watch,
    };
};

export const useServiceSelect = (setValue: UseFormSetValue<AppointmentSchema>) => {
    const [forceRerenderKey, setForceRerenderKey] = useState(0);

    const handleServicesChange = useCallback(
        (ids: string[]) => {
            setValue('service_ids', ids);
        },
        [setValue]
    );

    const rerenderMultiSelect = useCallback(() => {
        setForceRerenderKey((prev) => prev + 1);
    }, []);

    return { forceRerenderKey, handleServicesChange, rerenderMultiSelect };
};
