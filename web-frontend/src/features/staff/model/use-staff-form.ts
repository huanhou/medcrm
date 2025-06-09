import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormMask } from "use-mask-input";
import { createStaffSchema, StaffSchemaType } from "../model/staff-schema";
import { useDictionary } from "@/shared/lib/hooks";
import { useGetFilialsQuery } from "@/shared/api/filials-api";
import { useGetRolesQuery } from "@/shared/api/roles-api";

interface UseStaffFormProps {
    defaultValues: Partial<StaffSchemaType>;
    onSubmit: (data: StaffSchemaType) => void;
    isPasswordDisabled?: boolean;
}

export const useStaffForm = ({
                                 defaultValues,
                                 onSubmit,
                                 isPasswordDisabled = false,
                             }: UseStaffFormProps) => {
    const { dictionary } = useDictionary();
    const staffSchema = createStaffSchema(dictionary);
    const [isFormSaved, setIsFormSaved] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const formMethods = useForm<StaffSchemaType>({
        resolver: zodResolver(staffSchema),
        mode: "onBlur",
        defaultValues,
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
    } = formMethods;

    const handleFormSubmit = (data: StaffSchemaType) => {
        setIsFormSaved(true);
        onSubmit(data);  // Submit data as expected by the backend
    };

    const registerWithMask = useHookFormMask(register);
    const { data: filials } = useGetFilialsQuery();
    const { data: roles } = useGetRolesQuery();

    const statuses = [
        { value: "active", label: dictionary.sharedForm.active },
        { value: "inactive", label: dictionary.sharedForm.inactive },
    ];

    return {
        formMethods,
        handleSubmit: handleSubmit(handleFormSubmit),
        register,
        registerWithMask,
        errors,
        isDirty,
        isFormSaved,
        filials,
        roles,
        statuses,
        dictionary,
        isPasswordDisabled,
        modalOpen,
        setModalOpen,
    };
};
