import { useQuery } from '@tanstack/react-query';
import { getTransactions } from '@/shared/api/generated';
import { TransactionType } from './use-expenses-table';

export function useGetTransactionsQuery(
    type?: TransactionType,
    start_date?: Date,
    end_date?: Date
) {

    return useQuery({
        queryKey: [
            'transactions',
            type,
            start_date?.toISOString() ?? null,
            end_date?.toISOString() ?? null,
        ],
        queryFn: async () =>  await getTransactions(type, start_date, end_date),
        staleTime: 60 * 60 * 1000,
    });
}
