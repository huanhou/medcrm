import { useQuery } from "@tanstack/react-query";
import { getExpenseCategories } from "./generated";

export function useGetExpenseCategoriesQuery() {
    return useQuery({
        queryKey: ['expenseCategories'],
        queryFn: async () => {
            return await getExpenseCategories();
        },
        staleTime: 60 * 60 * 1000,
    });
}