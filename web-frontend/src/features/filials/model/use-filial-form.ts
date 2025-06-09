import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFilialSchema, FilialSchema } from "../lib/filial-schema";
import { useDictionary } from "@/shared/lib/hooks";

interface UseFilialFormProps {
    defaultValues: Partial<FilialSchema>;
    onSubmit: (data: FilialSchema) => void;
}

export const useFilialForm = ({ defaultValues, onSubmit }: UseFilialFormProps) => {
    const { dictionary } = useDictionary();
    const filialSchema = createFilialSchema(dictionary);
    const [isFormSaved, setIsFormSaved] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const formMethods = useForm<FilialSchema>({
        resolver: zodResolver(filialSchema),
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

    const handleFormSubmit = (data: FilialSchema) => {
        setIsFormSaved(true);
        onSubmit(data);
    };

    const statuses = [
        { value: "active", label: dictionary.sharedForm.active },
        { value: "inactive", label: dictionary.sharedForm.inactive },
    ];



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
        statuses,
    };
};
