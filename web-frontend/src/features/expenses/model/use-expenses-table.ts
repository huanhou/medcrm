// import { useExpenseTableColumns } from "../lib/columns";
// import { useTableLogic } from "@/shared/ui";
// import { ColumnDef } from "@tanstack/react-table";
// import { useGetExpenses } from "@/features/expenses/hook/use-get-expenses";
// import { Expense } from "@/entities/expenses/types";
// export const useExpenseTable = () => {
//   const { data: expenses, isLoading, isError } = useGetExpenses();
//   const columns = useExpenseTableColumns();
//   const tableLogic = useTableLogic(expenses || [], columns as ColumnDef<Expense>[]);

//   return { expenses, isLoading, isError, tableLogic };
// };
// В model/use-expenses-table.ts
// import { useMemo, useState } from 'react';
// import { useGetExpenses } from '@/features/expenses/hook/use-get-expenses';
// import { useExpenseTableColumns } from '../lib/columns';
// import { useTableLogic } from '@/shared/ui';
// import { ColumnDef } from '@tanstack/react-table';
// import { Expense } from '@/entities/expenses/types';

// export const useExpenseTable = () => {
//   const [categoryId, setCategoryId] = useState<string | null>(null);

//   const { data: expenses, isLoading, isError } = useGetExpenses(categoryId);
//   const columns = useExpenseTableColumns();
//   const tableLogic = useTableLogic(expenses || [], columns as ColumnDef<Expense>[]);

//   return {
//     expenses,
//     isLoading,
//     isError,
//     tableLogic,
//     setCategoryId,
//     categoryId,
//   };
// };

// В model/use-expenses-table.ts
import { useGetExpenses } from '@/features/expenses/hook/use-get-expenses';
import { useExpenseTableColumns } from '../lib/columns';
import { useTableLogic } from '@/shared/ui';
import { ColumnDef } from '@tanstack/react-table';
import { Expense } from '@/entities/expenses/types';

export const useExpenseTable = () => {
    const { data: expenses, isLoading, isError } = useGetExpenses();
    const columns = useExpenseTableColumns();
    const tableLogic = useTableLogic(expenses || [], columns as ColumnDef<Expense>[]);

    return {
        expenses,
        isLoading,
        isError,
        tableLogic,
    };
};