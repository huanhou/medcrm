import { useEffect, useState } from 'react';
import { ExpenseCategory } from "@/shared/api/types";
import { useGetExpenseCategory } from "../hook/use-get-expense-category";
import { useExpenseCategoryTableColumns } from "../lib/columns";
import { useTableLogic } from "@/shared/ui";
import { ColumnDef } from "@tanstack/react-table";

export const useExpenseCategoryTable = () => {
    const { expenseCategories, isLoading, isError } = useGetExpenseCategory();  // Fetch expense categories
    const columns = useExpenseCategoryTableColumns();  // Define the columns for the table
    const [tableData, setTableData] = useState<ExpenseCategory[]>([]);  // Manage table data with state

    // Define the table logic
    const tableLogic = useTableLogic(tableData, columns as ColumnDef<ExpenseCategory>[]);

    // Set up a mounted flag to prevent state updates on unmounted component
    useEffect(() => {
        let isMounted = true; // Flag to check if component is mounted

        if (!isLoading && !isError && expenseCategories && isMounted) {
            setTableData(expenseCategories);  // Update state only if the component is still mounted
        }

        return () => {
            isMounted = false; // Cleanup the flag on unmount
        };
    }, [expenseCategories, isLoading, isError]);  // Dependencies on data, loading, and error states

    return { expenseCategories, isLoading, isError, tableLogic };  // Return necessary data for the table
};
