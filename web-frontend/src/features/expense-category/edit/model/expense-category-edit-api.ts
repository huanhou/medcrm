import { useMutation, useQuery } from "@tanstack/react-query";
import { editExpenseCategory, getExpenseCategoryById } from "@/shared/api/generated";
import { CreateExpenseCategoryDto, ExpenseCategory } from "@/shared/api/types";
import { queryClient } from "@/shared/api/query-client";


export function useGetExpenseCategoryByIdQuery(id: string) {
    return useQuery({
        queryKey: ['expenseCategory', id],
        queryFn: async () => {
            return await getExpenseCategoryById(id);
        },
        staleTime: 60 * 60 * 1000,
        enabled: !!id,
        initialData: () => {
            const expenseCategories = queryClient.getQueryData<ExpenseCategory[]>(['expenseCategories']);
            return expenseCategories?.find((p) => p.id === id);
        },
    });
}

export function useEditExpenseCategoryMutation(id: string) {
    return useMutation({
        mutationFn: async (data: CreateExpenseCategoryDto) => {
            return await editExpenseCategory(id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenseCategories'] });
        },
    });
}
