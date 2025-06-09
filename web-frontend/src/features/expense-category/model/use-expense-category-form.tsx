import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createExpenseCategorySchema, ExpenseCategorySchema } from "../lib/expense-category-schema";
import { useDictionary } from "@/shared/lib/hooks";
import { useGetExpenseCategoriesQuery } from "@/shared/api/expense-category";

interface UseExpenseCategoryFormProps {
    defaultValues: Partial<ExpenseCategorySchema>;
    onSubmit: (data: ExpenseCategorySchema) => void;
}

export const useExpenseCategoryForm = ({ defaultValues, onSubmit }: UseExpenseCategoryFormProps) => {
    const { dictionary } = useDictionary();
    const expenseCategorySchema = createExpenseCategorySchema(dictionary);
    const [isFormSaved, setIsFormSaved] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const formMethods = useForm<ExpenseCategorySchema>({
        resolver: zodResolver(expenseCategorySchema),
        mode: 'onBlur',
        defaultValues: defaultValues,
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        setValue,
    } = formMethods;

    const handleFormSubmit = (data: ExpenseCategorySchema) => {
        setIsFormSaved(true);
        onSubmit(data);
    };

    const { data: expenseCategoriesData } = useGetExpenseCategoriesQuery();


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
        expenseCategoriesData,
        setValue,
    };
};
