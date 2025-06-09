import { useMutation, useQuery } from "@tanstack/react-query";
import { editExpense, getExpenseById } from "@/shared/api/generated";
import { CreateExpenseDto, Expense } from "@/shared/api/types";
import { queryClient } from "@/shared/api/query-client";


export function useGetExpenseByIdQuery(id: string) {
    return useQuery({
        queryKey: ['expense', id],
        queryFn: async () => {
            return await getExpenseById(id);
        },
        staleTime: 60 * 60 * 1000,
        enabled: !!id,
        initialData: () => {
            const expenseCategories = queryClient.getQueryData<Expense[]>(['expenses']);
            return expenseCategories?.find((p) => p.id === id);
        },
    });
}

export function useEditExpenseMutation(id: string) {
    return useMutation({
        mutationFn: async (data: CreateExpenseDto) => {
            return await editExpense(id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['expenses']});
        },
    });
}
