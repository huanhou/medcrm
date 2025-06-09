// import { useMemo } from 'react';
// import { useGetExpensesQuery } from '../model/expenses-api';
// import { mapToExpenses } from '@/entities/expenses/mapper';

// export const useGetExpenses = () => {
//   const { data, isLoading, isError, isSuccess } = useGetExpensesQuery();
//   const transformedData = useMemo(() => {
//     return data ? mapToExpenses(data) : [];
//   }, [data]);
//   return {
//     data: transformedData,
//     isLoading,
//     isError,
//     isSuccess,
//   };
// };
// В hook/use-get-expenses.ts
// import { useMemo } from 'react';
// import { useGetExpensesQuery } from '../model/expenses-api';
// import { mapToExpenses } from '@/entities/expenses/mapper';

// export const useGetExpenses = (categoryId?: string) => {
//   const { data, isLoading, isError, isSuccess } = useGetExpensesQuery(categoryId);
//   const transformedData = useMemo(() => {
//     return data ? mapToExpenses(data) : [];
//   }, [data, categoryId]);
//   return {
//     data: transformedData,
//     isLoading,
//     isError,
//     isSuccess,
//   };
// };
// В hook/use-get-expenses.ts
import { useMemo } from 'react';
import { useGetExpensesQuery } from '../model/expenses-api';
import { mapToExpenses } from '@/entities/expenses/mapper';

export const useGetExpenses = () => {
    const { data, isLoading, isError, isSuccess } = useGetExpensesQuery();
    const transformedData = useMemo(() => {
        return data ? mapToExpenses(data) : [];
    }, [data]);
    return {
        data: transformedData,
        isLoading,
        isError,
        isSuccess,
    };
};