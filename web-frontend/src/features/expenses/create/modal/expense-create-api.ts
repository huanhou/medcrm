
import { useMutation } from "@tanstack/react-query";
import { createExpense } from "@/shared/api/generated";
import { CreateExpenseDto } from "@/shared/api/types";
export function useCreateExpenseMutation() {
    return useMutation({
        mutationFn: async (data: CreateExpenseDto) =>
            await createExpense(data),
    });
}