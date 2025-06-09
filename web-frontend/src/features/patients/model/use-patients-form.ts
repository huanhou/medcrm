import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPatientSchema, PatientSchema } from "../lib/patients-schema";
import { useDictionary } from "@/shared/lib/hooks";

interface UsePatientsFormProps {
    defaultValues: Partial<PatientSchema>;
    onSubmit: (data: PatientSchema) => void;
}

export const usePatientForm = ({ defaultValues, onSubmit }: UsePatientsFormProps) => {
    const { dictionary } = useDictionary();
    const patientSchema = createPatientSchema(dictionary);
    const [isFormSaved, setIsFormSaved] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const formMethods = useForm<PatientSchema>({
        resolver: zodResolver(patientSchema),
        mode: "onBlur",
        defaultValues: defaultValues
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        setValue,
    } = formMethods;

    const handleFormSubmit = (data: PatientSchema) => {
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
    };
};
