import { useMutation } from "@tanstack/react-query";
import { createExpenseCategory } from "@/shared/api/generated";
import { CreateExpenseCategoryDto } from "@/shared/api/types";

export function useCreateExpenseCategoryMutation() {
    return useMutation({
        mutationFn: async (data: CreateExpenseCategoryDto) =>
            await createExpenseCategory(data),
    });
}
