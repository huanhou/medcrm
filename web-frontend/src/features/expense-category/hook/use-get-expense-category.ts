import { useGetExpenseCategoriesQuery } from "@/shared/api/expense-category";
export const useGetExpenseCategory = () => {
    const { data, isLoading, isError, isSuccess } = useGetExpenseCategoriesQuery();

    // Access the data properly from the API response
    const expenseCategories = data?.data || []; // Assuming response has the structure { success: true, data: [...] }

    return {
        expenseCategories,
        isLoading,
        isError,
        isSuccess,
    };
};

