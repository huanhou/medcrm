import { useGetExpenseCategoriesQuery } from "@/shared/api/expense-category";

export const useGetExpenseCategory = () => {
    const { data, isLoading, isError, isSuccess } = useGetExpenseCategoriesQuery();

    return {
        data,
        isLoading,
        isError,
        isSuccess,
    };
};
