import { useTransactionHistoryTableColumns } from "../lib/columns";
import { useTableLogic } from "@/shared/ui";
import { ColumnDef } from "@tanstack/react-table";
import { useGetTransactionsQuery } from "@/features/transactions-history/model/transactions-history-api";
import { TransactionHistory } from "@/entities/history/types";
import { useMemo, useState } from "react";
import { mapToTransactionHistory } from "@/entities/history/mapper";


export type TransactionType = 'service' | 'appointment';

export const useTransactionHistoryTable = () => {
    const [transactionType, setTransactionType] = useState<TransactionType>('service');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const { data: transactions, isLoading, isError } = useGetTransactionsQuery(
        transactionType,
        startDate ?? undefined,
        endDate ?? undefined
    );

    const transformedData = useMemo(() => {
        return transactions ? mapToTransactionHistory(transactions) : [];
    }, [transactions]);

    const columns = useTransactionHistoryTableColumns(transactionType);
    const tableLogic = useTableLogic(transformedData || [], columns as ColumnDef<TransactionHistory>[]);

    return {
        transactions,
        isLoading,
        isError,
        tableLogic,
        setTransactionType,
        setStartDate,
        setEndDate,
        startDate,
        endDate,
    };
};

