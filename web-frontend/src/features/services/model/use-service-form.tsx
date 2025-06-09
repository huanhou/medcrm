import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createServiceSchema, ServiceSchema } from "../lib/services-schema";
import { useDictionary } from "@/shared/lib/hooks";

interface UseServicesFormProps {
    defaultValues: Partial<ServiceSchema>;
    onSubmit: (data: ServiceSchema) => void;
}

export const useServiceForm = ({ defaultValues, onSubmit }: UseServicesFormProps) => {
    const { dictionary } = useDictionary();
    const serviceSchema = createServiceSchema(dictionary);
    const [isFormSaved, setIsFormSaved] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const formMethods = useForm<ServiceSchema>({
        resolver: zodResolver(serviceSchema),
        mode: "onBlur",
        defaultValues: defaultValues
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        setValue,
        watch
    } = formMethods;

    const handleFormSubmit = (data: ServiceSchema) => {
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
        watch
    };
};
