import { GetExpensesResponse } from "@/shared/api/types";
import { Expense } from "./types";

export const mapToExpenses = (data: GetExpensesResponse): Expense[] => {
    return data.map((item) => ({
        id: item.id,
        category: item.ExpenseCategory?.name || "Unknown",
        amount: item.amount,
        created_at: item.created_at,
        description: item.description,
        staffName: item.Staff?.fio || "Unknown",
    }));
};

