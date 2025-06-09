import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormMask } from "use-mask-input";
import { useGetFilialsQuery } from "@/shared/api/filials-api";
import {
    createSpecialistSchema,
    SpecialistSchemaType,
} from "./specialist-schema";
import { useDictionary } from "@/shared/lib/hooks";

interface UseSpecialistFormProps {
    defaultValues: Partial<SpecialistSchemaType>;
    onSubmit: (data: SpecialistSchemaType) => void;
}

export const useSpecialistForm = ({
                                      defaultValues,
                                      onSubmit,
                                  }: UseSpecialistFormProps) => {
    const { dictionary } = useDictionary();
    const specialistSchema = createSpecialistSchema(dictionary);
    const [isFormSaved, setIsFormSaved] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const formMethods = useForm<SpecialistSchemaType>({
        resolver: zodResolver(specialistSchema),
        mode: 'onBlur',
        defaultValues,
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
    } = formMethods;

    const handleFormSubmit = (data: SpecialistSchemaType) => {
        setIsFormSaved(true);
        onSubmit(data);
    };

    const registerWithMask = useHookFormMask(register);
    const { data: filials } = useGetFilialsQuery();
    const statuses = [
        { value: 'active', label: dictionary.sharedForm.active },
        { value: 'inactive', label: dictionary.sharedForm.inactive },
    ];

    return {
        formMethods,
        handleSubmit: handleSubmit(handleFormSubmit),
        register,
        registerWithMask,
        errors,
        isDirty,
        isFormSaved,
        filials: filials || [], // Ensure filials is always an array
        statuses,
        dictionary,
        modalOpen,
        setModalOpen,
    };
};
