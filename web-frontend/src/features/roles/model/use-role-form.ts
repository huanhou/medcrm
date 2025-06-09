import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRoleSchema, RolesSchema } from "../lib/roles-schema";
import { useDictionary } from "@/shared/lib/hooks";
import { MultiSelectOption } from "@/shared/ui/form-elements/select/multi-select";
import { useGetPermissionsQuery } from "@/features/permissions/model/permission-api";

// Define the interface for the permissions
interface Permission {
    id: string;
    name: string;
    description: string;
    code: string;
}

interface UseRolesFormProps {
    defaultValues: Partial<RolesSchema>;
    onSubmit: (data: RolesSchema) => void;
}

export const useRoleForm = ({ defaultValues, onSubmit }: UseRolesFormProps) => {
    const { dictionary } = useDictionary();
    const roleSchema = createRoleSchema(dictionary);
    const [isFormSaved, setIsFormSaved] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const formMethods = useForm<RolesSchema>({
        resolver: zodResolver(roleSchema),
        mode: "onBlur",
        defaultValues: defaultValues,
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        setValue,
    } = formMethods;

    const handleFormSubmit = (data: RolesSchema) => {
        setIsFormSaved(true);
        onSubmit(data);
    };

    // Fetch permissions
    const { data: permissionData } = useGetPermissionsQuery();

    // Check if permissionData is an array and map it accordingly
    const permission: MultiSelectOption[] = Array.isArray(permissionData)
        ? permissionData.map((permissionItem: Permission) => ({
            label: permissionItem.name,
            id: permissionItem.id,
        }))
        : [];  // Return an empty array if permissionData is not an array

    // Log permissionData to debug if it's not an array
    if (!Array.isArray(permissionData)) {
        console.error("Expected permissionData to be an array, but got:", permissionData);
    }

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
        permission,
        setValue,
    };
};
