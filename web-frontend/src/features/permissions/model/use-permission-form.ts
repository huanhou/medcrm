import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPermissionSchema, PermissionSchema } from "../lib/permission-schema";
import { useDictionary } from "@/shared/lib/hooks";
import { useGetPermissionsQuery } from "./permission-api";
import { MultiSelectOption } from "@/shared/ui/form-elements/select/multi-select";

interface UsePermissionsFormProps {
    defaultValues: Partial<PermissionSchema>;
    onSubmit: (data: PermissionSchema) => void;
}

export const usePermissionForm = ({ defaultValues, onSubmit }: UsePermissionsFormProps) => {
    const { dictionary } = useDictionary();
    const permissionSchema = createPermissionSchema(dictionary);
    const [isFormSaved, setIsFormSaved] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const formMethods = useForm<PermissionSchema>({
        resolver: zodResolver(permissionSchema),
        mode: "onBlur",
        defaultValues: defaultValues
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        setValue,
    } = formMethods;

    const handleFormSubmit = (data: PermissionSchema) => {
        setIsFormSaved(true);
        onSubmit(data);
    };

    const { data: permissionsData } = useGetPermissionsQuery();
    const permissions: MultiSelectOption[] =
        permissionsData?.map((permission) => ({
            label: permission.name,
            id: permission.id,
        })) || [];


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
        permissions,
        setValue,
    };
};
