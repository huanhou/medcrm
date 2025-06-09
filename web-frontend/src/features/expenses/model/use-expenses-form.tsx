import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createExpenseSchema, ExpenseSchema } from "../lib/expenses-schema";
import { useDictionary } from "@/shared/lib/hooks";

interface UseExpenseFormProps {
    defaultValues: Partial<ExpenseSchema>;
    onSubmit: (data: ExpenseSchema) => void;
}

export const useExpenseForm = ({ defaultValues, onSubmit }: UseExpenseFormProps) => {
    const { dictionary } = useDictionary();
    const expenseSchema = createExpenseSchema(dictionary);
    const [isFormSaved, setIsFormSaved] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const formMethods = useForm<ExpenseSchema>({
        resolver: zodResolver(expenseSchema),
        mode: 'onBlur',
        defaultValues: defaultValues,
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        setValue,
    } = formMethods;

    const handleFormSubmit = (data: ExpenseSchema) => {
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
